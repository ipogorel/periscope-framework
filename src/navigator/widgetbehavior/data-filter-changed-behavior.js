import {BroadcasterBehavior} from './broadcaster-behavior';
import {WidgetEventMessage} from '../events/widget-event-message';
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';

@inject(EventAggregator)
export class DataFilterChangedBehavior extends BroadcasterBehavior
{
  constructor(eventAggregator) {
    super();
    this.eventToAttach = "dataFilterChanged";
    this._eventAggregator = eventAggregator;
  }


  attachToWidget(widget) {
    super.attachToWidget(widget);
    var me = this;
    widget[this.eventToAttach] = function(filter)
    {
      var message = new WidgetEventMessage(me.widget.name);
      message.params = {dataFilter: filter};
      me._eventAggregator.publish(me.channel, message);
    };
  }

  detach(){
    super.detach(dashboard);
  }

  persistConfigurationTo(configurationInfo){
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo){
    super.restoreConfigurationFrom(configurationInfo);
  }
}
