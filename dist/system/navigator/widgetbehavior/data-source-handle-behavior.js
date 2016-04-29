'use strict';

System.register(['./widget-behavior'], function (_export, _context) {
  var WidgetBehavior, DataSourceHandleBehavior;

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
    setters: [function (_widgetBehavior) {
      WidgetBehavior = _widgetBehavior.WidgetBehavior;
    }],
    execute: function () {
      _export('DataSourceHandleBehavior', DataSourceHandleBehavior = function (_WidgetBehavior) {
        _inherits(DataSourceHandleBehavior, _WidgetBehavior);

        function DataSourceHandleBehavior(channel, eventAggregator) {
          _classCallCheck(this, DataSourceHandleBehavior);

          var _this = _possibleConstructorReturn(this, _WidgetBehavior.call(this));

          _this._channel = channel;
          _this._eventAggregator = eventAggregator;
          return _this;
        }

        DataSourceHandleBehavior.prototype.attachToWidget = function attachToWidget(widget) {
          _WidgetBehavior.prototype.attachToWidget.call(this, widget);
          var me = this;
          this.subscription = this._eventAggregator.subscribe(this._channel, function (message) {
            me.widget.dataSource = message.dataSource;
            me.widget.refresh();
          });
        };

        DataSourceHandleBehavior.prototype.detach = function detach() {
          _WidgetBehavior.prototype.detach.call(this, dashboard);
          if (this.subscription) this.subscription.dispose();
        };

        return DataSourceHandleBehavior;
      }(WidgetBehavior));

      _export('DataSourceHandleBehavior', DataSourceHandleBehavior);
    }
  };
});