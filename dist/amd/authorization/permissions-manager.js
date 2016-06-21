define(['exports', 'lodash', './../data/query', './permissions-manager-configuration'], function (exports, _lodash, _query, _permissionsManagerConfiguration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PermissionsManager = undefined;

  var _ = _interopRequireWildcard(_lodash);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var PermissionsManager = exports.PermissionsManager = function () {
    function PermissionsManager() {
      _classCallCheck(this, PermissionsManager);

      this.isConfigured = false;
    }

    PermissionsManager.prototype.configure = function configure(config) {
      var normalizedConfig = new _permissionsManagerConfiguration.PermissionsManagerConfiguration();
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
      var q = new _query.Query();
      if (this._query) q.filter = this._query;
      return this.permissionsDataSource.getData(q).then(function (d) {
        return d.data;
      });
    };

    return PermissionsManager;
  }();
});