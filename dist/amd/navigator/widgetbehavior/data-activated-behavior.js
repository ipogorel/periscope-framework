define(['exports', './broadcaster-behavior', '../events/widget-event-message', 'aurelia-event-aggregator', 'aurelia-framework'], function (exports, _broadcasterBehavior, _widgetEventMessage, _aureliaEventAggregator, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DataActivatedBehavior = undefined;

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

  var _dec, _class;

  var DataActivatedBehavior = exports.DataActivatedBehavior = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function (_BroadcasterBehavior) {
    _inherits(DataActivatedBehavior, _BroadcasterBehavior);

    function DataActivatedBehavior(eventAggregator) {
      _classCallCheck(this, DataActivatedBehavior);

      var _this = _possibleConstructorReturn(this, _BroadcasterBehavior.call(this));

      _this.eventToAttach = "dataActivated";

      _this._eventAggregator = eventAggregator;
      return _this;
    }

    DataActivatedBehavior.prototype.attachToWidget = function attachToWidget(widget) {
      _BroadcasterBehavior.prototype.attachToWidget.call(this, widget);
      var me = this;

      widget[this.eventToAttach] = function (currentRecord) {
        var message = new _widgetEventMessage.WidgetEventMessage(me.widget.name);
        message.params = { activatedData: currentRecord };
        me._eventAggregator.publish(me.channel, message);
      };
    };

    DataActivatedBehavior.prototype.detach = function detach() {
      _BroadcasterBehavior.prototype.detach.call(this, dashboard);
    };

    DataActivatedBehavior.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
      _BroadcasterBehavior.prototype.persistConfigurationTo.call(this, configurationInfo);
    };

    DataActivatedBehavior.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
      _BroadcasterBehavior.prototype.restoreConfigurationFrom.call(this, configurationInfo);
    };

    return DataActivatedBehavior;
  }(_broadcasterBehavior.BroadcasterBehavior)) || _class);
});