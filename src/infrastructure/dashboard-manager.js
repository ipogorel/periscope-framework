import * as _ from 'lodash';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {UrlHelper} from './../helpers/url-helper';

@inject(Router)
export class DashboardManager {
  constructor(router){
    this._router = router;
  }

  dashboardRouteName;
  dashboards = [];

  configure(configuration){
    this.dashboardRouteName = configuration.dashboardRouteName;
  }

  find(dashboardName){
    return  _.find(this.dashboards, {name:dashboardName});
  }
  
  createDashboard(type, dashboardConfiguration){
    var dashboard = new type();
    dashboard.configure(dashboardConfiguration);
    if (this.dashboardRouteName){
      //dashboard.route = this._router.generate(this.dashboardRouteName, {dashboard:dashboard.name}, { absolute: true });
      dashboard.route = UrlHelper.getAbsoluteBaseUrl() + "/" + this._router.generate(this.dashboardRouteName, {dashboard:dashboard.name});
    }

    this.dashboards.push(dashboard);
    return dashboard;
  }
}
