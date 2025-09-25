// Google Sheets API Configuration
// This file handles all Google Sheets database operations

// SETUP INSTRUCTIONS:
// 1. Go to https://console.developers.google.com
// 2. Create a new project or select existing
// 3. Enable Google Sheets API
// 4. Create credentials (API Key)
// 5. Create a Google Sheet and get the Sheet ID
// 6. Make the sheet publicly editable or use service account
// 7. Replace the values below with your actual credentials

const SHEETS_CONFIG = {
    // Replace with your Google Sheets API key
    API_KEY: 'YOUR_GOOGLE_SHEETS_API_KEY_HERE',
    
    // Replace with your Google Sheet ID (from the URL)
    SHEET_ID: 'YOUR_GOOGLE_SHEET_ID_HERE',
    
    // Sheet name/tab (you can keep as 'Donations' or change)
    SHEET_NAME: 'Donations',
    
    // API endpoint
    get API_URL() {
        return `https://sheets.googleapis.com/v4/spreadsheets/${this.SHEET_ID}/values/${this.SHEET_NAME}:append?valueInputOption=RAW&key=${this.API_KEY}`;
    }
};

// Database operations
class KapparotDatabase {
    
    constructor() {
        this.isConfigured = this.checkConfiguration();
        this.initializeSheet();
    }
    
    checkConfiguration() {
        if (SHEETS_CONFIG.API_KEY.includes('YOUR_') || SHEETS_CONFIG.SHEET_ID.includes('YOUR_')) {
            console.warn('Google Sheets not configured. Using localStorage fallback.');
            return false;
        }
        return true;
    }
    
    async initializeSheet() {
        if (!this.isConfigured) return;
        
        try {
            // Check if sheet exists and has headers
            const response = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_CONFIG.SHEET_ID}/values/${SHEETS_CONFIG.SHEET_NAME}!A1:Z1?key=${SHEETS_CONFIG.API_KEY}`
            );
            
            if (response.ok) {
                const data = await response.json();
                
                // If no headers, add them
                if (!data.values || data.values.length === 0) {
                    await this.createHeaders();
                }
            }
        } catch (error) {
            console.warn('Could not initialize sheet headers:', error);
        }
    }
    
    async createHeaders() {
        const headers = [
            'Timestamp',
            'Prayer Type', 
            'Amount',
            'Email',
            'Transaction ID',
            'Payment Method',
            'Status'
        ];
        
        try {
            const response = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_CONFIG.SHEET_ID}/values/${SHEETS_CONFIG.SHEET_NAME}!A1:G1?valueInputOption=RAW&key=${SHEETS_CONFIG.API_KEY}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        values: [headers]
                    })
                }
            );
            
            if (response.ok) {
                console.log('Headers created successfully');
            }
        } catch (error) {
            console.error('Failed to create headers:', error);
        }
    }
    
    async saveDonation(donationData) {
        // Fallback to localStorage if Sheets not configured
        if (!this.isConfigured) {
            return this.saveToLocalStorage(donationData);
        }
        
        try {
            const row = [
                new Date().toISOString(),                                    // Timestamp
                this.getPrayerTypeDisplayName(donationData.prayerType),     // Prayer Type
                donationData.amount,                                        // Amount
                donationData.email || '',                                   // Email
                donationData.transactionId || '',                          // Transaction ID
                donationData.paymentMethod || donationData.paymentMethodName || '', // Payment Method
                donationData.completedAt ? 'Completed' : 'Payment Selected'  // Status
            ];
            
            const response = await fetch(SHEETS_CONFIG.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    values: [row]
                })
            });
            
            if (response.ok) {
                return { success: true, method: 'sheets' };
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
        } catch (error) {
            console.error('Failed to save to Google Sheets:', error);
            
            // Fallback to localStorage
            return this.saveToLocalStorage(donationData);
        }
    }
    
    saveToLocalStorage(donationData) {
        try {
            localStorage.setItem('kapparotDonation', JSON.stringify(donationData));
            return { success: true, method: 'localStorage' };
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
            return { success: false, error: error.message };
        }
    }
    
    
    // Get donation data (for continuing through the flow)
    getDonationData() {
        const data = localStorage.getItem('kapparotDonation');
        return data ? JSON.parse(data) : null;
    }
    
    // Store temporary data during the donation flow
    storeTempData(data) {
        localStorage.setItem('kapparotDonation', JSON.stringify(data));
    }
    
    // Clear temporary data after successful save
    clearTempData() {
        localStorage.removeItem('kapparotDonation');
    }
    
    // Helper function
    getPrayerTypeDisplayName(prayerType) {
        const names = {
            'self-male': 'Male (For Yourself)',
            'self-female': 'Female (For Yourself)',
            'self-pregnant': 'Pregnant Woman (For Yourself)',
            'other-male': 'Male (For Other)',
            'other-female': 'Female (For Other)',
            'other-pregnant': 'Pregnant Woman (For Other)',
            'multiple': 'Multiple Kapparot Prayers'
        };
        
        return names[prayerType] || prayerType;
    }
    
    // Test connection (for setup validation)
    async testConnection() {
        if (!this.isConfigured) {
            return { success: false, message: 'API not configured' };
        }
        
        try {
            const response = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_CONFIG.SHEET_ID}?key=${SHEETS_CONFIG.API_KEY}`
            );
            
            if (response.ok) {
                const data = await response.json();
                return { 
                    success: true, 
                    message: `Connected to: ${data.properties.title}`,
                    sheetTitle: data.properties.title
                };
            } else {
                return { 
                    success: false, 
                    message: `HTTP ${response.status}: ${response.statusText}` 
                };
            }
        } catch (error) {
            return { 
                success: false, 
                message: error.message 
            };
        }
    }
}

// Create global database instance
window.kapparotDB = new KapparotDatabase();
