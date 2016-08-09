define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Configurable = exports.Configurable = function () {
    function Configurable() {
      _classCallCheck(this, Configurable);
    }

    Configurable.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {};

    Configurable.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {};

    return Configurable;
  }();
});