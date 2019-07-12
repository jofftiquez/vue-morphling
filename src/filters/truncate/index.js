export const truncate = (Vue) => {
  Vue.filter('morph-truncate', (value, length) => {
    if (!value) return;
    return truncate(value, length);
  });

  Vue.prototype.$morphTruncate = (value, length) => {
    return truncate(value, length);
  };

  function truncate (value, length) {
    if (value.length <= length) return value;
    return `${value.substr(0, length)}…`;
  }
};
