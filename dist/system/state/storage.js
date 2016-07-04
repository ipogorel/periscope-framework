'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var Storage;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('Storage', Storage = function () {
        function Storage() {
          _classCallCheck(this, Storage);

          this._provider = this._initProvider('Warning: Local Storage is disabled or unavailable.');
        }

        Storage.prototype.set = function set(key, value) {
          if (this._provider) return this._provider.setItem(key, JSON.stringify(value));
          return undefined;
        };

        Storage.prototype.get = function get(key) {

          if (this._provider) return JSON.parse(this._provider.getItem(key));
          return undefined;
        };

        Storage.prototype.clear = function clear() {
          if (this._provider) this._provider.clear();
        };

        Storage.prototype._initProvider = function _initProvider(warning) {
          if ('sessionStorage' in window && window['sessionStorage'] !== null) {
            return sessionStorage;
          } else {
            console.warn(warning);
            return undefined;
          }
        };

        return Storage;
      }());

      _export('Storage', Storage);
    }
  };
});