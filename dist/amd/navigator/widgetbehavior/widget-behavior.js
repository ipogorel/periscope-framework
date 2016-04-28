"use strict";

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WidgetBehavior = exports.WidgetBehavior = function () {
  function WidgetBehavior() {
    _classCallCheck(this, WidgetBehavior);
  }

  WidgetBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    this._widget = widget;
    this._widget.behaviors.push(this);
  };

  WidgetBehavior.prototype.detach = function detach() {
    for (var i = 0; i < this.widget.behaviors.length; i++) {
      if (this.widget.behaviors[i] === this) {
        this.widget.behaviors.splice(i, 1);
        break;
      }
    }
  };

  _createClass(WidgetBehavior, [{
    key: "widget",
    get: function get() {
      return this._widget;
    }
  }]);

  return WidgetBehavior;
}();