'use strict';

System.register(['./widget-behavior', './../behavior-type'], function (_export, _context) {
  "use strict";

  var WidgetBehavior, BehaviorType, BroadcasterBehavior;

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
    }, function (_behaviorType) {
      BehaviorType = _behaviorType.BehaviorType;
    }],
    execute: function () {
      _export('BroadcasterBehavior', BroadcasterBehavior = function (_WidgetBehavior) {
        _inherits(BroadcasterBehavior, _WidgetBehavior);

        function BroadcasterBehavior() {
          _classCallCheck(this, BroadcasterBehavior);

          var _this = _possibleConstructorReturn(this, _WidgetBehavior.call(this));

          _this.behaviortype = BehaviorType.broadcaster;
          return _this;
        }

        BroadcasterBehavior.prototype.attachToWidget = function attachToWidget(widget) {
          if (!widget[this.eventToAttach]) throw "widget " + widget.name + " hasn't '" + this.eventToAttach + "' event";
          _WidgetBehavior.prototype.attachToWidget.call(this, widget);
        };

        BroadcasterBehavior.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
          configurationInfo.addValue("channel", this.channel);
        };

        BroadcasterBehavior.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
          this.channel = configurationInfo.getValue("channel");
        };

        return BroadcasterBehavior;
      }(WidgetBehavior));

      _export('BroadcasterBehavior', BroadcasterBehavior);
    }
  };
});