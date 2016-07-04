"use strict";

System.register(["./dashboard-behavior"], function (_export, _context) {
  "use strict";

  var DashboardBehavior, CreateWidgetBehavior;

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
      _export("CreateWidgetBehavior", CreateWidgetBehavior = function (_DashboardBehavior) {
        _inherits(CreateWidgetBehavior, _DashboardBehavior);

        function CreateWidgetBehavior(chanel, widgetType, widgetSettings, widgetDimensions, eventAggregator, filterMapper) {
          _classCallCheck(this, CreateWidgetBehavior);

          var _this = _possibleConstructorReturn(this, _DashboardBehavior.call(this));

          _this._chanel = chanel;
          _this._widgetType = widgetType;
          _this._widgetSettings = widgetSettings;
          _this._widgetDimensions = widgetDimensions;
          _this._eventAggregator = eventAggregator;
          _this._filterMapper = filterMapper;
          return _this;
        }

        CreateWidgetBehavior.prototype.attach = function attach(dashboard) {
          var _this2 = this;

          _DashboardBehavior.prototype.attach.call(this, dashboard);
          var me = this;
          this.subscription = this._eventAggregator.subscribe(this._chanel, function (message) {
            var w = dashboard.getWidgetByName(me._widgetSettings.name);
            if (!w) {
              var w = new me._widgetType(me._widgetSettings);
              dashboard.addWidget(w, _this2._widgetDimensions);
            }
            w.dataFilter = me._filterMapper ? me._filterMapper(message) : "";
            w.refresh();
          });
        };

        CreateWidgetBehavior.prototype.detach = function detach() {
          _DashboardBehavior.prototype.detach.call(this, dashboard);
          if (this.subscription) this.subscription.dispose();
        };

        return CreateWidgetBehavior;
      }(DashboardBehavior));

      _export("CreateWidgetBehavior", CreateWidgetBehavior);
    }
  };
});