import {BroadcasterBehavior} from './broadcaster-behavior';
import {WidgetEventMessage} from '../events/widget-event-message';

export class DataSelectedBehavior extends BroadcasterBehavior {
  constructor(channel, eventAggregator) {
    super();
    this.channel = channel;
    this.eventToAttach = "dataSelected";
    this._eventAggregator = eventAggregator;
  }


  attachToWidget(widget)   {

    super.attachToWidget(widget);
    var me = this;

    widget[this.eventToAttach] =  function(currentRecord) {
      var message = new WidgetEventMessage(me.widget.name);
      message.params ={selectedData: currentRecord};
      me._eventAggregator.publish(me.channel, message);
    };
  }

  detach(){
    super.detach(dashboard);
  }
}
