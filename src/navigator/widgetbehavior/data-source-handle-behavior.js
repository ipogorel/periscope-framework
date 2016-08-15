import {ListenerBehavior} from './listner-behavior';
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';

@inject(EventAggregator)
export class DataSourceHandleBehavior extends ListenerBehavior
{
  constructor(eventAggregator) {
    super();
    this._eventAggregator = eventAggregator;
  }

  attachToWidget(widget){
    super.attachToWidget(widget);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this.channel, message => {
      me.widget.dataSource = message.params.dataSource;
      me.widget.refresh();
    });
  }

  detach(){
    super.detach(dashboard);
    if (this.subscription)
      this.subscription.dispose();
  }

  persistConfigurationTo(configurationInfo){
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo){
    super.restoreConfigurationFrom(configurationInfo);
  }
}

