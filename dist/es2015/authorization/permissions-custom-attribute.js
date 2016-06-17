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
    let widgetGroup = "";
    let permissions = [];
    if (_.isString(this.value)) {
      widgetGroup = this.element.au.permissions.scope.bindingContext.resourceGroup;
      permissions = this.value.split(",");
    } else if (_.isPlainObject(this.value)) {
      widgetGroup = this.value.resourceGroup;
      permissions = this.value.permissions.split(",");
    }
    for (let p of permissions) {
      this.permissionsManager.hasPermisson(p, widgetGroup).then(result => {
        if (!result) {
          if (p === 'read') this.element.hidden = true;
          if (p === 'write') this.element.disabled = true;
        } else {
          if (p === 'read') this.element.hidden = false;
          if (p === 'write') this.element.disabled = false;
        }
      });
    }
  }
}) || _class);