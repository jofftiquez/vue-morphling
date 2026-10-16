export const arrSort = (Vue) => {
  Vue.filter('morph-arr-sort', (value, key, direction) => {
    if (!value) return;
    return sort(value, key, direction);
  });

  Vue.prototype.$morphArrSort = (value, key, direction) => {
    return sort(value, key, direction);
  };

  function sort (value, key, direction) {
    if (!Array.isArray(value)) {
      console.warn('Morphling Warn: morph-arr-sort expects an array.');
      return value;
    }
    // Copy first: sorting in place would mutate reactive state during render.
    if (direction === 'asc') return [...value].sort((a, b) => a[key] - b[key]);
    if (direction === 'desc') return [...value].sort((a, b) => b[key] - a[key]);
  }
};
