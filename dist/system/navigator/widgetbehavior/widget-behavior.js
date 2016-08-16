"use strict";

System.register(["./../../serialization/configurable"], function (_export, _context) {
  "use strict";

  var Configurable, WidgetBehavior;

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

  return {
    setters: [function (_serializationConfigurable) {
      Configurable = _serializationConfigurable.Configurable;
    }],
    execute: function () {
      _export("WidgetBehavior", WidgetBehavior = function (_Configurable) {
        _inherits(WidgetBehavior, _Configurable);

        function WidgetBehavior() {
          _classCallCheck(this, WidgetBehavior);

          return _possibleConstructorReturn(this, _Configurable.apply(this, arguments));
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

        WidgetBehavior.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
          configurationInfo.addValue("channel", this.channel);
        };

        WidgetBehavior.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
          this.channel = configurationInfo.getValue("channel");
        };

        return WidgetBehavior;
      }(Configurable));

      _export("WidgetBehavior", WidgetBehavior);
    }
  };
});