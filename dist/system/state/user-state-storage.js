'use strict';

System.register(['./storage', 'aurelia-framework', 'lodash'], function (_export, _context) {
  "use strict";

  var Storage, inject, _, _dec, _class, STORAGE_KEY, UserStateStorage;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_storage) {
      Storage = _storage.Storage;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_lodash) {
      _ = _lodash;
    }],
    execute: function () {
      STORAGE_KEY = "prcpfwk23875hrw28esgfds";

      _export('UserStateStorage', UserStateStorage = (_dec = inject(Storage), _dec(_class = function () {
        function UserStateStorage(storage) {
          _classCallCheck(this, UserStateStorage);

          this._storage = storage;
          this._key = STORAGE_KEY;
        }

        UserStateStorage.prototype.getAll = function getAll(namespace) {
          var data = this._storage.get(this._key);
          if (data) {
            if (!namespace) return data;
            namespace = this._createFullNamespace(namespace);
            return _.filter(data, function (x) {
              return x.key.indexOf(namespace) === 0;
            });
          }
          return [];
        };

        UserStateStorage.prototype.get = function get(key) {
          var o = this._getObj(key);
          if (o) return o.value;
          return undefined;
        };

        UserStateStorage.prototype.set = function set(key, value) {
          var all = this.getAll();
          var oldState = { key: key };
          var newState = { key: key, value: value };
          var item = _.find(all, { 'key': key });
          if (item) {
            oldState.value = item.value;
            item.value = value;
          } else all.push({ key: key, value: value });
          this._storage.set(this._key, all);
        };

        UserStateStorage.prototype.remove = function remove(key) {
          var all = this.getAll();
          _.remove(all, function (i) {
            return i.key == key;
          });
          this._storage.set(this._key, all);
        };

        UserStateStorage.prototype.clearAll = function clearAll() {
          this._storage.clear();
        };

        UserStateStorage.prototype.createKey = function createKey(namespace, key) {
          return this._createFullNamespace(namespace) + key;
        };

        UserStateStorage.prototype._createFullNamespace = function _createFullNamespace(namespace) {
          return namespace + ":";
        };

        UserStateStorage.prototype._getObj = function _getObj(k) {
          var data = this.getAll();
          var obj = _.find(data, { 'key': k });
          return obj;
        };

        return UserStateStorage;
      }()) || _class));

      _export('UserStateStorage', UserStateStorage);
    }
  };
});