define(['exports', 'lodash', 'aurelia-framework', 'aurelia-router', './../helpers/url-helper'], function (exports, _lodash, _aureliaFramework, _aureliaRouter, _urlHelper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DashboardManager = undefined;

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

  var _dec, _class;

  var DashboardManager = exports.DashboardManager = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function () {
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
        dashboard.route = _urlHelper.UrlHelper.getAbsoluteBaseUrl() + "/" + this._router.generate(this.dashboardRouteName, { dashboard: dashboard.name });
      }

      this.dashboards.push(dashboard);
      return dashboard;
    };

    return DashboardManager;
  }()) || _class);
});