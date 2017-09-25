'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _filters = require('./filters');

var _filters2 = _interopRequireDefault(_filters);

var _directives = require('./directives');

var _directives2 = _interopRequireDefault(_directives);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Morphling = {
  install(Vue, options) {
    (0, _filters2.default)(Vue, options);
    (0, _directives2.default)(Vue);
  }
};

exports.default = Morphling;