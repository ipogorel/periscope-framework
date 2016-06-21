import * as _ from 'lodash';
import {Query} from './../data/query';
import {RoleProviderConfiguration} from './role-provider-configuration';


export class RoleProvider {
  _liveRequest = null;
  _cache = {};


  _authService;
  _dataSource;
  _query;

  isConfigured = false;

  constructor(authService) {
    this._authService = authService;
  }

  configure(config){
    let normalizedConfig = new RoleProviderConfiguration();
    config(normalizedConfig);
    this._authService = normalizedConfig.authService;
    this._dataSource = normalizedConfig.dataSource;
    this._query = normalizedConfig.query;
    this._userRolesArray = normalizedConfig.userRolesArray;
    if (this._authService && this._dataSource)
      this.isConfigured = true;
  }

  getRoles(){
    if (!this.isConfigured)
      throw "role provider is not configured";
    let roles = [];
    if (!this._authService.isAuthenticated()){
      return new Promise((resolve, reject)=>{
        resolve(roles);
      });
    }

    let t = this._authService.getTokenPayload();
    if (!t || !t.sub)
      throw "Wrong token. Make sure your token follows JWT format";

    let key = JSON.stringify(t);
    return this._getUserRoles(key).then(d=>{
      let r = this._cache[key]
      if (r)
        roles = r;
      return roles;
    });
  }

  _fromCache(token){
    if (token in this._cache)
      return  this._cache[token];
    throw "username not found: " + token;
  }


  _getUserRoles(token){
    if (this._liveRequest) {
      this._liveRequest = this._liveRequest.then(l=>{
        this._fromCache(token)
      }).then(data => {return data}, err=>{
        this._processData(token);
      })
      return this._liveRequest;
    }
    try{
      let userName = this._fromCache(token);
      return new Promise((resolve, reject)=>{
        resolve(userName);
      });
    }
    catch (ex){}
    this._liveRequest = this._processData(token);
    return this._liveRequest;
  }

  _processData(token){
    let q = new Query();
    if (this._query)
      q.filter =this._query;
    return this._dataSource.getData(q).then(d=>{
      this._liveRequest = null;
      this._cache[token] = d.data;
    })
  }
}

