# European IBAN Generator Extension

A Chrome extension that generates valid IBANs for all European countries. Perfect for QA testing, development, and educational purposes.

## Features

- **Complete European Coverage**: Supports all 44 European countries with valid IBAN formats
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Manual Copy**: Copy generated IBANs to clipboard with dedicated button
- **Country Memory**: Remembers your last selected country
- **Keyboard Shortcuts**: Use Ctrl+Enter to generate IBAN quickly
- **Valid IBANs**: All generated IBANs follow proper validation algorithms

## ⚠️ Important Disclaimer

**This extension is for testing and educational purposes only.**
- Generated IBANs are valid in format but are **NOT real bank accounts**
- Do not use these IBANs for actual financial transactions
- Intended for QA testing, development, and educational purposes

## Supported Countries

The extension supports all European countries including:

- **Western Europe**: France, Germany, Netherlands, Belgium, Luxembourg, Switzerland, Austria, Liechtenstein, Monaco
- **Northern Europe**: Denmark, Finland, Norway, Sweden, Iceland, Faroe Islands, Greenland
- **Southern Europe**: Italy, Spain, Portugal, Greece, Malta, Cyprus, San Marino, Vatican City
- **Eastern Europe**: Poland, Czech Republic, Slovakia, Hungary, Romania, Bulgaria, Croatia, Slovenia, Serbia, Montenegro, Bosnia and Herzegovina, North Macedonia, Albania, Moldova, Ukraine, Belarus
- **British Isles**: United Kingdom, Ireland
- **Others**: Turkey, Gibraltar, Latvia, Lithuania, Estonia

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension icon will appear in your toolbar

## Usage

1. Click the extension icon in your browser toolbar
2. Select a European country from the dropdown
3. Click "Generate IBAN" or press Ctrl+Enter
4. The IBAN will be generated and automatically copied to your clipboard
5. Use the "Copy IBAN" button to copy again if needed

## Technical Details

- **IBAN Validation**: All generated IBANs follow the ISO 13616 standard
- **Check Digit Calculation**: Uses the MOD-97 algorithm for proper validation
- **BBAN Patterns**: Each country uses its specific BBAN (Basic Bank Account Number) format
- **Storage**: Uses Chrome's sync storage to remember user preferences

## File Structure

```
iban-generator-extension/
├── manifest.json          # Extension configuration
├── popup.html            # Main popup interface
├── popup.js              # Core functionality and country data
├── style.css             # Modern styling and animations
├── privacy.html          # Privacy policy page
├── icons/                # Extension icons (16px, 32px, 48px, 128px)
├── fontawesome/          # Local Font Awesome files
│   ├── css/all.min.css   # Font Awesome styles
│   └── webfonts/         # Font Awesome fonts
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## Development

The extension is built with:
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with gradients and animations
- **JavaScript**: ES6+ features and Chrome Extension APIs
- **Font Awesome**: Icons for better UX (loaded from CDN)

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License. 