import {customElement, useView} from 'aurelia-framework';
import {Widget} from './widget';
import {WidgetEvent} from './../../navigator/events/widget-event';

export class SearchBox extends Widget {
  constructor(settings) {
    super(settings);
    this.stateType = "searchBoxState";
    this.attachBehaviors();
  }

  _dataFilterChanged = new WidgetEvent();

  searchString;

  get dataFilterChanged() {
    return this._dataFilterChanged;
  }
  set dataFilterChanged(handler) {
    this._dataFilterChanged.attach(handler);
  }


  saveState(){
    this.setState(this.searchString);
  }

  restoreState(){
    let s = this.getState();
    if (s)
      this.searchString = s;
    else
      this.searchString = "";
  }
}
