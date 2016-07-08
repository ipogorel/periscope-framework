'use strict';

System.register(['./dashboard-behavior'], function (_export, _context) {
  var DashboardBehavior, ReplaceWidgetBehavior;

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

  return {
    setters: [function (_dashboardBehavior) {
      DashboardBehavior = _dashboardBehavior.DashboardBehavior;
    }],
    execute: function () {
      _export('ReplaceWidgetBehavior', ReplaceWidgetBehavior = function (_DashboardBehavior) {
        _inherits(ReplaceWidgetBehavior, _DashboardBehavior);

        function ReplaceWidgetBehavior(settings) {
          _classCallCheck(this, ReplaceWidgetBehavior);

          var _this = _possibleConstructorReturn(this, _DashboardBehavior.call(this));

          _this._channel = settings.channel;
          _this._widgetType = settings.widgetType;
          _this._widgetSettings = settings.widgetSettings;
          _this._eventAggregator = settings.eventAggregator;
          _this._widgetToReplaceName = settings.widgetToReplaceName;
          _this._mapper = settings.mapper;
          _this._queryPattern = settings.queryPattern;
          return _this;
        }

        ReplaceWidgetBehavior.prototype.attach = function attach(dashboard) {
          _DashboardBehavior.prototype.attach.call(this, dashboard);
          var me = this;
          this.subscription = this._eventAggregator.subscribe(this._channel, function (message) {
            var originatorWidget = dashboard.getWidgetByName(me._widgetToReplaceName);
            var w = new me._widgetType(me._widgetSettings);
            dashboard.replaceWidget(originatorWidget, w);
            w.dataFilter = me._mapper ? me._mapper(message) : message.params.dataFilter;
            w.refresh();
          });
        };

        ReplaceWidgetBehavior.prototype.detach = function detach() {
          _DashboardBehavior.prototype.detach.call(this, dashboard);
          if (this.subscription) this.subscription.dispose();
        };

        return ReplaceWidgetBehavior;
      }(DashboardBehavior));

      _export('ReplaceWidgetBehavior', ReplaceWidgetBehavior);
    }
  };
});