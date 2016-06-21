var _dec, _class;

import { inject, bindable } from 'aurelia-framework';
import * as _ from 'lodash';
import { PermissionsManager } from './permissions-manager';

export let PermissionsCustomAttribute = (_dec = inject(Element, PermissionsManager), _dec(_class = class PermissionsCustomAttribute {

  constructor(element, permissionsManager) {
    this.element = element;
    this.permissionsManager = permissionsManager;
  }

  bind() {
    if (!this.value) return;
    let rGroup = "";
    let permissions = [];
    if (_.isString(this.value)) {
      rGroup = this.element.au.permissions.scope.bindingContext.resourceGroup;
      permissions = this.value.split(",");
    } else if (_.isPlainObject(this.value)) {
      rGroup = this.value.resourceGroup;
      permissions = this.value.permissions.split(",");
    }

    this.element.hidden = true;
    this.element.disabled = true;
    for (let p of permissions) {
      this.permissionsManager.hasPermisson(p, rGroup).then(result => {

        if (result) {
          if (p === 'read') this.element.hidden = false;
          if (p === 'write') this.element.disabled = false;
        }
      }, err => {});
    }
  }
}) || _class);