import { BroadcasterBehavior } from './broadcaster-behavior';
import { WidgetEventMessage } from '../events/widget-event-message';

export let DataSourceChangedBehavior = class DataSourceChangedBehavior extends BroadcasterBehavior {
  constructor(channel, eventAggregator) {
    super();
    this.channel = channel;
    this.eventToAttach = "dataSourceChanged";
    this._eventAggregator = eventAggregator;
  }

  attachToWidget(widget) {
    super.attachToWidget(widget);
    var me = this;
    widget[this.eventToAttach] = function (dataSource) {
      var message = new WidgetEventMessage(me.widget.name);
      message.params = { dataSource: dataSource };
      me._eventAggregator.publish(me.channel, message);
    };
  }

  detach() {
    super.detach(dashboard);
  }
};