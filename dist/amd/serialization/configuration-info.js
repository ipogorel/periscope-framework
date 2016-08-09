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
              if (_this.configurator.isConfigurable(v)) aVal.push(_this.configurator.getConfiguration(v));else aVal.push(v);
            });
            _this.config[key] = aVal;
          })();
        } else {
          if (this.configurator.isConfigurable(value)) this.config[key] = this.configurator.getConfiguration(value);else this.config[key] = value;
        }
      }
    };

    ConfigurationInfo.prototype.addScript = function addScript(key, value) {
      if (value) this.config[key] = value.toString();
    };

    ConfigurationInfo.prototype.getValue = function getValue(key) {
      if (this.config[key]) {
        var result = void 0;
        if (this.config[key].type) {
          return this.configurator.getObject(this.config[key]);
        }
        return this.config[key];
      }
      return null;
    };

    ConfigurationInfo.prototype.getScript = function getScript(key) {
      if (this.config[key]) {
        return this.config[key];
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
        return this.config[key] === "true";
      }
      return null;
    };

    return ConfigurationInfo;
  }();
});