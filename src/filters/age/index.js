import { differenceInYears } from 'date-fns';

export const age = (Vue) => {
  Vue.filter('morph-age', (value) => {
    if (!value) return;
    return calculateAge(value);
  });

  Vue.prototype.$morphAge = (value) => {
    return calculateAge(value);
  };

  function calculateAge (birthday) {
    return differenceInYears(Date.now(), birthday);
  }
};
