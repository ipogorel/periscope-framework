'use strict';

System.register(['lodash', './../data/query', './permissions-manager-configuration'], function (_export, _context) {
  var _, Query, PermissionsManagerConfiguration, PermissionsManager;

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
    }, function (_permissionsManagerConfiguration) {
      PermissionsManagerConfiguration = _permissionsManagerConfiguration.PermissionsManagerConfiguration;
    }],
    execute: function () {
      _export('PermissionsManager', PermissionsManager = function () {
        function PermissionsManager() {
          _classCallCheck(this, PermissionsManager);

          this.isConfigured = false;
        }

        PermissionsManager.prototype.configure = function configure(config) {
          var normalizedConfig = new PermissionsManagerConfiguration();
          config(normalizedConfig);
          this.permissionsDataSource = normalizedConfig.dataSource;
          this.isConfigured = true;
        };

        PermissionsManager.prototype.hasPermisson = function hasPermisson(permission, resourceGroup) {
          if (!this.isConfigured) {
            return new Promise(function (resolve, reject) {
              resolve(true);
            });
          }

          return this._getData().then(function (permissions) {
            var normalizedPermissions = _.map(permissions, function (p) {
              var a = p.toLowerCase().split("-");
              if (a.length == 2) return { permission: a[0], group: a[1] };
            });
            if (_.filter(normalizedPermissions, { 'permission': permission, 'group': resourceGroup }).length > 0) return true;
            return false;
          }, function (err) {
            return false;
          });
        };

        PermissionsManager.prototype._getData = function _getData() {
          var q = new Query();
          if (this._query) q.filter = this._query;
          return this.permissionsDataSource.getData(q).then(function (d) {
            return d.data;
          });
        };

        return PermissionsManager;
      }());

      _export('PermissionsManager', PermissionsManager);
    }
  };
});