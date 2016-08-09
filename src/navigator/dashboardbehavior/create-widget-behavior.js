import {DashboardBehavior} from './dashboard-behavior';

export class CreateWidgetBehavior extends DashboardBehavior {

  constructor(settings) {
    super();
    this.eventAggregator = settings.eventAggregator;

    this.chanel = settings.chanel;
    this.widgetType = settings.widgetType;
    this.widgetSettings = settings.widgetSettings;
    this.widgetDimensions = settings.widgetDimensions;
    this.filterMapper = settings.filterMapper;
  }

  eventAggregator

  chanel;
  widgetType;
  widgetSettings;
  widgetDimensions;
  filterMapper;

  attach(dashboard){
    super.attach(dashboard);
    var me = this;
    this.subscription = this.eventAggregator.subscribe(this.chanel, message => {
      //make sure the widget exists
      var w = dashboard.getWidgetByName(me.widgetSettings.name);
      if(!w){ //widget not exist.
        var w = new me.widgetType(me.widgetSettings);
        dashboard.addWidget(w, this.widgetDimensions);
      }
      w.dataFilter =  me.filterMapper ? me.filterMapper(message) : "";
      w.refresh();

    });
  }

  detach(){
    super.detach(dashboard);
    if (this.subscription)
      this.subscription.dispose();
  }


}
