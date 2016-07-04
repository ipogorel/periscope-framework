import { WidgetBehavior } from './widget-behavior';
import { BehaviorType } from './../behavior-type';

export let BroadcasterBehavior = class BroadcasterBehavior extends WidgetBehavior {
  constructor() {
    super();
    this.type = BehaviorType.broadcaster;
  }

  attachToWidget(widget) {
    if (!widget[this.eventToAttach]) throw "widget " + widget.name + " hasn't '" + this.eventToAttach + "' event";
    super.attachToWidget(widget);
  }
};