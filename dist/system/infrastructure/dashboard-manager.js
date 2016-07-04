'use strict';

System.register(['lodash'], function (_export, _context) {
  "use strict";

  var _, _createClass, DashboardManager;

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
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('DashboardManager', DashboardManager = function () {
        function DashboardManager() {
          _classCallCheck(this, DashboardManager);

          this._dashboards = [];
        }

        DashboardManager.prototype.find = function find(dashboardName) {
          return _.find(this._dashboards, { name: dashboardName });
        };

        DashboardManager.prototype.createDashboard = function createDashboard(type, dashboardConfiguration) {
          var dashboard = new type();
          dashboard.configure(dashboardConfiguration);
          this._dashboards.push(dashboard);
          return dashboard;
        };

        _createClass(DashboardManager, [{
          key: 'dashboards',
          get: function get() {
            return this._dashboards;
          }
        }]);

        return DashboardManager;
      }());

      _export('DashboardManager', DashboardManager);
    }
  };
});