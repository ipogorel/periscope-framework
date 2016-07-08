"use strict";

System.register([], function (_export, _context) {
  var _createClass, BehaviorType;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export("BehaviorType", BehaviorType = function () {
        function BehaviorType() {
          _classCallCheck(this, BehaviorType);
        }

        _createClass(BehaviorType, null, [{
          key: "listener",
          get: function get() {
            return "listener";
          }
        }, {
          key: "broadcaster",
          get: function get() {
            return "broadcaster";
          }
        }]);

        return BehaviorType;
      }());

      _export("BehaviorType", BehaviorType);
    }
  };
});