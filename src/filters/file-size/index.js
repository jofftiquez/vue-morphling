import filesize from 'filesize.js';

export default (Vue) => {
  Vue.filter('morph-file-size', (value) => {
    if(!value) return;
    return go(value);
  });

  Vue.prototype.$morphFileSize = (value) => {
    return go(value);
  };

  function go(value) {
    console.log(value)
    const num = +value;
    if(Number.isNaN(num)) {
      console.warn('Warn: value must be a number.');
      return;
    }
    return filesize(num);
  }
};