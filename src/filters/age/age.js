export const age = (Vue) => {
  Vue.filter('morph-age', (value) => {
    if (!value) return;
    return calculateAge(value);
  });

  Vue.prototype.$morphAge = (value) => {
    return calculateAge(value);
  };

  function calculateAge (date) {
    const dateLeft = new Date();
    const dateRight = date instanceof Date ? date : new Date(date);
    return dateLeft.getFullYear() - dateRight.getFullYear();
  }
};
