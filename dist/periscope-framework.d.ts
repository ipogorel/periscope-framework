declare module 'periscope-framework' {
  import * as _ from 'lodash';
  import * as peg from 'pegjs';
  import numeral from 'numeral';
  import moment from 'moment';
  import lodash from 'lodash';
  import {
    inject,
    bindable,
    resolver,
    transient,
    computedFrom,
    customElement,
    useView,
    Decorators,
    noView
  } from 'aurelia-framework';
  import {
    HttpClient
  } from 'aurelia-fetch-client';
  import Swagger from 'swagger-client';
  export class PermissionsCustomAttribute {
    constructor(element: any, permissionsManager: any);
    bind(): any;
  }
  export class PermissionsManagerConfiguration {
    dataSource: any;
    withDataSource(dataSource: any): any;
  }
  export class PermissionsManager {
    constructor();
    isConfigured: any;
    permissionsDataSource: any;
    configure(config: any): any;
    hasPermisson(permission: any, resourceGroup: any): any;
  }
  
  /*
  [
    {
      widget: "widgetName1",
      role: "roleName1",
      permissions:["r","w"]
    },
    {
     widget: "widgetName1",
     role: "roleName2",
     permissions:["r"]
    }
  ]
  */
  export class CacheManager {
    constructor(storage: any);
    cleanInterval: any;
    startCleaner(): any;
    stopCleaner(): any;
    getStorage(): any;
  }
  export class CacheStorage {
    setItem(key: any, value: any, expiration: any): any;
    getItem(key: any): any;
    removeItem(key: any): any;
    removeExpired(): any;
  }
  export class MemoryCacheStorage extends CacheStorage {
    constructor();
    setItem(key: any, value: any, seconds: any): any;
    getItem(key: any): any;
    removeItem(key: any): any;
    removeExpired(): any;
  }
  export class DashboardConfiguration {
    invoke(): any;
  }
  export class DataHolder {
    constructor();
    data: any;
    total: any;
    
    // Query object
    query: any;
  }
  export class Datasource {
    constructor(datasourceConfiguration: any);
    name: any;
    transport: any;
    cacheManager: any;
    _liveRequest: any;
    getData(query: any): any;
    create(entity: any): any;
    update(id: any, entity: any): any;
    delete(id: any, entity: any): any;
  }
  export class DataSourceConfiguration {
    cache: any;
    transport: any;
    name: any;
  }
  export class QueryExpressionEvaluator {
    evaluate(data: any, searchExpression: any): any;
  }
  export class Query {
    constructor();
    
    //this.filter = [];
    sort: any;
    group: any;
    sortDir: any;
    take: any;
    fields: any;
    skip: any;
    
    /*get serverSideFilter() {
        return this._serverSideFilter;
      }
      set serverSideFilter(value) {
        this._serverSideFilter = value;
      }*/
    filter: any;
    cacheKey(): any;
  }
  export class IntellisenceManager {
    constructor(parser: any, dataSource: any, availableFields: any);
    populate(searchStr: any, lastWord: any): any;
  }
  export class ExpressionParser {
    constructor(grammarText: any);
    parse(searchString: any): any;
    validate(searchString: any): any;
  }
  export class DataHelper {
    static getNumericFields(fields: any): any;
    static getStringFields(fields: any): any;
    static getDateFields(fields: any): any;
    static getFieldType(collection: any, fieldName: any): any;
    static deserializeDates(jsonArray: any): any;
    static isCurrency(collection: any, fieldName: any): any;
    static isDate(value: any): any;
    static isString(value: any): any;
    static isNumber(value: any): any;
  }
  export class GuidHelper {
    static guid(): any;
  }
  export class StringHelper {
    static compare(string1: any, string2: any): any;
    static replaceAll(str: any, find: any, replace: any): any;
    static hashCode(str: any): any;
    static getEditDistance(a: any, b: any): any;
    static getPreviousWord(str: any, position: any, separators: any): any;
    static getNextWord(str: any, position: any, separators: any): any;
  }
  export class UrlHelper {
    static objectToQuery(ar: any): any;
    static queryToObject(queryParam: any): any;
    static getParameterByName(name: any, url: any): any;
  }
  export class DefaultHttpClient extends HttpClient {
    constructor();
  }
  export class DashboardManager {
    constructor();
    dashboards: any;
    find(dashboardName: any): any;
    createDashboard(type: any, dashboardConfiguration: any): any;
  }
  export class DatasourceManager {
    constructor();
    datasources: any;
    find(datasourceName: any): any;
    createDatasource(datasourceConfiguration: any): any;
  }
  export class Factory {
    constructor(Type: any);
    get(container: any): any;
    static of(Type: any): any;
  }
  export class BehaviorType {
    static listener: any;
    static broadcaster: any;
  }
  export class HistoryStep {
    constructor(userStateStorage: any, navigationHistory: any, dashboardManager: any);
    currentRouteItem: any;
    run(routingContext: any, next: any): any;
  }
  export class NavigationHistory {
    constructor();
    items: any;
    add(url: any, title: any, dashboard: any, state: any, dateTime: any): any;
    update(url: any, dateTime: any): any;
    delete(url: any): any;
    deleteAll(): any;
    trimRight(url: any): any;
    exists(url: any): any;
  }
  export class StateDiscriminator {
    static discriminate(widgetStates: any): any;
  }
  export class StateUrlParser {
    static stateToQuery(widgetStates: any): any;
    static queryToState(url: any): any;
  }
  export class Storage {
    constructor();
    set(key: any, value: any): any;
    get(key: any): any;
    clear(): any;
  }
  export class UserStateStorage {
    constructor(storage: any);
    getAll(namespace: any): any;
    get(key: any): any;
    set(key: any, value: any): any;
    remove(key: any): any;
    clearAll(): any;
    createKey(namespace: any, key: any): any;
  }
  export class Schema {
    constructor();
  }
  export class DataService {
    url: any;
    schemaProvider: any;
    filterParser: any;
    totalMapper: any;
    dataMapper: any;
    httpClient: any;
    configure(configuration: any): any;
    getSchema(): any;
    read(options: any): any;
    create(entity: any): any;
    update(id: any, entity: any): any;
    delete(id: any): any;
  }
  export class DataServiceConfiguration {
    constructor(configuration: any);
    url: any;
    httpClient: any;
    schemaProvider: any;
    totalMapper: any;
    filterParser: any;
    dataMapper: any;
  }
  export class JsonDataService extends DataService {
    _cache: any;
    _liveRequest: any;
    constructor();
    read(options: any): any;
  }
  
  /*read(options) { //options: fields,filter, take, skip, sort
      let url = this.url
      if (options.filter)
        url+= (this.filterParser? this.filterParser.getFilter(options.filter) : "");
  
      if (this._liveRequest) {
        this._liveRequest = this._liveRequest
          .then(l=>this._fromCache(url))
          .then(data =>_processData(url, data), err=> this._doWebRequest(url))
        return this._liveRequest;
      }
      try{
        let data = this._fromCache(url);
        return Promise.resolve(data).then(d => this._processData(url, d));
      }
      catch (ex){}
      this._liveRequest = this._doWebRequest(url);
      return this._liveRequest;
    }
  
      _doWebRequest(url){
        return this.httpClient
          .fetch(url)
          .then(response => {return response.json(); })
          .then(jsonData => {
            return this._processData(url,jsonData)
          });
      }
  
      _processData(url, jsonData){
        this._liveRequest = null;
        this._cache[url] = jsonData;
        return {
          data: (this.dataMapper? this.dataMapper(jsonData) : jsonData),
          total: (this.totalMapper? this.totalMapper(jsonData) : jsonData.length)
        };
      }
  
  
      _fromCache(url){
        if ((url in this._cache)&&(this._cache[url]))
          return  this._cache[url];
        throw "data not found: " + url;
      }*/
  export class StaticJsonDataService extends DataService {
    constructor();
    read(options: any): any;
  }
  export class GrammarExpression extends Grammar {
    constructor(dataFields: any);
    getGrammar(): any;
  }
  export class GrammarTree extends Grammar {
    constructor(dataFields: any);
    getGrammar(): any;
  }
  export class Grammar {
    text: any;
    getGrammar(): any;
  }
  export class FormatValueConverter {
    static format(value: any, format: any): any;
    toView(value: any, format: any): any;
  }
}