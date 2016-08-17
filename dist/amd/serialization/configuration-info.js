define(["exports", "lodash"], function (exports, _lodash) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ConfigurationInfo = undefined;

  var _ = _interopRequireWildcard(_lodash);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ConfigurationInfo = exports.ConfigurationInfo = function () {
    ConfigurationInfo.createInfo = function createInfo(configurator, object, objectConfig) {
      return new ConfigurationInfo(configurator, object.constructor.name, objectConfig);
    };

    function ConfigurationInfo(configurator, objectType, objectConfig) {
      _classCallCheck(this, ConfigurationInfo);

      this.configurator = configurator;
      this.type = objectType;
      this.config = objectConfig ? objectConfig : {};
    }

    ConfigurationInfo.prototype.addValue = function addValue(key, value) {
      var _this = this;

      if (value) {
        if (_.isArray(value)) {
          (function () {
            var aVal = [];
            _.forEach(value, function (v) {
              aVal.push(_this._getConfig(v));
            });
            _this.config[key] = aVal;
          })();
        } else this.config[key] = this._getConfig(value);
      }
    };

    ConfigurationInfo.prototype.addScript = function addScript(key, value) {
      if (value) this.config[key] = value.toString();
    };

    ConfigurationInfo.prototype.getValue = function getValue(key) {
      var _this2 = this;

      if (this.config[key]) {
        if (_.isArray(this.config[key])) {
          var _ret2 = function () {
            var aVal = [];
            _.forEach(_this2.config[key], function (v) {
              aVal.push(_this2._getObject(v));
            });
            return {
              v: aVal
            };
          }();

          if ((typeof _ret2 === "undefined" ? "undefined" : _typeof(_ret2)) === "object") return _ret2.v;
        } else {
          return this._getObject(this.config[key]);
        }
      }
      return null;
    };

    ConfigurationInfo.prototype.getScript = function getScript(key) {
      if (this.config[key]) {
        return eval("(" + this.config[key] + ")");
      }
      return null;
    };

    ConfigurationInfo.prototype.getInt = function getInt(key) {
      if (this.config[key]) {
        return parseInt(this.config[key]);
      }
      return null;
    };

    ConfigurationInfo.prototype.getBool = function getBool(key) {
      if (this.config[key]) {
        if (_.isBoolean(this.config[key])) return this.config[key];
        return this.config[key] === "true";
      }
      return null;
    };

    ConfigurationInfo.prototype._getConfig = function _getConfig(object) {
      if (this.configurator.isConfigurable(object)) return this.configurator.getConfiguration(object);else return object;
    };

    ConfigurationInfo.prototype._getObject = function _getObject(config) {
      if (config.type && config.config) {
        return this.configurator.getObject(config);
      }
      return config;
    };

    return ConfigurationInfo;
  }();
});