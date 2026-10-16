function morphJson (value, indent) {
  return JSON.stringify(value, null, indent);
}

export const json = { filter: 'morph-json', method: '$morphJson', fn: morphJson };
