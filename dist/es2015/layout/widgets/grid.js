import { Decorators, customElement, bindable, inject, useView, noView } from 'aurelia-framework';
import { Widget } from './widget';
import { WidgetEvent } from './../../navigator/events/widget-event';

export let Grid = class Grid extends Widget {
  constructor() {
    super();
    this._dataSelected = new WidgetEvent();
    this._dataActivated = new WidgetEvent();
    this._dataFieldSelected = new WidgetEvent();
    this.stateType = "gridState";
  }

  get dataSelected() {
    return this._dataSelected;
  }
  set dataSelected(handler) {
    this._dataSelected.attach(handler);
  }

  get dataActivated() {
    return this._dataActivated;
  }
  set dataActivated(handler) {
    this._dataActivated.attach(handler);
  }

  get dataFieldSelected() {
    return this._dataFieldSelected;
  }
  set dataFieldSelected(handler) {
    this._dataFieldSelected.attach(handler);
  }

  saveState() {
    this.setState({ columns: this.columns });
  }

  restoreState() {
    let s = this.getState();
    if (s) this.columns = s.columns;
  }

  persistConfigurationTo(configurationInfo) {
    configurationInfo.addValue("columns", this.columns);
    configurationInfo.addValue("navigatable", this.navigatable);
    configurationInfo.addValue("autoGenerateColumns", this.autoGenerateColumns);
    configurationInfo.addValue("pageSize", this.pageSize);
    configurationInfo.addValue("group", this.group);
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo) {
    this.columns = configurationInfo.getValue("columns");
    this.navigatable = configurationInfo.getBool("navigatable");
    this.autoGenerateColumns = configurationInfo.getBool("autoGenerateColumns");
    this.pageSize = configurationInfo.getInt("pageSize");
    this.group = configurationInfo.getValue("group");
    super.restoreConfigurationFrom(configurationInfo);
  }
};