'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SchemaProvider = undefined;

var _configurable = require('./../../../serialization/configurable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SchemaProvider = exports.SchemaProvider = function (_Configurable) {
  _inherits(SchemaProvider, _Configurable);

  function SchemaProvider() {
    _classCallCheck(this, SchemaProvider);

    return _possibleConstructorReturn(this, _Configurable.call(this));
  }

  SchemaProvider.prototype.getSchema = function getSchema() {};

  SchemaProvider.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
    _Configurable.prototype.persistConfigurationTo.call(this, configurationInfo);
  };

  SchemaProvider.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
    _Configurable.prototype.restoreConfigurationFrom.call(this, configurationInfo);
  };

  return SchemaProvider;
}(_configurable.Configurable);