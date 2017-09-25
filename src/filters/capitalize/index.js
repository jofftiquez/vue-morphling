export default (Vue) => {
  Vue.filter('morph-capitalize', (value) => {
    if(!value) return;
    return capitalize(value);
  });

  Vue.prototype.$morphCapitalize = (value) => {
    return capitalize(value);
  };

  function capitalize(value) {
    if(typeof value !== 'string') value = value.toString();
    return `${ value.charAt(0).toUpperCase() }${ value.substring(1) }`;
  }
};