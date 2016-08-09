
export let WidgetBehavior = class WidgetBehavior {

  attachToWidget(widget) {
    this.widget = widget;
    this.widget.behavior.push(this);
  }

  detach() {
    if (!this.widget) return;
    for (let i = 0; i < this.widget.behavior.length; i++) {
      if (this.widget.behavior[i] === this) {
        this.widget.behavior.splice(i, 1);
        break;
      }
    }
  }

};