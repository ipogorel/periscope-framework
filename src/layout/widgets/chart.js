import {customElement, inject, useView} from 'aurelia-framework';
import {Widget} from './widget';

export class Chart extends Widget {
  constructor(settings) {
    super(settings);
    this.stateType = "chartState";
    this.attachBehaviors();
  }

  categoriesField;
  seriesDefaults;


}
