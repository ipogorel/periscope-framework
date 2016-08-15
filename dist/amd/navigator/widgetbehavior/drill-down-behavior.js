define(['exports', './broadcaster-behavior', '../events/widget-event-message', '../../helpers/string-helper', 'lodash'], function (exports, _broadcasterBehavior, _widgetEventMessage, _stringHelper, _lodash) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DrillDownBehaviorConfiguration = exports.DrillDownBehavior = undefined;

  var _ = _interopRequireWildcard(_lodash);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

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

  var DrillDownBehavior = exports.DrillDownBehavior = function (_BroadcasterBehavior) {
    _inherits(DrillDownBehavior, _BroadcasterBehavior);

    function DrillDownBehavior(channel, eventAggregator, dataSource) {
      _classCallCheck(this, DrillDownBehavior);

      var _this = _possibleConstructorReturn(this, _BroadcasterBehavior.call(this));

      _this.queryPattern = "";
      _this.dataServiceUrl = "";
      _this.isConfigured = false;

      _this.channel = channel;
      _this.eventToAttach = "dataActivated";
      _this._eventAggregator = eventAggregator;
      _this._dataSource = dataSource;
      return _this;
    }

    DrillDownBehavior.prototype.configure = function configure(drillDownBehaviorConfiguration) {
      this.queryPattern = drillDownBehaviorConfiguration.queryPattern;
      this.dataServiceUrl = drillDownBehaviorConfiguration.dataServiceUrl;
      this.isConfigured = true;
    };

    DrillDownBehavior.prototype.attachToWidget = function attachToWidget(widget) {
      _BroadcasterBehavior.prototype.attachToWidget.call(this, widget);
      var me = this;

      widget[this.eventToAttach] = function (currentRecord) {
        if (!me.isConfigured) return;
        var message = new _widgetEventMessage.WidgetEventMessage(me.widget.name);
        var query = me.queryPattern;
        _.forOwn(currentRecord, function (value, key) {
          query = _stringHelper.StringHelper.replaceAll(query, "@" + key, value);
        });

        message.params = { dataFilter: query, dataServiceUrl: me.dataServiceUrl };
        me._eventAggregator.publish(me.channel, message);
      };
    };

    DrillDownBehavior.prototype.detach = function detach() {
      _BroadcasterBehavior.prototype.detach.call(this, dashboard);
    };

    DrillDownBehavior.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
      _BroadcasterBehavior.prototype.persistConfigurationTo.call(this, configurationInfo);
    };

    DrillDownBehavior.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
      _BroadcasterBehavior.prototype.restoreConfigurationFrom.call(this, configurationInfo);
    };

    return DrillDownBehavior;
  }(_broadcasterBehavior.BroadcasterBehavior);

  var DrillDownBehaviorConfiguration = exports.DrillDownBehaviorConfiguration = function DrillDownBehaviorConfiguration() {
    _classCallCheck(this, DrillDownBehaviorConfiguration);
  };
});