'use strict';

System.register(['./listner-behavior', 'lodash'], function (_export, _context) {
  "use strict";

  var ListenerBehavior, _, SettingsHandleBehavior;

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
    setters: [function (_listnerBehavior) {
      ListenerBehavior = _listnerBehavior.ListenerBehavior;
    }, function (_lodash) {
      _ = _lodash;
    }],
    execute: function () {
      _export('SettingsHandleBehavior', SettingsHandleBehavior = function (_ListenerBehavior) {
        _inherits(SettingsHandleBehavior, _ListenerBehavior);

        function SettingsHandleBehavior(channel, eventAggregator, messageMapper) {
          _classCallCheck(this, SettingsHandleBehavior);

          var _this = _possibleConstructorReturn(this, _ListenerBehavior.call(this));

          _this.channel = channel;
          _this._eventAggregator = eventAggregator;

          _this._messageMapper = messageMapper;
          return _this;
        }

        SettingsHandleBehavior.prototype.attachToWidget = function attachToWidget(widget) {
          _ListenerBehavior.prototype.attachToWidget.call(this, widget);
          var me = this;
          this.subscription = this._eventAggregator.subscribe(this.channel, function (message) {
            var settingsToApply = me._messageMapper ? me._messageMapper(message.params) : message.params;
            _.forOwn(settingsToApply, function (v, k) {
              me.widget[k] = v;
            });

            me.widget.refresh();
          });
        };

        SettingsHandleBehavior.prototype.detach = function detach() {
          _ListenerBehavior.prototype.detach.call(this, dashboard);
          if (this.subscription) this.subscription.dispose();
        };

        return SettingsHandleBehavior;
      }(ListenerBehavior));

      _export('SettingsHandleBehavior', SettingsHandleBehavior);
    }
  };
});