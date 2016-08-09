define(['exports', 'aurelia-framework', './widget', './../../navigator/events/widget-event'], function (exports, _aureliaFramework, _widget, _widgetEvent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SearchBox = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

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

  var SearchBox = exports.SearchBox = function (_Widget) {
    _inherits(SearchBox, _Widget);

    function SearchBox(settings) {
      _classCallCheck(this, SearchBox);

      var _this = _possibleConstructorReturn(this, _Widget.call(this, settings));

      _this._dataFilterChanged = new _widgetEvent.WidgetEvent();

      _this.stateType = "searchBoxState";
      _this.attachBehaviors();
      return _this;
    }

    SearchBox.prototype.saveState = function saveState() {
      this.setState(this.searchString);
    };

    SearchBox.prototype.restoreState = function restoreState() {
      var s = this.getState();
      if (s) this.searchString = s;else this.searchString = "";
    };

    _createClass(SearchBox, [{
      key: 'dataFilterChanged',
      get: function get() {
        return this._dataFilterChanged;
      },
      set: function set(handler) {
        this._dataFilterChanged.attach(handler);
      }
    }]);

    return SearchBox;
  }(_widget.Widget);
});