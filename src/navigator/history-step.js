import {inject} from 'aurelia-framework';
import * as _ from 'lodash';
import {DashboardManager} from './../infrastructure/dashboard-manager';
import {NavigationHistory} from './navigation-history';
import {StateDiscriminator} from './../state/state-discriminator';
import {StateUrlParser} from './../state/state-url-parser';
import {StringHelper} from './../helpers/string-helper';

@inject(NavigationHistory, DashboardManager)
export class HistoryStep {
  constructor(navigationHistory, dashboardManager) {
    this._navigationHistory = navigationHistory;
    this._dashboardManager = dashboardManager;
  }

  get currentRouteItem() {
    return this._currentRoute;
  }
  set currentRouteItem(value) {
    this._currentRoute = value;
  }

  

  run(routingContext, next) {
    if (routingContext.getAllInstructions().some(i => i.config.name === "dashboard")){
      let dashboard = this._dashboardManager.find(routingContext.params.dashboard);
      if (dashboard){
        // update the history with the current state which is probably has changed
        if (this.currentRouteItem){
          let currentDashboard = this._dashboardManager.find(this.currentRouteItem.dashboardName)
          let currentWidgetsState = StateDiscriminator.discriminate(currentDashboard.getState());
          //let url = "/" + currentDashboard.name + StateUrlParser.stateToQuery(currentWidgetsState);
          let url = currentDashboard.getRoute();

          if (_.filter(this._navigationHistory.items,i=>StringHelper.compare(i.url, url)).length===0){
            this._navigationHistory.add(url, this.currentRouteItem.title, currentDashboard.name, currentWidgetsState, new Date());
          }
          else if (!StringHelper.compare(url,this.currentRouteItem.route)) { // state change but there already a route with the same state
            this._navigationHistory.update(url,new Date());
          }
        }

        //let newUrl = routingContext.fragment + (routingContext.queryString? "?" + routingContext.queryString : "");
        let newUrl = window.location.href;

        // synchronize a stored state and a state from the route
        let allWidgetsState = StateDiscriminator.discriminate(dashboard.getState());
        let routeWidgetsState = StateUrlParser.queryToState(newUrl);
        _.forEach(allWidgetsState, as=>{
          let rs = _.find(routeWidgetsState,{"name":as.name})
          if (rs)
            as.value = rs.value
          else
            as.value = null;
        })

        dashboard.setState(allWidgetsState);

        // add the new route to the history
        if (_.filter(this._navigationHistory.items,i=>StringHelper.compare(i.url, newUrl)).length===0){
          this._navigationHistory.add(newUrl, dashboard.title, dashboard.name, dashboard.getState(), new Date());
        }

        this.currentRouteItem = {
          dashboardName: dashboard.name,
          title: dashboard.title,
          route:newUrl
        };
      }
    }
    else
      this.currentRouteItem = null;
    return next();
  }
}
