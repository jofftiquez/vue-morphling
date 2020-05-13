import bytes from 'utf8-length';
import filesize from 'filesize';

export const objectSize = (Vue) => {
  Vue.filter('morph-object-size', (value, option) => {
    if (!value) return;
    return go(value, option);
  });

  Vue.prototype.$morphObjectSize = (value, option) => {
    return go(value, option);
  };

  function go (value, option) {
    var json = null;
    json = JSON.stringify(value);
    return filesize(bytes(json), option);
  }
};
