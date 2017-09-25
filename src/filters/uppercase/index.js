export default (Vue) => {
  Vue.filter('morph-uppercase', (value) => {
    if(!value) return;
    return value.toUpperCase();
  });

  Vue.prototype.$morphUppercase = (value) => {
    return value.toUpperCase();
  };
};