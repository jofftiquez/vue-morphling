function morphTruncate (value, length) {
  if (value.length <= length) return value;
  return `${value.substr(0, length)}…`;
}

export const truncate = { filter: 'morph-truncate', method: '$morphTruncate', fn: morphTruncate };
