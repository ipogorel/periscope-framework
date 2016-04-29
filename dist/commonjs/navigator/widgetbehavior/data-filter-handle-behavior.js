'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataFilterHandleBehavior = undefined;

var _widgetBehavior = require('./widget-behavior');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataFilterHandleBehavior = exports.DataFilterHandleBehavior = function (_WidgetBehavior) {
  _inherits(DataFilterHandleBehavior, _WidgetBehavior);

  function DataFilterHandleBehavior(channel, eventAggregator, filterMapper) {
    _classCallCheck(this, DataFilterHandleBehavior);

    var _this = _possibleConstructorReturn(this, _WidgetBehavior.call(this));

    _this._channel = channel;
    _this._eventAggregator = eventAggregator;
    _this._filterMapper = filterMapper;
    return _this;
  }

  DataFilterHandleBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    _WidgetBehavior.prototype.attachToWidget.call(this, widget);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._channel, function (message) {
      var filterToApply = me._filterMapper ? me._filterMapper(message) : message.dataFilter;
      me.widget.dataFilter = filterToApply;
      me.widget.refresh();
    });
  };

  DataFilterHandleBehavior.prototype.detach = function detach() {
    _WidgetBehavior.prototype.detach.call(this, dashboard);
    if (this.subscription) this.subscription.dispose();
  };

  return DataFilterHandleBehavior;
}(_widgetBehavior.WidgetBehavior);