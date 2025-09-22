// JavaScript for completion page (completion.html)

document.addEventListener('DOMContentLoaded', function() {
    const performAnotherBtn = document.getElementById('performAnother');
    const downloadReceiptBtn = document.getElementById('downloadReceipt');
    
    // Load and display completion data
    loadCompletionData();
    
    // Perform another Kapparot button
    performAnotherBtn.addEventListener('click', function() {
        // Clear localStorage and go back to home page
        localStorage.removeItem('kapparotDonation');
        window.location.href = 'index.html';
    });
    
    // Download receipt button
    downloadReceiptBtn.addEventListener('click', function() {
        generateAndDownloadReceipt();
    });

    function loadCompletionData() {
        const donationData = getDonationData();
        
        if (!donationData || !donationData.completedAt) {
            // Redirect to home if missing completion data
            window.location.href = 'index.html';
            return;
        }
        
        // Update display elements
        document.getElementById('finalPerformingFor').textContent = getPrayerTypeDisplayName(donationData.prayerType);
        document.getElementById('finalPersonName').textContent = donationData.personName || 'Not specified';
        document.getElementById('finalDonationAmount').textContent = donationData.amount;
        
        // Format and display completion date
        const completionDate = new Date(donationData.completedAt);
        document.getElementById('donationDate').textContent = completionDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Display transaction ID
        document.getElementById('transactionId').textContent = donationData.transactionId || 'N/A';
    }
    
    function getPrayerTypeDisplayName(prayerType) {
        const names = {
            'male': 'Male Adult',
            'female': 'Female Adult',
            'male-child': 'Male Child',
            'female-child': 'Female Child',
            'family': 'Entire Family',
            'pregnant': 'Pregnant Woman'
        };
        
        return names[prayerType] || prayerType;
    }
    
    function generateAndDownloadReceipt() {
        const donationData = getDonationData();
        
        if (!donationData) {
            alert('No donation data found.');
            return;
        }
        
        // Generate receipt content
        const receiptContent = generateReceiptText(donationData);
        
        // Create and download file
        const blob = new Blob([receiptContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `Kapparot_Receipt_${donationData.transactionId}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }
    
    function generateReceiptText(data) {
        const completionDate = new Date(data.completedAt);
        
        return `
KAPPAROT ONLINE - DONATION RECEIPT
=====================================

Transaction ID: ${data.transactionId}
Date: ${completionDate.toLocaleDateString('en-US')} ${completionDate.toLocaleTimeString('en-US')}

DONATION DETAILS
----------------
Donor Name: ${data.name}
Email: ${data.email}
Amount: $${data.amount}

KAPPAROT DETAILS
----------------
Performed for: ${getPrayerTypeDisplayName(data.prayerType)}
Person's Name: ${data.personName || 'Not specified'}

PAYMENT INFORMATION
-------------------
Card: ****${data.cardNumber.slice(-4)}
Billing Address: ${data.billingAddress}, ${data.city} ${data.zipCode}

CHARITABLE DISTRIBUTION
-----------------------
This donation fulfills the modern interpretation of Kapparot, 
where monetary charity replaces the traditional animal offering. 
Your donation will be distributed to verified charitable 
organizations helping those in need.

RELIGIOUS SIGNIFICANCE
----------------------
By performing Kapparot through tzedakah (charitable giving), 
you have fulfilled this meaningful Jewish tradition before 
Yom Kippur. May this act bring you merit and blessing.

G'mar Chatimah Tovah
May you be sealed for good in the Book of Life

=====================================
© 2024 Kapparot Online
This receipt serves as confirmation of your charitable donation.
        `.trim();
    }
});

// Utility function to get stored donation data
function getDonationData() {
    const data = localStorage.getItem('kapparotDonation');
    return data ? JSON.parse(data) : null;
}
