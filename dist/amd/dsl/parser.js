define(['exports', 'pegjs'], function (exports, _pegjs) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ExpressionParser = undefined;

  var peg = _interopRequireWildcard(_pegjs);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ExpressionParser = exports.ExpressionParser = function () {
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
  }();
});