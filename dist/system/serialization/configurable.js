"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var Configurable;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("Configurable", Configurable = function () {
        function Configurable() {
          _classCallCheck(this, Configurable);
        }

        Configurable.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {};

        Configurable.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {};

        return Configurable;
      }());

      _export("Configurable", Configurable);
    }
  };
});