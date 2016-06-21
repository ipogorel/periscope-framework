'use strict';

System.register(['lodash', './../data/query', './role-provider-configuration'], function (_export, _context) {
  var _, Query, RoleProviderConfiguration, _typeof, RoleProvider;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_lodash) {
      _ = _lodash;
    }, function (_dataQuery) {
      Query = _dataQuery.Query;
    }, function (_roleProviderConfiguration) {
      RoleProviderConfiguration = _roleProviderConfiguration.RoleProviderConfiguration;
    }],
    execute: function () {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
      };

      _export('RoleProvider', RoleProvider = function () {
        function RoleProvider(authService) {
          _classCallCheck(this, RoleProvider);

          this._liveRequest = null;
          this._cache = {};
          this.isConfigured = false;

          this._authService = authService;
        }

        RoleProvider.prototype.configure = function configure(config) {
          var normalizedConfig = new RoleProviderConfiguration();
          config(normalizedConfig);
          this._authService = normalizedConfig.authService;
          this._dataSource = normalizedConfig.dataSource;
          this._query = normalizedConfig.query;
          this._userRolesArray = normalizedConfig.userRolesArray;
          if (this._authService && this._dataSource) this.isConfigured = true;
        };

        RoleProvider.prototype.getRoles = function getRoles() {
          var _this = this;

          if (!this.isConfigured) throw "role provider is not configured";
          var roles = [];
          if (!this._authService.isAuthenticated()) {
            return new Promise(function (resolve, reject) {
              resolve(roles);
            });
          }

          var t = this._authService.getTokenPayload();
          if (!t || !t.sub) throw "Wrong token. Make sure your token follows JWT format";

          var key = JSON.stringify(t);
          return this._getUserRoles(key).then(function (d) {
            var r = _this._cache[key];
            if (r) roles = r;
            return roles;
          });
        };

        RoleProvider.prototype._fromCache = function _fromCache(token) {
          if (token in this._cache) return this._cache[token];
          throw "username not found: " + token;
        };

        RoleProvider.prototype._getUserRoles = function _getUserRoles(token) {
          var _this2 = this;

          if (this._liveRequest) {
            this._liveRequest = this._liveRequest.then(function (l) {
              _this2._fromCache(token);
            }).then(function (data) {
              return data;
            }, function (err) {
              _this2._processData(token);
            });
            return this._liveRequest;
          }
          try {
            var _ret = function () {
              var userName = _this2._fromCache(token);
              return {
                v: new Promise(function (resolve, reject) {
                  resolve(userName);
                })
              };
            }();

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
          } catch (ex) {}
          this._liveRequest = this._processData(token);
          return this._liveRequest;
        };

        RoleProvider.prototype._processData = function _processData(token) {
          var _this3 = this;

          var q = new Query();
          if (this._query) q.filter = this._query;
          return this._dataSource.getData(q).then(function (d) {
            _this3._liveRequest = null;
            _this3._cache[token] = d.data;
          });
        };

        return RoleProvider;
      }());

      _export('RoleProvider', RoleProvider);
    }
  };
});