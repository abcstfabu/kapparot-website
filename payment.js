// JavaScript for payment page (payment.html)

// Payment URLs with amount parameters (simplified, no return URLs)
function getPaymentUrls(amount) {
    const amountCents = Math.round(parseFloat(amount) * 100); // Convert to cents
    
    return {
        // Stripe donation page (simplified, no return URLs)
        stripe: 'https://donate.stripe.com/5kAdUbdiv2ZJ81O000?amount=' + amountCents,
        
        // PayPal.me link with amount (simpler, more reliable)
        paypal: 'https://paypal.me/yishuveypushka/' + amount + 'USD',
        
        // Matbia (simplified, no return parameters)
        matbia: 'https://matbia.org/d/00124222281',
        
        // OJC (simplified, no return parameters)
        ojc: 'https://secure.ojccardpaymentsite.org/MQAAADMAAAA3AAAANwAAADQAAAA='
    };
}

document.addEventListener('DOMContentLoaded', function() {
    // Load and display donation data
    loadDonationSummary();
});

function loadDonationSummary() {
    const donationData = getDonationData();
    
    if (!donationData) {
        // Redirect to home page if no donation data
        window.location.href = 'index.html';
        return;
    }
    
    document.getElementById('donorEmail').textContent = donationData.email || 'Not provided';
    document.getElementById('performingFor').textContent = getPrayerTypeDisplayName(donationData.prayerType);
    document.getElementById('donationAmount').textContent = donationData.amount;
    
    // Update amount displays in payment method descriptions
    const amountDisplays = document.querySelectorAll('.amount-display');
    amountDisplays.forEach(display => {
        display.textContent = donationData.amount;
    });
}

// Handle payment method selection
window.processPayment = function(method) {
    const donationData = JSON.parse(localStorage.getItem('kapparotDonation') || '{}');
    const paymentUrls = getPaymentUrls(donationData.amount);
    
    // Add payment method to donation data with user-friendly names
    const paymentMethodNames = {
        'stripe': 'Credit Card (Stripe)',
        'paypal': 'PayPal',
        'matbia': 'Matbia Platform',
        'ojc': 'OJC Payment System',
        'zelle': 'Zelle/QuickPay'
    };
    
    donationData.paymentMethod = paymentMethodNames[method] || method;
    donationData.timestamp = new Date().toISOString();
    donationData.transactionId = 'KAP-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
    
    // Save donation record first
    localStorage.setItem('kapparotDonation', JSON.stringify(donationData));
    
    // Try to save to Google Sheets
    if (typeof window.saveDonation === 'function') {
        window.saveDonation(donationData);
    }
    
    // Handle different payment methods
    switch(method) {
        case 'stripe':
            // Stripe credit card payment with instructions
            const stripeConfirm = confirm('Stripe Payment:\n\nClick OK to go to Stripe to make your $' + donationData.amount + ' donation.\n\nAfter completing payment, please return to this website to complete your Kapparot prayer.\n\nClick OK to proceed to Stripe, or Cancel to choose a different payment method.');
            
            if (stripeConfirm) {
                window.location.href = paymentUrls.stripe;
            }
            break;
            
        case 'matbia':
            // Matbia platform payment with instructions
            const matbiaConfirm = confirm('Matbia Payment:\n\nClick OK to go to Matbia platform to make your $' + donationData.amount + ' donation.\n\nAfter completing payment, please return to this website to complete your Kapparot prayer.\n\nClick OK to proceed to Matbia, or Cancel to choose a different payment method.');
            
            if (matbiaConfirm) {
                window.location.href = paymentUrls.matbia;
            }
            break;
            
        case 'ojc':
            // OJC payment system with instructions
            const ojcConfirm = confirm('OJC Payment:\n\nClick OK to go to OJC secure payment system to make your $' + donationData.amount + ' donation.\n\nAfter completing payment, please return to this website to complete your Kapparot prayer.\n\nClick OK to proceed to OJC, or Cancel to choose a different payment method.');
            
            if (ojcConfirm) {
                window.location.href = paymentUrls.ojc;
            }
            break;
            
        case 'paypal':
            // PayPal.me redirect with instructions
            const paypalConfirm = confirm('PayPal Payment:\n\nClick OK to go to PayPal to send your $' + donationData.amount + ' donation.\n\nAfter completing payment, please return to this website to complete your Kapparot prayer.\n\nClick OK to proceed to PayPal, or Cancel to choose a different payment method.');
            
            if (paypalConfirm) {
                window.location.href = paymentUrls.paypal;
            }
            break;
            
        case 'zelle':
            // Show Zelle instructions and proceed to prayer
            const zelleMessage = 'Zelle/QuickPay Payment Instructions:\n\n' +
                'Send your donation to: yishuveypushka@gmail.com\n' +
                'Amount: $' + donationData.amount + '\n\n' +
                'Please include "Kapparot - ' + getPrayerTypeDisplayName(donationData.prayerType) + '" in the notes.\n\n' +
                'After sending your payment, click OK to continue to your Kapparot prayer.';
            
            alert(zelleMessage);
            // Redirect directly to prayer page (payment method already saved above)
            window.location.href = 'prayer-display.html';
            break;
            
        default:
            alert('Payment method not yet implemented. Please contact us at yishuveypushka@gmail.com');
    }
};

// Removed proceedToPrayer function - no longer needed with simplified payment flow

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

// Utility function to get stored donation data
function getDonationData() {
    const data = localStorage.getItem('kapparotDonation');
    return data ? JSON.parse(data) : null;
}

// Embedded PayPal functionality removed - using direct redirect only

// Clear any temporary payment data when page unloads
window.addEventListener('beforeunload', function() {
    if (window.tempPaymentData) {
        delete window.tempPaymentData;
    }
});