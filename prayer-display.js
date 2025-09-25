// Prayer Display Page JavaScript - Clean Implementation

// Prayer texts for all types
const PRAYERS = {
    'self-male': {
        hebrew: `זֶה חֲלִיפָתִי, זֶה תְּמוּרָתִי, זֶה כַפָּרָתִי. הַכֶּסֶף הַזֶה יֵלֵךְ לִצְדָקָה, וַאֲנִי אֵלֵךְ לְחַיִּים טוֹבִים אֲרֻכִּים וּלְשָׁלוֹם.`,
        transliteration: `Zeh chalifati, zeh temurati, zeh kaparati. HaKesef hazeh yelech litzedakah, va'ani elech l'chayim tovim arukim ul'shalom.`,
        english: `This is my substitute, this is my exchange, this is my atonement. This money shall go to charity, and I shall go to a good, long life and peace.`
    },
    'self-female': {
        hebrew: `זֶה חֲלִיפָתִי, זֶה תְּמוּרָתִי, זֶה כַפָּרָתִי. הַכֶּסֶף הַזֶה יֵלֵךְ לִצְדָקָה, וַאֲנִי אֵלֵךְ לְחַיִּים טוֹבִים אֲרֻכִּים וּלְשָׁלוֹם.`,
        transliteration: `Zeh chalifati, zeh temurati, zeh kaparati. HaKesef hazeh yelech litzedakah, va'ani elech l'chayim tovim arukim ul'shalom.`,
        english: `This is my substitute, this is my exchange, this is my atonement. This money shall go to charity, and I shall go to a good, long life and peace.`
    },
    'self-pregnant': {
        hebrew: `זֶה חֲלִיפָתִי, זֶה תְּמוּרָתִי, זֶה כַפָּרָתִי. הַכֶּסֶף הַזֶה יֵלֵךְ לִצְדָקָה, וַאֲנִי אֵלֵךְ לְחַיִּים טוֹבִים אֲרֻכִּים וּלְשָׁלוֹם. זֶה חֲלִיפַת הַוָּלָד שֶׁבְּמֵעַי, זֶה תְּמוּרַת הַוָּלָד שֶׁבְּמֵעַי, זֶה כַּפָּרַת הַוָּלָד שֶׁבְּמֵעַי. הַכֶּסֶף הַזֶה יֵלֵךְ לִצְדָקָה, וְהוּא יֵלֵךְ לְחַיִּים טוֹבִים אֲרֻכִּים וּלְשָׁלוֹם.`,
        transliteration: `Zeh chalifati, zeh temurati, zeh kaparati. HaKesef hazeh yelech litzedakah, va'ani elech l'chayim tovim arukim ul'shalom. Zeh chalifat havalad sheb'me'ai, zeh temurat havalad sheb'me'ai, zeh kaparat havalad sheb'me'ai. HaKesef hazeh yelech litzedakah, v'hu yelech l'chayim tovim arukim ul'shalom.`,
        english: `This is my substitute, this is my exchange, this is my atonement. This money shall go to charity, and I shall go to a good, long life and peace. This is the substitute of the child in my womb, this is the exchange of the child in my womb, this is the atonement of the child in my womb. This money shall go to charity, and he/she shall go to a good, long life and peace.`
    },
    'other-male': {
        hebrew: `זֶה חֲלִיפָתוֹ, זֶה תְּמוּרָתוֹ, זֶה כַּפָּרָתוֹ. הַכֶּסֶף הַזֶה יֵלֵךְ לִצְדָקָה, וְהוּא יֵלֵךְ לְחַיִּים טוֹבִים אֲרֻכִּים וּלְשָׁלוֹם.`,
        transliteration: `Zeh chalifato, zeh temurato, zeh kaparato. HaKesef hazeh yelech litzedakah, v'hu yelech l'chayim tovim arukim ul'shalom.`,
        english: `This is his substitute, this is his exchange, this is his atonement. This money shall go to charity, and he shall go to a good, long life and peace.`
    },
    'other-female': {
        hebrew: `זֶה חֲלִיפָתָהּ, זֶה תְּמוּרָתָהּ, זֶה כַּפָּרָתָהּ. הַכֶּסֶף הַזֶה יֵלֵךְ לִצְדָקָה, וְהִיא תֵּלֵךְ לְחַיִּים טוֹבִים אֲרֻכִּים וּלְשָׁלוֹם.`,
        transliteration: `Zeh chalifatah, zeh temuratah, zeh kaparatah. HaKesef hazeh yelech litzedakah, v'hi telech l'chayim tovim arukim ul'shalom.`,
        english: `This is her substitute, this is her exchange, this is her atonement. This money shall go to charity, and she shall go to a good, long life and peace.`
    },
    'other-pregnant': {
        hebrew: `זֶה חֲלִיפָתָהּ, זֶה תְּמוּרָתָהּ, זֶה כַּפָּרָתָהּ. הַכֶּסֶף הַזֶה יֵלֵךְ לִצְדָקָה, וְהִיא תֵּלֵךְ לְחַיִּים טוֹבִים אֲרֻכִּים וּלְשָׁלוֹם. זֶה חֲלִיפַת הַוָּלָד שֶׁבְּמֵעֶיהָ, זֶה תְּמוּרַת הַוָּלָד שֶׁבְּמֵעֶיהָ, זֶה כַּפָּרַת הַוָּלָד שֶׁבְּמֵעֶיהָ. הַכֶּסֶף הַזֶה יֵלֵךְ לִצְדָקָה, וְהוּא יֵלֵךְ לְחַיִּים טוֹבִים אֲרֻכִּים וּלְשָׁלוֹם.`,
        transliteration: `Zeh chalifatah, zeh temuratah, zeh kaparatah. HaKesef hazeh yelech litzedakah, v'hi telech l'chayim tovim arukim ul'shalom. Zeh chalifat havalad sheb'me'eiha, zeh temurat havalad sheb'me'eiha, zeh kaparat havalad sheb'me'eiha. HaKesef hazeh yelech litzedakah, v'hu yelech l'chayim tovim arukim ul'shalom.`,
        english: `This is her substitute, this is her exchange, this is her atonement. This money shall go to charity, and she shall go to a good, long life and peace. This is the substitute of the child in her womb, this is the exchange of the child in her womb, this is the atonement of the child in her womb. This money shall go to charity, and he/she shall go to a good, long life and peace.`
    }
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    // Load donation data and display prayer
    loadPrayerContent();
    
    // Setup toggle buttons
    setupToggleButtons();
    
    // Setup completion checkbox and buttons
    setupCompletionActions();
    
    // Update total amount display
    updateTotalAmount();
}

function loadPrayerContent() {
    // Get donation data
    const donationData = getDonationData();
    
    if (!donationData || !donationData.prayerType) {
        // No data - redirect back to start
        window.location.href = 'index.html';
        return;
    }
    
    // Update summary display
    document.getElementById('performingFor').textContent = getPrayerTypeDisplayName(donationData.prayerType);
    document.getElementById('finalAmount').textContent = donationData.amount;
    
    // Load the appropriate prayer
    const prayer = PRAYERS[donationData.prayerType];
    
    if (prayer) {
        // Insert prayer texts into the page
        document.querySelector('#hebrew-prayer .hebrew-text').textContent = prayer.hebrew;
        document.querySelector('#transliteration-prayer .transliteration-text').textContent = prayer.transliteration;
        document.querySelector('#english-prayer .english-text').textContent = prayer.english;
    } else {
        // Fallback if prayer type not found
        const fallbackText = 'Prayer text not available for this selection.';
        document.querySelector('#hebrew-prayer .hebrew-text').textContent = fallbackText;
        document.querySelector('#transliteration-prayer .transliteration-text').textContent = fallbackText;
        document.querySelector('#english-prayer .english-text').textContent = fallbackText;
    }
}

function setupToggleButtons() {
    const toggleButtons = document.querySelectorAll('.toggle-button');
    const prayerTexts = document.querySelectorAll('.prayer-text');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // Remove active class from all buttons and texts
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            prayerTexts.forEach(text => text.classList.remove('active'));
            
            // Add active class to clicked button and corresponding text
            this.classList.add('active');
            document.getElementById(lang + '-prayer').classList.add('active');
        });
    });
}

function setupCompletionActions() {
    const performAnotherBtn = document.getElementById('performAnother');
    const proceedToDonateBtn = document.getElementById('proceedToDonate');
    
    // Handle "Perform Another Kapparot"
    performAnotherBtn.addEventListener('click', function() {
        // Mark current prayer as completed
        markPrayerCompleted();
        
        // Get session data for email prefilling
        const sessionData = getSessionData();
        const email = sessionData.email || '';
        
        // Redirect back to index with prefilled email
        window.location.href = 'index.html' + (email ? '?email=' + encodeURIComponent(email) : '');
    });
    
    // Handle "Proceed to Donate"
    proceedToDonateBtn.addEventListener('click', function() {
        // Mark current prayer as completed
        markPrayerCompleted();
        
        // Prepare final donation data
        prepareFinalDonation();
        
        // Go to payment page
        window.location.href = 'payment.html';
    });
}

function updateTotalAmount() {
    const sessionData = getSessionData();
    const donationData = getDonationData();
    
    // Calculate total amount
    let totalAmount = sessionData.totalAmount || 0;
    if (totalAmount === 0 && donationData && donationData.amount) {
        totalAmount = parseFloat(donationData.amount);
    }
    
    // Update display
    document.getElementById('totalAmount').textContent = totalAmount.toFixed(2);
}

function markPrayerCompleted() {
    // Get session data
    const sessionData = getSessionData();
    
    // Mark the most recent prayer as completed
    if (sessionData.prayers && sessionData.prayers.length > 0) {
        sessionData.prayers[sessionData.prayers.length - 1].completedAt = new Date().toISOString();
        localStorage.setItem('kapparotSession', JSON.stringify(sessionData));
    }
}

function prepareFinalDonation() {
    const sessionData = getSessionData();
    
    // Create final donation record for payment
    const finalDonationData = {
        prayerType: 'multiple',
        amount: sessionData.totalAmount,
        email: sessionData.email,
        prayers: sessionData.prayers,
        timestamp: new Date().toISOString(),
        transactionId: generateTransactionId()
    };
    
    // Store for payment page
    localStorage.setItem('kapparotDonation', JSON.stringify(finalDonationData));
}

// Utility Functions
function getDonationData() {
    const data = localStorage.getItem('kapparotDonation');
    return data ? JSON.parse(data) : null;
}

function getSessionData() {
    const data = localStorage.getItem('kapparotSession');
    return data ? JSON.parse(data) : {};
}

function generateTransactionId() {
    return 'KAP-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
}

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