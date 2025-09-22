// JavaScript for completion page (completion.html)

document.addEventListener('DOMContentLoaded', function() {
    const performAnotherBtn = document.getElementById('performAnother');
    
    // SECURITY: Clear any leftover sensitive payment data immediately
    if (window.tempPaymentData) {
        delete window.tempPaymentData;
    }
    
    // Load and display completion data
    loadCompletionData();
    
    // Perform another Kapparot button
    performAnotherBtn.addEventListener('click', function() {
        // Clear localStorage and go back to home page
        localStorage.removeItem('kapparotDonation');
        window.location.href = 'index.html';
    });
    

    function loadCompletionData() {
        const donationData = getDonationData();
        
        if (!donationData || !donationData.completedAt) {
            // Redirect to home if missing completion data
            window.location.href = 'index.html';
            return;
        }
        
        // Update display elements
        document.getElementById('finalDonorEmail').textContent = donationData.email || 'Not provided';
        document.getElementById('finalPerformingFor').textContent = getPrayerTypeDisplayName(donationData.prayerType);
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
    
    
});

// Utility function to get stored donation data
function getDonationData() {
    const data = localStorage.getItem('kapparotDonation');
    return data ? JSON.parse(data) : null;
}
