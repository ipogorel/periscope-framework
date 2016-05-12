export let WidgetEvent = class WidgetEvent {

  constructor(widgetName) {
    this._handlers = [];
    this._originatorName = widgetName;
  }

  get originatorName() {
    return this._originatorName;
  }

  attach(handler) {
    if (this._handlers.some(e => e === handler)) {
      return;
    }
    this._handlers.push(handler);
  }

  detach(handler) {
    var idx = this._handlers.indexOf(handler);
    if (idx < 0) {
      return;
    }
    this.handler.splice(idx, 1);
  }

  raise() {
    for (var i = 0; i < this._handlers.length; i++) {
      this._handlers[i].apply(this, arguments);
    }
  }
};