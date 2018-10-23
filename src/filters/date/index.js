import { format } from 'date-fns';

export const date = (Vue) => {
  Vue.filter('morph-date', (value, formatting) => {
    if (!value) return;
    return morphDate(value, formatting);
  });

  Vue.prototype.$morphDate = (value, formatting) => {
    return morphDate(value, formatting);
  };

  function morphDate (value, formatting) {
    return format(value, formatting);
  }
};
