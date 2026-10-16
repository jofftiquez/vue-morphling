import currencies from '../../lib/currencies';

function morphCurrency (value, code, useSymbol) {
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

export const currency = { filter: 'morph-currency', method: '$morphCurrency', fn: morphCurrency };
