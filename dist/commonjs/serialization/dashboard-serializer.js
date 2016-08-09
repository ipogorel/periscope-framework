'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DashboardSerializer = undefined;

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DashboardSerializer = exports.DashboardSerializer = function () {
  function DashboardSerializer(configurator) {
    _classCallCheck(this, DashboardSerializer);

    this.configurator = configurator;
  }

  DashboardSerializer.prototype.serialize = function serialize(dashoardsList) {
    var _this = this;

    var result = [];
    _.forEach(dashoardsList, function (d) {
      result.push(_this.configurator.getConfiguration(d));
    });
    return result;
  };

  DashboardSerializer.prototype.deserialize = function deserialize(dashoardsConfiguration) {
    var _this2 = this;

    this.dashoardsConfigurationState = dashoardsConfiguration;
    var result = [];
    _.forEach(dashoardsConfiguration, function (d) {
      result.push(_this2.configurator.getObject(d));
    });
    return result;
  };

  return DashboardSerializer;
}();