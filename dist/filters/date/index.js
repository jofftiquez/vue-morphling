'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Vue => {
  Vue.filter('morph-date', (value, format) => {
    if (!value) return;
    return morphDate(value, format);
  });

  Vue.prototype.$morphDate = (value, format) => {
    return morphDate(value, format);
  };

  function morphDate(value, format) {
    return (0, _moment2.default)(value).format(format);
  }
};