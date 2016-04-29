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

  var CacheStorage = exports.CacheStorage = function () {
    function CacheStorage() {
      _classCallCheck(this, CacheStorage);
    }

    CacheStorage.prototype.setItem = function setItem(key, value, expiration) {};

    CacheStorage.prototype.getItem = function getItem(key) {};

    CacheStorage.prototype.removeItem = function removeItem(key) {};

    CacheStorage.prototype.removeExpired = function removeExpired() {};

    return CacheStorage;
  }();
});