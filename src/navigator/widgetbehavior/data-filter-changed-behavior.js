import {BroadcasterBehavior} from './broadcaster-behavior';
import {WidgetEventMessage} from '../events/widget-event-message';

export class DataFilterChangedBehavior extends BroadcasterBehavior
{
  constructor(channel, eventAggregator) {
    super();
    this.channel = channel;
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
}
