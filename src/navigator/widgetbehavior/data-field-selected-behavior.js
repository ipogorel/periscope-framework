import {BroadcasterBehavior} from './broadcaster-behavior';
import {WidgetEventMessage} from '../events/widget-event-message';

export class DataFieldSelectedBehavior extends BroadcasterBehavior {
  constructor(channel, eventAggregator) {
    super();
    this.channel = channel;
    this.eventToAttach = "dataFieldSelected";
    this._eventAggregator = eventAggregator;
  }
  

  attachToWidget(widget)   {

    super.attachToWidget(widget);
    var me = this;

    widget[this.eventToAttach] =  function(fieldName) {
      var message = new WidgetEventMessage(me.widget.name);
      message.params = {fieldName: fieldName};
      me._eventAggregator.publish(me.channel, message);
    };
  }

  detach(){
    super.detach(dashboard);
  }
}

