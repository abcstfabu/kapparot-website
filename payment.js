// JavaScript for payment page (payment.html)

// Payment URLs with email prefilling
function getPaymentUrls(amount, email) {
    const encodedEmail = encodeURIComponent(email || ''); // URL encode email
    
    return {
        // Stripe donation page with email prefilling
        stripe: 'https://donate.stripe.com/5kAdUbdiv2ZJ81O000?prefilled_email=' + encodedEmail,
        
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
    console.log('Payment processing - Retrieved data:', donationData); // Debug log
    const paymentUrls = getPaymentUrls(donationData.amount, donationData.email);
    
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
    
    console.log('Payment processing - Modified data:', donationData); // Debug log
    
    // Save donation record first
    localStorage.setItem('kapparotDonation', JSON.stringify(donationData));
    console.log('Payment processing - Data saved to localStorage'); // Debug log
    
    // Try to save to Google Sheets
    if (typeof window.saveDonation === 'function') {
        window.saveDonation(donationData);
    }
    
    // Clear accumulated session after payment method selection (reset for next user)
    localStorage.removeItem('kapparotSession');
    
    // Handle different payment methods
    switch(method) {
        case 'stripe':
            // Stripe credit card payment with email pre-filled
            const stripeConfirm = confirm('Stripe Payment:\n\nClick OK to go to Stripe to make your $' + donationData.amount + ' donation.\n\nYour email will be pre-filled on the payment form.\n\nAfter completing payment, please return to this website to complete your Kapparot prayer.\n\nClick OK to proceed to Stripe, or Cancel to choose a different payment method.');
            
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
            // Show PayPal payment instructions and proceed to completion
            const paypalMessage = 'PayPal Payment Instructions:\n\n' +
                'Send your donation to: yishuveypushka@gmail.com\n' +
                'Amount: $' + donationData.amount + '\n\n' +
                'Please include "Kapparot - ' + getPrayerTypeDisplayName(donationData.prayerType) + '" in the notes.\n\n' +
                'After sending your payment, click OK to complete your Kapparot.';
            
            alert(paypalMessage);
            // Add completion timestamp since payment instructions were given
            donationData.completedAt = new Date().toISOString();
            localStorage.setItem('kapparotDonation', JSON.stringify(donationData));
            // Redirect directly to completion page
            window.location.href = 'completion.html';
            break;
            
        case 'zelle':
            // Show Zelle instructions and proceed to completion
            const zelleMessage = 'Zelle/QuickPay Payment Instructions:\n\n' +
                'Send your donation to: yishuveypushka@gmail.com\n' +
                'Amount: $' + donationData.amount + '\n\n' +
                'Please include "Kapparot - ' + getPrayerTypeDisplayName(donationData.prayerType) + '" in the notes.\n\n' +
                'After sending your payment, click OK to complete your Kapparot.';
            
            alert(zelleMessage);
            // Add completion timestamp since payment instructions were given
            donationData.completedAt = new Date().toISOString();
            localStorage.setItem('kapparotDonation', JSON.stringify(donationData));
            // Redirect directly to completion page
            window.location.href = 'completion.html';
            break;
            
        default:
            alert('Payment method not yet implemented. Please contact us at yishuveypushka@gmail.com');
    }
};

function getPrayerTypeDisplayName(prayerType) {
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

// Utility function to get stored donation data
function getDonationData() {
    const data = localStorage.getItem('kapparotDonation');
    return data ? JSON.parse(data) : null;
}

// PayPal now uses email display (like Zelle) instead of external redirect

// Clear any temporary payment data when page unloads
window.addEventListener('beforeunload', function() {
    if (window.tempPaymentData) {
        delete window.tempPaymentData;
    }
});