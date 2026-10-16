function morphCapitalize (value) {
  if (typeof value !== 'string') value = value.toString();
  return `${value.charAt(0).toUpperCase()}${value.substring(1)}`;
}

export const capitalize = { filter: 'morph-capitalize', method: '$morphCapitalize', fn: morphCapitalize };
