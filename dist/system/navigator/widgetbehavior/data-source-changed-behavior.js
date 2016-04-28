'use strict';

exports.__esModule = true;
exports.DataSourceChangedBehavior = undefined;

var _widgetBehavior = require('./widget-behavior');

var _widgetEventMessage = require('../events/widget-event-message');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataSourceChangedBehavior = exports.DataSourceChangedBehavior = function (_WidgetBehavior) {
  _inherits(DataSourceChangedBehavior, _WidgetBehavior);

  function DataSourceChangedBehavior(channel, eventAggregator) {
    _classCallCheck(this, DataSourceChangedBehavior);

    var _this = _possibleConstructorReturn(this, _WidgetBehavior.call(this));

    _this._channel = channel;
    _this._eventAggregator = eventAggregator;
    return _this;
  }

  DataSourceChangedBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    _WidgetBehavior.prototype.attachToWidget.call(this, widget);
    var me = this;
    widget.dataSourceChanged = function (dataSource) {
      var message = new _widgetEventMessage.WidgetEventMessage(me.widget.name);
      message.dataSource = dataSource;
      me._eventAggregator.publish(me._channel, message);
    };
  };

  DataSourceChangedBehavior.prototype.detach = function detach() {
    _WidgetBehavior.prototype.detach.call(this, dashboard);
  };

  return DataSourceChangedBehavior;
}(_widgetBehavior.WidgetBehavior);