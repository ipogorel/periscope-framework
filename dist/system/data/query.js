"use strict";

System.register(["../helpers/string-helper"], function (_export, _context) {
  var StringHelper, Query;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_helpersStringHelper) {
      StringHelper = _helpersStringHelper.StringHelper;
    }],
    execute: function () {
      _export("Query", Query = function () {
        function Query() {
          _classCallCheck(this, Query);
        }

        Query.prototype.cacheKey = function cacheKey() {
          return Math.abs(StringHelper.hashCode((this.filter ? JSON.stringify(this.filter) : "") + (this.fields ? this.fields.join("") : "") + (this.sort ? this.sort : "") + (this.sortDir ? this.sortDir : "") + (this.take ? this.take : "0") + (this.skip ? this.skip : "0")));
        };

        return Query;
      }());

      _export("Query", Query);
    }
  };
});