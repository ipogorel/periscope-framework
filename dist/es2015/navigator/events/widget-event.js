export let WidgetEvent = class WidgetEvent {

  constructor(widgetName) {
    this.handlers = [];

    this._originatorName = widgetName;
  }

  get originatorName() {
    return this._originatorName;
  }

  attach(handler) {
    if (this.handlers.some(e => e === handler)) {
      return;
    }
    this.handlers.push(handler);
  }

  detach(handler) {
    var idx = this.handlers.indexOf(handler);
    if (idx < 0) {
      return;
    }
    this.handler.splice(idx, 1);
  }

  raise() {
    for (var i = 0; i < this.handlers.length; i++) {
      this.handlers[i].apply(this, arguments);
    }
  }
};