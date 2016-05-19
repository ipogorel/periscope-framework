define(['exports', 'aurelia-framework', 'lodash', './../infrastructure/dashboard-manager', './../state/user-state-storage', './navigation-history', './../state/state-discriminator', './../state/state-url-parser', './../helpers/string-helper'], function (exports, _aureliaFramework, _lodash, _dashboardManager, _userStateStorage, _navigationHistory, _stateDiscriminator, _stateUrlParser, _stringHelper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.HistoryStep = undefined;

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

  var _createClass = function () {
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

  var _dec, _class;

  var HistoryStep = exports.HistoryStep = (_dec = (0, _aureliaFramework.inject)(_userStateStorage.UserStateStorage, _navigationHistory.NavigationHistory, _dashboardManager.DashboardManager), _dec(_class = function () {
    function HistoryStep(userStateStorage, navigationHistory, dashboardManager) {
      _classCallCheck(this, HistoryStep);

      this._navigationHistory = navigationHistory;
      this._userStateStorage = userStateStorage;
      this._dashboardManager = dashboardManager;
    }

    HistoryStep.prototype.run = function run(routingContext, next) {
      var _this = this;

      if (routingContext.getAllInstructions().some(function (i) {
        return i.config.name === "dashboard";
      })) {
        var dashboard = this._dashboardManager.find(routingContext.params.dashboard);
        if (dashboard) {
          var routeWidgetsState;
          var storageWidgetsState;

          (function () {
            if (_this.currentRouteItem) {
              (function () {
                var currentWidgetsState = _stateDiscriminator.StateDiscriminator.discriminate(_this._userStateStorage.getAll(_this.currentRouteItem.dashboardName));
                var url = "/" + _this.currentRouteItem.dashboardName + _stateUrlParser.StateUrlParser.stateToQuery(currentWidgetsState);

                if (_.filter(_this._navigationHistory.items, function (i) {
                  return _stringHelper.StringHelper.compare(i.url, url);
                }).length === 0) {
                  _this._navigationHistory.add(url, _this.currentRouteItem.title, _this.currentRouteItem.dashboardName, currentWidgetsState, new Date());
                } else if (!_stringHelper.StringHelper.compare(url, _this.currentRouteItem.route)) {
                  _this._navigationHistory.update(url, new Date());
                }
              })();
            }

            var fullUrl = routingContext.fragment + (routingContext.queryString ? "?" + routingContext.queryString : "");

            routeWidgetsState = _stateUrlParser.StateUrlParser.queryToState(fullUrl);
            storageWidgetsState = _stateDiscriminator.StateDiscriminator.discriminate(_this._userStateStorage.getAll(dashboard.name));

            for (var _iterator = storageWidgetsState, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
              var _ref;

              if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
              } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
              }

              var oldSt = _ref;

              _this._userStateStorage.remove(oldSt.key);
            }for (var _iterator2 = routeWidgetsState, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
              var _ref2;

              if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
              } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
              }

              var newSt = _ref2;

              _this._userStateStorage.set(newSt.key, newSt.value);
            }
            if (_.filter(_this._navigationHistory.items, function (i) {
              return _stringHelper.StringHelper.compare(i.url, fullUrl);
            }).length === 0) {
              _this._navigationHistory.add(fullUrl, dashboard.title, dashboard.name, _this._userStateStorage.getAll(dashboard.name), new Date());
            }

            _this.currentRouteItem = {
              dashboardName: dashboard.name,
              title: dashboard.title,
              route: fullUrl
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
});