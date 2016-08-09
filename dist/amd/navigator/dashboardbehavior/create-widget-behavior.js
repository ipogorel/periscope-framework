define(["exports", "./dashboard-behavior"], function (exports, _dashboardBehavior) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CreateWidgetBehavior = undefined;

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

  var CreateWidgetBehavior = exports.CreateWidgetBehavior = function (_DashboardBehavior) {
    _inherits(CreateWidgetBehavior, _DashboardBehavior);

    function CreateWidgetBehavior(settings) {
      _classCallCheck(this, CreateWidgetBehavior);

      var _this = _possibleConstructorReturn(this, _DashboardBehavior.call(this));

      _this.eventAggregator = settings.eventAggregator;

      _this.chanel = settings.chanel;
      _this.widgetType = settings.widgetType;
      _this.widgetSettings = settings.widgetSettings;
      _this.widgetDimensions = settings.widgetDimensions;
      _this.filterMapper = settings.filterMapper;
      return _this;
    }

    CreateWidgetBehavior.prototype.attach = function attach(dashboard) {
      var _this2 = this;

      _DashboardBehavior.prototype.attach.call(this, dashboard);
      var me = this;
      this.subscription = this.eventAggregator.subscribe(this.chanel, function (message) {
        var w = dashboard.getWidgetByName(me.widgetSettings.name);
        if (!w) {
          var w = new me.widgetType(me.widgetSettings);
          dashboard.addWidget(w, _this2.widgetDimensions);
        }
        w.dataFilter = me.filterMapper ? me.filterMapper(message) : "";
        w.refresh();
      });
    };

    CreateWidgetBehavior.prototype.detach = function detach() {
      _DashboardBehavior.prototype.detach.call(this, dashboard);
      if (this.subscription) this.subscription.dispose();
    };

    return CreateWidgetBehavior;
  }(_dashboardBehavior.DashboardBehavior);
});