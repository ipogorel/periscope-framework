'use strict';

System.register(['aurelia-framework'], function (_export, _context) {
  "use strict";

  var resolver, _class, Factory;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      resolver = _aureliaFramework.resolver;
    }],
    execute: function () {
      _export('Factory', Factory = resolver(_class = function () {
        function Factory(Type) {
          _classCallCheck(this, Factory);

          this.Type = Type;
        }

        Factory.prototype.get = function get(container) {
          var _this = this;

          return function () {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
              rest[_key] = arguments[_key];
            }

            return container.invoke(_this.Type, rest);
          };
        };

        Factory.of = function of(Type) {
          return new Factory(Type);
        };

        return Factory;
      }()) || _class);

      _export('Factory', Factory);
    }
  };
});