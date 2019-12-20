import { format } from 'date-fns';

export const dateFormat = (Vue) => {
  Vue.filter('morph-date-format', (value, formatting) => {
    if (!value) return;
    return morphDateFormat(value, formatting);
  });

  Vue.prototype.$morphDateFormat = (value, formatting) => {
    return morphDateFormat(value, formatting);
  };

  function morphDateFormat (value, formatting) {
    return format(value, formatting);
  }
};
