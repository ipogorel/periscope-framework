import {DashboardBehavior} from './dashboard-behavior';

export class CreateWidgetBehavior extends DashboardBehavior {

  constructor(settings) {
    super();
    this._chanel = settings.chanel;
    this._widgetType = settings.widgetType;
    this._widgetSettings = settings.widgetSettings;
    this._widgetDimensions = settings.widgetDimensions;
    this._eventAggregator = settings.eventAggregator;
    this._filterMapper = settings.filterMapper;
  }

  attach(dashboard){
    super.attach(dashboard);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._chanel, message => {
      //make sure the widget exists
      var w = dashboard.getWidgetByName(me._widgetSettings.name);
      if(!w){ //widget not exist.
        var w = new me._widgetType(me._widgetSettings);
        dashboard.addWidget(w, this._widgetDimensions);
      }
      w.dataFilter =  me._filterMapper ? me._filterMapper(message) : "";
      w.refresh();

    });
  }

  detach(){
    super.detach(dashboard);
    if (this.subscription)
      this.subscription.dispose();
  }


}
