'use strict';

System.register(['aurelia-framework', './widget'], function (_export, _context) {
  var customElement, inject, useView, Widget, Chart;

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
    setters: [function (_aureliaFramework) {
      customElement = _aureliaFramework.customElement;
      inject = _aureliaFramework.inject;
      useView = _aureliaFramework.useView;
    }, function (_widget) {
      Widget = _widget.Widget;
    }],
    execute: function () {
      _export('Chart', Chart = function (_Widget) {
        _inherits(Chart, _Widget);

        function Chart(settings) {
          _classCallCheck(this, Chart);

          var _this = _possibleConstructorReturn(this, _Widget.call(this, settings));

          _this.stateType = "chartState";
          _this.attachBehaviors();
          return _this;
        }

        return Chart;
      }(Widget));

      _export('Chart', Chart);
    }
  };
});