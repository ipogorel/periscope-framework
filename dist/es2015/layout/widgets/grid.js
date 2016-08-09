import { Decorators, customElement, bindable, inject, useView, noView } from 'aurelia-framework';
import { Widget } from './widget';
import { WidgetEvent } from './../../navigator/events/widget-event';

export let Grid = class Grid extends Widget {
  constructor(settings) {
    super(settings);
    this._dataSelected = new WidgetEvent();
    this._dataActivated = new WidgetEvent();
    this._dataFieldSelected = new WidgetEvent();
    this.stateType = "gridState";
    this.attachBehaviors();
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
};