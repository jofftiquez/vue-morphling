export const lowerCase = (Vue) => {
  Vue.filter('morph-lowercase', (value) => {
    if(!value) return;
    return lowercase(value);
  });

  Vue.prototype.$morphLowercase = (value) => {
    return lowercase(value);
  };

  function lowercase(value) {
    if(typeof value !== 'string') value = value.toString();
    return value.toLowerCase();
  }
};