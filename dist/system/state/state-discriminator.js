"use strict";

System.register([], function (_export, _context) {
  var StateDiscriminator;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("StateDiscriminator", StateDiscriminator = function () {
        function StateDiscriminator() {
          _classCallCheck(this, StateDiscriminator);
        }

        StateDiscriminator.discriminate = function discriminate(widgetStates) {
          var result = [];
          for (var _iterator = widgetStates, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var ws = _ref;

            if (ws.stateType === "searchBoxState") result.push(ws);
          }
          return result;
        };

        return StateDiscriminator;
      }());

      _export("StateDiscriminator", StateDiscriminator);
    }
  };
});