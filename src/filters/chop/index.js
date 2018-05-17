export const chop = (Vue) => {
  Vue.filter('morph-chop', (value, length, location) => {
    if(!value) return;
    return chop(value, length, location);
  });

  Vue.prototype.$morphChop = (value, length, location) => {
    return chop(value, length, location);
  };

  function chop(value, length, location) {
    if(!length) return 'Warn: option length (number) is required. morph-chop(length, location)'
      if(!location) location = 'end';
    if(typeof value !== 'string') value = value.toString();
    if(location === 'end')
      return value.toString().slice(0, ~length+1)
    if(location === 'start')
      return value.toString().substring(length);
  }
};