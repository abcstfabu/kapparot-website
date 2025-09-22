# Kapparot Online - Digital Tzedakah Website

A respectful and modern web application that allows Jewish individuals to perform the Kapparot ritual through charitable giving, following the contemporary practice of using money instead of chickens.

## About Kapparot

Kapparot is a Jewish ritual performed before Yom Kippur (Day of Atonement) where individuals symbolically transfer their sins through charitable giving. This modern interpretation replaces the traditional animal offering with monetary donations to charity, embodying the spirit of tzedakah (charitable giving).

## Website Features

### 🏠 Landing Page (`index.html`)
- Secure donation form with card payment details
- Pre-set donation amounts ($18, $36, $54, $72) based on Jewish numerology
- Custom donation amount option
- Full billing information collection
- Form validation and security messaging

### 🙏 Prayer Selection (`prayer-selection.html`)
- Choose appropriate prayer based on who is performing Kapparot:
  - Male Adult
  - Female Adult
  - Male Child
  - Female Child
  - Entire Family
  - Pregnant Woman
- Option to enter Hebrew or English names
- Donation summary display

### 📿 Prayer Display (`prayer-display.html`)
- Authentic Hebrew prayers with proper formatting
- Transliteration for pronunciation
- English translations
- Step-by-step ritual instructions
- Interactive completion confirmation

### ✅ Completion Page (`completion.html`)
- Donation confirmation and transaction details
- Traditional Hebrew blessing
- Downloadable receipt
- Information about charitable distribution
- Option to perform another Kapparot

## Technical Features

- **Responsive Design**: Works on all devices (mobile, tablet, desktop)
- **Hebrew Typography**: Proper Hebrew font support and right-to-left text
- **Local Storage**: Secure data persistence across pages
- **Form Validation**: Comprehensive input validation
- **Receipt Generation**: Automatic receipt creation and download
- **Modern UI**: Clean, respectful design with gradients and smooth animations

## File Structure

```
├── index.html              # Landing page with donation form
├── prayer-selection.html   # Prayer type selection
├── prayer-display.html     # Prayer recitation page
├── completion.html         # Completion and thank you page
├── styles.css             # Complete CSS styling
├── script.js              # Landing page JavaScript
├── prayer-selection.js    # Prayer selection JavaScript
├── prayer-display.js      # Prayer display JavaScript
├── completion.js          # Completion page JavaScript
└── README.md             # This documentation
```

## How to Use

1. **Open `index.html`** in a web browser
2. **Enter donation details** including payment information
3. **Select prayer type** based on who is performing Kapparot
4. **Follow ritual instructions** and recite the provided prayers
5. **Complete the process** and receive confirmation

## Payment Integration

**Note**: This is a demonstration website. The payment form collects information but does not process actual transactions. To make this production-ready, you would need to:

- Integrate with a payment processor (Stripe, PayPal, etc.)
- Add server-side processing
- Implement proper security measures
- Connect to actual charitable organizations

## Religious Authenticity

The prayers and ritual instructions are based on traditional Jewish sources and have been formatted respectfully. The Hebrew text includes proper vowelization and the English translations maintain the spiritual significance of the original prayers.

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Android Chrome)
- Requires JavaScript enabled

## Security Note

This demonstration stores data in browser localStorage. For production use, implement proper server-side security, HTTPS encryption, and PCI compliance for payment processing.

---

**G'mar Chatimah Tovah** - May you be sealed for good in the Book of Life
