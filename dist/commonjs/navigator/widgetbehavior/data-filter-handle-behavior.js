'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataFilterHandleBehavior = undefined;

var _dec, _class;

var _listnerBehavior = require('./listner-behavior');

var _aureliaEventAggregator = require('aurelia-event-aggregator');

var _aureliaFramework = require('aurelia-framework');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataFilterHandleBehavior = exports.DataFilterHandleBehavior = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function (_ListenerBehavior) {
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
}(_listnerBehavior.ListenerBehavior)) || _class);