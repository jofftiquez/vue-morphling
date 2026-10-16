export const arrReverse = (Vue) => {
  Vue.filter('morph-arr-reverse', (value) => {
    if (!value) return;
    return reverse(value);
  });

  Vue.prototype.$morphArrReverse = (value) => {
    return reverse(value);
  };

  function reverse (value) {
    if (!Array.isArray(value)) {
      console.warn('Morphling Warn: morph-arr-reverse expects an array.');
      return value;
    }
    // Copy first: reversing in place would mutate reactive state during render.
    return [...value].reverse();
  }
};
