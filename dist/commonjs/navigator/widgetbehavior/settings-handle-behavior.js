'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsHandleBehavior = undefined;

var _dec, _class;

var _listnerBehavior = require('./listner-behavior');

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _aureliaEventAggregator = require('aurelia-event-aggregator');

var _aureliaFramework = require('aurelia-framework');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SettingsHandleBehavior = exports.SettingsHandleBehavior = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function (_ListenerBehavior) {
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
      var settingsToApply = me.messageMapper ? me.messageMapper(message.params) : message.params;
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
}(_listnerBehavior.ListenerBehavior)) || _class);