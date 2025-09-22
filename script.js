// Main script for prayer selection + amount page (index.html)

document.addEventListener('DOMContentLoaded', function() {
    const donationForm = document.getElementById('donationForm');
    const amountInput = document.getElementById('amount');
    const amountButtons = document.querySelectorAll('.amount-btn');
    const prayerOptions = document.querySelectorAll('.prayer-option');
    const proceedBtn = document.getElementById('proceedBtn');
    
    let selectedPrayerType = null;

    // Prayer option selection
    prayerOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            prayerOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Get the selected prayer type
            selectedPrayerType = this.getAttribute('data-type');
            
            // Check if we can enable proceed button
            checkFormCompletion();
        });
    });

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
            
            // Check if we can enable proceed button
            checkFormCompletion();
        });
    });

    // Custom amount input
    amountInput.addEventListener('input', function() {
        // Remove active class from all buttons when custom amount is entered
        amountButtons.forEach(btn => btn.classList.remove('active'));
        
        // Check if we can enable proceed button
        checkFormCompletion();
    });
    
    // Email input validation
    const emailInput = document.getElementById('donorEmail');
    emailInput.addEventListener('input', checkFormCompletion);


    // Form submission
    donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Store form data in localStorage  
        const emailInput = document.getElementById('donorEmail');
        const formData = {
            prayerType: selectedPrayerType,
            amount: amountInput.value,
            email: emailInput.value
        };
        
        localStorage.setItem('kapparotDonation', JSON.stringify(formData));
        
        // Redirect to payment page
        window.location.href = 'payment.html';
    });

    function checkFormCompletion() {
        const emailInput = document.getElementById('donorEmail');
        const hasAmount = amountInput.value && amountInput.value >= 1;
        const hasPrayerType = selectedPrayerType !== null;
        const hasEmail = emailInput.value && isValidEmail(emailInput.value);
        
        // Enable button if we have all required fields
        proceedBtn.disabled = !(hasAmount && hasPrayerType && hasEmail);
    }

    function validateForm() {
        const amount = amountInput.value;
        const emailInput = document.getElementById('donorEmail');
        const email = emailInput.value;
        
        // Basic validation
        if (!email || !isValidEmail(email)) {
            alert('Please enter a valid email address.');
            emailInput.focus();
            return false;
        }
        
        if (!amount || amount < 1) {
            alert('Please enter a valid donation amount.');
            return false;
        }
        
        if (!selectedPrayerType) {
            alert('Please select who is performing Kapparot.');
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
