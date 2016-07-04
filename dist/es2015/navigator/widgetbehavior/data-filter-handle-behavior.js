import { ListenerBehavior } from './listner-behavior';

export let DataFilterHandleBehavior = class DataFilterHandleBehavior extends ListenerBehavior {
  constructor(channel, eventAggregator, filterMapper) {
    super();
    this.channel = channel;
    this._eventAggregator = eventAggregator;
    this._filterMapper = filterMapper;
  }

  attachToWidget(widget) {
    super.attachToWidget(widget);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this.channel, message => {
      var filterToApply = me._filterMapper ? me._filterMapper(message.params) : message.params.dataFilter;
      me.widget.dataFilter = filterToApply;
      me.widget.refresh();
    });
  }

  detach() {
    super.detach(dashboard);
    if (this.subscription) this.subscription.dispose();
  }
};