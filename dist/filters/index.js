'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _capitalize = require('./capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

var _chop = require('./chop');

var _chop2 = _interopRequireDefault(_chop);

var _currency = require('./currency');

var _currency2 = _interopRequireDefault(_currency);

var _date = require('./date');

var _date2 = _interopRequireDefault(_date);

var _json = require('./json');

var _json2 = _interopRequireDefault(_json);

var _lowercase = require('./lowercase');

var _lowercase2 = _interopRequireDefault(_lowercase);

var _placeholder = require('./placeholder');

var _placeholder2 = _interopRequireDefault(_placeholder);

var _replace = require('./replace');

var _replace2 = _interopRequireDefault(_replace);

var _reverse = require('./reverse');

var _reverse2 = _interopRequireDefault(_reverse);

var _sandwich = require('./sandwich');

var _sandwich2 = _interopRequireDefault(_sandwich);

var _truncate = require('./truncate');

var _truncate2 = _interopRequireDefault(_truncate);

var _uppercase = require('./uppercase');

var _uppercase2 = _interopRequireDefault(_uppercase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Vue => {
  (0, _capitalize2.default)(Vue);
  (0, _chop2.default)(Vue);
  (0, _currency2.default)(Vue);
  (0, _date2.default)(Vue);
  (0, _json2.default)(Vue);
  (0, _lowercase2.default)(Vue);
  (0, _placeholder2.default)(Vue);
  (0, _replace2.default)(Vue);
  (0, _reverse2.default)(Vue);
  (0, _sandwich2.default)(Vue);
  (0, _truncate2.default)(Vue);
  (0, _uppercase2.default)(Vue);
};