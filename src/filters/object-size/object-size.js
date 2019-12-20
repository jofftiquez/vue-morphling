import bytes from 'utf8-length';
import filesize from 'filesize.js';

export const objectSize = (Vue) => {
  Vue.filter('morph-object-size', (value, indent) => {
    if (!value) return;
    return go(value, indent);
  });

  Vue.prototype.$morphObjectSize = (value, indent) => {
    return go(value, indent);
  };

  function go (value, indent) {
    var json = null;
    json = JSON.stringify(value);
    return filesize(bytes(json));
  }
};
