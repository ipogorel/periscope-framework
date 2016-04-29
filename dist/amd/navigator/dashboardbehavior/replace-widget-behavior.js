define(['exports', './dashboard-behavior'], function (exports, _dashboardBehavior) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ReplaceWidgetBehavior = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var ReplaceWidgetBehavior = exports.ReplaceWidgetBehavior = function (_DashboardBehavior) {
    _inherits(ReplaceWidgetBehavior, _DashboardBehavior);

    function ReplaceWidgetBehavior(chanel, eventAggregator, widgetToReplaceName, widgetType, widgetSettings, mapper) {
      _classCallCheck(this, ReplaceWidgetBehavior);

      var _this = _possibleConstructorReturn(this, _DashboardBehavior.call(this));

      _this._chanel = chanel;
      _this._widgetType = widgetType;
      _this._widgetSettings = widgetSettings;
      _this._eventAggregator = eventAggregator;
      _this._widgetToReplaceName = widgetToReplaceName;
      _this._mapper = mapper;
      return _this;
    }

    ReplaceWidgetBehavior.prototype.attach = function attach(dashboard) {
      _DashboardBehavior.prototype.attach.call(this, dashboard);
      var me = this;
      this.subscription = this._eventAggregator.subscribe(this._chanel, function (message) {
        var originatorWidget = dashboard.getWidgetByName(me._widgetToReplaceName);
        var w = new me._widgetType(me._widgetSettings);
        dashboard.replaceWidget(originatorWidget, w);
        if (me._mapper) w.dataFilter = me._mapper(message);
        w.refresh();
      });
    };

    ReplaceWidgetBehavior.prototype.detach = function detach() {
      _DashboardBehavior.prototype.detach.call(this, dashboard);
      if (this.subscription) this.subscription.dispose();
    };

    return ReplaceWidgetBehavior;
  }(_dashboardBehavior.DashboardBehavior);
});