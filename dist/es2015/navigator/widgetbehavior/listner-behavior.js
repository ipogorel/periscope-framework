import { WidgetBehavior } from './widget-behavior';
import { BehaviorType } from './../behavior-type';
export let ListenerBehavior = class ListenerBehavior extends WidgetBehavior {
  constructor() {
    super();
    this.type = BehaviorType.listener;
  }
};