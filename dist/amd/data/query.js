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

  var Query = exports.Query = function () {
    function Query() {
      _classCallCheck(this, Query);
    }

    Query.prototype.cacheKey = function cacheKey() {
      return Math.abs(_stringHelper.StringHelper.hashCode((this.filter ? JSON.stringify(this.filter) : "") + (this.fields ? this.fields.join("") : "") + (this.sort ? this.sort : "") + (this.sortDir ? this.sortDir : "") + (this.take ? this.take : "0") + (this.skip ? this.skip : "0")));
    };

    return Query;
  }();
});