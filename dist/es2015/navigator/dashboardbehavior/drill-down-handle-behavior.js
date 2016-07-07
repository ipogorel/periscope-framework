import { DashboardBehavior } from './dashboard-behavior';
import { StringHelper } from './../../helpers/string-helper';
import * as _ from 'lodash';

export let DrillDownHandleBehavior = class DrillDownHandleBehavior extends DashboardBehavior {

  constructor(settings) {
    super();
    this._channel = settings.channel;
    this._widgetType = settings.widgetType;
    this._widgetSettings = settings.widgetSettings;
    this._eventAggregator = settings.eventAggregator;
    this._widgetToReplaceName = settings.widgetToReplaceName;
  }

  attach(dashboard) {
    super.attach(dashboard);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._channel, message => {
      var originatorWidget = dashboard.getWidgetByName(me._widgetToReplaceName);

      var w = new me._widgetType(me._widgetSettings);
      dashboard.replaceWidget(originatorWidget, w);
      w.dataFilter = message.params.dataFilter;
      w.dataSource.transport.readService.configure({ url: message.params.dataServiceUrl });
      w.refresh();
    });
  }

  detach() {
    super.detach(dashboard);
    if (this.subscription) this.subscription.dispose();
  }
};