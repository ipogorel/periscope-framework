var _dec, _class;

import * as _ from 'lodash';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { UrlHelper } from './../helpers/url-helper';

export let DashboardManager = (_dec = inject(Router), _dec(_class = class DashboardManager {
  constructor(router) {
    this.dashboards = [];

    this._router = router;
  }

  configure(configuration) {
    this.dashboardRouteName = configuration.dashboardRouteName;
  }

  find(dashboardName) {
    return _.find(this.dashboards, { name: dashboardName });
  }

  createDashboard(type, dashboardConfiguration) {
    var dashboard = new type();
    dashboard.configure(dashboardConfiguration);
    if (this.dashboardRouteName) {
      dashboard.route = UrlHelper.getAbsoluteBaseUrl() + "/" + this._router.generate(this.dashboardRouteName, { dashboard: dashboard.name });
    }

    this.dashboards.push(dashboard);
    return dashboard;
  }
}) || _class);