export const arrReverse = (Vue) => {
  Vue.filter('morph-arr-reverse', (value) => {
    if (!value) return;
    return reverse(value);
  });

  Vue.prototype.$morphArrReverse = (value) => {
    return reverse(value);
  };

  function reverse (value) {
    if (!Array.isArray(value)) { console.warn('arg should be array'); }

    var arr = value.reverse();
    return arr;
  }
};
