import { customElement, inject, useView } from 'aurelia-framework';
import { Widget } from './widget';

export let Chart = class Chart extends Widget {
  constructor(settings) {
    super(settings);
    this.stateType = "chartState";
    this.attachBehaviors();
  }

};