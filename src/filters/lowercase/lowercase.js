function morphLowercase (value) {
  if (typeof value !== 'string') value = value.toString();
  return value.toLowerCase();
}

export const lowerCase = { filter: 'morph-lowercase', method: '$morphLowercase', fn: morphLowercase };
