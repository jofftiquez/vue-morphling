import { formatBytes } from '../../lib/format-bytes';
import { utf8Length } from '../../lib/utf8-length';

export const objectSize = (Vue) => {
  Vue.filter('morph-object-size', (value, option) => {
    if (!value) return;
    return go(value, option);
  });

  Vue.prototype.$morphObjectSize = (value, option) => {
    return go(value, option);
  };

  function go (value, option) {
    const json = JSON.stringify(value);
    return formatBytes(utf8Length(json), option);
  }
};
