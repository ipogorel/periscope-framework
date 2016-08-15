import {WidgetBehavior} from './widget-behavior';
import {BehaviorType} from './../behavior-type';

export class BroadcasterBehavior extends WidgetBehavior {
  constructor(){
    super();
    this.behaviortype = BehaviorType.broadcaster;
  }

  eventToAttach;

  attachToWidget(widget) {
    if (!widget[this.eventToAttach])
      throw "widget " + widget.name + " hasn't '" + this.eventToAttach + "' event";
    super.attachToWidget(widget);
  }

  persistConfigurationTo(configurationInfo){
    configurationInfo.addValue("channel", this.channel);
  }
  restoreConfigurationFrom(configurationInfo){
    this.channel = configurationInfo.getValue("channel");
  }
}
