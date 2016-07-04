import { ListenerBehavior } from './listner-behavior';
export let DataSourceHandleBehavior = class DataSourceHandleBehavior extends ListenerBehavior {
  constructor(channel, eventAggregator) {
    super();
    this.channel = channel;

    this._eventAggregator = eventAggregator;
  }

  attachToWidget(widget) {
    super.attachToWidget(widget);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this.channel, message => {
      me.widget.dataSource = message.params.dataSource;
      me.widget.refresh();
    });
  }

  detach() {
    super.detach(dashboard);
    if (this.subscription) this.subscription.dispose();
  }
};