import { BroadcasterBehavior } from './broadcaster-behavior';
import { WidgetEventMessage } from '../events/widget-event-message';
import { StringHelper } from '../../helpers/string-helper';
import * as _ from 'lodash';

export let DrillDownBehavior = class DrillDownBehavior extends BroadcasterBehavior {
  constructor(channel, eventAggregator, dataSource) {
    super();
    this.queryPattern = "";
    this.dataServiceUrl = "";
    this.isConfigured = false;
    this.channel = channel;
    this.eventToAttach = "dataActivated";
    this._eventAggregator = eventAggregator;
    this._dataSource = dataSource;
  }

  configure(drillDownBehaviorConfiguration) {
    this.queryPattern = drillDownBehaviorConfiguration.queryPattern;
    this.dataServiceUrl = drillDownBehaviorConfiguration.dataServiceUrl;
    this.isConfigured = true;
  }

  attachToWidget(widget) {
    super.attachToWidget(widget);
    var me = this;

    widget[this.eventToAttach] = function (currentRecord) {
      if (!me.isConfigured) return;
      var message = new WidgetEventMessage(me.widget.name);
      let query = me.queryPattern;
      _.forOwn(currentRecord, (value, key) => {
        query = StringHelper.replaceAll(query, "@" + key, value);
      });

      message.params = { dataFilter: query, dataServiceUrl: me.dataServiceUrl };
      me._eventAggregator.publish(me.channel, message);
    };
  }

  detach() {
    super.detach(dashboard);
  }
};

export let DrillDownBehaviorConfiguration = class DrillDownBehaviorConfiguration {};