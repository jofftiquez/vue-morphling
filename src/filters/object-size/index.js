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
    // if(!indent) {
    json = JSON.stringify(value);
    // } else {
    //   indent = parseInt(indent);
    //   JSON.stringify(value, null, indent)
    // }
    return filesize(bytes(json));
  }
};
