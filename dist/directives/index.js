'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _url = require('./url');

var _url2 = _interopRequireDefault(_url);

var _email = require('./email');

var _email2 = _interopRequireDefault(_email);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Vue => {
    (0, _url2.default)(Vue);
    // email(Vue);
};