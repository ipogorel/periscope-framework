'use strict';

exports.__esModule = true;
exports.PeriscopeRouter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _aureliaFramework = require('aurelia-framework');

var _aureliaEventAggregator = require('aurelia-event-aggregator');

var _aureliaRouter = require('aurelia-router');

var _navigationHistory = require('./navigation-history');

var _userStateStorage = require('./../state/user-state-storage');

var _stateDiscriminator = require('./../state/state-discriminator');

var _stateUrlParser = require('./../state/state-url-parser');

var _stringHelper = require('./../helpers/string-helper');

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PeriscopeRouter = exports.PeriscopeRouter = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _aureliaEventAggregator.EventAggregator, _userStateStorage.UserStateStorage, _navigationHistory.NavigationHistory, _stateUrlParser.StateUrlParser), _dec(_class = function () {
  function PeriscopeRouter(aureliaRouter, eventAggregator, userStateStorage, navigationHistory) {
    _classCallCheck(this, PeriscopeRouter);

    this._aureliaRouter = aureliaRouter;
    this._navigationHistory = navigationHistory;
    this._userStateStorage = userStateStorage;
    this._eventAggregator = eventAggregator;
  }

  PeriscopeRouter.prototype.navigate = function navigate(routeItem) {
    if (this.currentRouteItem) {
      var currentWidgetsState = _stateDiscriminator.StateDiscriminator.discriminate(this._userStateStorage.getAll(this.currentRouteItem.dashboardName));
      var url = "/" + this.currentRouteItem.dashboardName + _stateUrlParser.StateUrlParser.stateToQuery(currentWidgetsState);
      if (_.filter(this._navigationHistory.items, function (i) {
        return _stringHelper.StringHelper.compare(i.url, url);
      }).length === 0) {
        this._navigationHistory.add(url, this.currentRouteItem.title, this.currentRouteItem.dashboardName, currentWidgetsState, new Date());
      } else if (!_stringHelper.StringHelper.compare(url, this.currentRouteItem.route)) {
        this._navigationHistory.update(url, new Date());
      }
    }

    var routeWidgetsState = _stateUrlParser.StateUrlParser.queryToState(routeItem.route);
    var storageWidgetsState = _stateDiscriminator.StateDiscriminator.discriminate(this._userStateStorage.getAll(routeItem.dashboardName));
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

      this._userStateStorage.remove(oldSt.key);
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

      this._userStateStorage.set(newSt.key, newSt.value);
    }
    if (_.filter(this._navigationHistory.items, function (i) {
      return _stringHelper.StringHelper.compare(i.url, routeItem.route);
    }).length === 0) {
      this._navigationHistory.add(routeItem.route, routeItem.title, routeItem.dashboardName, this._userStateStorage.getAll(routeItem.dashboardName), new Date());
    }

    this.currentRouteItem = routeItem;
    this._aureliaRouter.navigate(routeItem.route);
  };

  _createClass(PeriscopeRouter, [{
    key: 'currentRouteItem',
    get: function get() {
      return this._currentRoute;
    },
    set: function set(value) {
      this._currentRoute = value;
    }
  }]);

  return PeriscopeRouter;
}()) || _class);