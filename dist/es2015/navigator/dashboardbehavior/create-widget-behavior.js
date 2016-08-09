import { DashboardBehavior } from './dashboard-behavior';

export let CreateWidgetBehavior = class CreateWidgetBehavior extends DashboardBehavior {

  constructor(settings) {
    super();
    this.eventAggregator = settings.eventAggregator;

    this.chanel = settings.chanel;
    this.widgetType = settings.widgetType;
    this.widgetSettings = settings.widgetSettings;
    this.widgetDimensions = settings.widgetDimensions;
    this.filterMapper = settings.filterMapper;
  }

  attach(dashboard) {
    super.attach(dashboard);
    var me = this;
    this.subscription = this.eventAggregator.subscribe(this.chanel, message => {
      var w = dashboard.getWidgetByName(me.widgetSettings.name);
      if (!w) {
        var w = new me.widgetType(me.widgetSettings);
        dashboard.addWidget(w, this.widgetDimensions);
      }
      w.dataFilter = me.filterMapper ? me.filterMapper(message) : "";
      w.refresh();
    });
  }

  detach() {
    super.detach(dashboard);
    if (this.subscription) this.subscription.dispose();
  }

};