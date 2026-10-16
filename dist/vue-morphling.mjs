/*! vue-morphling v1.2.1 | MIT */
import { format } from 'date-fns';
import filesize from 'filesize';
import bytes from 'utf8-length';

const age = (Vue) => {
  Vue.filter('morph-age', (value) => {
    if (!value) return;
    return calculateAge(value);
  });

  Vue.prototype.$morphAge = (value) => {
    return calculateAge(value);
  };

  function calculateAge (date) {
    const dateLeft = new Date();
    const dateRight = date instanceof Date ? date : new Date(date);
    return dateLeft.getFullYear() - dateRight.getFullYear();
  }
};

const arrReverse = (Vue) => {
  Vue.filter('morph-arr-reverse', (value) => {
    if (!value) return;
    return reverse(value);
  });

  Vue.prototype.$morphArrReverse = (value) => {
    return reverse(value);
  };

  function reverse (value) {
    if (!Array.isArray(value)) { console.warn('arg should be array'); }

    const arr = value.reverse();
    return arr;
  }
};

const arrSort = (Vue) => {
  Vue.filter('morph-arr-sort', (value, key, direction) => {
    if (!value) return;
    return sort(value, key, direction);
  });

  Vue.prototype.$morphArrSort = (value, key, direction) => {
    return sort(value, key, direction);
  };

  function sort (value, key, direction) {
    if (!Array.isArray(value)) { console.warn('First argument should be an array'); }

    if (direction === 'asc') {
      const arr = value.sort((a, b) => a[key] - b[key]);
      return arr;
    }

    if (direction === 'desc') {
      const arr = value.sort((a, b) => b[key] - a[key]);
      return arr;
    }
  }
};

const capitalize = (Vue) => {
  Vue.filter('morph-capitalize', (value) => {
    if (!value) return;
    return capitalize(value);
  });

  Vue.prototype.$morphCapitalize = (value) => {
    return capitalize(value);
  };

  function capitalize (value) {
    if (typeof value !== 'string') value = value.toString();
    return `${value.charAt(0).toUpperCase()}${value.substring(1)}`;
  }
};

const chop = (Vue) => {
  Vue.filter('morph-chop', (value, length, location) => {
    if (!value) return;
    return chop(value, length, location);
  });

  Vue.prototype.$morphChop = (value, length, location) => {
    return chop(value, length, location);
  };

  function chop (value, length, location) {
    if (!length) return 'Warn: option length (number) is required. morph-chop(length, location)';
    if (!location) location = 'end';
    if (typeof value !== 'string') value = value.toString();
    if (location === 'end') { return value.toString().slice(0, ~length + 1); }
    if (location === 'start') { return value.toString().substring(length); }
  }
};

var currencies = [
  {
    code: 'AED',
    decimals: 2,
    name: 'United Arab Emirates dirham',
    number: 'United Arab Emirates dirham',
    symbol: 'AED',
    text: 'AED'
  },
  {
    code: 'AFN',
    decimals: 2,
    name: 'Afghan afghani',
    number: 'Afghan afghani',
    symbol: '؋',
    text: 'AFN'
  },
  {
    code: 'ALL',
    decimals: 2,
    name: 'Albanian lek',
    number: 'Albanian lek',
    symbol: 'L',
    text: 'ALL'
  },
  {
    code: 'AMD',
    decimals: 2,
    name: 'Armenian dram',
    number: 'Armenian dram',
    symbol: 'AMD',
    text: 'AMD'
  },
  {
    code: 'ANG',
    decimals: 2,
    name: 'Netherlands Antillean guilder',
    number: 'Netherlands Antillean guilder',
    symbol: 'ƒ',
    text: 'ANG'
  },
  {
    code: 'AOA',
    decimals: 2,
    name: 'Angolan kwanza',
    number: 'Angolan kwanza',
    symbol: 'AOA',
    text: 'AOA'
  },
  {
    code: 'ARS',
    decimals: 2,
    name: 'Argentine peso',
    number: 'Argentine peso',
    symbol: '$',
    text: 'ARS'
  },
  {
    code: 'AUD',
    decimals: 2,
    name: 'Australian dollar',
    number: 'Australian dollar',
    symbol: '$',
    text: 'AUD'
  },
  {
    code: 'AWG',
    decimals: 2,
    name: 'Aruban florin',
    number: 'Aruban florin',
    symbol: 'ƒ',
    text: 'AWG'
  },
  {
    code: 'AZN',
    decimals: 2,
    name: 'Azerbaijani manat',
    number: 'Azerbaijani manat',
    symbol: '₼',
    text: 'AZN'
  },
  {
    code: 'BAM',
    decimals: 2,
    name: 'Bosnia and Herzegovina convertible mark',
    number: 'Bosnia and Herzegovina convertible mark',
    symbol: 'KM',
    text: 'BAM'
  },
  {
    code: 'BBD',
    decimals: 2,
    name: 'Barbados dollar',
    number: 'Barbados dollar',
    symbol: '$',
    text: 'BBD'
  },
  {
    code: 'BDT',
    decimals: 2,
    name: 'Bangladeshi taka',
    number: 'Bangladeshi taka',
    symbol: 'BDT',
    text: 'BDT'
  },
  {
    code: 'BGN',
    decimals: 2,
    name: 'Bulgarian lev',
    number: 'Bulgarian lev',
    symbol: 'лв',
    text: 'BGN'
  },
  {
    code: 'BHD',
    decimals: 3,
    name: 'Bahraini dinar',
    number: 'Bahraini dinar',
    symbol: 'BHD',
    text: 'BHD'
  },
  {
    code: 'BIF',
    decimals: 0,
    name: 'Burundian franc',
    number: 'Burundian franc',
    symbol: 'BIF',
    text: 'BIF'
  },
  {
    code: 'BMD',
    decimals: 2,
    name: 'Bermudian dollar (customarily known as Bermuda dollar)',
    number: 'Bermudian dollar (customarily known as Bermuda dollar)',
    symbol: '$',
    text: 'BMD'
  },
  {
    code: 'BND',
    decimals: 2,
    name: 'Brunei dollar',
    number: 'Brunei dollar',
    symbol: '$',
    text: 'BND'
  },
  {
    code: 'BOB',
    decimals: 2,
    name: 'Boliviano',
    number: 'Boliviano',
    symbol: 'Bs.',
    text: 'BOB'
  },
  {
    code: 'BOV',
    decimals: 2,
    name: 'Bolivian Mvdol (funds code)',
    number: 'Bolivian Mvdol (funds code)',
    symbol: 'BOV',
    text: 'BOV'
  },
  {
    code: 'BRL',
    decimals: 2,
    name: 'Brazilian real',
    number: 'Brazilian real',
    symbol: 'R$',
    text: 'BRL'
  },
  {
    code: 'BSD',
    decimals: 2,
    name: 'Bahamian dollar',
    number: 'Bahamian dollar',
    symbol: '$',
    text: 'BSD'
  },
  {
    code: 'BTN',
    decimals: 2,
    name: 'Bhutanese ngultrum',
    number: 'Bhutanese ngultrum',
    symbol: 'BTN',
    text: 'BTN'
  },
  {
    code: 'BWP',
    decimals: 2,
    name: 'Botswana pula',
    number: 'Botswana pula',
    symbol: 'P',
    text: 'BWP'
  },
  {
    code: 'BYR',
    decimals: 0,
    name: 'Belarusian ruble',
    number: 'Belarusian ruble',
    symbol: 'p.',
    text: 'BYR'
  },
  {
    code: 'BZD',
    decimals: 2,
    name: 'Belize dollar',
    number: 'Belize dollar',
    symbol: 'BZ$',
    text: 'BZD'
  },
  {
    code: 'CAD',
    decimals: 2,
    name: 'Canadian dollar',
    number: 'Canadian dollar',
    symbol: '$',
    text: 'CAD'
  },
  {
    code: 'CDF',
    decimals: 2,
    name: 'Congolese franc',
    number: 'Congolese franc',
    symbol: 'CDF',
    text: 'CDF'
  },
  {
    code: 'CHE',
    decimals: 2,
    name: 'WIR Euro (complementary currency)',
    number: 'WIR Euro (complementary currency)',
    symbol: 'CHE',
    text: 'CHE'
  },
  {
    code: 'CHF',
    decimals: 2,
    name: 'Swiss franc',
    number: 'Swiss franc',
    symbol: 'CHF',
    text: 'CHF'
  },
  {
    code: 'CHW',
    decimals: 2,
    name: 'WIR Franc (complementary currency)',
    number: 'WIR Franc (complementary currency)',
    symbol: 'CHW',
    text: 'CHW'
  },
  {
    code: 'CLF',
    decimals: 0,
    name: 'Unidad de Fomento (funds code)',
    number: 'Unidad de Fomento (funds code)',
    symbol: 'CLF',
    text: 'CLF'
  },
  {
    code: 'CLP',
    decimals: 0,
    name: 'Chilean peso',
    number: 'Chilean peso',
    symbol: '$',
    text: 'CLP'
  },
  {
    code: 'CNY',
    decimals: 2,
    name: 'Chinese yuan',
    number: 'Chinese yuan',
    symbol: '¥',
    text: 'CNY'
  },
  {
    code: 'COP',
    decimals: 2,
    name: 'Colombian peso',
    number: 'Colombian peso',
    symbol: '$',
    text: 'COP'
  },
  {
    code: 'COU',
    decimals: 2,
    name: 'Unidad de Valor Real',
    number: 'Unidad de Valor Real',
    symbol: 'COU',
    text: 'COU'
  },
  {
    code: 'CRC',
    decimals: 2,
    name: 'Costa Rican colon',
    number: 'Costa Rican colon',
    symbol: '₡',
    text: 'CRC'
  },
  {
    code: 'CUC',
    decimals: 2,
    name: 'Cuban convertible peso',
    number: 'Cuban convertible peso',
    symbol: 'CUC',
    text: 'CUC'
  },
  {
    code: 'CUP',
    decimals: 2,
    name: 'Cuban peso',
    number: 'Cuban peso',
    symbol: '₱',
    text: 'CUP'
  },
  {
    code: 'CVE',
    decimals: 0,
    name: 'Cape Verde escudo',
    number: 'Cape Verde escudo',
    symbol: 'CVE',
    text: 'CVE'
  },
  {
    code: 'CZK',
    decimals: 2,
    name: 'Czech koruna',
    number: 'Czech koruna',
    symbol: 'Kč',
    text: 'CZK'
  },
  {
    code: 'DJF',
    decimals: 0,
    name: 'Djiboutian franc',
    number: 'Djiboutian franc',
    symbol: 'DJF',
    text: 'DJF'
  },
  {
    code: 'DKK',
    decimals: 2,
    name: 'Danish krone',
    number: 'Danish krone',
    symbol: 'kr',
    text: 'DKK'
  },
  {
    code: 'DOP',
    decimals: 2,
    name: 'Dominican peso',
    number: 'Dominican peso',
    symbol: 'RD$',
    text: 'DOP'
  },
  {
    code: 'DZD',
    decimals: 2,
    name: 'Algerian dinar',
    number: 'Algerian dinar',
    symbol: 'DZD',
    text: 'DZD'
  },
  {
    code: 'EGP',
    decimals: 2,
    name: 'Egyptian pound',
    number: 'Egyptian pound',
    symbol: '£',
    text: 'EGP'
  },
  {
    code: 'ERN',
    decimals: 2,
    name: 'Eritrean nakfa',
    number: 'Eritrean nakfa',
    symbol: 'ERN',
    text: 'ERN'
  },
  {
    code: 'ETB',
    decimals: 2,
    name: 'Ethiopian birr',
    number: 'Ethiopian birr',
    symbol: 'ETB',
    text: 'ETB'
  },
  {
    code: 'EUR',
    decimals: 2,
    name: 'Euro',
    number: 'Euro',
    symbol: '€',
    text: 'EUR'
  },
  {
    code: 'FJD',
    decimals: 2,
    name: 'Fiji dollar',
    number: 'Fiji dollar',
    symbol: '$',
    text: 'FJD'
  },
  {
    code: 'FKP',
    decimals: 2,
    name: 'Falkland Islands pound',
    number: 'Falkland Islands pound',
    symbol: '£',
    text: 'FKP'
  },
  {
    code: 'GBP',
    decimals: 2,
    name: 'Pound sterling',
    number: 'Pound sterling',
    symbol: '£',
    text: 'GBP'
  },
  {
    code: 'GEL',
    decimals: 2,
    name: 'Georgian lari',
    number: 'Georgian lari',
    symbol: 'GEL',
    text: 'GEL'
  },
  {
    code: 'GHS',
    decimals: 2,
    name: 'Ghanaian cedi',
    number: 'Ghanaian cedi',
    symbol: 'GHS',
    text: 'GHS'
  },
  {
    code: 'GIP',
    decimals: 2,
    name: 'Gibraltar pound',
    number: 'Gibraltar pound',
    symbol: '£',
    text: 'GIP'
  },
  {
    code: 'GMD',
    decimals: 2,
    name: 'Gambian dalasi',
    number: 'Gambian dalasi',
    symbol: 'GMD',
    text: 'GMD'
  },
  {
    code: 'GNF',
    decimals: 0,
    name: 'Guinean franc',
    number: 'Guinean franc',
    symbol: 'GNF',
    text: 'GNF'
  },
  {
    code: 'GTQ',
    decimals: 2,
    name: 'Guatemalan quetzal',
    number: 'Guatemalan quetzal',
    symbol: 'Q',
    text: 'GTQ'
  },
  {
    code: 'GYD',
    decimals: 2,
    name: 'Guyanese dollar',
    number: 'Guyanese dollar',
    symbol: '$',
    text: 'GYD'
  },
  {
    code: 'HKD',
    decimals: 2,
    name: 'Hong Kong dollar',
    number: 'Hong Kong dollar',
    symbol: '$',
    text: 'HKD'
  },
  {
    code: 'HNL',
    decimals: 2,
    name: 'Honduran lempira',
    number: 'Honduran lempira',
    symbol: 'L',
    text: 'HNL'
  },
  {
    code: 'HRK',
    decimals: 2,
    name: 'Croatian kuna',
    number: 'Croatian kuna',
    symbol: 'kn',
    text: 'HRK'
  },
  {
    code: 'HTG',
    decimals: 2,
    name: 'Haitian gourde',
    number: 'Haitian gourde',
    symbol: 'HTG',
    text: 'HTG'
  },
  {
    code: 'HUF',
    decimals: 2,
    name: 'Hungarian forint',
    number: 'Hungarian forint',
    symbol: 'Ft',
    text: 'HUF'
  },
  {
    code: 'IDR',
    decimals: 2,
    name: 'Indonesian rupiah',
    number: 'Indonesian rupiah',
    symbol: 'Rp',
    text: 'IDR'
  },
  {
    code: 'ILS',
    decimals: 2,
    name: 'Israeli new shekel',
    number: 'Israeli new shekel',
    symbol: '₪',
    text: 'ILS'
  },
  {
    code: 'INR',
    decimals: 2,
    name: 'Indian rupee',
    number: 'Indian rupee',
    symbol: '₹',
    text: 'INR'
  },
  {
    code: 'IQD',
    decimals: 3,
    name: 'Iraqi dinar',
    number: 'Iraqi dinar',
    symbol: 'IQD',
    text: 'IQD'
  },
  {
    code: 'IRR',
    decimals: 0,
    name: 'Iranian rial',
    number: 'Iranian rial',
    symbol: '﷼',
    text: 'IRR'
  },
  {
    code: 'ISK',
    decimals: 0,
    name: 'Icelandic króna',
    number: 'Icelandic króna',
    symbol: 'kr',
    text: 'ISK'
  },
  {
    code: 'JMD',
    decimals: 2,
    name: 'Jamaican dollar',
    number: 'Jamaican dollar',
    symbol: 'J$',
    text: 'JMD'
  },
  {
    code: 'JOD',
    decimals: 3,
    name: 'Jordanian dinar',
    number: 'Jordanian dinar',
    symbol: 'JOD',
    text: 'JOD'
  },
  {
    code: 'JPY',
    decimals: 0,
    name: 'Japanese yen',
    number: 'Japanese yen',
    symbol: '¥',
    text: 'JPY'
  },
  {
    code: 'KES',
    decimals: 2,
    name: 'Kenyan shilling',
    number: 'Kenyan shilling',
    symbol: 'KSh',
    text: 'KES'
  },
  {
    code: 'KGS',
    decimals: 2,
    name: 'Kyrgyzstani som',
    number: 'Kyrgyzstani som',
    symbol: 'лв',
    text: 'KGS'
  },
  {
    code: 'KHR',
    decimals: 2,
    name: 'Cambodian riel',
    number: 'Cambodian riel',
    symbol: '៛',
    text: 'KHR'
  },
  {
    code: 'KMF',
    decimals: 0,
    name: 'Comoro franc',
    number: 'Comoro franc',
    symbol: 'KMF',
    text: 'KMF'
  },
  {
    code: 'KPW',
    decimals: 0,
    name: 'North Korean won',
    number: 'North Korean won',
    symbol: '₩',
    text: 'KPW'
  },
  {
    code: 'KRW',
    decimals: 0,
    name: 'South Korean won',
    number: 'South Korean won',
    symbol: '₩',
    text: 'KRW'
  },
  {
    code: 'KWD',
    decimals: 3,
    name: 'Kuwaiti dinar',
    number: 'Kuwaiti dinar',
    symbol: 'KWD',
    text: 'KWD'
  },
  {
    code: 'KYD',
    decimals: 2,
    name: 'Cayman Islands dollar',
    number: 'Cayman Islands dollar',
    symbol: '$',
    text: 'KYD'
  },
  {
    code: 'KZT',
    decimals: 2,
    name: 'Kazakhstani tenge',
    number: 'Kazakhstani tenge',
    symbol: 'лв',
    text: 'KZT'
  },
  {
    code: 'LAK',
    decimals: 0,
    name: 'Lao kip',
    number: 'Lao kip',
    symbol: '₭',
    text: 'LAK'
  },
  {
    code: 'LBP',
    decimals: 0,
    name: 'Lebanese pound',
    number: 'Lebanese pound',
    symbol: '£',
    text: 'LBP'
  },
  {
    code: 'LKR',
    decimals: 2,
    name: 'Sri Lankan rupee',
    number: 'Sri Lankan rupee',
    symbol: '₨',
    text: 'LKR'
  },
  {
    code: 'LRD',
    decimals: 2,
    name: 'Liberian dollar',
    number: 'Liberian dollar',
    symbol: '$',
    text: 'LRD'
  },
  {
    code: 'LSL',
    decimals: 2,
    name: 'Lesotho loti',
    number: 'Lesotho loti',
    symbol: 'LSL',
    text: 'LSL'
  },
  {
    code: 'LTL',
    decimals: 2,
    name: 'Lithuanian litas',
    number: 'Lithuanian litas',
    symbol: 'Lt',
    text: 'LTL'
  },
  {
    code: 'LVL',
    decimals: 2,
    name: 'Latvian lats',
    number: 'Latvian lats',
    symbol: 'Ls',
    text: 'LVL'
  },
  {
    code: 'LYD',
    decimals: 3,
    name: 'Libyan dinar',
    number: 'Libyan dinar',
    symbol: 'LYD',
    text: 'LYD'
  },
  {
    code: 'MAD',
    decimals: 2,
    name: 'Moroccan dirham',
    number: 'Moroccan dirham',
    symbol: 'MAD',
    text: 'MAD'
  },
  {
    code: 'MDL',
    decimals: 2,
    name: 'Moldovan leu',
    number: 'Moldovan leu',
    symbol: 'MDL',
    text: 'MDL'
  },
  {
    code: 'MGA',
    decimals: 0,
    name: 'Malagasy ariary',
    number: 'Malagasy ariary',
    symbol: 'MGA',
    text: 'MGA'
  },
  {
    code: 'MKD',
    decimals: 0,
    name: 'Macedonian denar',
    number: 'Macedonian denar',
    symbol: 'ден',
    text: 'MKD'
  },
  {
    code: 'MMK',
    decimals: 0,
    name: 'Myanma kyat',
    number: 'Myanma kyat',
    symbol: 'MMK',
    text: 'MMK'
  },
  {
    code: 'MNT',
    decimals: 2,
    name: 'Mongolian tugrik',
    number: 'Mongolian tugrik',
    symbol: '₮',
    text: 'MNT'
  },
  {
    code: 'MOP',
    decimals: 2,
    name: 'Macanese pataca',
    number: 'Macanese pataca',
    symbol: 'MOP',
    text: 'MOP'
  },
  {
    code: 'MRO',
    decimals: 0,
    name: 'Mauritanian ouguiya',
    number: 'Mauritanian ouguiya',
    symbol: 'MRO',
    text: 'MRO'
  },
  {
    code: 'MUR',
    decimals: 2,
    name: 'Mauritian rupee',
    number: 'Mauritian rupee',
    symbol: '₨',
    text: 'MUR'
  },
  {
    code: 'MVR',
    decimals: 2,
    name: 'Maldivian rufiyaa',
    number: 'Maldivian rufiyaa',
    symbol: 'MVR',
    text: 'MVR'
  },
  {
    code: 'MWK',
    decimals: 2,
    name: 'Malawian kwacha',
    number: 'Malawian kwacha',
    symbol: 'MWK',
    text: 'MWK'
  },
  {
    code: 'MXN',
    decimals: 2,
    name: 'Mexican peso',
    number: 'Mexican peso',
    symbol: '$',
    text: 'MXN'
  },
  {
    code: 'MXV',
    decimals: 2,
    name: 'Mexican Unidad de Inversion (UDI) (funds code)',
    number: 'Mexican Unidad de Inversion (UDI) (funds code)',
    symbol: 'MXV',
    text: 'MXV'
  },
  {
    code: 'MYR',
    decimals: 2,
    name: 'Malaysian ringgit',
    number: 'Malaysian ringgit',
    symbol: 'RM',
    text: 'MYR'
  },
  {
    code: 'MZN',
    decimals: 2,
    name: 'Mozambican metical',
    number: 'Mozambican metical',
    symbol: 'MT',
    text: 'MZN'
  },
  {
    code: 'NAD',
    decimals: 2,
    name: 'Namibian dollar',
    number: 'Namibian dollar',
    symbol: '$',
    text: 'NAD'
  },
  {
    code: 'NGN',
    decimals: 2,
    name: 'Nigerian naira',
    number: 'Nigerian naira',
    symbol: '₦',
    text: 'NGN'
  },
  {
    code: 'NIO',
    decimals: 2,
    name: 'Nicaraguan córdoba',
    number: 'Nicaraguan córdoba',
    symbol: 'C$',
    text: 'NIO'
  },
  {
    code: 'NOK',
    decimals: 2,
    name: 'Norwegian krone',
    number: 'Norwegian krone',
    symbol: 'kr',
    text: 'NOK'
  },
  {
    code: 'NPR',
    decimals: 2,
    name: 'Nepalese rupee',
    number: 'Nepalese rupee',
    symbol: '₨',
    text: 'NPR'
  },
  {
    code: 'NZD',
    decimals: 2,
    name: 'New Zealand dollar',
    number: 'New Zealand dollar',
    symbol: '$',
    text: 'NZD'
  },
  {
    code: 'OMR',
    decimals: 3,
    name: 'Omani rial',
    number: 'Omani rial',
    symbol: '﷼',
    text: 'OMR'
  },
  {
    code: 'PAB',
    decimals: 2,
    name: 'Panamanian balboa',
    number: 'Panamanian balboa',
    symbol: 'B/.',
    text: 'PAB'
  },
  {
    code: 'PEN',
    decimals: 2,
    name: 'Peruvian nuevo sol',
    number: 'Peruvian nuevo sol',
    symbol: 'S/.',
    text: 'PEN'
  },
  {
    code: 'PGK',
    decimals: 2,
    name: 'Papua New Guinean kina',
    number: 'Papua New Guinean kina',
    symbol: 'PGK',
    text: 'PGK'
  },
  {
    code: 'PHP',
    decimals: 2,
    name: 'Philippine peso',
    number: 'Philippine peso',
    symbol: '₱',
    text: 'PHP'
  },
  {
    code: 'PKR',
    decimals: 2,
    name: 'Pakistani rupee',
    number: 'Pakistani rupee',
    symbol: '₨',
    text: 'PKR'
  },
  {
    code: 'PLN',
    decimals: 2,
    name: 'Polish złoty',
    number: 'Polish złoty',
    symbol: 'zł',
    text: 'PLN'
  },
  {
    code: 'PYG',
    decimals: 0,
    name: 'Paraguayan guaraní',
    number: 'Paraguayan guaraní',
    symbol: 'Gs',
    text: 'PYG'
  },
  {
    code: 'QAR',
    decimals: 2,
    name: 'Qatari riyal',
    number: 'Qatari riyal',
    symbol: '﷼',
    text: 'QAR'
  },
  {
    code: 'RON',
    decimals: 2,
    name: 'Romanian new leu',
    number: 'Romanian new leu',
    symbol: 'lei',
    text: 'RON'
  },
  {
    code: 'RSD',
    decimals: 2,
    name: 'Serbian dinar',
    number: 'Serbian dinar',
    symbol: 'Дин.',
    text: 'RSD'
  },
  {
    code: 'RUB',
    decimals: 2,
    name: 'Russian rouble',
    number: 'Russian rouble',
    symbol: '₽',
    text: 'RUB'
  },
  {
    code: 'RWF',
    decimals: 0,
    name: 'Rwandan franc',
    number: 'Rwandan franc',
    symbol: 'RWF',
    text: 'RWF'
  },
  {
    code: 'SAR',
    decimals: 2,
    name: 'Saudi riyal',
    number: 'Saudi riyal',
    symbol: '﷼',
    text: 'SAR'
  },
  {
    code: 'SBD',
    decimals: 2,
    name: 'Solomon Islands dollar',
    number: 'Solomon Islands dollar',
    symbol: '$',
    text: 'SBD'
  },
  {
    code: 'SCR',
    decimals: 2,
    name: 'Seychelles rupee',
    number: 'Seychelles rupee',
    symbol: '₨',
    text: 'SCR'
  },
  {
    code: 'SDG',
    decimals: 2,
    name: 'Sudanese pound',
    number: 'Sudanese pound',
    symbol: 'SDG',
    text: 'SDG'
  },
  {
    code: 'SEK',
    decimals: 2,
    name: 'Swedish krona/kronor',
    number: 'Swedish krona/kronor',
    symbol: 'kr',
    text: 'SEK'
  },
  {
    code: 'SGD',
    decimals: 2,
    name: 'Singapore dollar',
    number: 'Singapore dollar',
    symbol: '$',
    text: 'SGD'
  },
  {
    code: 'SHP',
    decimals: 2,
    name: 'Saint Helena pound',
    number: 'Saint Helena pound',
    symbol: '£',
    text: 'SHP'
  },
  {
    code: 'SLL',
    decimals: 0,
    name: 'Sierra Leonean leone',
    number: 'Sierra Leonean leone',
    symbol: 'SLL',
    text: 'SLL'
  },
  {
    code: 'SOS',
    decimals: 2,
    name: 'Somali shilling',
    number: 'Somali shilling',
    symbol: 'S',
    text: 'SOS'
  },
  {
    code: 'SRD',
    decimals: 2,
    name: 'Surinamese dollar',
    number: 'Surinamese dollar',
    symbol: '$',
    text: 'SRD'
  },
  {
    code: 'SSP',
    decimals: 2,
    name: 'South Sudanese pound',
    number: 'South Sudanese pound',
    symbol: 'SSP',
    text: 'SSP'
  },
  {
    code: 'STD',
    decimals: 0,
    name: 'São Tomé and Príncipe dobra',
    number: 'São Tomé and Príncipe dobra',
    symbol: 'STD',
    text: 'STD'
  },
  {
    code: 'SYP',
    decimals: 2,
    name: 'Syrian pound',
    number: 'Syrian pound',
    symbol: '£',
    text: 'SYP'
  },
  {
    code: 'SZL',
    decimals: 2,
    name: 'Swazi lilangeni',
    number: 'Swazi lilangeni',
    symbol: 'SZL',
    text: 'SZL'
  },
  {
    code: 'THB',
    decimals: 2,
    name: 'Thai baht',
    number: 'Thai baht',
    symbol: '฿',
    text: 'THB'
  },
  {
    code: 'TJS',
    decimals: 2,
    name: 'Tajikistani somoni',
    number: 'Tajikistani somoni',
    symbol: 'TJS',
    text: 'TJS'
  },
  {
    code: 'TMT',
    decimals: 2,
    name: 'Turkmenistani manat',
    number: 'Turkmenistani manat',
    symbol: 'TMT',
    text: 'TMT'
  },
  {
    code: 'TND',
    decimals: 3,
    name: 'Tunisian dinar',
    number: 'Tunisian dinar',
    symbol: 'TND',
    text: 'TND'
  },
  {
    code: 'TOP',
    decimals: 2,
    name: 'Tongan paʻanga',
    number: 'Tongan paʻanga',
    symbol: 'TOP',
    text: 'TOP'
  },
  {
    code: 'TRY',
    decimals: 2,
    name: 'Turkish lira',
    number: 'Turkish lira',
    symbol: '',
    text: 'TRY'
  },
  {
    code: 'TTD',
    decimals: 2,
    name: 'Trinidad and Tobago dollar',
    number: 'Trinidad and Tobago dollar',
    symbol: 'TT$',
    text: 'TTD'
  },
  {
    code: 'TWD',
    decimals: 2,
    name: 'New Taiwan dollar',
    number: 'New Taiwan dollar',
    symbol: 'NT$',
    text: 'TWD'
  },
  {
    code: 'TZS',
    decimals: 2,
    name: 'Tanzanian shilling',
    number: 'Tanzanian shilling',
    symbol: 'TSh',
    text: 'TZS'
  },
  {
    code: 'UAH',
    decimals: 2,
    name: 'Ukrainian hryvnia',
    number: 'Ukrainian hryvnia',
    symbol: '₴',
    text: 'UAH'
  },
  {
    code: 'UGX',
    decimals: 2,
    name: 'Ugandan shilling',
    number: 'Ugandan shilling',
    symbol: 'USh',
    text: 'UGX'
  },
  {
    code: 'USD',
    decimals: 2,
    name: 'United States dollar',
    number: 'United States dollar',
    symbol: '$',
    text: 'USD'
  },
  {
    code: 'USN',
    decimals: 2,
    name: 'United States dollar (next day) (funds code)',
    number: 'United States dollar (next day) (funds code)',
    symbol: 'USN',
    text: 'USN'
  },
  {
    code: 'USS',
    decimals: 2,
    name: 'United States dollar (same day) (funds code) (one source[who?] claims it is no longer used, but it is still on the ISO 4217-MA list)',
    number: 'United States dollar (same day) (funds code) (one source[who?] claims it is no longer used, but it is still on the ISO 4217-MA list)',
    symbol: 'USS',
    text: 'USS'
  },
  {
    code: 'UYI',
    decimals: 0,
    name: 'Uruguay Peso en Unidades Indexadas (URUIURUI) (funds code)',
    number: 'Uruguay Peso en Unidades Indexadas (URUIURUI) (funds code)',
    symbol: 'UYI',
    text: 'UYI'
  },
  {
    code: 'UYU',
    decimals: 2,
    name: 'Uruguayan peso',
    number: 'Uruguayan peso',
    symbol: '$U',
    text: 'UYU'
  },
  {
    code: 'UZS',
    decimals: 2,
    name: 'Uzbekistan som',
    number: 'Uzbekistan som',
    symbol: 'лв',
    text: 'UZS'
  },
  {
    code: 'VEF',
    decimals: 2,
    name: 'Venezuelan bolívar fuerte',
    number: 'Venezuelan bolívar fuerte',
    symbol: 'Bs',
    text: 'VEF'
  },
  {
    code: 'VND',
    decimals: 0,
    name: 'Vietnamese dong',
    number: 'Vietnamese dong',
    symbol: '₫',
    text: 'VND'
  },
  {
    code: 'VUV',
    decimals: 0,
    name: 'Vanuatu vatu',
    number: 'Vanuatu vatu',
    symbol: 'VUV',
    text: 'VUV'
  },
  {
    code: 'WST',
    decimals: 2,
    name: 'Samoan tala',
    number: 'Samoan tala',
    symbol: 'WST',
    text: 'WST'
  },
  {
    code: 'XAF',
    decimals: 0,
    name: 'CFA franc BEAC',
    number: 'CFA franc BEAC',
    symbol: 'XAF',
    text: 'XAF'
  },
  {
    code: 'XAG',
    name: 'Silver (one troy ounce)',
    number: 'Silver (one troy ounce)',
    symbol: 'XAG',
    text: 'XAG'
  },
  {
    code: 'XAU',
    name: 'Gold (one troy ounce)',
    number: 'Gold (one troy ounce)',
    symbol: 'XAU',
    text: 'XAU'
  },
  {
    code: 'XBA',
    name: 'European Composite Unit (EURCO) (bond market unit)',
    number: 'European Composite Unit (EURCO) (bond market unit)',
    symbol: 'XBA',
    text: 'XBA'
  },
  {
    code: 'XBB',
    name: 'European Monetary Unit (E.M.U.-6) (bond market unit)',
    number: 'European Monetary Unit (E.M.U.-6) (bond market unit)',
    symbol: 'XBB',
    text: 'XBB'
  },
  {
    code: 'XBC',
    name: 'European Unit of Account 9 (E.U.A.-9) (bond market unit)',
    number: 'European Unit of Account 9 (E.U.A.-9) (bond market unit)',
    symbol: 'XBC',
    text: 'XBC'
  },
  {
    code: 'XBD',
    name: 'European Unit of Account 17 (E.U.A.-17) (bond market unit)',
    number: 'European Unit of Account 17 (E.U.A.-17) (bond market unit)',
    symbol: 'XBD',
    text: 'XBD'
  },
  {
    code: 'XCD',
    decimals: 2,
    name: 'East Caribbean dollar',
    number: 'East Caribbean dollar',
    symbol: '$',
    text: 'XCD'
  },
  {
    code: 'XDR',
    name: 'Special drawing rights',
    number: 'Special drawing rights',
    symbol: 'XDR',
    text: 'XDR'
  },
  {
    code: 'XFU',
    name: 'UIC franc (special settlement currency)',
    number: 'UIC franc (special settlement currency)',
    symbol: 'XFU',
    text: 'XFU'
  },
  {
    code: 'XOF',
    decimals: 0,
    name: 'CFA franc BCEAO',
    number: 'CFA franc BCEAO',
    symbol: 'XOF',
    text: 'XOF'
  },
  {
    code: 'XPD',
    name: 'Palladium (one troy ounce)',
    number: 'Palladium (one troy ounce)',
    symbol: 'XPD',
    text: 'XPD'
  },
  {
    code: 'XPF',
    decimals: 0,
    name: 'CFP franc',
    number: 'CFP franc',
    symbol: 'XPF',
    text: 'XPF'
  },
  {
    code: 'XPT',
    name: 'Platinum (one troy ounce)',
    number: 'Platinum (one troy ounce)',
    symbol: 'XPT',
    text: 'XPT'
  },
  {
    code: 'XTS',
    name: 'Code reserved for testing purposes',
    number: 'Code reserved for testing purposes',
    symbol: 'XTS',
    text: 'XTS'
  },
  {
    code: 'XXX',
    name: 'No currency',
    number: 'No currency',
    symbol: 'XXX',
    text: 'XXX'
  },
  {
    code: 'YER',
    decimals: 2,
    name: 'Yemeni rial',
    number: 'Yemeni rial',
    symbol: '﷼',
    text: 'YER'
  },
  {
    code: 'ZAR',
    decimals: 2,
    name: 'South African rand',
    number: 'South African rand',
    symbol: 'R',
    text: 'ZAR'
  },
  {
    code: 'ZMW',
    decimals: 2,
    name: 'Zambian kwacha',
    number: 'Zambian kwacha',
    symbol: 'ZMW',
    text: 'ZMW'
  }
];

const currency = (Vue) => {
  Vue.filter('morph-currency', (value, code, useSymbol) => {
    if (!value) return;
    return sandwich(value, code);
  });

  Vue.prototype.$morphCurrency = (value, code, useSymbol) => {
    return sandwich(value, code);
  };

  function sandwich (value, code, useSymbol) {
    let preffix = '';
    if (!code) code = 'USD';
    const match = currencies.filter(item => code === item.code);
    if (match.length === 0) {
      preffix = '$';
      console.warn(`Morphling Warn: The provided code '${code}' does not exist. Replaced with default $ symbol.`);
    } else {
      preffix = match[0].symbol;
    }
    return `${preffix}${value}`;
  }
};

const dateFormat = (Vue) => {
  Vue.filter('morph-date-format', (value, formatting) => {
    if (!value) return;
    return morphDateFormat(value, formatting);
  });

  Vue.prototype.$morphDateFormat = (value, formatting) => {
    return morphDateFormat(value, formatting);
  };

  function morphDateFormat (value, formatting) {
    return format(value, formatting);
  }
};

const fileSize = (Vue) => {
  Vue.filter('morph-file-size', (value, option) => {
    if (!value) return;
    return go(value, option);
  });

  Vue.prototype.$morphFileSize = (value, option) => {
    return go(value, option);
  };

  function go (value, option) {
    const num = +value;
    if (Number.isNaN(num)) {
      console.warn('Warn: value must be a number.');
      return;
    }
    return filesize(num, option);
  }
};

const json = (Vue) => {
  Vue.filter('morph-json', (value, indent) => {
    if (!value) return;
    return json(value, indent);
  });

  Vue.prototype.$morphJson = (value, indent) => {
    return json(value, indent);
  };

  function json (value, indent) {
    return JSON.stringify(value, null, indent);
  }
};

const lowerCase = (Vue) => {
  Vue.filter('morph-lowercase', (value) => {
    if (!value) return;
    return lowercase(value);
  });

  Vue.prototype.$morphLowercase = (value) => {
    return lowercase(value);
  };

  function lowercase (value) {
    if (typeof value !== 'string') value = value.toString();
    return value.toLowerCase();
  }
};

const objectSize = (Vue) => {
  Vue.filter('morph-object-size', (value, option) => {
    if (!value) return;
    return go(value, option);
  });

  Vue.prototype.$morphObjectSize = (value, option) => {
    return go(value, option);
  };

  function go (value, option) {
    let json = null;
    json = JSON.stringify(value);
    return filesize(bytes(json), option);
  }
};

const placeholder = (Vue) => {
  Vue.filter('morph-placeholder', (value, placeholder) => {
    if (!value) return;
    return replace(value, placeholder);
  });

  Vue.prototype.$morphPlaceholder = (value, placeholder) => {
    return replace(value, placeholder);
  };

  function replace (value, placeholder) {
    return placeholder;
  }
};

const replace = (Vue) => {
  Vue.filter('morph-replace', (value, replacee, replacer) => {
    if (!value) return;
    return replace(value, replacee, replacer);
  });

  Vue.prototype.$morphReplace = (value, replacee, replacer) => {
    return replace(value, replacee, replacer);
  };

  function replace (value, replacee, replacer) {
    return value.replace(replacee, replacer);
  }
};

const reverse = (Vue) => {
  Vue.filter('morph-reverse', (value) => {
    if (!value) return;
    return reverse(value);
  });

  Vue.prototype.$morphReverse = (value) => {
    return reverse(value);
  };

  function reverse (value) {
    if (typeof value !== 'string') value = value.toString();
    return value.split('').reverse().join('');
  }
};

const corpus = {
  '<': '>',
  '>': '<',
  '[': ']',
  ']': '[',
  '(': ')',
  ')': '(',
  '{': '}',
  '}': '{'
};
const corpusRegex = /(<|>|\[|\]|\(|\)|\{|\})/g;

const sandwich = (Vue) => {
  Vue.filter('morph-sandwich', (value, start, end) => {
    if (!value) return;
    return sandwich(value, start, end);
  });

  Vue.prototype.$morphSandwich = (value, start, end) => {
    return sandwich(value, start, end);
  };

  function flip (str) {
    return str.replace(corpusRegex, match => corpus[match])
      .split('')
      .reverse()
      .join('');
  }

  function sandwich (value, start, end) {
    start = start || '';
    end = end || flip(start);

    return `${start}${value}${end}`;
  }
};

const truncate = (Vue) => {
  Vue.filter('morph-truncate', (value, length) => {
    if (!value) return;
    return truncate(value, length);
  });

  Vue.prototype.$morphTruncate = (value, length) => {
    return truncate(value, length);
  };

  function truncate (value, length) {
    if (value.length <= length) return value;
    return `${value.substr(0, length)}…`;
  }
};

const uppercase = (Vue) => {
  Vue.filter('morph-uppercase', (value) => {
    if (!value) return;
    return value.toUpperCase();
  });

  Vue.prototype.$morphUppercase = (value) => {
    return value.toUpperCase();
  };
};

const url = (Vue) => {
  const re = /\b(https|http|ftp)?:\/\/\S+/gi;

  Vue.directive('morph-url', {
    bind
  });

  function bind (el, binding, vnode) {
    let s = vnode.elm.innerText;
    const m = s.match(re);
    let prev;

    if (!m) return;

    if (m.length === 1) {
      el.innerHTML = s.replace(m[0], convertToA(m[0], binding));
      return;
    }

    m.forEach((link, i, arr) => {
      if (i % 2 === 0) {
        prev = s.replace(link, convertToA(link, binding));
      } else {
        s = prev.replace(link, convertToA(link, binding));
      }
    });
    el.innerHTML = s;
  }

  function convertToA (link, binding) {
    return `<a target="_blank" href="${link}" style="${binding.value}">${link}</a>`;
  }
};

const email = (Vue) => {
  // RFC 5322 pattern: control characters and escapes are intentional.
  // eslint-disable-next-line no-control-regex, no-useless-escape
  const re = /(?:[A-Za-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[A-Za-z0-9-]*[A-Za-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi;

  Vue.directive('morph-email', {
    bind
  });

  function bind (el, binding, vnode) {
    let s = vnode.elm.innerText;
    const m = s.match(re);
    let prev;

    if (!m) return;

    console.warn(m);

    if (m.length === 1) {
      el.innerHTML = s.replace(m[0], convertToA(m[0]));
      return;
    }

    m.forEach((email, i, arr) => {
      console.warn(email);
      if (i % 2 === 0) {
        prev = s.replace(email, convertToA(email));
      } else {
        s = prev.replace(email, convertToA(email));
      }
    });
    el.innerHTML = s;
  }

  function convertToA (email, binding) {
    return `<a target="_blank" href="mailto:${email}">${email}</a>`;
  }
};

const highlight = (Vue) => {
  Vue.directive('morph-highlight', {
    bind
  });
  function bind (el, binding, vnode) {
    const str = vnode.elm.innerText;
    const highlightee = binding.value.split('::')[0];
    const highlighter = binding.value.split('::')[1];
    const regex = new RegExp(highlightee, 'gi');
    el.innerHTML = str.replace(regex, `<mark style="background-color: ${highlighter}">${highlightee}</mark>`);
  }
};

// Directives
const vMorphHighlight = {
  install (Vue, options) {
    highlight(Vue);
  }
};

const vMorphUrl = {
  install (Vue, options) {
    url(Vue);
  }
};

const vMorphEmail = {
  install (Vue, options) {
    email(Vue);
  }
};

// Filters
const morphAge = {
  install (Vue, options) {
    age(Vue);
  }
};

const morphArrReverse = {
  install (Vue, options) {
    arrReverse(Vue);
  }
};

const morphArrSort = {
  install (Vue, options) {
    arrSort(Vue);
  }
};

const morphCapitalize = {
  install (Vue, options) {
    capitalize(Vue);
  }
};

const morphChop = {
  install (Vue, options) {
    chop(Vue);
  }
};

const morphCurrency = {
  install (Vue, options) {
    currency(Vue);
  }
};

const morphDateFormat = {
  install (Vue, options) {
    dateFormat(Vue);
  }
};

const morphFileSize = {
  install (Vue, options) {
    fileSize(Vue);
  }
};

const morphJson = {
  install (Vue, options) {
    json(Vue);
  }
};

const morphLowerCase = {
  install (Vue, options) {
    lowerCase(Vue);
  }
};

const morphObjectSize = {
  install (Vue, options) {
    objectSize(Vue);
  }
};

const morphPlaceholder = {
  install (Vue, options) {
    placeholder(Vue);
  }
};

const morphReplace = {
  install (Vue, options) {
    replace(Vue);
  }
};

const morphReverse = {
  install (Vue, options) {
    reverse(Vue);
  }
};

const morphSandwich = {
  install (Vue, options) {
    sandwich(Vue);
  }
};

const morphTruncate = {
  install (Vue, options) {
    truncate(Vue);
  }
};

const morphUpperCase = {
  install (Vue, options) {
    uppercase(Vue);
  }
};

const VueMorphling = {
  install (Vue, options) {
    // directives
    email(Vue);
    highlight(Vue);
    url(Vue);
    // filters
    age(Vue);
    arrReverse(Vue);
    arrSort(Vue);
    capitalize(Vue);
    chop(Vue);
    currency(Vue);
    dateFormat(Vue);
    fileSize(Vue);
    json(Vue);
    lowerCase(Vue);
    objectSize(Vue);
    placeholder(Vue);
    reverse(Vue);
    sandwich(Vue);
    truncate(Vue);
    uppercase(Vue);
  }
};

export { VueMorphling, morphAge, morphArrReverse, morphArrSort, morphCapitalize, morphChop, morphCurrency, morphDateFormat, morphFileSize, morphJson, morphLowerCase, morphObjectSize, morphPlaceholder, morphReplace, morphReverse, morphSandwich, morphTruncate, morphUpperCase, vMorphEmail, vMorphHighlight, vMorphUrl };
