'use strict';

System.register(['lodash', './permissions-manager-configuration'], function (_export, _context) {
  var _, PermissionsManagerConfiguration, _typeof, PermissionsManager;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_lodash) {
      _ = _lodash;
    }, function (_permissionsManagerConfiguration) {
      PermissionsManagerConfiguration = _permissionsManagerConfiguration.PermissionsManagerConfiguration;
    }],
    execute: function () {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
      };

      _export('PermissionsManager', PermissionsManager = function () {
        function PermissionsManager() {
          _classCallCheck(this, PermissionsManager);

          this._permissionsMatrix = [];
        }

        PermissionsManager.prototype.configure = function configure(config) {
          var normalizedConfig = new PermissionsManagerConfiguration();
          config(normalizedConfig);
          this._permissionsMatrix = normalizedConfig.permissionsMatrix;
          this._roleProvider = normalizedConfig.roleProvider;
        };

        PermissionsManager.prototype.hasPermisson = function hasPermisson(permission, resourceName) {
          var _this = this;

          var resource = _.find(this._permissionsMatrix, { 'resource': resourceName });
          if (!resource) {
            return new Promise(function (resolve, reject) {
              resolve(false);
            });
          }
          if (_.indexOf(resource.roles, "*") >= 0 && _.indexOf(resource.permissions, permission) >= 0) {
            return new Promise(function (resolve, reject) {
              resolve(true);
            });
          } else {
            return this._roleProvider.getRoles().then(function (roles) {
              var _loop = function _loop() {
                if (_isArray) {
                  if (_i >= _iterator.length) return 'break';
                  _ref = _iterator[_i++];
                } else {
                  _i = _iterator.next();
                  if (_i.done) return 'break';
                  _ref = _i.value;
                }

                var r = _ref;

                var w = _.find(_this._permissionsMatrix, function (p) {
                  return p.resource === resourceName && _.indexOf(p.roles, r) >= 0;
                });
                if (w) return {
                    v: _.indexOf(w.permissions, permission) >= 0
                  };
              };

              _loop2: for (var _iterator = roles, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                var _ret = _loop();

                switch (_ret) {
                  case 'break':
                    break _loop2;

                  default:
                    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
                }
              }

              return false;
            });
          }
        };

        return PermissionsManager;
      }());

      _export('PermissionsManager', PermissionsManager);
    }
  };
});