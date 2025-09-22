// Main script for landing page (index.html)

document.addEventListener('DOMContentLoaded', function() {
    const donationForm = document.getElementById('donationForm');
    const amountInput = document.getElementById('amount');
    const amountButtons = document.querySelectorAll('.amount-btn');
    const cardNumberInput = document.getElementById('cardNumber');
    const cvvInput = document.getElementById('cvv');

    // Amount button selection
    amountButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Set the amount in the input field
            const amount = this.getAttribute('data-amount');
            amountInput.value = amount;
        });
    });

    // Custom amount input
    amountInput.addEventListener('input', function() {
        // Remove active class from all buttons when custom amount is entered
        amountButtons.forEach(btn => btn.classList.remove('active'));
    });

    // Card number formatting
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        
        if (formattedValue !== e.target.value) {
            e.target.value = formattedValue;
        }
    });

    // CVV input validation
    cvvInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

    // Form submission
    donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Store form data in localStorage
        const formData = {
            amount: document.getElementById('amount').value,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            cardNumber: document.getElementById('cardNumber').value,
            cvv: document.getElementById('cvv').value,
            expMonth: document.getElementById('expMonth').value,
            expYear: document.getElementById('expYear').value,
            billingAddress: document.getElementById('billingAddress').value,
            city: document.getElementById('city').value,
            zipCode: document.getElementById('zipCode').value
        };
        
        localStorage.setItem('kapparotDonation', JSON.stringify(formData));
        
        // Redirect to prayer selection page
        window.location.href = 'prayer-selection.html';
    });

    function validateForm() {
        const amount = document.getElementById('amount').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const cardNumber = document.getElementById('cardNumber').value;
        const cvv = document.getElementById('cvv').value;
        const expMonth = document.getElementById('expMonth').value;
        const expYear = document.getElementById('expYear').value;
        
        // Basic validation
        if (!amount || amount < 1) {
            alert('Please enter a valid donation amount.');
            return false;
        }
        
        if (!name.trim()) {
            alert('Please enter your full name.');
            return false;
        }
        
        if (!email.trim() || !isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return false;
        }
        
        if (!cardNumber.trim() || cardNumber.replace(/\s/g, '').length < 13) {
            alert('Please enter a valid card number.');
            return false;
        }
        
        if (!cvv.trim() || cvv.length < 3) {
            alert('Please enter a valid CVV.');
            return false;
        }
        
        if (!expMonth || !expYear) {
            alert('Please select the card expiry date.');
            return false;
        }
        
        return true;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

// Utility function to get stored donation data
function getDonationData() {
    const data = localStorage.getItem('kapparotDonation');
    return data ? JSON.parse(data) : null;
}
