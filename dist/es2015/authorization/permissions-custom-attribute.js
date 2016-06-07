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
    let widgetName = "";
    let permissions = [];
    if (_.isString(this.value)) {
      widgetName = this.element.au.permissions.scope.bindingContext.name;
      permissions = this.value.split(",");
    } else if (_.isPlainObject(this.value)) {
      widgetName = this.value.widgetName;
      permissions = this.value.permissions;
    }
    for (let p of permissions) {
      this.permissionsManager.hasPermisson(p, widgetName).then(result => {
        if (!result) {
          if (p === 'r') this.element.hidden = true;
          if (p === 'w') this.element.disabled = true;
        } else {
          if (p === 'r') this.element.hidden = false;
          if (p === 'w') this.element.disabled = false;
        }
      });
    }
  }
}) || _class);