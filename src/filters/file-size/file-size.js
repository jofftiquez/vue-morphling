import filesize from 'filesize';

export const fileSize = (Vue) => {
  Vue.filter('morph-file-size', (value, option) => {
    if (!value) return;
    return go(value, option);
  });

  Vue.prototype.$morphFileSize = (value, option) => {
    return go(value, option);
  };

  function go (value, option) {
    const num = +value;
    if (Number.isNaN(num)) {
      console.warn('Warn: value must be a number.');
      return;
    }
    return filesize(num, option);
  }
};
