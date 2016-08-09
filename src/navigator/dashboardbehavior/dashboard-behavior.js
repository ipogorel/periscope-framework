import {Configurable} from './../../serialization/configurable';

export class DashboardBehavior extends Configurable{

  get dashboard() {
    return this._dashboard;
  }

  attach(dashboard) {
    this._dashboard = dashboard;
    this._dashboard.behaviors.push(this);
  }

  detach(){
    for (let i=0; i<this.dashboard.behaviors.length; i++) {
      if(this.dashboard.behaviors[i] === this) {
        this.dashboard.behaviors.splice(i, 1);
        break;
      }
    }
  }

  persistConfigurationTo(configurationInfo){
  }

  restoreConfigurationFrom(configurationInfo){
  }
}
