'use strict';

System.register(['lodash'], function (_export, _context) {
  var _, DashboardSerializer;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_lodash) {
      _ = _lodash;
    }],
    execute: function () {
      _export('DashboardSerializer', DashboardSerializer = function () {
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
      }());

      _export('DashboardSerializer', DashboardSerializer);
    }
  };
});