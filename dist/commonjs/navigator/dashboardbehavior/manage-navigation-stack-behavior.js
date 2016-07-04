"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManageNavigationStackBehavior = undefined;

var _dashboardBehavior = require("./dashboard-behavior");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ManageNavigationStackBehavior = exports.ManageNavigationStackBehavior = function (_DashboardBehavior) {
  _inherits(ManageNavigationStackBehavior, _DashboardBehavior);

  function ManageNavigationStackBehavior(eventAggregator) {
    _classCallCheck(this, ManageNavigationStackBehavior);

    var _this = _possibleConstructorReturn(this, _DashboardBehavior.call(this));

    _this._eventAggregator = eventAggregator;
    return _this;
  }

  ManageNavigationStackBehavior.prototype.attach = function attach(dashboard) {
    _DashboardBehavior.prototype.attach.call(this, dashboard);
    var me = this;

    this.subscription = this._eventAggregator.subscribe("widget-back-button-channel", function (message) {
      var originatorWidget = dashboard.getWidgetByName(message.originatorName);
      if (originatorWidget) {
        var previousWidget = message.params.navigationStack.pop();
        dashboard.replaceWidget(originatorWidget, previousWidget);
      }
    });
  };

  ManageNavigationStackBehavior.prototype.detach = function detach() {
    _DashboardBehavior.prototype.detach.call(this, dashboard);
    if (this.subscription) this.subscription.dispose();
  };

  return ManageNavigationStackBehavior;
}(_dashboardBehavior.DashboardBehavior);