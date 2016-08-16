import * as _ from 'lodash';
import { Factory } from './factory';
import { Container } from 'aurelia-dependency-injection';

export let PeriscopeFactory = class PeriscopeFactory {
  constructor() {
    this.references = [];
    this.container = Container.instance.createChild();
  }
  addReference(type) {
    this.references.push(type);
  }
  createObject(typeName) {
    let t = _.find(this.references, r => {
      return r.name === typeName;
    });
    if (t) {
      let f = this.container.get(Factory.of(t));
      return f();
    }

    throw "reference to object " + typeName + " not found";
  }

};