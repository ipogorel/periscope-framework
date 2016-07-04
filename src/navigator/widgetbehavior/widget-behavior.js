
export class WidgetBehavior {

  type;
  widget;
  channel;


  attachToWidget(widget) {
    this.widget = widget;
    this.widget.behaviors.push(this);
  }

  detach(){
    if (!this.widget)
      return;
    for (let i=0; i<this.widget.behaviors.length; i++) {
      if(this.widget.behaviors[i] === this) {
        this.widget.behaviors.splice(i, 1);
        break;
      }
    }
  }

}
