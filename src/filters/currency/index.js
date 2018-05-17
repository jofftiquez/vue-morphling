import currencies from '../../lib/currencies';

export const currency = (Vue) => {
  Vue.filter('morph-currency', (value, code, useSymbol) => {
    if(!value) return;
    return sandwich(value, code, useSymbol);
  });

  Vue.prototype.$morphCurrency = (value, code, useSymbol) => {
    return sandwich(value, code, useSymbol);
  };

  function sandwich(value, code, useSymbol) {
    let preffix = '';
    if(!code) code = 'USD';
    let match = currencies.filter(item => code === item.code);
    if(match.length === 0) {
      preffix = '$';
      console.warn(`Morphling Warn: The provided code '${ code }' does not exist. Replaced with default $ symbol.`);
    } else {
      preffix = match[0].symbol;
    }
    return `${ preffix }${ value }`;
  }
};