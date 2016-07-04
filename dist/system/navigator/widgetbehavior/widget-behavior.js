"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var WidgetBehavior;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("WidgetBehavior", WidgetBehavior = function () {
        function WidgetBehavior() {
          _classCallCheck(this, WidgetBehavior);
        }

        WidgetBehavior.prototype.attachToWidget = function attachToWidget(widget) {
          this.widget = widget;
          this.widget.behaviors.push(this);
        };

        WidgetBehavior.prototype.detach = function detach() {
          if (!this.widget) return;
          for (var i = 0; i < this.widget.behaviors.length; i++) {
            if (this.widget.behaviors[i] === this) {
              this.widget.behaviors.splice(i, 1);
              break;
            }
          }
        };

        return WidgetBehavior;
      }());

      _export("WidgetBehavior", WidgetBehavior);
    }
  };
});