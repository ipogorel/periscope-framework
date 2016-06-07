import * as _ from 'lodash';
import {PermissionsManagerConfiguration} from './permissions-manager-configuration';

export class PermissionsManager {
  constructor(){
    this._permissionsMatrix = [];
  }


  configure(config){
    let normalizedConfig = new PermissionsManagerConfiguration();
    config(normalizedConfig);
    this._permissionsMatrix = normalizedConfig.permissionsMatrix;
    this._roleProvider = normalizedConfig.roleProvider;
  }

  hasPermisson(permission, resourceName){
    return this._roleProvider.getRoles().then(roles=>{
      for (let r of roles){
        let w = _.find(this._permissionsMatrix, p => {
          return (p.resource === resourceName && _.indexOf(p.roles,r)>=0)
        });
        if (w)
          return _.indexOf(w.permissions,permission)>=0;
      }
      return false;
    })
  }
}

/*
[
  {
    widget: "widgetName1",
    role: "roleName1",
    permissions:["r","w"]
  },
  {
   widget: "widgetName1",
   role: "roleName2",
   permissions:["r"]
  }
]
*/
