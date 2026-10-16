export const uppercase = (Vue) => {
  Vue.filter('morph-uppercase', (value) => {
    if (!value) return;
    return uppercase(value);
  });

  Vue.prototype.$morphUppercase = (value) => {
    return uppercase(value);
  };

  function uppercase (value) {
    if (typeof value !== 'string') value = value.toString();
    return value.toUpperCase();
  }
};
