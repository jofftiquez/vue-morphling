function morphArrReverse (value) {
  if (!Array.isArray(value)) {
    console.warn('Morphling Warn: morph-arr-reverse expects an array.');
    return value;
  }
  // Copy first: reversing in place would mutate reactive state during render.
  return [...value].reverse();
}

export const arrReverse = { filter: 'morph-arr-reverse', method: '$morphArrReverse', fn: morphArrReverse };
