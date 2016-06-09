import * as _ from 'lodash';
import { PermissionsManagerConfiguration } from './permissions-manager-configuration';

export let PermissionsManager = class PermissionsManager {
  constructor() {
    this._permissionsMatrix = [];
  }

  configure(config) {
    let normalizedConfig = new PermissionsManagerConfiguration();
    config(normalizedConfig);
    this._permissionsMatrix = normalizedConfig.permissionsMatrix;
    this._roleProvider = normalizedConfig.roleProvider;
  }

  hasPermisson(permission, resourceName) {
    let resource = _.find(this._permissionsMatrix, { 'resource': resourceName });
    if (_.indexOf(resource.roles, "*") >= 0 && _.indexOf(resource.permissions, permission) >= 0) {
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    } else {
      return this._roleProvider.getRoles().then(roles => {
        for (let r of roles) {
          let w = _.find(this._permissionsMatrix, p => {
            return p.resource === resourceName && _.indexOf(p.roles, r) >= 0;
          });
          if (w) return _.indexOf(w.permissions, permission) >= 0;
        }
        return false;
      });
    }
  }
};