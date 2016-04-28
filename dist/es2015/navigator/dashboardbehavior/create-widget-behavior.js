import { DashboardBehavior } from './dashboard-behavior';

export let CreateWidgetBehavior = class CreateWidgetBehavior extends DashboardBehavior {

  constructor(chanel, widgetType, widgetSettings, widgetDimensions, eventAggregator, filterMapper) {
    super();
    this._chanel = chanel;
    this._widgetType = widgetType;
    this._widgetSettings = widgetSettings;
    this._widgetDimensions = widgetDimensions;
    this._eventAggregator = eventAggregator;
    this._filterMapper = filterMapper;
  }

  attach(dashboard) {
    super.attach(dashboard);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._chanel, message => {
      var w = dashboard.getWidgetByName(me._widgetSettings.name);
      if (!w) {
        var w = new me._widgetType(me._widgetSettings);
        dashboard.addWidget(w, this._widgetDimensions);
      }
      w.dataFilter = me._filterMapper ? me._filterMapper(message) : "";
      w.refresh();
    });
  }

  detach() {
    super.detach(dashboard);
    if (this.subscription) this.subscription.dispose();
  }

};