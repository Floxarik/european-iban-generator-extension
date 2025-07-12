// European countries with their IBAN formats
const europeanCountries = {
  'AL': { name: 'Albania', length: 28, bbanPattern: '8n16c' },
  'AD': { name: 'Andorra', length: 24, bbanPattern: '8n12c' },
  'AT': { name: 'Austria', length: 20, bbanPattern: '16n' },
  'BY': { name: 'Belarus', length: 28, bbanPattern: '4c4n16c' },
  'BE': { name: 'Belgium', length: 16, bbanPattern: '12n' },
  'BA': { name: 'Bosnia and Herzegovina', length: 20, bbanPattern: '16n' },
  'BG': { name: 'Bulgaria', length: 22, bbanPattern: '4a6n8c' },
  'HR': { name: 'Croatia', length: 21, bbanPattern: '17n' },
  'CY': { name: 'Cyprus', length: 28, bbanPattern: '8n16c' },
  'CZ': { name: 'Czech Republic', length: 24, bbanPattern: '20n' },
  'DK': { name: 'Denmark', length: 18, bbanPattern: '14n' },
  'EE': { name: 'Estonia', length: 20, bbanPattern: '16n' },
  'FO': { name: 'Faroe Islands', length: 18, bbanPattern: '14n' },
  'FI': { name: 'Finland', length: 18, bbanPattern: '14n' },
  'FR': { name: 'France', length: 27, bbanPattern: '10n11c2n' },
  'DE': { name: 'Germany', length: 22, bbanPattern: '18n' },
  'GI': { name: 'Gibraltar', length: 23, bbanPattern: '4a15c' },
  'GR': { name: 'Greece', length: 27, bbanPattern: '7n16c' },
  'GL': { name: 'Greenland', length: 18, bbanPattern: '14n' },
  'HU': { name: 'Hungary', length: 28, bbanPattern: '24n' },
  'IS': { name: 'Iceland', length: 26, bbanPattern: '22n' },
  'IE': { name: 'Ireland', length: 22, bbanPattern: '4a14n' },
  'IT': { name: 'Italy', length: 27, bbanPattern: '1a10n12c' },
  'LV': { name: 'Latvia', length: 21, bbanPattern: '4a13c' },
  'LI': { name: 'Liechtenstein', length: 21, bbanPattern: '5n12c' },
  'LT': { name: 'Lithuania', length: 20, bbanPattern: '16n' },
  'LU': { name: 'Luxembourg', length: 20, bbanPattern: '16n' },
  'MT': { name: 'Malta', length: 31, bbanPattern: '4a5n18c' },
  'MD': { name: 'Moldova', length: 24, bbanPattern: '2c18c' },
  'MC': { name: 'Monaco', length: 27, bbanPattern: '10n11c2n' },
  'ME': { name: 'Montenegro', length: 22, bbanPattern: '18n' },
  'NL': { name: 'Netherlands', length: 18, bbanPattern: '4a10n' },
  'MK': { name: 'North Macedonia', length: 19, bbanPattern: '3n10c2n' },
  'NO': { name: 'Norway', length: 15, bbanPattern: '11n' },
  'PL': { name: 'Poland', length: 28, bbanPattern: '24n' },
  'PT': { name: 'Portugal', length: 25, bbanPattern: '21n' },
  'RO': { name: 'Romania', length: 24, bbanPattern: '4a16c' },
  'SM': { name: 'San Marino', length: 27, bbanPattern: '1a10n12c' },
  'RS': { name: 'Serbia', length: 22, bbanPattern: '18n' },
  'SK': { name: 'Slovakia', length: 24, bbanPattern: '20n' },
  'SI': { name: 'Slovenia', length: 19, bbanPattern: '15n' },
  'ES': { name: 'Spain', length: 24, bbanPattern: '20n' },
  'SE': { name: 'Sweden', length: 24, bbanPattern: '20n' },
  'CH': { name: 'Switzerland', length: 21, bbanPattern: '5n12c' },
  'TR': { name: 'Turkey', length: 26, bbanPattern: '5n17c' },
  'UA': { name: 'Ukraine', length: 29, bbanPattern: '6n19c' },
  'GB': { name: 'United Kingdom', length: 22, bbanPattern: '4a14n' },
  'VA': { name: 'Vatican City', length: 22, bbanPattern: '3n15n' }
};

// Initialize the extension
document.addEventListener('DOMContentLoaded', function() {
  populateCountrySelect();
  setupEventListeners();
  loadLastUsedCountry();
});

function populateCountrySelect() {
  const select = document.getElementById('country');
  select.innerHTML = '';
  
  // Sort countries by name
  const sortedCountries = Object.entries(europeanCountries)
    .sort(([,a], [,b]) => a.name.localeCompare(b.name));
  
  sortedCountries.forEach(([code, country]) => {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = `${country.name} (${code})`;
    select.appendChild(option);
  });
}

function setupEventListeners() {
  const generateBtn = document.getElementById('generate');
  const copyBtn = document.getElementById('copy');
  const countrySelect = document.getElementById('country');
  
  generateBtn.addEventListener('click', generateIBAN);
  copyBtn.addEventListener('click', copyIBAN);
  countrySelect.addEventListener('change', saveCountryPreference);
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'Enter') {
        e.preventDefault();
        generateIBAN();
      }
    }
  });
}

function generateIBAN() {
  const country = document.getElementById('country').value;
  const ibanDisplay = document.getElementById('iban');
  const generateBtn = document.getElementById('generate');
  const copyBtn = document.getElementById('copy');
  
  try {
    const iban = generateRandomIBAN(country);
    ibanDisplay.textContent = iban;
    ibanDisplay.classList.add('generated');
    copyBtn.classList.remove('hidden');
    
    // Show success animation
    generateBtn.classList.add('success');
    setTimeout(() => generateBtn.classList.remove('success'), 1000);
    
  } catch (error) {
    ibanDisplay.textContent = 'Error generating IBAN';
    ibanDisplay.classList.add('error');
    copyBtn.classList.add('hidden');
  }
}

function generateRandomIBAN(countryCode) {
  if (!europeanCountries[countryCode]) {
    throw new Error('Country not supported');
  }

  const { length, bbanPattern } = europeanCountries[countryCode];
  const bban = generateBBAN(bbanPattern);
  const checkDigits = calculateCheckDigits(countryCode, bban);
  return `${countryCode}${checkDigits}${bban}`;
}

function generateBBAN(pattern) {
  const parts = pattern.match(/[0-9]+[a-z]/g);
  let bban = '';
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (let part of parts) {
    const count = parseInt(part.slice(0, -1));
    const type = part.slice(-1);

    for (let i = 0; i < count; i++) {
      if (type === 'n') {
        bban += characters[Math.floor(Math.random() * 10)]; // Numbers only
      } else if (type === 'a') {
        bban += characters[Math.floor(Math.random() * 26) + 10]; // Letters only
      } else if (type === 'c') {
        bban += characters[Math.floor(Math.random() * characters.length)]; // Letters and numbers
      }
    }
  }
  return bban;
}

function calculateCheckDigits(countryCode, bban) {
  const rearranged = bban + countryCode + '00';
  const numericRepresentation = rearranged.split('').map(char => {
    const code = char.charCodeAt(0);
    return (code >= 65 && code <= 90) ? code - 55 : char; // A=10, B=11, ..., Z=35
  }).join('');

  const checksum = 98 - mod97(numericRepresentation);
  return checksum.toString().padStart(2, '0');
}

function mod97(string) {
  let checksum = string.slice(0, 2), fragment;

  for (let offset = 2; offset < string.length; offset += 7) {
    fragment = checksum + string.substring(offset, offset + 7);
    checksum = parseInt(fragment, 10) % 97;
  }
  return checksum;
}

function copyIBAN() {
  const ibanDisplay = document.getElementById('iban');
  const copyBtn = document.getElementById('copy');
  
  if (ibanDisplay.textContent && !ibanDisplay.classList.contains('error')) {
    copyToClipboard(ibanDisplay.textContent);
    
    // Show copy success feedback
    copyBtn.textContent = 'Copied!';
    copyBtn.classList.add('copied');
    setTimeout(() => {
      copyBtn.textContent = 'Copy IBAN';
      copyBtn.classList.remove('copied');
    }, 2000);
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).catch(function(err) {
    // Silent error handling for clipboard operations
  });
}

function saveCountryPreference() {
  const country = document.getElementById('country').value;
  chrome.storage.sync.set({ lastCountry: country });
}

function loadLastUsedCountry() {
  chrome.storage.sync.get(['lastCountry'], function(result) {
    if (result.lastCountry) {
      document.getElementById('country').value = result.lastCountry;
    }
  });
}
  