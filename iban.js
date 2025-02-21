function generateRandomIBAN(countryCode) {
    const countryData = {
      'PL': { length: 28, bbanPattern: '24n' }, // Poland
      'AT': { length: 20, bbanPattern: '16n' }, // Austria
      'DE': { length: 22, bbanPattern: '18n' }, // Germany
      'BE': { length: 16, bbanPattern: '12n' }, // Belgium
      'NL': { length: 18, bbanPattern: '4a10n' }, // Netherlands
      'CZ': { length: 24, bbanPattern: '20n' }, // Czech Republic
      'FR': { length: 27, bbanPattern: '10n11c2n' }, // France
      'HU': { length: 28, bbanPattern: '24n' }, // Hungary
      'LU': { length: 20, bbanPattern: '16n' }, // Luxembourg
      'CH': { length: 21, bbanPattern: '5n12c' }, // Switzerland
      'SK': { length: 24, bbanPattern: '20n' } // Slovakia
    };
  
    if (!countryData[countryCode]) {
      throw new Error('Country not supported');
    }
  
    const { length, bbanPattern } = countryData[countryCode];
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
  