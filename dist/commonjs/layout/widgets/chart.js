'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chart = undefined;

var _aureliaFramework = require('aurelia-framework');

var _widget = require('./widget');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chart = exports.Chart = function (_Widget) {
  _inherits(Chart, _Widget);

  function Chart() {
    _classCallCheck(this, Chart);

    var _this = _possibleConstructorReturn(this, _Widget.call(this));

    _this.stateType = "chartState";
    _this.attachBehaviors();
    return _this;
  }

  Chart.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
    configurationInfo.addValue("categoriesField", this.categoriesField);
    configurationInfo.addValue("seriesDefaults", this.seriesDefaults);
    _Widget.prototype.persistConfigurationTo.call(this, configurationInfo);
  };

  Chart.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
    this.categoriesField = configurationInfo.getValue("categoriesField");
    this.seriesDefaults = configurationInfo.getValue("seriesDefaults");
    _Widget.prototype.restoreConfigurationFrom.call(this, configurationInfo);
  };

  return Chart;
}(_widget.Widget);