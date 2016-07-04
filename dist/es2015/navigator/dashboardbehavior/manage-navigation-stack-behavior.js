import { DashboardBehavior } from './dashboard-behavior';

export let ManageNavigationStackBehavior = class ManageNavigationStackBehavior extends DashboardBehavior {
  constructor(eventAggregator) {
    super();

    this._eventAggregator = eventAggregator;
  }
  attach(dashboard) {
    super.attach(dashboard);
    var me = this;

    this.subscription = this._eventAggregator.subscribe("widget-back-button-channel", message => {
      var originatorWidget = dashboard.getWidgetByName(message.originatorName);
      if (originatorWidget) {
        var previousWidget = message.params.navigationStack.pop();
        dashboard.replaceWidget(originatorWidget, previousWidget);
      }
    });
  }

  detach() {
    super.detach(dashboard);
    if (this.subscription) this.subscription.dispose();
  }
};