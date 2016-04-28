var _class;

import { resolver } from 'aurelia-framework';

export let Factory = resolver(_class = class Factory {
  constructor(Type) {
    this.Type = Type;
  }

  get(container) {
    return (...rest) => {
      return container.invoke(this.Type, rest);
    };
  }

  static of(Type) {
    return new Factory(Type);
  }
}) || _class;