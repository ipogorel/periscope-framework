import { customElement, inject, useView } from 'aurelia-framework';
import { Widget } from './widget';

export let DetailedView = class DetailedView extends Widget {
  constructor(settings) {
    super(settings);
    this.stateType = "detailedViewState";
    this.attachBehaviors();
  }
};