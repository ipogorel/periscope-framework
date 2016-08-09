import { customElement, useView } from 'aurelia-framework';
import { Widget } from './widget';
import { WidgetEvent } from './../../navigator/events/widget-event';

export let SearchBox = class SearchBox extends Widget {
  constructor(settings) {
    super(settings);
    this._dataFilterChanged = new WidgetEvent();
    this.stateType = "searchBoxState";
    this.attachBehaviors();
  }

  get dataFilterChanged() {
    return this._dataFilterChanged;
  }
  set dataFilterChanged(handler) {
    this._dataFilterChanged.attach(handler);
  }

  saveState() {
    this.setState(this.searchString);
  }

  restoreState() {
    let s = this.getState();
    if (s) this.searchString = s;else this.searchString = "";
  }
};