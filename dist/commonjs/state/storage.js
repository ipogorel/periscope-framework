'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Storage = exports.Storage = function () {
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
}();