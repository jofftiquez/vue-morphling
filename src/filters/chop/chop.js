function morphChop (value, length, location) {
  if (!length) return 'Warn: option length (number) is required. morph-morphChop(length, location)';
  if (!location) location = 'end';
  if (typeof value !== 'string') value = value.toString();
  if (location === 'end') { return value.toString().slice(0, ~length + 1); }
  if (location === 'start') { return value.toString().substring(length); }
}

export const chop = { filter: 'morph-chop', method: '$morphChop', fn: morphChop };
