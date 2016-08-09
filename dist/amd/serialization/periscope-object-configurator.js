define(['exports', './configuration-info', 'lodash'], function (exports, _configurationInfo, _lodash) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PeriscopeObjectConfigurator = undefined;

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

  var PeriscopeObjectConfigurator = exports.PeriscopeObjectConfigurator = function () {
    function PeriscopeObjectConfigurator(factory) {
      _classCallCheck(this, PeriscopeObjectConfigurator);

      this.factory = factory;
    }

    PeriscopeObjectConfigurator.prototype.isConfigurable = function isConfigurable(object) {
      if (!_.isObject(object) || !object.persistConfigurationTo) return false;
      return true;
    };

    PeriscopeObjectConfigurator.prototype.getConfiguration = function getConfiguration(object) {
      if (!this.isConfigurable(object)) throw "configurable object must implement persistConfigurationTo method";
      var info = _configurationInfo.ConfigurationInfo.createInfo(this, object);
      object.persistConfigurationTo(info);
      return {
        type: info.type,
        config: info.config
      };
    };

    PeriscopeObjectConfigurator.prototype.getObject = function getObject(objectConfig) {
      var obj = this.factory.createObject(objectConfig.type);
      var info = _configurationInfo.ConfigurationInfo.createInfo(this, obj);
      info.config = objectConfig.config;
      obj.restoreConfigurationFrom(info);
      return obj;
    };

    return PeriscopeObjectConfigurator;
  }();
});