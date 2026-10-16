function morphReverse (value) {
  if (typeof value !== 'string') value = value.toString();
  return value.split('').reverse().join('');
}

export const reverse = { filter: 'morph-reverse', method: '$morphReverse', fn: morphReverse };
