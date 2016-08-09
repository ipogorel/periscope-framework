import {customElement, inject, useView} from 'aurelia-framework';
import {Widget} from './widget';

export class DetailedView extends Widget {
  constructor(settings) {
    super(settings);
    this.stateType = "detailedViewState";
    this.attachBehaviors();
  }
  fields;
}

