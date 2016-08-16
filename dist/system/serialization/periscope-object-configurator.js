'use strict';

System.register(['./configuration-info', 'lodash'], function (_export, _context) {
  "use strict";

  var ConfigurationInfo, _, PeriscopeObjectConfigurator;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_configurationInfo) {
      ConfigurationInfo = _configurationInfo.ConfigurationInfo;
    }, function (_lodash) {
      _ = _lodash;
    }],
    execute: function () {
      _export('PeriscopeObjectConfigurator', PeriscopeObjectConfigurator = function () {
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
          var info = ConfigurationInfo.createInfo(this, object);
          object.persistConfigurationTo(info);
          return {
            type: info.type,
            config: info.config
          };
        };

        PeriscopeObjectConfigurator.prototype.getObject = function getObject(objectConfig) {
          var obj = this.factory.createObject(objectConfig.type);
          var info = ConfigurationInfo.createInfo(this, obj);
          info.config = objectConfig.config;
          obj.restoreConfigurationFrom(info);
          return obj;
        };

        return PeriscopeObjectConfigurator;
      }());

      _export('PeriscopeObjectConfigurator', PeriscopeObjectConfigurator);
    }
  };
});