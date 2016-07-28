'use strict';

System.register(['lodash', 'aurelia-framework', 'aurelia-router', './../helpers/url-helper'], function (_export, _context) {
  var _, inject, Router, UrlHelper, _dec, _class, DashboardManager;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_lodash) {
      _ = _lodash;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
    }, function (_helpersUrlHelper) {
      UrlHelper = _helpersUrlHelper.UrlHelper;
    }],
    execute: function () {
      _export('DashboardManager', DashboardManager = (_dec = inject(Router), _dec(_class = function () {
        function DashboardManager(router) {
          _classCallCheck(this, DashboardManager);

          this.dashboards = [];

          this._router = router;
        }

        DashboardManager.prototype.configure = function configure(configuration) {
          this.dashboardRouteName = configuration.dashboardRouteName;
        };

        DashboardManager.prototype.find = function find(dashboardName) {
          return _.find(this.dashboards, { name: dashboardName });
        };

        DashboardManager.prototype.createDashboard = function createDashboard(type, dashboardConfiguration) {
          var dashboard = new type();
          dashboard.configure(dashboardConfiguration);
          if (this.dashboardRouteName) {
            dashboard.route = UrlHelper.getAbsoluteBaseUrl() + "/" + this._router.generate(this.dashboardRouteName, { dashboard: dashboard.name });
          }

          this.dashboards.push(dashboard);
          return dashboard;
        };

        return DashboardManager;
      }()) || _class));

      _export('DashboardManager', DashboardManager);
    }
  };
});