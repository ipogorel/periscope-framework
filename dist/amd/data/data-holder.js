define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

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

  var DataHolder = exports.DataHolder = function () {
    function DataHolder() {
      _classCallCheck(this, DataHolder);
    }

    _createClass(DataHolder, [{
      key: "data",
      get: function get() {
        return this._data;
      },
      set: function set(value) {
        this._data = value;
      }
    }, {
      key: "total",
      get: function get() {
        return this._total;
      },
      set: function set(value) {
        this._total = value;
      }
    }, {
      key: "query",
      get: function get() {
        return this._query;
      },
      set: function set(value) {
        this._query = value;
      }
    }]);

    return DataHolder;
  }();
});