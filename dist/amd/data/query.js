define(["exports", "../helpers/string-helper"], function (exports, _stringHelper) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Query = undefined;

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

  var Query = exports.Query = function () {
    function Query() {
      _classCallCheck(this, Query);
    }

    Query.prototype.cacheKey = function cacheKey() {
      return Math.abs(_stringHelper.StringHelper.hashCode((this.filter ? JSON.stringify(this.filter) : "") + (this.fields ? this.fields.join("") : "") + (this.sort ? this.sort : "") + (this.sortDir ? this.sortDir : "") + (this.take ? this.take : "0") + (this.skip ? this.skip : "0")));
    };

    _createClass(Query, [{
      key: "sort",
      get: function get() {
        return this._sort;
      },
      set: function set(value) {
        this._sort = value;
      }
    }, {
      key: "group",
      get: function get() {
        return this._group;
      },
      set: function set(value) {
        this._group = value;
      }
    }, {
      key: "sortDir",
      get: function get() {
        return this._sortDir;
      },
      set: function set(value) {
        this._sortDir = value;
      }
    }, {
      key: "take",
      get: function get() {
        return this._take;
      },
      set: function set(value) {
        this._take = value;
      }
    }, {
      key: "fields",
      get: function get() {
        return this._fields;
      },
      set: function set(value) {
        this._fields = value;
      }
    }, {
      key: "skip",
      get: function get() {
        return this._skip;
      },
      set: function set(value) {
        this._skip = value;
      }
    }, {
      key: "filter",
      get: function get() {
        return this._filter;
      },
      set: function set(value) {
        this._filter = value;
      }
    }]);

    return Query;
  }();
});