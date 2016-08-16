'use strict';

System.register(['./listner-behavior', 'lodash', 'aurelia-event-aggregator', 'aurelia-framework'], function (_export, _context) {
  "use strict";

  var ListenerBehavior, _, EventAggregator, inject, _dec, _class, SettingsHandleBehavior;

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
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }],
    execute: function () {
      _export('SettingsHandleBehavior', SettingsHandleBehavior = (_dec = inject(EventAggregator), _dec(_class = function (_ListenerBehavior) {
        _inherits(SettingsHandleBehavior, _ListenerBehavior);

        function SettingsHandleBehavior(eventAggregator) {
          _classCallCheck(this, SettingsHandleBehavior);

          var _this = _possibleConstructorReturn(this, _ListenerBehavior.call(this));

          _this._eventAggregator = eventAggregator;

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

        SettingsHandleBehavior.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
          configurationInfo.addScript("messageMapper", this.messageMapper);
          _ListenerBehavior.prototype.persistConfigurationTo.call(this, configurationInfo);
        };

        SettingsHandleBehavior.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
          this.messageMapper = configurationInfo.getScript("messageMapper");
          _ListenerBehavior.prototype.restoreConfigurationFrom.call(this, configurationInfo);
        };

        return SettingsHandleBehavior;
      }(ListenerBehavior)) || _class));

      _export('SettingsHandleBehavior', SettingsHandleBehavior);
    }
  };
});