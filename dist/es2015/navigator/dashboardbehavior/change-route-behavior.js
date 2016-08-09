import { DashboardBehavior } from './dashboard-behavior';

export let ChangeRouteBehavior = class ChangeRouteBehavior extends DashboardBehavior {
  constructor(settings) {
    super();
    this.chanel = settings.chanel;
    this.eventAggregator = settings.eventAggregator;
    this.newRoute = settings.newRoute;
    this.router = settings.router;
    this.paramsMapper = settings.paramsMapper;
  }

  attach(dashboard) {
    super.attach(dashboard);
    var me = this;
    this.subscription = this.eventAggregator.subscribe(this.chanel, message => {
      var params = me.paramsMapper ? me.paramsMapper(message) : "";
      if (params !== "" && params.indexOf("?") != 0) params = "?" + params;
      me.router.navigate(me.newRoute + (params !== "" ? params : ""));
    });
  }

  detach() {
    super.detach(dashboard);
    if (this.subscription) this.subscription.dispose();
  }

  persistConfigurationTo(configurationInfo) {
    configurationInfo.addValue("chanel", this.chanel);
    configurationInfo.addValue("newRoute", this.newRoute);
    configurationInfo.addScript("paramsMapper", this.paramsMapper);
  }
  restoreConfigurationFrom(configurationInfo) {
    this.chanel = configurationInfo.getValue("chanel");
    this.newRoute = configurationInfo.getValue("newRoute");
    this.paramsMapper = configurationInfo.addScript("paramsMapper");
  }
};