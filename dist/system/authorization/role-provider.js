'use strict';

System.register(['lodash', './../data/query', './role-provider-configuration'], function (_export, _context) {
  var _, Query, RoleProviderConfiguration, RoleProvider;

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
      _export('RoleProvider', RoleProvider = function () {
        function RoleProvider(authService) {
          _classCallCheck(this, RoleProvider);

          this._currentToken = "";
          this._currentUsername = "";
          this.isConfigured = false;

          this._authService = authService;
        }

        RoleProvider.prototype.configure = function configure(config) {
          var normalizedConfig = new RoleProviderConfiguration();
          config(normalizedConfig);
          this._authService = normalizedConfig.authService;
          this._dataSource = normalizedConfig.dataSource;
          this._queryPattern = normalizedConfig.queryPattern;
          this._userRolesArray = normalizedConfig.userRolesArray;
          if (this._authService && (this._queryPattern && this._dataSource || this._userRolesArray)) this.isConfigured = true;
        };

        RoleProvider.prototype.getRoles = function getRoles() {
          if (!this.isConfigured) throw "role provider is not configured";
          var roles = [];
          if (!this._authService.isAuthenticated()) {
            return new Promise(function (resolve, reject) {
              resolve(roles);
            });
          }

          var t = this._authService.getTokenPayload();
          if (!t || !t.sub) throw "Wrong token. Make sure your token follows JWT format";

          return this._authService.getMe().then(function (response) {

            if (response.role) roles = [response.role];
            return roles;
          });
        };

        RoleProvider.prototype._getUser = function _getUser() {
          var _this = this;

          if (this._currentToken != this.authService.getTokenPayload()) {

            if (this._liveRequest) {
              this._liveRequest = this._liveRequest.then(function (response) {
                if (response && response.email) {
                  _this._currentToken = _this.authService.getTokenPayload();
                  _this._currentUsername = response.email;
                }
              });
              return this._liveRequest;
            }
            this._liveRequest = this.authService.getMe();
            return this._liveRequest;
          } else {
            return new Promise(function (resolve, reject) {
              resolve(_this._currentUsername);
            });
          }
        };

        return RoleProvider;
      }());

      _export('RoleProvider', RoleProvider);
    }
  };
});