var _dec, _desc, _value, _class;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

import { computedFrom } from 'aurelia-framework';
import * as _ from 'lodash';

export let DashboardBase = class DashboardBase {
  constructor() {
    this._layout = [];
    this._behaviors = [];
  }

  get name() {
    return this._name;
  }

  get title() {
    return this._title;
  }

  get layout() {
    return this._layout;
  }

  get behaviors() {
    return this._behaviors;
  }

  configure(dashboardConfiguration) {
    this._name = dashboardConfiguration.name;
    this._title = dashboardConfiguration.title;
  }

  getWidgetByName(widgetName) {
    var wl = _.find(this._layout, w => {
      return w.widget.name === widgetName;
    });
    if (wl) return wl.widget;
  }

  addWidget(widget, dimensions) {
    let lw = new LayoutWidget();
    lw.widget = widget;
    lw.sizeX = dimensions.sizeX;
    lw.sizeY = dimensions.sizeY;
    lw.col = dimensions.col;
    lw.row = dimensions.row;
    this._layout.push(lw);
    widget.dashboard = this;
  }

  removeWidget(widget) {
    _.remove(this._layout, w => {
      if (w.widget === widget) {
        widget.dispose();
        return true;
      }
      return false;
    });
  }

  replaceWidget(oldWidget, newWidget) {
    let oldLw = _.find(this._layout, w => {
      return w.widget === oldWidget;
    });
    if (oldLw) {
      newWidget.dashboard = this;
      let newLw = new LayoutWidget();
      newLw.widget = newWidget;
      newLw.sizeX = oldLw.sizeX;
      newLw.sizeY = oldLw.sizeY;
      newLw.col = oldLw.col;
      newLw.row = oldLw.row;

      newLw.navigationStack.push(oldWidget);
      this._layout.splice(_.indexOf(this._layout, oldLw), 1, newLw);
    }
  }

  restoreWidget(currentWidget) {
    let lw = _.find(this._layout, w => {
      return w.widget === currentWidget;
    });
    let previousWidget = lw.navigationStack.pop();
    if (previousWidget) {
      let previousLw = new LayoutWidget();
      previousLw.widget = previousWidget;
      previousLw.sizeX = lw.sizeX;
      previousLw.sizeY = lw.sizeY;
      previousLw.col = lw.col;
      previousLw.row = lw.row;
      this._layout.splice(_.indexOf(this._layout, lw), 1, previousLw);
    }
  }

  resizeWidget(widget, newSize) {
    var lw = _.find(this._layout, w => {
      return w.widget === widget;
    });
    if (newSize) {
      let x = newSize.sizeX ? newSize.sizeX : lw.sizeX;
      let y = newSize.sizeY ? newSize.sizeY : lw.sizeY;
      lw.resize(x, y);
    } else lw.rollbackResize();
  }

  refreshWidget(widget) {
    widget.refresh();
  }

  refresh() {
    for (let i = 0; i < this._layout.length; i++) {
      this.refreshWidget(this._layout[i].widget);
    }
  }

  dispose() {
    for (let i = 0; i < this._layout.length; i++) {
      this._layout[i].widget.dispose();
    }
    this._layout = [];

    while (true) {
      if (this._behaviors.length > 0) this._behaviors[0].detach();else break;
    }
  }
};

export let LayoutWidget = (_dec = computedFrom('navigationStack'), (_class = class LayoutWidget {
  constructor() {
    this.navigationStack = [];
    this.resized = false;
  }
  get widget() {
    return this._widget;
  }
  set widget(value) {
    this._widget = value;
  }

  get navigationStack() {
    return this._navigationStack;
  }
  set navigationStack(value) {
    this._navigationStack = value;
  }

  get sizeX() {
    return this._sizeX;
  }
  set sizeX(value) {
    this._sizeX = value;
  }

  get sizeY() {
    return this._sizeY;
  }
  set sizeY(value) {
    this._sizeY = value;
  }

  get col() {
    return this._col;
  }
  set col(value) {
    this._col = value;
  }

  get row() {
    return this._row;
  }
  set row(value) {
    this._row = value;
  }

  get resized() {
    return this._resized;
  }
  set resized(value) {
    this._resized = value;
  }

  get hasNavStack() {
    return this.navigationStack && this.navigationStack.length > 0;
  }

  resize(newSizeX, newSizeY) {
    this._originalDimensions = { sizeX: this.sizeX, sizeY: this.sizeY };
    this.sizeX = newSizeX;
    this.sizeY = newSizeY;
    this.resized = true;
  }

  rollbackResize() {
    if (this._originalDimensions) {
      this.sizeX = this._originalDimensions.sizeX;
      this.sizeY = this._originalDimensions.sizeY;
    }
    this.resized = false;
  }

}, (_applyDecoratedDescriptor(_class.prototype, 'hasNavStack', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'hasNavStack'), _class.prototype)), _class));