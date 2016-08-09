"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WidgetBehavior = exports.WidgetBehavior = function () {
  function WidgetBehavior() {
    _classCallCheck(this, WidgetBehavior);
  }

  WidgetBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    this.widget = widget;
    this.widget.behavior.push(this);
  };

  WidgetBehavior.prototype.detach = function detach() {
    if (!this.widget) return;
    for (var i = 0; i < this.widget.behavior.length; i++) {
      if (this.widget.behavior[i] === this) {
        this.widget.behavior.splice(i, 1);
        break;
      }
    }
  };

  return WidgetBehavior;
}();