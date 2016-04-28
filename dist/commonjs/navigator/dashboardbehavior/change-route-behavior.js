"use strict";

exports.__esModule = true;
exports.ChangeRouteBehavior = undefined;

var _dashboardBehavior = require("./dashboard-behavior");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChangeRouteBehavior = exports.ChangeRouteBehavior = function (_DashboardBehavior) {
  _inherits(ChangeRouteBehavior, _DashboardBehavior);

  function ChangeRouteBehavior(settings) {
    _classCallCheck(this, ChangeRouteBehavior);

    var _this = _possibleConstructorReturn(this, _DashboardBehavior.call(this));

    _this._chanel = settings.chanel;
    _this._eventAggregator = settings.eventAggregator;
    _this._newRoute = settings.newRoute;
    _this._router = settings.router;
    _this._paramsMapper = settings.paramsMapper;
    return _this;
  }

  ChangeRouteBehavior.prototype.attach = function attach(dashboard) {
    _DashboardBehavior.prototype.attach.call(this, dashboard);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._chanel, function (message) {
      var params = me._paramsMapper ? me._paramsMapper(message) : "";
      if (params !== "" && params.indexOf("?") != 0) params = "?" + params;
      var navItem = {
        route: me._newRoute.route + (params !== "" ? params : ""),
        title: me._newRoute.title,
        dashboardName: me._newRoute.dashboardName
      };
      me._router.navigate(navItem);
    });
  };

  ChangeRouteBehavior.prototype.detach = function detach() {
    _DashboardBehavior.prototype.detach.call(this, dashboard);
    if (this.subscription) this.subscription.dispose();
  };

  return ChangeRouteBehavior;
}(_dashboardBehavior.DashboardBehavior);