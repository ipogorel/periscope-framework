import { Configurable } from './../../serialization/configurable';

export let WidgetBehavior = class WidgetBehavior extends Configurable {

  attachToWidget(widget) {
    this.widget = widget;
    this.widget.behaviors.push(this);
  }

  detach() {
    if (!this.widget) return;
    for (let i = 0; i < this.widget.behaviors.length; i++) {
      if (this.widget.behaviors[i] === this) {
        this.widget.behaviors.splice(i, 1);
        break;
      }
    }
  }
  persistConfigurationTo(configurationInfo) {
    configurationInfo.addValue("channel", this.channel);
  }
  restoreConfigurationFrom(configurationInfo) {
    this.channel = configurationInfo.getValue("channel");
  }
};