import { DashboardBehavior } from './dashboard-behavior';

export let ReplaceWidgetBehavior = class ReplaceWidgetBehavior extends DashboardBehavior {

  constructor(settings) {
    super();
    this._channel = settings.channel;
    this._widgetType = settings.widgetType;
    this._widgetSettings = settings.widgetSettings;
    this._eventAggregator = settings.eventAggregator;
    this._widgetToReplaceName = settings.widgetToReplaceName;
    this._mapper = settings.mapper;
    this._queryPattern = settings.queryPattern;
  }

  attach(dashboard) {
    super.attach(dashboard);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._channel, message => {
      var originatorWidget = dashboard.getWidgetByName(me._widgetToReplaceName);
      var w = new me._widgetType(me._widgetSettings);
      dashboard.replaceWidget(originatorWidget, w);
      w.dataFilter = me._mapper ? me._mapper(message) : message.params.dataFilter;
      w.refresh();
    });
  }

  detach() {
    super.detach(dashboard);
    if (this.subscription) this.subscription.dispose();
  }
};