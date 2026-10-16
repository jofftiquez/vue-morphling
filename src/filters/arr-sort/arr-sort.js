function morphArrSort (value, key, direction) {
  if (!Array.isArray(value)) {
    console.warn('Morphling Warn: morph-arr-sort expects an array.');
    return value;
  }
  // Copy first: sorting in place would mutate reactive state during render.
  if (direction === 'asc') return [...value].sort((a, b) => a[key] - b[key]);
  if (direction === 'desc') return [...value].sort((a, b) => b[key] - a[key]);
}

export const arrSort = { filter: 'morph-arr-sort', method: '$morphArrSort', fn: morphArrSort };
