var _dec, _class;

import { ListenerBehavior } from './listner-behavior';
import * as _ from 'lodash';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';

export let SettingsHandleBehavior = (_dec = inject(EventAggregator), _dec(_class = class SettingsHandleBehavior extends ListenerBehavior {
  constructor(eventAggregator) {
    super();
    this._eventAggregator = eventAggregator;
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

  persistConfigurationTo(configurationInfo) {
    configurationInfo.addScript("messageMapper", this.messageMapper);
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo) {
    this.messageMapper = configurationInfo.getScript("messageMapper");
    super.restoreConfigurationFrom(configurationInfo);
  }
}) || _class);