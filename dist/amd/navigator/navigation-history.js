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

  var NavigationHistory = exports.NavigationHistory = function () {
    function NavigationHistory() {
      _classCallCheck(this, NavigationHistory);

      this._history = [];
    }

    NavigationHistory.prototype.add = function add(url, title, dashboard, state, dateTime) {
      this._history.push({ url: url, title: title, dashboard: dashboard, state: state, dateTime: dateTime });
    };

    NavigationHistory.prototype.update = function update(url, dateTime) {
      for (var _iterator = this._history, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var h = _ref;

        if (h.url === url) {
          h.dateTime = dateTime;
          break;
        }
      }
    };

    NavigationHistory.prototype.delete = function _delete(url) {
      for (var _iterator2 = this._history, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var i = _ref2;

        if (i.url === url) {
          this._history.splice(i, 1);
          break;
        }
      }
    };

    NavigationHistory.prototype.deleteAll = function deleteAll() {
      this._history = [];
    };

    NavigationHistory.prototype.trimRight = function trimRight(url) {
      for (var i = this._history.length - 1; i >= 0; i--) {
        if (this._history[i].url === url) {
          this._history.splice(i + 1);
          return;
        }
      }
    };

    NavigationHistory.prototype.exists = function exists(url) {
      for (var _iterator3 = this._history, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref3 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref3 = _i3.value;
        }

        var i = _ref3;

        if (i.route === url) return true;
      }
      return false;
    };

    _createClass(NavigationHistory, [{
      key: "items",
      get: function get() {
        return this._history;
      }
    }]);

    return NavigationHistory;
  }();
});