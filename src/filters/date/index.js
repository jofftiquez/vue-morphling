import moment from 'moment';

export default (Vue) => {
  Vue.filter('morph-date', (value, format) => {
    if(!value) return;
    return morphDate(value, format);
  });

  Vue.prototype.$morphDate = (value, format) => {
    return morphDate(value, format);
  };

  function morphDate(value, format) {
    return moment(value).format(format);
  }
};