define(['exports', './listner-behavior', 'aurelia-event-aggregator', 'aurelia-framework'], function (exports, _listnerBehavior, _aureliaEventAggregator, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DataSourceHandleBehavior = undefined;

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

  var DataSourceHandleBehavior = exports.DataSourceHandleBehavior = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function (_ListenerBehavior) {
    _inherits(DataSourceHandleBehavior, _ListenerBehavior);

    function DataSourceHandleBehavior(eventAggregator) {
      _classCallCheck(this, DataSourceHandleBehavior);

      var _this = _possibleConstructorReturn(this, _ListenerBehavior.call(this));

      _this._eventAggregator = eventAggregator;
      return _this;
    }

    DataSourceHandleBehavior.prototype.attachToWidget = function attachToWidget(widget) {
      _ListenerBehavior.prototype.attachToWidget.call(this, widget);
      var me = this;
      this.subscription = this._eventAggregator.subscribe(this.channel, function (message) {
        me.widget.dataSource = message.params.dataSource;
        me.widget.refresh();
      });
    };

    DataSourceHandleBehavior.prototype.detach = function detach() {
      _ListenerBehavior.prototype.detach.call(this, dashboard);
      if (this.subscription) this.subscription.dispose();
    };

    DataSourceHandleBehavior.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
      _ListenerBehavior.prototype.persistConfigurationTo.call(this, configurationInfo);
    };

    DataSourceHandleBehavior.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
      _ListenerBehavior.prototype.restoreConfigurationFrom.call(this, configurationInfo);
    };

    return DataSourceHandleBehavior;
  }(_listnerBehavior.ListenerBehavior)) || _class);
});