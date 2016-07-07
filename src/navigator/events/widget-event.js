export class WidgetEvent {

  constructor(widgetName) {
    this._originatorName = widgetName;
  }

  handlers = [];

  get originatorName()  {
    return this._originatorName;
  }

  attach(handler){
    if(this.handlers.some(e=>e === handler)) {
      return; //already attached
    }
    this.handlers.push(handler);
  }

  detach(handler) {
    var idx = this.handlers.indexOf(handler);
    if(idx < 0){
      return; //not attached, do nothing
    }
    this.handler.splice(idx,1);
  }

  raise(){
    for(var i = 0; i< this.handlers.length; i++) {
      this.handlers[i].apply(this, arguments);
    }
  }
}
