import { customElement, inject, useView } from 'aurelia-framework';
import { Widget } from './widget';

export let Chart = class Chart extends Widget {
  constructor() {
    super();
    this.stateType = "chartState";
    this.attachBehaviors();
  }

  persistConfigurationTo(configurationInfo) {
    configurationInfo.addValue("categoriesField", this.categoriesField);
    configurationInfo.addValue("seriesDefaults", this.seriesDefaults);
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo) {
    this.categoriesField = configurationInfo.getValue("categoriesField");
    this.seriesDefaults = configurationInfo.getValue("seriesDefaults");
    super.restoreConfigurationFrom(configurationInfo);
  }
};