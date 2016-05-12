var _dec, _class;

import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import { NavigationHistory } from './navigation-history';
import { UserStateStorage } from './../state/user-state-storage';
import { StateDiscriminator } from './../state/state-discriminator';
import { StateUrlParser } from './../state/state-url-parser';
import { StringHelper } from './../helpers/string-helper';
import * as _ from 'lodash';

export let PeriscopeRouter = (_dec = inject(Router, EventAggregator, UserStateStorage, NavigationHistory, StateUrlParser), _dec(_class = class PeriscopeRouter {
  constructor(aureliaRouter, eventAggregator, userStateStorage, navigationHistory) {
    this._aureliaRouter = aureliaRouter;
    this._navigationHistory = navigationHistory;
    this._userStateStorage = userStateStorage;
    this._eventAggregator = eventAggregator;
  }

  get currentRouteItem() {
    return this._currentRoute;
  }
  set currentRouteItem(value) {
    this._currentRoute = value;
  }

  navigate(routeItem) {
    if (this.currentRouteItem) {
      var currentWidgetsState = StateDiscriminator.discriminate(this._userStateStorage.getAll(this.currentRouteItem.dashboardName));
      var url = "/" + this.currentRouteItem.dashboardName + StateUrlParser.stateToQuery(currentWidgetsState);
      if (_.filter(this._navigationHistory.items, i => StringHelper.compare(i.url, url)).length === 0) {
        this._navigationHistory.add(url, this.currentRouteItem.title, this.currentRouteItem.dashboardName, currentWidgetsState, new Date());
      } else if (!StringHelper.compare(url, this.currentRouteItem.route)) {
        this._navigationHistory.update(url, new Date());
      }
    }

    var routeWidgetsState = StateUrlParser.queryToState(routeItem.route);
    var storageWidgetsState = StateDiscriminator.discriminate(this._userStateStorage.getAll(routeItem.dashboardName));
    for (let oldSt of storageWidgetsState) this._userStateStorage.remove(oldSt.key);
    for (let newSt of routeWidgetsState) this._userStateStorage.set(newSt.key, newSt.value);

    if (_.filter(this._navigationHistory.items, i => StringHelper.compare(i.url, routeItem.route)).length === 0) {
      this._navigationHistory.add(routeItem.route, routeItem.title, routeItem.dashboardName, this._userStateStorage.getAll(routeItem.dashboardName), new Date());
    }

    this.currentRouteItem = routeItem;
    this._aureliaRouter.navigate(routeItem.route);
  }

}) || _class);