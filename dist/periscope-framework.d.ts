declare module 'periscope-framework' {
  import * as _ from 'lodash';
  import * as peg from 'pegjs';
  import numeral from 'numeral';
  import moment from 'moment';
  import lodash from 'lodash';
  import {
    inject,
    resolver,
    transient,
    computedFrom,
    customElement,
    useView,
    Decorators,
    bindable,
    noView
  } from 'aurelia-framework';
  import {
    HttpClient
  } from 'aurelia-fetch-client';
  import {
    EventAggregator
  } from 'aurelia-event-aggregator';
  import {
    Router
  } from 'aurelia-router';
  import Swagger from 'swagger-client';
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
    createDataHolder(): any;
    cacheOn(cacheKey: any): any;
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
    sort: any;
    group: any;
    sortDir: any;
    take: any;
    fields: any;
    skip: any;
    
    /*get clientSideFilter() {
        return this._clientSideFilter;
      }
      set clientSideFilter(value) {
        this._clientSideFilter = value;
      }*/
    serverSideFilter: any;
    cacheKey(): any;
  }
  export class DslExpressionManagerFactory {
    constructor(expressionParserFactory: any);
    createInstance(dataSource: any, fields: any): any;
  }
  export class DslExpressionManager {
    constructor(parser: any, dataSource: any, fieldsList: any);
    populate(searchStr: any, lastWord: any): any;
    parse(searchStr: any): any;
    validate(searchStr: any): any;
    expectedToken(searchStr: any): any;
    getParserError(searchStr: any): any;
  }
  export class ExpressionParserFactory {
    constructor(http: any);
    createInstance(numericFieldList: any, stringFieldList: any, dateFieldList: any): any;
    concatenateFieldList(fieldList: any): any;
  }
  export class ExpressionParser {
    constructor(pegParser: any);
    parse(searchString: any): any;
    validate(searchString: any): any;
  }
  export class Grammar {
    getGrammar(): any;
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
  export class DashboardManager {
    constructor();
    dashboards: any;
    find(dashboardName: any): any;
    createDashboard(type: any, dashboardConfiguration: any): any;
  }
  export class Factory {
    constructor(Type: any);
    get(container: any): any;
    static of(Type: any): any;
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
  export class PeriscopeRouter {
    constructor(aureliaRouter: any, eventAggregator: any, userStateStorage: any, navigationHistory: any);
    currentRouteItem: any;
    navigate(routeItem: any): any;
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
    configure(configuration: any): any;
    getSchema(): any;
    read(options: any): any;
    create(entity: any): any;
    update(id: any, entity: any): any;
    delete(id: any): any;
  }
  export class DataServiceConfiguration {
    constructor(options: any);
    url: any;
    schemaProvider: any;
    totalMapper: any;
    queryMapper: any;
    dataMapper: any;
  }
  export class JsonDataService extends DataService {
    constructor(http: any);
    read(options: any): any;
  }
  export class StaticJsonDataService extends DataService {
    constructor(http: any);
    read(options: any): any;
  }
  export class FormatValueConverter {
    static format(value: any, format: any): any;
    toView(value: any, format: any): any;
  }
}