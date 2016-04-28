'use strict';

exports.__esModule = true;
exports.DetailedView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _aureliaFramework = require('aurelia-framework');

var _widget = require('./widget');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DetailedView = exports.DetailedView = function (_Widget) {
  _inherits(DetailedView, _Widget);

  function DetailedView(settings) {
    _classCallCheck(this, DetailedView);

    var _this = _possibleConstructorReturn(this, _Widget.call(this, settings));

    _this.fields = settings.fields;
    _this.stateType = "detailedViewState";
    _this.attachBehaviors();
    return _this;
  }

  _createClass(DetailedView, [{
    key: 'fields',
    get: function get() {
      return this._fields;
    },
    set: function set(value) {
      this._fields = value;
    }
  }]);

  return DetailedView;
}(_widget.Widget);