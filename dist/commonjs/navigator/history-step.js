'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HistoryStep = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _aureliaFramework = require('aurelia-framework');

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _dashboardManager = require('./../infrastructure/dashboard-manager');

var _navigationHistory = require('./navigation-history');

var _stateDiscriminator = require('./../state/state-discriminator');

var _stateUrlParser = require('./../state/state-url-parser');

var _stringHelper = require('./../helpers/string-helper');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HistoryStep = exports.HistoryStep = (_dec = (0, _aureliaFramework.inject)(_navigationHistory.NavigationHistory, _dashboardManager.DashboardManager), _dec(_class = function () {
  function HistoryStep(navigationHistory, dashboardManager) {
    _classCallCheck(this, HistoryStep);

    this._navigationHistory = navigationHistory;
    this._dashboardManager = dashboardManager;
  }

  HistoryStep.prototype.run = function run(routingContext, next) {
    var _this = this;

    if (routingContext.getAllInstructions().some(function (i) {
      return i.config.name === "dashboard";
    })) {
      var dashboard = this._dashboardManager.find(routingContext.params.dashboard);
      if (dashboard) {
        (function () {
          if (_this.currentRouteItem) {
            (function () {
              var currentDashboard = _this._dashboardManager.find(_this.currentRouteItem.dashboardName);
              var currentWidgetsState = _stateDiscriminator.StateDiscriminator.discriminate(currentDashboard.getState());

              var url = currentDashboard.getRoute();

              if (_.filter(_this._navigationHistory.items, function (i) {
                return _stringHelper.StringHelper.compare(i.url, url);
              }).length === 0) {
                _this._navigationHistory.add(url, _this.currentRouteItem.title, currentDashboard.name, currentWidgetsState, new Date());
              } else if (!_stringHelper.StringHelper.compare(url, _this.currentRouteItem.route)) {
                _this._navigationHistory.update(url, new Date());
              }
            })();
          }

          var newUrl = window.location.href;

          var allWidgetsState = _stateDiscriminator.StateDiscriminator.discriminate(dashboard.getState());
          var routeWidgetsState = _stateUrlParser.StateUrlParser.queryToState(newUrl);
          _.forEach(allWidgetsState, function (as) {
            var rs = _.find(routeWidgetsState, { "name": as.name });
            if (rs) as.value = rs.value;else as.value = null;
          });

          dashboard.setState(allWidgetsState);

          if (_.filter(_this._navigationHistory.items, function (i) {
            return _stringHelper.StringHelper.compare(i.url, newUrl);
          }).length === 0) {
            _this._navigationHistory.add(newUrl, dashboard.title, dashboard.name, dashboard.getState(), new Date());
          }

          _this.currentRouteItem = {
            dashboardName: dashboard.name,
            title: dashboard.title,
            route: newUrl
          };
        })();
      }
    } else this.currentRouteItem = null;
    return next();
  };

  _createClass(HistoryStep, [{
    key: 'currentRouteItem',
    get: function get() {
      return this._currentRoute;
    },
    set: function set(value) {
      this._currentRoute = value;
    }
  }]);

  return HistoryStep;
}()) || _class);