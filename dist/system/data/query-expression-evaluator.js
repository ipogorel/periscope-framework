"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var QueryExpressionEvaluator;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      String.prototype.in = function (array) {
        for (var i = 0; i < array.length; i++) {
          if (array[i] == this) return true;
        }
        return false;
      };

      _export("QueryExpressionEvaluator", QueryExpressionEvaluator = function () {
        function QueryExpressionEvaluator() {
          _classCallCheck(this, QueryExpressionEvaluator);
        }

        QueryExpressionEvaluator.prototype.evaluate = function evaluate(data, searchExpression) {
          var res = [];
          if (searchExpression != "") {
            for (var _iterator = data, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
              var _ref;

              if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
              } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
              }

              var record = _ref;

              if (eval(searchExpression)) {
                res.push(record);
              }
            }
          } else res = data;
          return res;
        };

        return QueryExpressionEvaluator;
      }());

      _export("QueryExpressionEvaluator", QueryExpressionEvaluator);
    }
  };
});