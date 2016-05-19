var _dec, _class;

import { inject } from 'aurelia-framework';
import * as _ from 'lodash';
import { DashboardManager } from './../infrastructure/dashboard-manager';
import { UserStateStorage } from './../state/user-state-storage';
import { NavigationHistory } from './navigation-history';
import { StateDiscriminator } from './../state/state-discriminator';
import { StateUrlParser } from './../state/state-url-parser';
import { StringHelper } from './../helpers/string-helper';

export let HistoryStep = (_dec = inject(UserStateStorage, NavigationHistory, DashboardManager), _dec(_class = class HistoryStep {
  constructor(userStateStorage, navigationHistory, dashboardManager) {
    this._navigationHistory = navigationHistory;
    this._userStateStorage = userStateStorage;
    this._dashboardManager = dashboardManager;
  }

  get currentRouteItem() {
    return this._currentRoute;
  }
  set currentRouteItem(value) {
    this._currentRoute = value;
  }

  run(routingContext, next) {
    if (routingContext.getAllInstructions().some(i => i.config.name === "dashboard")) {
      let dashboard = this._dashboardManager.find(routingContext.params.dashboard);
      if (dashboard) {
        if (this.currentRouteItem) {
          let currentWidgetsState = StateDiscriminator.discriminate(this._userStateStorage.getAll(this.currentRouteItem.dashboardName));
          let url = "/" + this.currentRouteItem.dashboardName + StateUrlParser.stateToQuery(currentWidgetsState);

          if (_.filter(this._navigationHistory.items, i => StringHelper.compare(i.url, url)).length === 0) {
            this._navigationHistory.add(url, this.currentRouteItem.title, this.currentRouteItem.dashboardName, currentWidgetsState, new Date());
          } else if (!StringHelper.compare(url, this.currentRouteItem.route)) {
            this._navigationHistory.update(url, new Date());
          }
        }

        let fullUrl = routingContext.fragment + (routingContext.queryString ? "?" + routingContext.queryString : "");

        var routeWidgetsState = StateUrlParser.queryToState(fullUrl);
        var storageWidgetsState = StateDiscriminator.discriminate(this._userStateStorage.getAll(dashboard.name));
        for (let oldSt of storageWidgetsState) this._userStateStorage.remove(oldSt.key);
        for (let newSt of routeWidgetsState) this._userStateStorage.set(newSt.key, newSt.value);

        if (_.filter(this._navigationHistory.items, i => StringHelper.compare(i.url, fullUrl)).length === 0) {
          this._navigationHistory.add(fullUrl, dashboard.title, dashboard.name, this._userStateStorage.getAll(dashboard.name), new Date());
        }

        this.currentRouteItem = {
          dashboardName: dashboard.name,
          title: dashboard.title,
          route: fullUrl
        };
      }
    } else this.currentRouteItem = null;
    return next();
  }
}) || _class);