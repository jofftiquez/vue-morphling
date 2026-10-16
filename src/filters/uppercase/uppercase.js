function morphUppercase (value) {
  if (typeof value !== 'string') value = value.toString();
  return value.toUpperCase();
}

export const uppercase = { filter: 'morph-uppercase', method: '$morphUppercase', fn: morphUppercase };
