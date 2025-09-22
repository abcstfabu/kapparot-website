// JavaScript for prayer display page (prayer-display.html)

// Prayer texts for different types of Kapparot
const PRAYERS = {
    male: {
        hebrew: `זֶה חֲלִיפָתִי, זֶה תְּמוּרָתִי, זֶה כַפָּרָתִי. הַכֶּסֶף הַזֶה יֵלֵךְ לִצְדָקָה, וַאֲנִי אֵלֵךְ לְחַיִּים טוֹבִים אֲרֻכִּים וּלְשָׁלוֹם.`,
        transliteration: `Zeh chalifati, zeh temurati, zeh kaparati. HaKesef hazeh yelech litzedakah, va'ani elech l'chayim tovim arukim ul'shalom.`,
        english: `This is my substitute, this is my exchange, this is my atonement. This money shall go to charity, and I shall go to a good, long life and peace.`
    },
    female: {
        hebrew: `זֹאת חֲלִיפָתִי, זֹאת תְּמוּרָתִי, זֹאת כַפָּרָתִי. הַכֶּסֶף הַזֶה יֵלֵךְ לִצְדָקָה, וַאֲנִי אֵלֵךְ לְחַיִּים טוֹבִים אֲרֻכִּים וּלְשָׁלוֹם.`,
        transliteration: `Zot chalifati, zot temurati, zot kaparati. HaKesef hazeh yelech litzedakah, va'ani elech l'chayim tovim arukim ul'shalom.`,
        english: `This is my substitute, this is my exchange, this is my atonement. This money shall go to charity, and I shall go to a good, long life and peace.`
    },
    'male-child': {
        hebrew: `זֶה חֲלִיפַת הַיֶּלֶד, זֶה תְּמוּרַת הַיֶּלֶד, זֶה כַפָּרַת הַיֶּלֶד. הַכֶּסֶף הַזֶה יֵלֵךְ לִצְדָקָה, וְהוּא יֵלֵךְ לְחַיִּים טוֹבִים אֲרֻכִּים וּלְשָׁלוֹם.`,
        transliteration: `Zeh chalifat hayeled, zeh temurat hayeled, zeh kaparat hayeled. HaKesef hazeh yelech litzedakah, v'hu yelech l'chayim tovim arukim ul'shalom.`,
        english: `This is the substitute for the child, this is the exchange for the child, this is the atonement for the child. This money shall go to charity, and he shall go to a good, long life and peace.`
    },
    'female-child': {
        hebrew: `זֹאת חֲלִיפַת הַיַּלְדָּה, זֹאת תְּמוּרַת הַיַּלְדָּה, זֹאת כַפָּרַת הַיַּלְדָּה. הַכֶּסֶף הַזֶה יֵלֵךְ לִצְדָקָה, וְהִיא תֵלֵךְ לְחַיִּים טוֹבִים אֲרֻכִּים וּלְשָׁלוֹם.`,
        transliteration: `Zot chalifat hayaldah, zot temurat hayaldah, zot kaparat hayaldah. HaKesef hazeh yelech litzedakah, v'hi telech l'chayim tovim arukim ul'shalom.`,
        english: `This is the substitute for the child, this is the exchange for the child, this is the atonement for the child. This money shall go to charity, and she shall go to a good, long life and peace.`
    },
    family: {
        hebrew: `אֵלֶה חֲלִיפָתֵנוּ, אֵלֶה תְּמוּרָתֵנוּ, אֵלֶה כַפָּרָתֵנוּ. הַכֶּסֶף הַזֶה יֵלֵךְ לִצְדָקָה, וַאֲנַחְנוּ נֵלֵךְ לְחַיִּים טוֹבִים אֲרֻכִּים וּלְשָׁלוֹם.`,
        transliteration: `Eleh chalifatenu, eleh temuratenu, eleh kaparatenu. HaKesef hazeh yelech litzedakah, va'anachnu nelech l'chayim tovim arukim ul'shalom.`,
        english: `These are our substitutes, these are our exchanges, these are our atonements. This money shall go to charity, and we shall go to a good, long life and peace.`
    },
    pregnant: {
        hebrew: `זֹאת חֲלִיפָתִי, זֹאת תְּמוּרָתִי, זֹאת כַפָּרָתִי, וְזֶה חֲלִיפַת הָעֻבָּר שֶׁבְּמֵעַי, זֶה תְּמוּרַת הָעֻבָּר שֶׁבְּמֵעַי, זֶה כַפָּרַת הָעֻבָּר שֶׁבְּמֵעַי. הַכֶּסֶף הַזֶה יֵלֵךְ לִצְדָקָה, וַאֲנִי וְהָעֻבָּר שֶׁבְּמֵעַי נֵלֵךְ לְחַיִּים טוֹבִים אֲרֻכִּים וּלְשָׁלוֹם.`,
        transliteration: `Zot chalifati, zot temurati, zot kaparati, v'zeh chalifat ha'ubar sheb'mei'ai, zeh temurat ha'ubar sheb'mei'ai, zeh kaparat ha'ubar sheb'mei'ai. HaKesef hazeh yelech litzedakah, va'ani v'ha'ubar sheb'mei'ai nelech l'chayim tovim arukim ul'shalom.`,
        english: `This is my substitute, this is my exchange, this is my atonement, and this is the substitute for the child in my womb, this is the exchange for the child in my womb, this is the atonement for the child in my womb. This money shall go to charity, and I and the child in my womb shall go to a good, long life and peace.`
    }
};

// SECURITY: Clear any sensitive payment data when leaving page
window.addEventListener('beforeunload', function() {
    if (window.tempPaymentData) {
        delete window.tempPaymentData;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const prayerCompletedCheckbox = document.getElementById('prayerCompleted');
    const completeDonationBtn = document.getElementById('completeDonation');
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    
    // Load and display data
    loadPrayerData();
    
    // Initialize prayer toggle functionality
    initializePrayerToggle();
    
    // Checkbox change event
    prayerCompletedCheckbox.addEventListener('change', function() {
        completeDonationBtn.disabled = !this.checked;
    });
    
    // Complete donation button click
    completeDonationBtn.addEventListener('click', function() {
        if (!prayerCompletedCheckbox.checked) {
            alert('Please confirm that you have completed the prayer recitation.');
            return;
        }
        
        // Add completion timestamp and transaction ID
        const completeData = getDonationData();
        completeData.completedAt = new Date().toISOString();
        completeData.transactionId = generateTransactionId();
        
        // Store safe data for completion page
        localStorage.setItem('kapparotDonation', JSON.stringify(completeData));
        
        // Update Google Sheets database with completion status
        if (typeof window.saveDonation === 'function') {
            window.saveDonation(completeData);
        }
        
        // Clear any temporary payment data from memory
        if (window.tempPaymentData) {
            delete window.tempPaymentData;
        }
        
        // Redirect to completion page
        window.location.href = 'completion.html';
    });

    function loadPrayerData() {
        const donationData = getDonationData();
        
        if (!donationData || !donationData.prayerType) {
            // Redirect to home if missing data
            window.location.href = 'index.html';
            return;
        }
        
        // Update display elements
        document.getElementById('performingFor').textContent = getPrayerTypeDisplayName(donationData.prayerType);
        document.getElementById('finalAmount').textContent = donationData.amount;
        
        // Load appropriate prayer
        loadPrayer(donationData.prayerType);
    }
    
    function loadPrayer(prayerType) {
        const prayer = PRAYERS[prayerType];
        
        if (!prayer) {
            console.error('Prayer type not found:', prayerType);
            return;
        }
        
        // Update DOM with prayers
        document.getElementById('hebrewPrayer').innerHTML = prayer.hebrew;
        document.getElementById('transliterationPrayer').innerHTML = prayer.transliteration;
        document.getElementById('englishPrayer').innerHTML = prayer.english;
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
    
    function generateTransactionId() {
        const timestamp = Date.now().toString(36);
        const randomStr = Math.random().toString(36).substr(2, 5);
        return `KAP-${timestamp.toUpperCase()}-${randomStr.toUpperCase()}`;
    }
    
    function initializePrayerToggle() {
        const toggleBtns = document.querySelectorAll('.toggle-btn');
        
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                toggleBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show the selected prayer version
                const prayerType = this.getAttribute('data-prayer');
                showPrayerVersion(prayerType);
            });
        });
    }
    
    function showPrayerVersion(version) {
        // Hide all prayer contents
        const prayerContents = document.querySelectorAll('.prayer-content');
        prayerContents.forEach(content => {
            content.style.display = 'none';
        });
        
        // Show selected version
        const targetContent = document.getElementById(`${version}-content`);
        if (targetContent) {
            targetContent.style.display = 'block';
        }
    }
});

// Utility function to get stored donation data
function getDonationData() {
    const data = localStorage.getItem('kapparotDonation');
    return data ? JSON.parse(data) : null;
}
