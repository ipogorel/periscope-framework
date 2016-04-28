export let WidgetEventMessage = class WidgetEventMessage {

  constructor(widgetName) {
    this._originatorName = widgetName;
  }
  get originatorName() {
    return this._originatorName;
  }

};