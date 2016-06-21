'use strict';

System.register(['./../cache/cache-storage', 'lodash'], function (_export, _context) {
  var CacheStorage, _, MemoryCacheStorage;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_cacheCacheStorage) {
      CacheStorage = _cacheCacheStorage.CacheStorage;
    }, function (_lodash) {
      _ = _lodash;
    }],
    execute: function () {
      _export('MemoryCacheStorage', MemoryCacheStorage = function (_CacheStorage) {
        _inherits(MemoryCacheStorage, _CacheStorage);

        function MemoryCacheStorage() {
          _classCallCheck(this, MemoryCacheStorage);

          var _this = _possibleConstructorReturn(this, _CacheStorage.call(this));

          _this._cache = {};
          return _this;
        }

        MemoryCacheStorage.prototype.setItem = function setItem(key, value, seconds) {
          var t = new Date();
          t.setSeconds(t.getSeconds() + seconds);
          var v = _.assign({}, value);
          this._cache[key] = {
            value: v,
            exp: t
          };
        };

        MemoryCacheStorage.prototype.getItem = function getItem(key) {
          if (this._cache[key] && this._cache[key].exp >= Date.now()) return this._cache[key].value;
          return null;
        };

        MemoryCacheStorage.prototype.removeItem = function removeItem(key) {
          delete this._cache[key];
        };

        MemoryCacheStorage.prototype.removeExpired = function removeExpired() {
          var self = this;
          _.forOwn(self._cache, function (v, k) {
            if (self._cache[k].exp < Date.now()) {
              self.removeItem(k);
            }
          });
        };

        return MemoryCacheStorage;
      }(CacheStorage));

      _export('MemoryCacheStorage', MemoryCacheStorage);
    }
  };
});