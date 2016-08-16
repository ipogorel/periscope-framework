"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var CacheStorage;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("CacheStorage", CacheStorage = function () {
        function CacheStorage() {
          _classCallCheck(this, CacheStorage);
        }

        CacheStorage.prototype.setItem = function setItem(key, value, expiration) {};

        CacheStorage.prototype.getItem = function getItem(key) {};

        CacheStorage.prototype.removeItem = function removeItem(key) {};

        CacheStorage.prototype.removeExpired = function removeExpired() {};

        return CacheStorage;
      }());

      _export("CacheStorage", CacheStorage);
    }
  };
});