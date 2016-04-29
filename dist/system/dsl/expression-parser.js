"use strict";

System.register([], function (_export, _context) {
  var ExpressionParser;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("ExpressionParser", ExpressionParser = function () {
        function ExpressionParser(pegParser) {
          _classCallCheck(this, ExpressionParser);

          this.parser = pegParser;
        }

        ExpressionParser.prototype.parse = function parse(searchString) {
          return this.parser.parse(searchString);
        };

        ExpressionParser.prototype.validate = function validate(searchString) {
          try {
            this.parser.parse(searchString);
            return true;
          } catch (ex) {
            return false;
          }
        };

        return ExpressionParser;
      }());

      _export("ExpressionParser", ExpressionParser);
    }
  };
});