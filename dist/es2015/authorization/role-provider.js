import * as _ from 'lodash';
import { Query } from './../data/query';
import { RoleProviderConfiguration } from './role-provider-configuration';

export let RoleProvider = class RoleProvider {

  constructor(authService) {
    this._currentToken = "";
    this._currentUsername = "";
    this.isConfigured = false;

    this._authService = authService;
  }

  configure(config) {
    let normalizedConfig = new RoleProviderConfiguration();
    config(normalizedConfig);
    this._authService = normalizedConfig.authService;
    this._dataSource = normalizedConfig.dataSource;
    this._queryPattern = normalizedConfig.queryPattern;
    this._userRolesArray = normalizedConfig.userRolesArray;
    if (this._authService && (this._queryPattern && this._dataSource || this._userRolesArray)) this.isConfigured = true;
  }

  getRoles() {
    if (!this.isConfigured) throw "role provider is not configured";
    let roles = [];
    if (!this._authService.isAuthenticated()) {
      return new Promise((resolve, reject) => {
        resolve(roles);
      });
    }

    let t = this._authService.getTokenPayload();
    if (!t || !t.sub) throw "Wrong token. Make sure your token follows JWT format";

    let q = new Query();
    q.filter = this._queryPattern;


    let userroles = this._userRolesArray;
    let user = _.find(userroles, { "username": t.sub });
    if (user) roles = user.roles;

    return new Promise((resolve, reject) => {
      resolve(roles);
    });
  }

  _getUser() {
    if (this._currentToken != this.authService.getTokenPayload()) {

      if (this._liveRequest) {
        this._liveRequest = this._liveRequest.then(response => {
          if (response && response.email) {
            this._currentToken = this.authService.getTokenPayload();
            this._currentUsername = response.email;
          }
        });
        return this._liveRequest;
      }
      this._liveRequest = this.authService.getMe();
      return this._liveRequest;
    } else {
      return new Promise((resolve, reject) => {
        resolve(this._currentUsername);
      });
    }
  }
};