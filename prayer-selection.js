// JavaScript for prayer selection page (prayer-selection.html)

document.addEventListener('DOMContentLoaded', function() {
    const prayerOptions = document.querySelectorAll('.prayer-option');
    const proceedBtn = document.getElementById('proceedBtn');
    const nameInputSection = document.getElementById('nameInputSection');
    const kapparotNameInput = document.getElementById('kapparotName');
    
    let selectedPrayerType = null;
    
    // Load and display donation data
    loadDonationSummary();
    
    // Prayer option selection
    prayerOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            prayerOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Get the selected prayer type
            selectedPrayerType = this.getAttribute('data-type');
            
            // Show name input section
            nameInputSection.style.display = 'block';
            
            // Update placeholder text based on selection
            updateNamePlaceholder(selectedPrayerType);
            
            // Enable proceed button
            proceedBtn.disabled = false;
        });
    });
    
    // Proceed button click
    proceedBtn.addEventListener('click', function() {
        if (!selectedPrayerType) {
            alert('Please select a prayer type.');
            return;
        }
        
        const kapparotName = kapparotNameInput.value.trim();
        if (!kapparotName) {
            alert('Please enter the name of the person for whom Kapparot is being performed.');
            return;
        }
        
        // Store prayer selection data
        const prayerData = {
            prayerType: selectedPrayerType,
            personName: kapparotName
        };
        
        // Combine with existing donation data
        const existingData = getDonationData();
        const completeData = { ...existingData, ...prayerData };
        
        localStorage.setItem('kapparotDonation', JSON.stringify(completeData));
        
        // Redirect to prayer display page
        window.location.href = 'prayer-display.html';
    });

    function loadDonationSummary() {
        const donationData = getDonationData();
        
        if (donationData) {
            document.getElementById('donorName').textContent = donationData.name;
            document.getElementById('donationAmount').textContent = donationData.amount;
            document.getElementById('donorEmail').textContent = donationData.email;
        } else {
            // Redirect to home page if no donation data
            window.location.href = 'index.html';
        }
    }
    
    function updateNamePlaceholder(prayerType) {
        let placeholder = '';
        
        switch(prayerType) {
            case 'male':
                placeholder = 'Enter name (e.g., David ben Sarah)';
                break;
            case 'female':
                placeholder = 'Enter name (e.g., Sarah bat Rivka)';
                break;
            case 'male-child':
                placeholder = 'Enter boy\'s name (e.g., Moshe ben David)';
                break;
            case 'female-child':
                placeholder = 'Enter girl\'s name (e.g., Rachel bat Sarah)';
                break;
            case 'family':
                placeholder = 'Enter family name or head of household';
                break;
            case 'pregnant':
                placeholder = 'Enter mother\'s name (e.g., Sarah bat Rivka)';
                break;
            default:
                placeholder = 'Enter Hebrew name if known, or English name';
        }
        
        kapparotNameInput.placeholder = placeholder;
    }
});

// Utility function to get stored donation data
function getDonationData() {
    const data = localStorage.getItem('kapparotDonation');
    return data ? JSON.parse(data) : null;
}
