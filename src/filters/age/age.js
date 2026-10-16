export const age = (Vue) => {
  Vue.filter('morph-age', (value) => {
    if (!value) return;
    return calculateAge(value);
  });

  Vue.prototype.$morphAge = (value) => {
    return calculateAge(value);
  };

  function calculateAge (date) {
    const today = new Date();
    const birthday = date instanceof Date ? date : new Date(date);
    const age = today.getFullYear() - birthday.getFullYear();
    const months = today.getMonth() - birthday.getMonth();
    const birthdayPending = months < 0 || (months === 0 && today.getDate() < birthday.getDate());
    return birthdayPending ? age - 1 : age;
  }
};
