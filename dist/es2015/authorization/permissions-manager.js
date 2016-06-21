import * as _ from 'lodash';
import { Query } from './../data/query';
import { PermissionsManagerConfiguration } from './permissions-manager-configuration';

export let PermissionsManager = class PermissionsManager {
  constructor() {
    this.isConfigured = false;
  }

  configure(config) {
    let normalizedConfig = new PermissionsManagerConfiguration();
    config(normalizedConfig);
    this.permissionsDataSource = normalizedConfig.dataSource;
    this.isConfigured = true;
  }

  hasPermisson(permission, resourceGroup) {
    if (!this.isConfigured) {
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    }

    return this._getData().then(permissions => {
      let normalizedPermissions = _.map(permissions, p => {
        let a = p.toLowerCase().split("-");
        if (a.length == 2) return { permission: a[0], group: a[1] };
      });
      if (_.filter(normalizedPermissions, { 'permission': permission, 'group': resourceGroup }).length > 0) return true;
      return false;
    }, err => {
      return false;
    });
  }

  _getData() {
    let q = new Query();
    if (this._query) q.filter = this._query;
    return this.permissionsDataSource.getData(q).then(d => {
      return d.data;
    });
  }
};