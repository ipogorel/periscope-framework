import { ListenerBehavior } from './listner-behavior';
import * as _ from 'lodash';

export let SettingsHandleBehavior = class SettingsHandleBehavior extends ListenerBehavior {
  constructor(channel, eventAggregator, messageMapper) {
    super();
    this.channel = channel;
    this._eventAggregator = eventAggregator;

    this._messageMapper = messageMapper;
  }

  attachToWidget(widget) {
    super.attachToWidget(widget);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this.channel, message => {
      var settingsToApply = me._messageMapper ? me._messageMapper(message.params) : message.params;
      _.forOwn(settingsToApply, (v, k) => {
        me.widget[k] = v;
      });

      me.widget.refresh();
    });
  }

  detach() {
    super.detach(dashboard);
    if (this.subscription) this.subscription.dispose();
  }
};