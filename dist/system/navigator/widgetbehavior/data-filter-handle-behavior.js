'use strict';

System.register(['./listner-behavior', 'aurelia-event-aggregator', 'aurelia-framework'], function (_export, _context) {
  var ListenerBehavior, EventAggregator, inject, _dec, _class, DataFilterHandleBehavior;

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
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }],
    execute: function () {
      _export('DataFilterHandleBehavior', DataFilterHandleBehavior = (_dec = inject(EventAggregator), _dec(_class = function (_ListenerBehavior) {
        _inherits(DataFilterHandleBehavior, _ListenerBehavior);

        function DataFilterHandleBehavior(eventAggregator) {
          _classCallCheck(this, DataFilterHandleBehavior);

          var _this = _possibleConstructorReturn(this, _ListenerBehavior.call(this));

          _this._eventAggregator = eventAggregator;
          return _this;
        }

        DataFilterHandleBehavior.prototype.attachToWidget = function attachToWidget(widget) {
          _ListenerBehavior.prototype.attachToWidget.call(this, widget);
          var me = this;
          this.subscription = this._eventAggregator.subscribe(this.channel, function (message) {
            var filterToApply = me._filterMapper ? me._filterMapper(message.params) : message.params.dataFilter;
            me.widget.dataFilter = filterToApply;
            me.widget.refresh();
          });
        };

        DataFilterHandleBehavior.prototype.detach = function detach() {
          _ListenerBehavior.prototype.detach.call(this, dashboard);
          if (this.subscription) this.subscription.dispose();
        };

        DataFilterHandleBehavior.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
          configurationInfo.addScript("filterMapper", this.filterMapper);
          _ListenerBehavior.prototype.persistConfigurationTo.call(this, configurationInfo);
        };

        DataFilterHandleBehavior.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
          this.filterMapper = configurationInfo.getScript("filterMapper");
          _ListenerBehavior.prototype.restoreConfigurationFrom.call(this, configurationInfo);
        };

        return DataFilterHandleBehavior;
      }(ListenerBehavior)) || _class));

      _export('DataFilterHandleBehavior', DataFilterHandleBehavior);
    }
  };
});