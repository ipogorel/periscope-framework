'use strict';

System.register(['aurelia-framework', 'lodash', './../infrastructure/dashboard-manager', './navigation-history', './../state/state-discriminator', './../state/state-url-parser', './../helpers/string-helper'], function (_export, _context) {
  var inject, _, DashboardManager, NavigationHistory, StateDiscriminator, StateUrlParser, StringHelper, _createClass, _dec, _class, HistoryStep;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_lodash) {
      _ = _lodash;
    }, function (_infrastructureDashboardManager) {
      DashboardManager = _infrastructureDashboardManager.DashboardManager;
    }, function (_navigationHistory) {
      NavigationHistory = _navigationHistory.NavigationHistory;
    }, function (_stateStateDiscriminator) {
      StateDiscriminator = _stateStateDiscriminator.StateDiscriminator;
    }, function (_stateStateUrlParser) {
      StateUrlParser = _stateStateUrlParser.StateUrlParser;
    }, function (_helpersStringHelper) {
      StringHelper = _helpersStringHelper.StringHelper;
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

      _export('HistoryStep', HistoryStep = (_dec = inject(NavigationHistory, DashboardManager), _dec(_class = function () {
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
                    var currentWidgetsState = StateDiscriminator.discriminate(currentDashboard.getState());

                    var url = currentDashboard.getRoute();

                    if (_.filter(_this._navigationHistory.items, function (i) {
                      return StringHelper.compare(i.url, url);
                    }).length === 0) {
                      _this._navigationHistory.add(url, _this.currentRouteItem.title, currentDashboard.name, currentWidgetsState, new Date());
                    } else if (!StringHelper.compare(url, _this.currentRouteItem.route)) {
                      _this._navigationHistory.update(url, new Date());
                    }
                  })();
                }

                var newUrl = window.location.href;

                var allWidgetsState = StateDiscriminator.discriminate(dashboard.getState());
                var routeWidgetsState = StateUrlParser.queryToState(newUrl);
                _.forEach(allWidgetsState, function (as) {
                  var rs = _.find(routeWidgetsState, { "name": as.name });
                  if (rs) as.value = rs.value;else as.value = null;
                });

                dashboard.setState(allWidgetsState);

                if (_.filter(_this._navigationHistory.items, function (i) {
                  return StringHelper.compare(i.url, newUrl);
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
      }()) || _class));

      _export('HistoryStep', HistoryStep);
    }
  };
});