'use strict';

System.register(['pegjs'], function (_export, _context) {
  var peg, ExpressionParser;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_pegjs) {
      peg = _pegjs;
    }],
    execute: function () {
      _export('ExpressionParser', ExpressionParser = function () {
        function ExpressionParser(grammarText) {
          _classCallCheck(this, ExpressionParser);

          this.parser = peg.buildParser(grammarText);
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

      _export('ExpressionParser', ExpressionParser);
    }
  };
});