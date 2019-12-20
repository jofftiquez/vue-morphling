export const arrSort = (Vue) => {
  Vue.filter('morph-arr-sort', (value, key, direction) => {
    if (!value) return;
    return sort(value, key, direction);
  });

  Vue.prototype.$morphArrSort = (value, key, direction) => {
    return sort(value, key, direction);
  };

  function sort (value, key, direction) {
    if (!Array.isArray(value)) { console.warn('First argument should be an array'); }

    if (direction === 'asc') {
      const arr = value.sort((a, b) => a[key] - b[key]);
      return arr;
    }

    if (direction === 'desc') {
      const arr = value.sort((a, b) => b[key] - a[key]);
      return arr;
    }
  }
};
