import {WidgetBehavior} from './widget-behavior';
import {BehaviorType} from './../behavior-type';
export class ListenerBehavior extends WidgetBehavior {
  constructor(){
    super();
    this.behaviortype = BehaviorType.listener;
  }

  persistConfigurationTo(configurationInfo){
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo){
    super.restoreConfigurationFrom(configurationInfo);
  }
}
