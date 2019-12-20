export const reverse = (Vue) => {
  Vue.filter('morph-reverse', (value) => {
    if (!value) return;
    return reverse(value);
  });

  Vue.prototype.$morphReverse = (value) => {
    return reverse(value);
  };

  function reverse (value) {
    if (typeof value !== 'string') value = value.toString();
    return value.split('').reverse().join('');
  }
};
