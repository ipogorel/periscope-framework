import * as _ from 'lodash';
import * as peg from 'pegjs';
import * as base64 from 'js-base64';
import numeral from 'numeral';
import moment from 'moment';
import {inject,bindable,resolver,transient,computedFrom,customElement,useView,Decorators,noView} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import {Container} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Element, PermissionsManager)
export class PermissionsCustomAttribute {

  constructor(element, permissionsManager){
    this.element = element;
    this.permissionsManager = permissionsManager;
  }

  bind() {
    if (!this.value)
      return;
    let rGroup = "";
    let permissions = []
    if (_.isString(this.value)) {
      rGroup = this.element.au.permissions.scope.bindingContext.resourceGroup; // get widget name
      permissions = this.value.split(",");
    }
    else if (_.isPlainObject(this.value)){
      rGroup = this.value.resourceGroup;
      permissions = this.value.permissions.split(",");
    }

    this.element.hidden = true;
    this.element.disabled = true;
    for (let p of permissions){
      this.permissionsManager.hasPermisson(p, rGroup).then(result=>{

        if (result){
          if (p==='read')
            this.element.hidden = false;
          if (p==='write')
            this.element.disabled = false;
        }
      }, err=>{

      })
    }
  }
}

export class PermissionsManagerConfiguration {
  dataSource;

  withDataSource(dataSource){
    this.dataSource = dataSource;
    return this;
  }

}

export class PermissionsManager {
  constructor(){
  }

  isConfigured = false;
  permissionsDataSource;

  configure(config){
    let normalizedConfig = new PermissionsManagerConfiguration();
    config(normalizedConfig);
    this.permissionsDataSource = normalizedConfig.dataSource;
    this.isConfigured = true;
  }

  hasPermisson(permission, resourceGroup){
    if (!this.isConfigured){
      return new Promise((resolve, reject)=>{
        resolve(true);
      });
    }

    return this._getData().then(permissions=>{
      let normalizedPermissions = _.map(permissions, p=>{
        let a = p.toLowerCase().split("-")
        if (a.length==2)
          return {permission:a[0], group:a[1]}
      });
      if (_.filter(normalizedPermissions,{ 'permission': permission, 'group': resourceGroup }).length>0)
        return true;
      return false;
    }, err=>{
      return false;
    })
  }

  _getData(){
    let q = new Query();
    if (this._query)
      q.filter =this._query;
    return this.permissionsDataSource.getData(q).then(d=>{
      return d.data;
    })
  }
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
  constructor(storage) {
    this._cacheStorage = storage;
    this._cleanInterval = 5000;
  }

  get cleanInterval() {return this._cleanInterval;}

  startCleaner(){
    if (!this.cleaner) {
      let self = this;
      this.cleaner = window.setInterval(()=> {
        self._cacheStorage.removeExpired();
      }, this._cleanInterval);
    }
  }

  stopCleaner(){
    if (this.cleaner)
      window.clearInterval(this.cleaner);
  }

  getStorage(){
    return this._cacheStorage;
  }

}


export class CacheStorage{
  setItem(key, value, expiration){}
  getItem(key){}
  removeItem(key){}
  removeExpired(){}
}

export class MemoryCacheStorage extends CacheStorage{
  constructor(){
    super();
    this._cache = {}
  }
  setItem(key, value, seconds){
    var t = new Date();
    t.setSeconds(t.getSeconds() + seconds);
    var v = _.assign({},value);
    this._cache[key] = {
      value: v,
      exp: t
    };
  }
  getItem(key){
    if (this._cache[key] && this._cache[key].exp >= Date.now())
      return this._cache[key].value;
    return null;
  }
  removeItem(key){
    delete this._cache[key];
  }
  removeExpired(){
    var self = this;
    _.forOwn(self._cache, function(v, k) {
      if (self._cache[k].exp < Date.now()){
        self.removeItem(k);
      }
    });
  }
}

export class DashboardConfiguration {
  invoke(){

  }
}



export class DataHolder {
  constructor(){
  }
  data;
  total;
  query;
}

export class Datasource extends Configurable{
    
    constructor() {
        super();
    }

    name;
    readService;
    updateService;
    createService;
    deleteService;
    cache;

    _liveRequest = {};



    getData(query) {
      if (!this.readService)
        throw "readService is not configured";

      let cacheKey = this.readService.url + query.cacheKey();

      if (!this.cache){
        return this._doWebRequest(cacheKey, query);
      }
      else {
        if (this._liveRequest[cacheKey]) {
          this._liveRequest[cacheKey] = this._liveRequest[cacheKey]
            .then(l=>this._fromCache(cacheKey))
            .then(data =>this._processData(cacheKey, query, data), err=> this._doWebRequest(cacheKey, query))
          return this._liveRequest[cacheKey];
        }
        try{
          let data = this._fromCache(cacheKey);
          return Promise.resolve(data).then(d => this._processData(cacheKey, query, d));
        }
        catch (ex){}
        this._liveRequest[cacheKey] = this._doWebRequest(cacheKey, query);
        return this._liveRequest[cacheKey];
      }
    }

    create(entity){
      if (!this.createService)
        throw "createService is not configured";
      return this.createService.create(entity);
    }

    update(id, entity){
      if (!this.updateService)
        throw "updateService is not configured";
      return this.updateService.update(id, entity);
    }

    delete(id, entity){
      if (!this.deleteService)
        throw "deleteService is not configured";
      return this.deleteService.delete(entity);
    }

    _doWebRequest(cacheKey, query){
      return this.readService.read(
        {
          fields: query.fields,
          filter: query.filter,
          take: query.take,
          skip: query.skip,
          sort: query.sort,
          sortDir: query.sortDir
        })
        .then(d => {
          return this._processData(cacheKey,query,d)
        });
    }

    _processData(cacheKey, query, jsonData){
      this._liveRequest[cacheKey] = null;
      this._setCache(jsonData, cacheKey);
      let dataHolder = new DataHolder();
      dataHolder.query = query;
      dataHolder.data = _.isArray(jsonData.data)?jsonData.data : [jsonData.data];
      dataHolder.total = jsonData.total;
      return dataHolder;

    }

    _fromCache(cacheKey){
      let storage = this.cache.cacheManager.getStorage();
      let d = storage.getItem(cacheKey);
      if (d)
        return d;
      throw "data not found: " + cacheKey;
    }
    _setCache(data, cacheKey){
      if (this.cache&&this.cache.cacheManager) {
        let storage = this.cache.cacheManager.getStorage();
        storage.setItem(cacheKey, data, this.cache.cacheTimeSeconds);
      }
    }

  persistConfigurationTo(configurationInfo){
    configurationInfo.addValue("name", this.name);
    configurationInfo.addValue("readService", this.readService);
    configurationInfo.addValue("updateService", this.updateService);
    configurationInfo.addValue("createService", this.createService);
    configurationInfo.addValue("deleteService", this.deleteService);
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo){
    this.name = configurationInfo.getValue("name");
    this.readService = configurationInfo.getValue("readService");
    this.updateService = configurationInfo.getValue("updateService");
    this.createService = configurationInfo.getValue("createService");
    this.deleteService = configurationInfo.getValue("deleteService");
    super.restoreConfigurationFrom(configurationInfo);
  };

}

export class DataSourceConfiguration {
  cache;
  name;
  readService;
  updateService;
  createService;
  deleteService;
}




String.prototype.in = function(array)
{
  for (var i = 0; i < array.length; i++)
  {
    if (array[i]==this)
      return true;
  }
  return false;
}

export class QueryExpressionEvaluator {
  evaluate(data, searchExpression)
  {
    var res = [];
    if (searchExpression!="") {
      for (let record of data) {
        if (eval(searchExpression)) {
          res.push(record);
        }
      }
    }
    else
      res = data;
    return res;
  }

}

export class Query {
  constructor (){
  }

  sort;
  group;
  sortDir;
  take;
  fields;
  skip;
  filter;


  cacheKey(){
    return Math.abs(StringHelper.hashCode(
        ((this.filter)?JSON.stringify(this.filter):"") +
        (this.fields?this.fields.join(""):"") +
        (this.sort?this.sort:"") +
        (this.sortDir?this.sortDir:"") +
        (this.take?this.take:"0") +
        (this.skip?this.skip:"0")));
  }
}


export class IntellisenceManager {
  constructor(parser, dataSource, availableFields){
    this.dataSource = dataSource;
    this.fields = availableFields;
    this.parser = parser;
  }

  populate(searchStr, lastWord){
    let parserError = this._getParserError(searchStr);
    return this._getIntellisenseData(searchStr, lastWord, parserError);
  }


  _getParserError(searchStr) {
    let result = null;
    if (searchStr!="") {
      try {
        this.parser.parse(searchStr);
        try{
          this.parser.parse(searchStr + "^");
        }
        catch(ex2){
          result = ex2;
        }
      }
      catch (ex) {
        result = ex;
      }
    }
    return result;
  }



  _getLastFieldName(searchStr, fieldsArray, index) {
    var tmpArr = searchStr.substr(0, index).split(" ");
    for (let i=(tmpArr.length-1); i>=0; i--)  {
      let j = fieldsArray.findIndex(x=>x.toLowerCase() == tmpArr[i].trim().toLowerCase());
      if (j>=0)
        return fieldsArray[j];
      //return tmpArr[i].trim();
    }
    return "";
  }

  _interpreteParserError(ex){
    if (Object.prototype.toString.call(ex.expected) == "[object Array]") {
      for (let desc of ex.expected) {
        if ((desc.type == "other")||(desc.type == "end")) {//"FIELD_NAME" "OPERATOR" "FIELD_VALUE", "LOGIC_OPERATOR"
          return desc.description;
        }
      }
    }
    return "";
  }

  _getIntellisenseData (searchStr, lastWord, pegException) {
    let type='';
    let result = [];
    let lastFldName = '';

    if (!pegException)
      return new Promise((resolve, reject)=>{ resolve([])});

    let tokenName = this._interpreteParserError(pegException);
    return new Promise((resolve, reject)=>{
      switch (tokenName) {
        case "STRING_FIELD_NAME":
        case "NUMERIC_FIELD_NAME":
        case "DATE_FIELD_NAME":
          var filteredFields = lastWord? _.filter(this.fields,f=>{return f.toLowerCase().startsWith(lastWord.toLowerCase())}) : this.fields;
          resolve(this._normalizeData("field", filteredFields.sort()));
          break;
        case "STRING_OPERATOR_EQUAL":
        case "STRING_OPERATOR_IN":
          resolve(this._normalizeData("operator", this._getStringComparisonOperatorsArray()));
          break;
        case "STRING_VALUE":
        case "STRING_PATTERN":
          lastFldName = this._getLastFieldName(searchStr, this.fields, pegException.column);
          this._getFieldValuesArray(lastFldName, lastWord).then(data=>{
            resolve(this._normalizeData("string", data))
          });
          break;
        case "STRING_VALUES_ARRAY":
          lastFldName = this._getLastFieldName(searchStr, this.fields, pegException.column);
          this._getFieldValuesArray(lastFldName, lastWord).then(data=>{
            resolve(this._normalizeData("array_string", data))
          });
          break;
          resolve(this._normalizeData("array_string", []));
          break;
        case "OPERATOR":
          resolve(this._normalizeData("operator", this._getComparisonOperatorsArray()));
          break;
        case "LOGIC_OPERATOR":
        case "end of input":
          resolve(this._normalizeData("operator", this._getLogicalOperatorsArray()));
          break;
        default:
          resolve([]);
          break;
      }
    });
  }


  _getFieldValuesArray(fieldName, lastWord) {
    let query = new Query();
    query.take = 100;
    query.skip = 0;
    if (lastWord)
      query.filter = this.parser.parse(fieldName + " = '" + lastWord + "%'");
    query.fields = [fieldName];
    return this.dataSource.getData(query).then(dH=>{
      var result = _.map(dH.data,fieldName);
      return _.uniq(result).sort();
    })
  }

  _getStringComparisonOperatorsArray() {
    return (["=", "in"]);
  }

  _getLogicalOperatorsArray() {
    return (["and", "or"]);
  }

  _getComparisonOperatorsArray() {
    return (["!=", "=", ">", "<", ">=", "<="])
  }

  _normalizeData(type, dataArray) {
    return _.map(dataArray,d=>{ return { type: type, value: d }});
  }
}

export class ExpressionParser {

  constructor(grammarText) {
    this.parser =  peg.buildParser(grammarText);
  }

  parse(searchString) {
    return this.parser.parse(searchString);
  }

  validate(searchString) {
    try{
      this.parser.parse(searchString);
      return true;
    }
    catch(ex) {
      return false;
    }
  }
}

export class DataHelper {
  static getNumericFields(fields){
    return _.filter(fields, f => {
      if ((f.type == "number")||(f.type == "currency"))
        return f;
    });
  }
  static getStringFields(fields){
    return _.filter(fields,{type:"string"});
  }

  static getDateFields(fields){
    return _.filter(fields,{type:"date"});
  }

  static getFieldType(collection, fieldName) {
    var blankCount = 0;
    var result;
    for(var i=0; i< collection.length; i++){
      var val = collection[i][fieldName];
      if(val!=undefined){
        if (DataHelper.isString(val))
          result = "string";
        else if (DataHelper.isNumber(val)) {
          if (DataHelper.isCurrency(collection, fieldName))
            result = "currency";
          else
            result = "number";
        }
        else if (DataHelper.isDate(val))
          result = "date";
        return result;
      }
      else{
        blankCount++;
      }
      if(blankCount>300){
        return undefined;
      }
    }
  }

  static deserializeDates(jsonArray) {
    for(var r = 0; r< jsonArray.length; r++) {
      var jsonObj = jsonArray[r];
      for (var field in jsonObj) {
        if (jsonObj.hasOwnProperty(field)) {
          var value = jsonObj[field];
          if(value && typeof value == 'string' && value.indexOf('/Date')===0){
            jsonObj[field] = new Date(parseInt(value.substr(6)));
          }
        }
      }
    }
    return jsonArray;
  }

  static isCurrency(collection, fieldName){
    if ((collection.length===0)||(!fieldName))
      return false;
    var largeValues =_.filter(collection, x=> (Math.abs(x[fieldName])>=1000)).length;
    if ((largeValues/collection.length)> 0.4)
      return true;
    return false;
  }

  static isDate(value) {
    return ((new Date(value) !== "Invalid Date" && !isNaN(new Date(value))));
  }

  static isString(value) {
    return (typeof value === 'string' || value instanceof String);
  }

  static isNumber(value) {
    return (typeof value === 'number');
  }
}

export class GuidHelper {

  static guid() {
    return GuidHelper._s4() + GuidHelper._s4() + '-' + GuidHelper._s4() + '-' + GuidHelper._s4() + '-' +
      GuidHelper._s4() + '-' + GuidHelper._s4() + GuidHelper._s4() + GuidHelper._s4();
  }

  static _s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
}


export class StringHelper {

  static compare (string1, string2) {
    return string1.toUpperCase() === string2.toUpperCase();
  }

  static replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
  }

  static hashCode(str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (let i = 0; i < str.length; i++) {
      let char = str.charCodeAt(i);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }

  static getEditDistance(a, b){
    if(a.length == 0) return b.length;
    if(b.length == 0) return a.length;

    var matrix = [];

    // increment along the first column of each row
    var i;
    for(i = 0; i <= b.length; i++){
      matrix[i] = [i];
    }

    // increment each column in the first row
    var j;
    for(j = 0; j <= a.length; j++){
      matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for(i = 1; i <= b.length; i++){
      for(j = 1; j <= a.length; j++){
        if(b.charAt(i-1) == a.charAt(j-1)){
          matrix[i][j] = matrix[i-1][j-1];
        } else {
          matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
            Math.min(matrix[i][j-1] + 1, // insertion
              matrix[i-1][j] + 1)); // deletion
        }
      }
    }

    return matrix[b.length][a.length];
  }

  static getPreviousWord(str, position, separators){
    //var str = searchStr.substring(0, this.caretPosition).toLowerCase();
    var str = str.substring(0, position);
    var lastSeparatorIndex = 0;
    for(let i=0; i < separators.length; i++) {
      if (str.lastIndexOf(separators[i])>lastSeparatorIndex)
        lastSeparatorIndex = str.lastIndexOf(separators[i]);
    }
    if (lastSeparatorIndex == str.length)
      lastSeparatorIndex=0;
    if ((lastSeparatorIndex>0)&&(lastSeparatorIndex < str.length))
      lastSeparatorIndex++;

    return str.substring(lastSeparatorIndex, str.length);
  }

  static getNextWord(str, position, separators){
    var str = str.substring(position, str.length);
    var firstSeparatorIndex = str.length;
    for(let i=0; i < separators.length; i++) {
      if ((str.indexOf(separators[i])<firstSeparatorIndex)&&(str.indexOf(separators[i])>=0))
        firstSeparatorIndex = str.indexOf(separators[i]);
    }
    return str.substring(0, firstSeparatorIndex);
  }
}

export class UrlHelper {
  static getAbsoluteBaseUrl(){
    return window.location.protocol + "//" + window.location.hostname + (window.location.port? ":" + window.location.port : "")
  }

  static objectToQuery(ar){
    return encodeURIComponent(JSON.stringify(ar));
  }

  static queryToObject(queryParam){
    return JSON.parse(decodeURIComponent(queryParam));
  }

  static getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

}

export class DefaultHttpClient extends HttpClient {
  constructor() {
    super();
    this.configure(config => {
      config
        .useStandardConfiguration()
        .withDefaults({
          headers: {
            'Accept': 'application/json'
          }
        })
    });
  }
}

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

export class DatasourceManager {
  constructor() {
    this._datasources = [];
  }
  get datasources(){
    return this._datasources;
  }

  find(datasourceName){
    return  _.find(this._datasources, {name:datasourceName});
  }

  createDatasource(datasourceConfiguration){
    if (this.find(datasourceConfiguration.name))
      throw "Datasource with the name '" + datasourceConfiguration.name + "' already exists";
    var datasource = new Datasource(datasourceConfiguration);
    this._datasources.push(datasource);
    return datasource;
  }
}

@resolver
export class Factory{
  constructor(Type){
    this.Type = Type;
  }

  get(container){
    return (...rest)=>{
      return container.invoke(this.Type, rest);
    };
  }

  static of(Type){
    return new Factory(Type);
  }
}

export class PeriscopeFactory{
  constructor(){
    this.references = [];
    this.container = Container.instance.createChild();
  }
  addReference(type){
    this.references.push(type);
  }
  createObject(typeName){
    let t = _.find(this.references, r=>{
      return r.name === typeName;
    })
    if (t){
      let f = this.container.get(Factory.of(t))
      return f();
    }

    throw "reference to object " + typeName + " not found"
  }

}

export class BehaviorType {
  static get listener(){
    return "listener";
  }
  static get broadcaster(){
    return "broadcaster";
  }
}

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

export class NavigationHistory {
  constructor() {
    this._history = [];
  }



  get items(){
    return this._history;
  }


  add(url, title, dashboard, state, dateTime) {
    this._history.push({url, title, dashboard, state, dateTime});
  }



  update(url, dateTime){
    for (let h of this._history){
      if (h.url === url) {
        h.dateTime = dateTime;
        break;
      }
    }
  }

  delete(url){
    for (let i of this._history){
      if (i.url === url) {
        this._history.splice(i, 1);
        break;
      }
    }
  }

  deleteAll(){
    this._history = [];
  }

  trimRight(url){
    for (let i = this._history.length - 1; i >= 0; i--) {
      if (this._history[i].url === url) {
        this._history.splice(i + 1);
        return;
      }
    }
  }

  exists(url) {
    for (let i of this._history){
      if (i.route === url)
        return true;
    }
    return false;
  }



}

export class Configurable {
  constructor(){}
  persistConfigurationTo(configurationInfo){}
  restoreConfigurationFrom(configurationInfo){};
}


export class ConfigurationInfo {
  static createInfo(configurator, object, objectConfig){
    return new ConfigurationInfo(configurator, object.constructor.name, objectConfig);
  }

  constructor(configurator, objectType, objectConfig){
    this.configurator = configurator;
    this.type = objectType;
    this.config = objectConfig?objectConfig:{};
  }

  configurator;
  type;
  config;

  addValue(key, value){
    if (value){
      if (_.isArray(value)){
        let aVal = [];
        _.forEach(value,v=>{
          aVal.push(this._getConfig(v))
        })
        this.config[key] = aVal;
      }
      else
        this.config[key] = this._getConfig(value);
    }
  }

  addScript(key, value){
    if (value)
      this.config[key] = value.toString();
  }

  getValue(key){
    if (this.config[key]){
      if (_.isArray(this.config[key])) {
        let aVal = [];
        _.forEach(this.config[key],v=>{
          aVal.push(this._getObject(v));
        });
        return aVal;
      }
      else {
        return this._getObject(this.config[key])
      }
    }
    return null;
  }

  getScript(key){
    if (this.config[key]){
      return eval("(" + this.config[key] + ")");
    }
    return null;
  }

  getInt(key){
    if (this.config[key]){
      return parseInt(this.config[key]);
    }
    return null;
  }

  getBool(key){
    if (this.config[key]){
      return (this.config[key] === "true");
    }
    return null;
  }


  _getConfig(object){
    if (this.configurator.isConfigurable(object))
      return this.configurator.getConfiguration(object);
    else
      return object;
  }
  _getObject(config){
    if (config.type && config.config) {//serializable
      return this.configurator.getObject(config);
    }
    return config;
  }
}

export class DashboardSerializer {
  constructor(configurator){
    this.configurator = configurator;
  }

  serialize(dashoardsList){
    let result = [];
    _.forEach(dashoardsList,d=>{
      result.push(this.configurator.getConfiguration(d));
    });
    return result;
  }

  deserialize(dashoardsConfiguration){
    this.dashoardsConfigurationState = dashoardsConfiguration;
    let result = [];
    _.forEach(dashoardsConfiguration,d=>{
      result.push(this.configurator.getObject(d));
    });
    return result;
  }
}

export class PeriscopeObjectConfigurator {
  constructor(factory){
    this.factory = factory;
  }

  isConfigurable(object){
    if (!_.isObject(object) || !object.persistConfigurationTo)
      return false;
    return true;
  }

  getConfiguration(object){
    if (!this.isConfigurable(object))
      throw "configurable object must implement persistConfigurationTo method";
    let info = ConfigurationInfo.createInfo(this, object);
    object.persistConfigurationTo(info);
    return {
      type: info.type,
      config: info.config
    }
  }

  getObject(objectConfig){
    let obj = this.factory.createObject(objectConfig.type);
    let info = ConfigurationInfo.createInfo(this, obj);
    info.config = objectConfig.config;
    obj.restoreConfigurationFrom(info);
    return obj;
  }
}


export class StateDiscriminator{
  static discriminate(widgetStates){
    var result = []
    for (let ws of widgetStates){
      if (ws.stateType==="searchBoxState")
        result.push(ws);
    }
    return result;
  }

}

export class StateUrlParser{
  static stateToQuery(widgetStates){
    var params = []
    for (let widgetState of widgetStates) {
      if (widgetState.value)
        params.push({"sn": widgetState.name, "sv": widgetState.value});
    }
    return ((params.length>0)? "?q=" + Base64.encode(UrlHelper.objectToQuery(params)) :"");
  }

  static queryToState(url){
    var result = [];
    var q = UrlHelper.getParameterByName("q", url);
    if (q){
      var widgetStates = UrlHelper.queryToObject(Base64.decode(q));
      for (var ws of widgetStates){
        result.push({"name":ws.sn, "value":ws.sv});
      }
    }
    return result;
  }
}

export class Storage{
  constructor(){
    this._provider = this._initProvider('Warning: Local Storage is disabled or unavailable.');
  }
  set(key, value){
    if (this._provider)
     return this._provider.setItem(key, JSON.stringify(value));
    return undefined;
  }
  get(key){

    if (this._provider)
      return  JSON.parse(this._provider.getItem(key));
    return undefined;
  }

  clear(){
    if (this._provider)
      this._provider.clear();
  }

  _initProvider(warning){
    if ('sessionStorage' in window && window['sessionStorage'] !== null) {
      return sessionStorage;
    } else {
      console.warn(warning);
      return undefined;
    }
  }
}

const STORAGE_KEY = "prcpfwk23875hrw28esgfds";

@inject(Storage)
export class UserStateStorage{

    constructor(storage) {
      this._storage = storage;
      this._key = STORAGE_KEY;
    }

    getAll (namespace){
      var data = this._storage.get(this._key);
      if (data) {
        if (!namespace)
          return data;
        namespace = this._createFullNamespace(namespace);
        return _.filter(data, x => (x.key.indexOf(namespace)===0));
      }
      return [];
    }

    get(key){
      var o = this._getObj(key);
      if (o)
        return o.value;
      return undefined;
    }

    set(key, value){
      var all = this.getAll();
      var oldState = {key};
      var newState = {key, value};
      var item = _.find(all, {'key': key});
      if (item) {
        oldState.value = item.value;
        item.value = value;
      }
      else
        all.push({key: key, value: value});
      this._storage.set(this._key, all);
    }

    remove(key){
      var all = this.getAll();
      _.remove(all, function(i){
          return i.key == key;
        }
      );
      this._storage.set(this._key, all);
    }


    clearAll(){
      this._storage.clear();
    }

    createKey(namespace, key){
      return this._createFullNamespace(namespace) + key;
    }

    _createFullNamespace(namespace){
      return namespace + ":";
    }

    _getObj(k){
      var data = this.getAll();
      var obj = _.find(data,  {'key':k});
      return obj;
    }

}

export class Schema {
  constructor(){
    this.fields = [];
    this.parameters = [];
  }
}

const DSL_GRAMMAR_EXPRESSION = `
{
function createStringExpression(fieldname, value){
 		var prefix = "record.";
 		var result = "";
 		var v = value.trim().toLowerCase();
        if (v.length>=2){
          if ((v.indexOf("%")===0)&&(v.lastIndexOf("%")===(v.length-1)))
              result = prefix + fieldname + ".toLowerCase().includes('" + v.substring(1,value.length-1) + "')"
          else if (v.indexOf("%")===0)
              result = prefix + fieldname + ".toLowerCase().endsWith('" + v.substring(1,value.length) + "')"
          else if (v.lastIndexOf("%")===(value.length-1))
              result = prefix + fieldname + ".toLowerCase().startsWith('" + v.substring(0,value.length-1) + "')"
        }
        if (result == "")
          result = prefix + fieldname + ".toLowerCase() == '" + v + "'";

        result="(" + prefix + fieldname + "!=null && " + result + ")"

        return result;
 }
  function createInExpression (fieldname, value) {
    var result = "";
    var values = value.split(',');
    for (var i=0;i<values.length;i++)
    {
      var find = '[\\"\\']';
      var re = new RegExp(find, 'g');
      var v = values[i].replace(new RegExp(find, 'g'), "");
      //result += "record." + fieldname + ".toLowerCase() ==" + v.trim().toLowerCase();
      result += createStringExpression(fieldname, v)
      if (i<(values.length-1))
        result += " || ";
    }
    if (result.length>0)
      result = "(" + result + ")"
    return result;
  }
}

start = expression

expression = c:condition j:join e:expression space? {return c+j+e;}
           / c:condition space? {return c;}

join "LOGIC_OPERATOR"
     = and
     / or

and = space* "and"i space* {return " && ";}

or = space* "or"i space* {return " || ";}


condition = space? f:stringField o:op_eq v:stringValue {return createStringExpression(f,v);}
          / space? f:stringField o:op_in a:valuesArray {return createInExpression(f,a);}
          / space? f:numericField o:op v:numericValue {return "record." + f + o + v;}
          / space? f:dateField o:op v:dateValue {return "record." + f + o + v;}
          / "(" space? e:expression space* ")" space* {return "(" + e +")";}



valuesArray "STRING_VALUES_ARRAY"
      = parentheses_l va:$(v:stringValue space* nextValue*)+ parentheses_r {return  va }

nextValue = nv:(space* "," space* v:stringValue) {return  nv}



dateValue "DATE_VALUE"
        = quote? dt:$(date+) quote? {return "'" + dt + "'";}


stringValue  "STRING_VALUE"
	  = quote w:$(char+) quote {return  w }
      / quote quote {return "";}


numericValue  "NUMERIC_VALUE"
       = $(numeric+)


op "OPERATOR"
   = op_eq
   / ge
   / gt
   / le
   / lt

op_eq "STRING_OPERATOR_EQUAL"
  = eq
  / not_eq

op_in "STRING_OPERATOR_IN"
  = in

eq = space* "=" space* {return "==";}

not_eq = space* "!=" space* {return "!=";}

gt = space* v:">" space* {return v;}

ge = space* v:">=" space* {return v;}

lt = space* v:"<" space* {return v;}

le = space* v:"<=" space* {return v;}

in = space* v:"in" space* {return v;}


date = [0-9 \\:\\/]

char = [a-z0-9 \\%\\$\\_\\-\\:\\,\\.\\/]i

numeric = [0-9-\\.]

space = [ \\t\\n\\r]+

parentheses_l = [\\(] space*

parentheses_r = space* [\\)]

field "FIELD_NAME"
      = stringField
     / numericField
     / dateField

stringField "STRING_FIELD_NAME"
     = @S@

numericField "NUMERIC_FIELD_NAME"
     = @N@

dateField "DATE_FIELD_NAME"
     = @D@

quote = [\\'\\"]


`;


export class GrammarExpression extends Grammar{
  constructor(dataFields){
    super();
    this.text = DSL_GRAMMAR_EXPRESSION;
    this.dataFields = dataFields;
  }

  getGrammar(){
    let stringFieldList = _.map(DataHelper.getStringFields(this.dataFields),"field");
    let numericFieldList = _.map(DataHelper.getNumericFields(this.dataFields),"field");
    let dateFieldList = _.map(DataHelper.getDateFields(this.dataFields),"field");
    let parserText = this.text.replace('@S@', this._concatenateFields(stringFieldList))
      .replace('@N@', this._concatenateFields(numericFieldList))
      .replace('@D@', this._concatenateFields(dateFieldList));
    return parserText;
  }

  _concatenateFields(fieldList){
    for (var i = 0; i < fieldList.length; i++) {
      fieldList[i] = '\'' + fieldList[i] + '\'i';
    }
    if (fieldList.length>0)
      return fieldList.join('/ ');
    else
      return "'unknown_field'"
  }
}


const DSL_GRAMMAR_TREE = `
{
  function findFirstLeftStatement(arr) {
    if ( Array.isArray(arr) ) {
      return findFirstLeftStatement(arr[0]["left"]);
    } else if ( typeof arr === "object" ) {
        return arr;
    }
  }

  function inject(arr, connector) {
    findFirstLeftStatement(arr)["connector"] = connector;
    return arr;
  }
  function toArray (value) {
    var res = value.split(',');
    var re = new RegExp('[\\'\\"]', 'g');
    for (var i=0;i<res.length;i++)
      res[i] = res[i].replace(re, "").trim();
    return res;
  }
  
  /*function createInExpression (fieldname, value) {
    var result = []
    var values = value.split(',');
    for (var i=0;i<values.length;i++){
    	if (i!=0)
    		result.push({field:fieldname, type:'string' ,value:values[i]});
        else
            result.push({field:fieldname, type:'string' ,value:values[i], connector:" || "});
    }
    return result;
  }*/
}

//Start = statement *
Start
  = st:statement  {return st}  
  
statement
  = left:block cnct:connector right:statement 
    { return { left: left, right: inject(right, cnct) }; }
  / left: block 
    { return left; }
    
block
  = pOpen block:statement* pClose space?
    { return block[0]; }
  / block:condition space?
    { return block; }
    
condition = space? f:stringField o:op_eq v:stringValue 
			{return {field:f, type:"string", operand:o, value:v}}
            / space? f:stringField o:op_in a:valuesArray 
       {return {field:f, type:"string", operand:o, value:toArray(a)}}            
			  / space? f:numericField o:op v:numericValue 
            {return {field:f, type:"number", operand:o, value:v}}
          	/ space? f:dateField o:op v:dateValue
          {return {field:f, type:"date", operand:o, value:v}}

connector "LOGIC_OPERATOR"
    = cn:(or / and) 
      { return cn.toString(); }
      
and = space* "and"i space* {return " && ";}

or = space* "or"i space* {return " || ";}

valuesArray "STRING_VALUES_ARRAY"
      = pOpen va:$(v:stringValue space* nextValue*)+ pClose {return  va }
      
nextValue = nv:(space* "," space* v:stringValue) {return  nv}      

dateValue "DATE_VALUE"
        = quote? dt:$(date+) quote? {return dt;}


stringValue  "STRING_VALUE"
	  = quote w:$(char+) quote {return  w }
      / quote quote {return "";}


numericValue  "NUMERIC_VALUE"
       = $(numeric+)

op "OPERAND"
   = op_eq
   / ge
   / gt
   / le
   / lt

op_eq "STRING_OPERATOR_EQUAL"
  = eq
  / not_eq

op_in "STRING_OPERATOR_IN"
  = in

eq = space* "=" space* {return "==";}

not_eq = space* "!=" space* {return "!=";}

gt = space* v:">" space* {return v;}

ge = space* v:">=" space* {return v;}

lt = space* v:"<" space* {return v;}

le = space* v:"<=" space* {return v;}

in = space* v:"in" space* {return v;}


date = [0-9\\:\\/]

char = [a-z0-9 \\%\\$\\_\\-\\:\\,\\.\\/]i

numeric = [0-9-\\.]

space = [ \\t\\n\\r]+

pOpen = [\\(] space*

pClose = space* [\\)]

field "FIELD_NAME"
      = stringField
     / numericField
     / dateField

stringField "STRING_FIELD_NAME"
     = @S@

numericField "NUMERIC_FIELD_NAME"
     = @N@

dateField "DATE_FIELD_NAME"
     = @D@

quote = [\\'\\"]
`;


export class GrammarTree extends Grammar {
  constructor(dataFields){
    super();
    this.text = DSL_GRAMMAR_TREE;
    this.dataFields = dataFields;
  }

  getGrammar(){
    let stringFieldList = _.map(DataHelper.getStringFields(this.dataFields),"field");
    let numericFieldList = _.map(DataHelper.getNumericFields(this.dataFields),"field");
    let dateFieldList = _.map(DataHelper.getDateFields(this.dataFields),"field");
    let parserText = this.text.replace('@S@', this._concatenateFields(stringFieldList))
      .replace('@N@', this._concatenateFields(numericFieldList))
      .replace('@D@', this._concatenateFields(dateFieldList));
    return parserText;
  }

  _concatenateFields(fieldList){
    for (var i = 0; i < fieldList.length; i++) {
      fieldList[i] = '\'' + fieldList[i] + '\'i';
    }
    if (fieldList.length>0)
      return fieldList.join('/ ');
    else
      return "'unknown_field'"
  }
}






export class Grammar{
  
  set text(value){
    this._text = value;
  }
  get text(){
    return this._text;
  }

  getGrammar(){
  }
  
}

export class DataService extends Configurable {
  constructor(){
    super();
    this.url = "";
    this.schemaProvider = new EmptySchemaProvider();
  }

  url;
  schemaProvider;
  filterParser;
  totalMapper;
  dataMapper;
  httpClient;



  getSchema(){
    return this.schemaProvider.getSchema();
  }
  read(options) {}
  create(entity) {}
  update(id, entity) {}
  delete(id) {}

  persistConfigurationTo(configurationInfo){
    configurationInfo.addValue("url", this.url);
    configurationInfo.addValue("schemaProvider", this.schemaProvider);
    configurationInfo.addValue("filterParser", this.filterParser);
    configurationInfo.addScript("totalMapper", this.totalMapper);
    configurationInfo.addScript("dataMapper", this.dataMapper);

    configurationInfo.addValue("httpClient", this.httpClient); // ????????????

    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo){
    this.url = configurationInfo.getValue("url");
    this.schemaProvider = configurationInfo.getValue("schemaProvider");
    this.filterParser = configurationInfo.getValue("filterParser");
    this.totalMapper = configurationInfo.getScript("totalMapper");
    this.dataMapper = configurationInfo.getScript("dataMapper");

    this.httpClient = configurationInfo.getValue("httpClient"); // ????????????

    super.restoreConfigurationFrom(configurationInfo);
  };
  
}


@transient()
export class JsonDataService extends DataService {
    _cache = {};
    _liveRequest;

    constructor() {
      super();
    }


    read(options) { //options: fields,filter, take, skip, sort
      let url = this.url
      if (options.filter)
        url+= (this.filterParser? this.filterParser.getFilter(options.filter) : options.filter);
      return this.httpClient
        .fetch(url)
        .then(response => {return response.json(); })
        .then(jsonData => {
          return {
            data: (this.dataMapper? this.dataMapper(jsonData) : jsonData),
            total: (this.totalMapper? this.totalMapper(jsonData) : jsonData.length)
          }
        });
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

}

@transient()
export class StaticJsonDataService extends DataService {
  constructor() {
    super();
  }
  

  read(options) {
    return this.httpClient
      .fetch(this.url)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        let d = this.dataMapper? this.dataMapper(jsonData) : jsonData;
        if (options.filter){
          let f = options.filter;
          if (this.filterParser && this.filterParser.type === "clientSide")
            f = this.filterParser.getFilter(options.filter);
          let evaluator = new QueryExpressionEvaluator();
          d = evaluator.evaluate(d, f);
        }
        let total = d.length;
        // sort
        if (options.sort)
          d = _.orderBy(d,[options.sort],[options.sortDir]);
        var l = options.skip + options.take;
        d = l? _.slice(d, options.skip, (l>d.length?d.length:l)) : d;
        if (options.fields && options.fields.length>0)
          d = _.map(d, item =>{
            return _.pick(item, options.fields);
          });
        return {
          data: DataHelper.deserializeDates(d),
          total: (this.totalMapper? this.totalMapper(jsonData) : total)
        }
      });
  }

}

export class FormatValueConverter {
  static format(value, format){
    if (DataHelper.isDate(value))
      return moment(value).format(format);
    if (DataHelper.isNumber(value))
      return numeral(value).format(format);
    return value;
  }

  toView(value, format) {
    return FormatValueConverter.format(value, format);
  }
}

export class DashboardBase extends Configurable
{
  constructor() {
    super();
  }

  route;
  behaviors = [];
  layout = [];

  name;
  resourceGroup;
  title;



  configure(dashboardConfiguration){
    this.name = dashboardConfiguration.name;
    this.title = dashboardConfiguration.title;
    this.resourceGroup = dashboardConfiguration.resourceGroup;
  }


  getWidgetByName(widgetName) {
    var wl = _.find(this.layout, w=> { return w.widget.name === widgetName });
    if (wl)
      return wl.widget;
  }

  addWidget(widget, dimensions) {
    let lw = new LayoutWidget();
    lw.widget = widget;
    lw.sizeX = dimensions.sizeX;
    lw.sizeY = dimensions.sizeY;
    lw.col = dimensions.col;
    lw.row = dimensions.row;
    this.layout.push(lw);
    widget.dashboard = this;
  }

  removeWidget(widget) {
    _.remove(this.layout, w=>{
      if (w.widget === widget) {
        widget.dispose();
        return true;
      }
      return false;
    });
  }

  replaceWidget(oldWidget, newWidget) {
    let oldLw = _.find(this.layout, w=> {return w.widget === oldWidget});
    if (oldLw){
      newWidget.dashboard = this;
      let newLw = new LayoutWidget();
      newLw.widget = newWidget;
      newLw.sizeX = oldLw.sizeX;
      newLw.sizeY = oldLw.sizeY;
      newLw.col = oldLw.col;
      newLw.row = oldLw.row;

      newLw.navigationStack.push(oldWidget);
      this.layout.splice(_.indexOf(this.layout,oldLw), 1, newLw);
    }
  }

  restoreWidget(currentWidget){
    let lw = _.find(this.layout, w=> {return w.widget === currentWidget});
    let previousWidget = lw.navigationStack.pop();
    if (previousWidget){
      let previousLw = new LayoutWidget();
      previousLw.widget = previousWidget;
      previousLw.sizeX = lw.sizeX;
      previousLw.sizeY = lw.sizeY;
      previousLw.col = lw.col;
      previousLw.row = lw.row;
      this.layout.splice(_.indexOf(this.layout,lw), 1, previousLw);
    }
  }


  resizeWidget(widget, newSize){
    var lw = _.find(this.layout, w=> {return w.widget === widget});
    if (newSize) {
      let x = newSize.sizeX?newSize.sizeX:lw.sizeX;
      let y = newSize.sizeY?newSize.sizeY:lw.sizeY;
      lw.resize(x, y);
    }
    else
      lw.rollbackResize()
  }


  refreshWidget(widget){
    widget.refresh();
  }
  
  refresh() {
    for (let i=0; i<this.layout.length; i++) {
      this.refreshWidget(this.layout[i].widget);
    }
  }

  dispose(){
    for (let i=0; i<this.layout.length; i++) {
      this.layout[i].widget.dispose();
    }
    this.layout = [];

    while(true) {
      if (this.behaviors.length>0)
        this.behaviors[0].detach();
      else
        break;
    }
  }



  getState(){
    let result = [];
    _.forEach(this.layout,lw=>{
      result.push({name: lw.widget.name, value: lw.widget.getState(), stateType:lw.widget.stateType});
    })
    return result;
  }

  setState(state){
    for (let s of state){
      for (let lw of this.layout){
        if (lw.widget.name===s.name){
          lw.widget.setState(s.value);
        }
      }
    }
  }

  getRoute(){
    return this.route + StateUrlParser.stateToQuery(StateDiscriminator.discriminate(this.getState()));
  }


  persistConfigurationTo(configurationInfo){
    configurationInfo.addValue("name", this.name);
    configurationInfo.addValue("resourceGroup", this.resourceGroup);
    configurationInfo.addValue("title", this.title);

    configurationInfo.addValue("route", this.route);
    configurationInfo.addValue("layout", this.layout);
    configurationInfo.addValue("behaviors", this.behaviors);
  }

  restoreConfigurationFrom(configurationInfo){
    this.name = configurationInfo.getValue("name");
    this.resourceGroup = configurationInfo.getValue("resourceGroup");
    this.title = configurationInfo.getValue("title");
    this.route = configurationInfo.getValue("route");

    let layout = configurationInfo.getValue("layout");
    _.forEach(layout, lw=>{
      this.addWidget(lw.widget,{
          sizeX:lw.sizeX,
          sizeY:lw.sizeY,
          col:lw.col,
          row:lw.row
        })
    })

    //this.behaviors = configurationInfo.getValue("behaviors");
    let behaviors = configurationInfo.getValue("behaviors");
    _.forEach(behaviors, b=>{
      b.attach(this);
    })
  };
}

export class LayoutWidget extends Configurable {

  widget;
  navigationStack = [];
  sizeX;
  sizeY;
  col;
  row;
  resized = false;

  @computedFrom('navigationStack')
  get hasNavStack() {
    return this.navigationStack && this.navigationStack.length > 0;
  }

  resize(newSizeX, newSizeY){
    this._originalDimensions = {sizeX:this.sizeX, sizeY:this.sizeY};
    this.sizeX = newSizeX;
    this.sizeY = newSizeY;
    this.resized = true;
  }

  rollbackResize(){
    if (this._originalDimensions){
      this.sizeX = this._originalDimensions.sizeX;
      this.sizeY = this._originalDimensions.sizeY;
    }
    this.resized = false;
  }

  persistConfigurationTo(configurationInfo){
    configurationInfo.addValue("sizeX", this.sizeX);
    configurationInfo.addValue("sizeY", this.sizeY);
    configurationInfo.addValue("col", this.col);
    configurationInfo.addValue("row", this.row);
    configurationInfo.addValue("widget", this.widget);
  }

  restoreConfigurationFrom(configurationInfo){
    this.sizeX = configurationInfo.getValue("sizeX");
    this.sizeY = configurationInfo.getValue("sizeY");
    this.col = configurationInfo.getValue("col");
    this.row = configurationInfo.getValue("row");
    this.widget = configurationInfo.getValue("widget");
  }
}

export class Chart extends Widget {
  constructor() {
    super();
    this.stateType = "chartState";
    this.attachBehaviors();
  }

  categoriesField;
  seriesDefaults;

  persistConfigurationTo(configurationInfo){
    configurationInfo.addValue("categoriesField", this.categoriesField);
    configurationInfo.addValue("seriesDefaults", this.seriesDefaults);
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo){
    this.categoriesField = configurationInfo.getValue("categoriesField");
    this.seriesDefaults = configurationInfo.getValue("seriesDefaults");
    super.restoreConfigurationFrom(configurationInfo);
  };
}

export class DataSourceConfigurator extends Widget {
  constructor(settings) {
    super(settings);
    this.dataSourceToConfigurate = settings.dataSourceToConfigurate;
    this.stateType = "dataSourceConfiguratorState";
    this._dataSourceChanged = new WidgetEvent();
  }


  get dataSourceToConfigurate(){
    return this._dataSourceToConfigurate;
  }
  set dataSourceToConfigurate(value) {
    this._dataSourceToConfigurate = value;
  }


  get dataSourceChanged() {
    return this._dataSourceChanged;
  }
  set dataSourceChanged(handler) {
    this._dataSourceChanged.attach(handler);
  }


}

export class DetailedView extends Widget {
  constructor() {
    super();
    this.stateType = "detailedViewState";
  }
  fields;
  persistConfigurationTo(configurationInfo){
    configurationInfo.addValue("fields", this.fields);
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo){
    this.fields = configurationInfo.getValue("fields");
    super.restoreConfigurationFrom(configurationInfo);
  }
}


export class Grid extends Widget {
  constructor() {
    super();
    this.stateType = "gridState";
  }

  _dataSelected = new WidgetEvent();
  _dataActivated = new WidgetEvent();
  _dataFieldSelected = new WidgetEvent();

  columns;
  navigatable;
  autoGenerateColumns;
  pageSize;
  group;


  get dataSelected() {
    return this._dataSelected;
  }
  set dataSelected(handler) {
    this._dataSelected.attach(handler);
  }

  get dataActivated() {
    return this._dataActivated;
  }
  set dataActivated(handler) {
    this._dataActivated.attach(handler);
  }
  

  get dataFieldSelected() {
    return this._dataFieldSelected;
  }
  set dataFieldSelected(handler) {
    this._dataFieldSelected.attach(handler);
  }

  saveState(){
    this.setState({columns:this.columns});
  }

  restoreState(){
    let s = this.getState();
    if (s)
      this.columns = s.columns;
  }

  persistConfigurationTo(configurationInfo){
    configurationInfo.addValue("columns", this.columns);
    configurationInfo.addValue("navigatable", this.navigatable);
    configurationInfo.addValue("autoGenerateColumns", this.autoGenerateColumns);
    configurationInfo.addValue("pageSize", this.pageSize);
    configurationInfo.addValue("group", this.group);
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo){
    this.columns = configurationInfo.getValue("columns");
    this.navigatable = configurationInfo.getBool("navigatable");
    this.autoGenerateColumns = configurationInfo.getBool("autoGenerateColumns");
    this.pageSize = configurationInfo.getInt("pageSize");
    this.group = configurationInfo.getValue("group");
    super.restoreConfigurationFrom(configurationInfo);
  };
}

export class SearchBox extends Widget {
  constructor() {
    super();
    this.stateType = "searchBoxState";
  }

  _dataFilterChanged = new WidgetEvent();

  searchString;

  get dataFilterChanged() {
    return this._dataFilterChanged;
  }
  set dataFilterChanged(handler) {
    this._dataFilterChanged.attach(handler);
  }


  saveState(){
    this.setState(this.searchString);
  }

  restoreState(){
    let s = this.getState();
    if (s)
      this.searchString = s;
    else
      this.searchString = "";
  }

  persistConfigurationTo(configurationInfo){
    configurationInfo.addValue("searchString", this.searchString);
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo){
    this.searchString = configurationInfo.getValue("searchString");
    super.restoreConfigurationFrom(configurationInfo);
  };
}

export class Widget extends Configurable{

  constructor() {
    super();
    // call method in child class
    //this._settings = settings;
    //this._behaviors = [];
    /*_.forOwn(settings, (v, k)=> {
      if (k=="behaviors"){
        this._unattachedBehaviors = v;
      }
      else
        this[k] = v;
    });*/
  }

  type;
  name;
  dashboard;
  header;
  minHeight;
  resourceGroup;
  behaviors = [];
  stateType;
  showHeader;
  dataHolder;
  stateStorage;
  dataSource;
  dataFilter;
  dataMapper;


  get self() {
    return this;
  }

  getStateKey() {
    if (this.stateStorage)
      return this.stateStorage.createKey(this.dashboard.name, this.name);
    return "";
  }

  getState() {
    if (this.stateStorage) {
      var s = this.stateStorage.get(this.getStateKey());
      if (s)
        return s;
    }
    return undefined;
  }

  setState(value) {
    if (this.stateStorage) {
      if (!value)
        this.stateStorage.remove(this.getStateKey());
      else
        this.stateStorage.set(this.getStateKey(), value);
    }
  }


  attachBehavior(b){
    b.attachToWidget(this);
  }

  attachBehaviors(){
    if (this._unattachedBehaviors) {
      for (let b of this._unattachedBehaviors)
        this.attachBehavior(b);
    }
  }

  ///METHODS
  changeSettings(newSettings){
    if (newSettings) {
      //merge settings
      _.forOwn(newSettings, (v, k)=> {
        this[k] = v;
      });
      this.refresh();
    }
  }

  refresh(){

  }


  dispose(){
    while(true) {
      if (this.behavior.length>0)
        this.behavior[0].detach();
      else
        break;
    }
  }

  persistConfigurationTo(configurationInfo){
    /*dashboard;
    behavior = [];*/


    configurationInfo.addValue("name", this.name);
    configurationInfo.addValue("resourceGroup", this.resourceGroup);
    configurationInfo.addValue("header", this.header);
    configurationInfo.addValue("minHeight", this.minHeight);
    configurationInfo.addValue("stateType", this.stateType);
    configurationInfo.addValue("showHeader", this.showHeader);
    configurationInfo.addValue("dataHolder", this.dataHolder);
    configurationInfo.addValue("dataSource", this.dataSource);
    configurationInfo.addValue("dataFilter", this.dataFilter);
    configurationInfo.addScript("dataMapper", this.dataMapper);
    configurationInfo.addValue("behaviors", this.behaviors);


    configurationInfo.addValue("stateStorage", this.stateStorage); // move to constructor
  }
  restoreConfigurationFrom(configurationInfo){
    this.name = configurationInfo.getValue("name");
    this.resourceGroup = configurationInfo.getValue("resourceGroup");
    this.header = configurationInfo.getValue("header");
    this.minHeight = configurationInfo.getInt("minHeight");
    this.stateType = configurationInfo.getValue("stateType");
    this.showHeader = configurationInfo.getBool("showHeader");

    this.dataHolder = configurationInfo.getValue("dataHolder");
    this.dataSource = configurationInfo.getValue("dataSource");
    this.dataFilter = configurationInfo.getValue("dataFilter");
    this.dataMapper = configurationInfo.getScript("dataMapper");

    let behaviors = configurationInfo.getValue("behaviors");
    _.forEach(behaviors, b=>{
      b.attachToWidget(this);
    })

    this.stateStorage = configurationInfo.getValue("stateStorage"); // move to constructor
  };

}









export class ChangeRouteBehavior extends DashboardBehavior {
  constructor(settings) {
    super();
    this.chanel = settings.chanel;
    this.eventAggregator = settings.eventAggregator;
    this.newRoute = settings.newRoute;
    this.router = settings.router;
    this.paramsMapper = settings.paramsMapper;
  }

  chanel;
  eventAggregator;
  newRoute;
  router;
  paramsMapper;

  attach(dashboard) {
    super.attach(dashboard);
    var me = this;
    this.subscription = this.eventAggregator.subscribe(this.chanel, message => {
      var params = me.paramsMapper ? me.paramsMapper(message) : "";
      if ((params!=="")&&(params.indexOf("?")!=0))
        params="?" + params;
      me.router.navigate(me.newRoute + (params!==""? params : ""));
    });
  }

  detach(){
    super.detach(dashboard);
    if (this.subscription)
      this.subscription.dispose();
  }

  persistConfigurationTo(configurationInfo){
    configurationInfo.addValue("chanel", this.chanel);
    configurationInfo.addValue("newRoute", this.newRoute);
    configurationInfo.addScript("paramsMapper", this.paramsMapper);
  }
  restoreConfigurationFrom(configurationInfo){
    this.chanel = configurationInfo.getValue("chanel");
    this.newRoute = configurationInfo.getValue("newRoute");
    this.paramsMapper = configurationInfo.addScript("paramsMapper");
  };
}


export class CreateWidgetBehavior extends DashboardBehavior {

  constructor(settings) {
    super();
    this.eventAggregator = settings.eventAggregator;

    this.chanel = settings.chanel;
    this.widgetType = settings.widgetType;
    this.widgetSettings = settings.widgetSettings;
    this.widgetDimensions = settings.widgetDimensions;
    this.filterMapper = settings.filterMapper;
  }

  eventAggregator

  chanel;
  widgetType;
  widgetSettings;
  widgetDimensions;
  filterMapper;

  attach(dashboard){
    super.attach(dashboard);
    var me = this;
    this.subscription = this.eventAggregator.subscribe(this.chanel, message => {
      //make sure the widget exists
      var w = dashboard.getWidgetByName(me.widgetSettings.name);
      if(!w){ //widget not exist.
        var w = new me.widgetType(me.widgetSettings);
        dashboard.addWidget(w, this.widgetDimensions);
      }
      w.dataFilter =  me.filterMapper ? me.filterMapper(message) : "";
      w.refresh();

    });
  }

  detach(){
    super.detach(dashboard);
    if (this.subscription)
      this.subscription.dispose();
  }


}

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

export class DrillDownHandleBehavior extends DashboardBehavior  {

  constructor(settings) {
    super();
    this._channel = settings.channel;
    this._widgetType = settings.widgetType;
    this._widgetSettings = settings.widgetSettings;
    this._eventAggregator = settings.eventAggregator;
    this._widgetToReplaceName = settings.widgetToReplaceName;
  }

  attach(dashboard){
    super.attach(dashboard);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._channel, message => {
      // create widget
      var originatorWidget = dashboard.getWidgetByName(me._widgetToReplaceName);
      // replace widget
      var w = new me._widgetType(me._widgetSettings);
      dashboard.replaceWidget(originatorWidget, w);
      w.dataFilter = message.params.dataFilter;
      w.dataSource.transport.readService.configure({url:message.params.dataServiceUrl});
      w.refresh();
    });
  }

  detach(){
    super.detach(dashboard);
    if (this.subscription)
      this.subscription.dispose();
  }
}

export class ManageNavigationStackBehavior extends DashboardBehavior {
  constructor(eventAggregator) {
    super();
    
    this._eventAggregator = eventAggregator;
  }
  attach(dashboard) {
    super.attach(dashboard);
    var me = this;

    //this._eventAggregator.subscribe(BackButtonEvent, event => {
    this.subscription = this._eventAggregator.subscribe("widget-back-button-channel", message => {
      var originatorWidget = dashboard.getWidgetByName(message.originatorName);
      if (originatorWidget) {
        var previousWidget = message.params.navigationStack.pop();
        dashboard.replaceWidget(originatorWidget,previousWidget);
      }
    });
  }

  detach(){
    super.detach(dashboard);
    if (this.subscription)
      this.subscription.dispose();
  }
}


export class ReplaceWidgetBehavior extends DashboardBehavior  {

  constructor(settings) {
    super();
    this._channel = settings.channel;
    this._widgetType = settings.widgetType;
    this._widgetSettings = settings.widgetSettings;
    this._eventAggregator = settings.eventAggregator;
    this._widgetToReplaceName = settings.widgetToReplaceName;
    this._mapper = settings.mapper;
    this._queryPattern = settings.queryPattern;
  }

  attach(dashboard){
    super.attach(dashboard);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._channel, message => {
      var originatorWidget = dashboard.getWidgetByName(me._widgetToReplaceName);
      var w = new me._widgetType(me._widgetSettings);
      dashboard.replaceWidget(originatorWidget, w);
      w.dataFilter = me._mapper? me._mapper(message) : message.params.dataFilter;
      w.refresh();
    });
  }

  detach(){
    super.detach(dashboard);
    if (this.subscription)
      this.subscription.dispose();
  }
}

export class WidgetEventMessage {

  constructor(widgetName) {
    this._originatorName = widgetName;
  }
  get originatorName()  {
    return this._originatorName;
  }

}

export class WidgetEvent {

  constructor(widgetName) {
    this._originatorName = widgetName;
  }

  handlers = [];

  get originatorName()  {
    return this._originatorName;
  }

  attach(handler){
    if(this.handlers.some(e=>e === handler)) {
      return; //already attached
    }
    this.handlers.push(handler);
  }

  detach(handler) {
    var idx = this.handlers.indexOf(handler);
    if(idx < 0){
      return; //not attached, do nothing
    }
    this.handler.splice(idx,1);
  }

  raise(){
    for(var i = 0; i< this.handlers.length; i++) {
      this.handlers[i].apply(this, arguments);
    }
  }
}

export class BroadcasterBehavior extends WidgetBehavior {
  constructor(){
    super();
    this.behaviortype = BehaviorType.broadcaster;
  }

  eventToAttach;

  attachToWidget(widget) {
    if (!widget[this.eventToAttach])
      throw "widget " + widget.name + " hasn't '" + this.eventToAttach + "' event";
    super.attachToWidget(widget);
  }

  persistConfigurationTo(configurationInfo){
    configurationInfo.addValue("channel", this.channel);
  }
  restoreConfigurationFrom(configurationInfo){
    this.channel = configurationInfo.getValue("channel");
  }
}

@inject(EventAggregator)
export class DataActivatedBehavior extends BroadcasterBehavior {
  constructor(eventAggregator) {
    super();
    this.eventToAttach = "dataActivated";

    this._eventAggregator = eventAggregator;
  }

  attachToWidget(widget)   {
    super.attachToWidget(widget);
    var me = this;

    widget[this.eventToAttach] =  function(currentRecord) {
      var message = new WidgetEventMessage(me.widget.name);
      message.params = {activatedData: currentRecord};
      me._eventAggregator.publish(me.channel, message);
    };
  }

  detach(){
    super.detach(dashboard);
  }

  persistConfigurationTo(configurationInfo){
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo){
    super.restoreConfigurationFrom(configurationInfo);
  }
}

@inject(EventAggregator)
export class DataFieldSelectedBehavior extends BroadcasterBehavior {
  constructor(eventAggregator) {
    super();
    this.eventToAttach = "dataFieldSelected";
    this._eventAggregator = eventAggregator;
  }
  

  attachToWidget(widget)   {

    super.attachToWidget(widget);
    var me = this;

    widget[this.eventToAttach] =  function(fieldName) {
      var message = new WidgetEventMessage(me.widget.name);
      message.params = {fieldName: fieldName};
      me._eventAggregator.publish(me.channel, message);
    };
  }

  detach(){
    super.detach(dashboard);
  }

  persistConfigurationTo(configurationInfo){
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo){
    super.restoreConfigurationFrom(configurationInfo);
  }
}


@inject(EventAggregator)
export class DataFilterChangedBehavior extends BroadcasterBehavior
{
  constructor(eventAggregator) {
    super();
    this.eventToAttach = "dataFilterChanged";
    this._eventAggregator = eventAggregator;
  }


  attachToWidget(widget) {
    super.attachToWidget(widget);
    var me = this;
    widget[this.eventToAttach] = function(filter)
    {
      var message = new WidgetEventMessage(me.widget.name);
      message.params = {dataFilter: filter};
      me._eventAggregator.publish(me.channel, message);
    };
  }

  detach(){
    super.detach(dashboard);
  }

  persistConfigurationTo(configurationInfo){
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo){
    super.restoreConfigurationFrom(configurationInfo);
  }
}

@inject(EventAggregator)
export class DataFilterHandleBehavior extends ListenerBehavior
{
  constructor(eventAggregator) {
    super();
    this._eventAggregator = eventAggregator;
  }

  filterMapper;

  attachToWidget(widget){
    super.attachToWidget(widget);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this.channel, message => {
      var filterToApply = me._filterMapper ? me._filterMapper(message.params) : message.params.dataFilter;
      me.widget.dataFilter = filterToApply;
      me.widget.refresh();
    });
  }

  detach(){
    super.detach(dashboard);
    if (this.subscription)
      this.subscription.dispose();
  }

  persistConfigurationTo(configurationInfo){
    configurationInfo.addScript("filterMapper", this.filterMapper);
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo){
    this.filterMapper =configurationInfo.getScript("filterMapper");
    super.restoreConfigurationFrom(configurationInfo);
  }
}

@inject(EventAggregator)
export class DataSelectedBehavior extends BroadcasterBehavior {
  constructor(eventAggregator) {
    super();
    this.eventToAttach = "dataSelected";
    this._eventAggregator = eventAggregator;
  }

  attachToWidget(widget)   {

    super.attachToWidget(widget);
    var me = this;

    widget[this.eventToAttach] =  function(currentRecord) {
      var message = new WidgetEventMessage(me.widget.name);
      message.params ={selectedData: currentRecord};
      me._eventAggregator.publish(me.channel, message);
    };
  }

  detach(){
    super.detach(dashboard);
  }

  persistConfigurationTo(configurationInfo){
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo){
    super.restoreConfigurationFrom(configurationInfo);
  }
}

@inject(EventAggregator)
export class DataSourceChangedBehavior extends BroadcasterBehavior
{
  constructor(eventAggregator) {
    super();
    this.eventToAttach = "dataSourceChanged";
    this._eventAggregator = eventAggregator;
  }

  attachToWidget(widget) {
    super.attachToWidget(widget);
    var me = this;
    widget[this.eventToAttach] = function(dataSource)
    {
      var message = new WidgetEventMessage(me.widget.name);
      message.params = {dataSource: dataSource};
      me._eventAggregator.publish(me.channel, message);
    };
  }

  detach(){
    super.detach(dashboard);
  }

  persistConfigurationTo(configurationInfo){
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo){
    super.restoreConfigurationFrom(configurationInfo);
  }
}

@inject(EventAggregator)
export class DataSourceHandleBehavior extends ListenerBehavior
{
  constructor(eventAggregator) {
    super();
    this._eventAggregator = eventAggregator;
  }

  attachToWidget(widget){
    super.attachToWidget(widget);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this.channel, message => {
      me.widget.dataSource = message.params.dataSource;
      me.widget.refresh();
    });
  }

  detach(){
    super.detach(dashboard);
    if (this.subscription)
      this.subscription.dispose();
  }

  persistConfigurationTo(configurationInfo){
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo){
    super.restoreConfigurationFrom(configurationInfo);
  }
}


export class DrillDownBehavior extends BroadcasterBehavior {
  constructor(channel, eventAggregator, dataSource) {
    super();
    this.channel = channel;
    this.eventToAttach = "dataActivated";
    this._eventAggregator = eventAggregator;
    this._dataSource = dataSource;
  }

  queryPattern="";
  dataServiceUrl="";
  isConfigured = false;

  configure(drillDownBehaviorConfiguration){
    this.queryPattern = drillDownBehaviorConfiguration.queryPattern;
    this.dataServiceUrl = drillDownBehaviorConfiguration.dataServiceUrl;
    this.isConfigured = true;
  }

  attachToWidget(widget)   {
    super.attachToWidget(widget);
    var me = this;

    widget[this.eventToAttach] =  function(currentRecord) {
      if (!me.isConfigured)
        return;
      var message = new WidgetEventMessage(me.widget.name);
      let query = me.queryPattern;
      _.forOwn(currentRecord, (value, key)=>{
        query = StringHelper.replaceAll(query,"@"+key,value);
      })

      message.params = {dataFilter: query, dataServiceUrl: me.dataServiceUrl};
      me._eventAggregator.publish(me.channel, message);
    };
  }

  detach(){
    super.detach(dashboard);
  }

  persistConfigurationTo(configurationInfo){
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo){
    super.restoreConfigurationFrom(configurationInfo);
  }
}

export class DrillDownBehaviorConfiguration {
  queryPattern;
  dataServiceUrl;
}


export class ListenerBehavior extends WidgetBehavior {
  constructor(){
    super();
    this.behaviortype = BehaviorType.listener;
  }

  persistConfigurationTo(configurationInfo){
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo){
    super.restoreConfigurationFrom(configurationInfo);
  }
}

@inject(EventAggregator)
export class SettingsHandleBehavior extends ListenerBehavior
{
  constructor(eventAggregator) {
    super();
    this._eventAggregator = eventAggregator;

  }

  messageMapper;

  attachToWidget(widget){
    super.attachToWidget(widget);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this.channel, message => {
      var settingsToApply = me._messageMapper ? me._messageMapper(message.params) : message.params;
      _.forOwn(settingsToApply, (v, k)=>{
        //me.widget.changeSettings(settingsToApply);
        me.widget[k] = v;
      });
      //me.widget.changeSettings(settingsToApply);
      me.widget.refresh();
    });
  }

  detach(){
    super.detach(dashboard);
    if (this.subscription)
      this.subscription.dispose();
  }

  persistConfigurationTo(configurationInfo){
    configurationInfo.addScript("messageMapper", this.messageMapper);
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo){
    this.messageMapper = configurationInfo.getScript("messageMapper");
    super.restoreConfigurationFrom(configurationInfo);
  }
}

export class WidgetBehavior extends Configurable {
    
  behaviortype;
  widget;
  
  channel;


  attachToWidget(widget) {
    this.widget = widget;
    this.widget.behaviors.push(this);
  }

  detach(){
    if (!this.widget)
      return;
    for (let i=0; i<this.widget.behaviors.length; i++) {
      if(this.widget.behaviors[i] === this) {
        this.widget.behaviors.splice(i, 1);
        break;
      }
    }
  }
  persistConfigurationTo(configurationInfo){
    configurationInfo.addValue("channel", this.channel);
  }
  restoreConfigurationFrom(configurationInfo){
    this.channel = configurationInfo.getValue("channel");
  }
}

export class AstParser {
  constructor(){
    this._clientSide = "clientSide";
    this._serverSide = "serverSide";
  }
  get type(){}
  getFilter(astTree){
    return {};
  }
  persistConfigurationTo(configurationInfo){}
  restoreConfigurationFrom(configurationInfo){}
}


/*
Parser should return the tree as follows
 [
 {
 "left": {
 "field": "Fs",
 "type": "string",
 "operand": "=",
 "value": "ss1"
 },
 "right": {
 "left": {
 "field": "Fs",
 "type": "string",
 "operand": "=",
 "value": "ss2"
 },
 "right": {
 "left": {
 "field": "Fs",
 "type": "string",
 "operand": "=",
 "value": "ss3"
 },
 "right": {
 "left": {
 "field": "Fs",
 "type": "string",
 "operand": "=",
 "value": "ss4"
 },
 "right": {
 "field": "Fn",
 "type": "number",
 "operand": "=",
 "value": "3",
 "connector": " && "
 },
 "connector": " || "
 },
 "connector": " || "
 },
 "connector": " || "
 }
 }
 ]
*/


export class AstToJavascriptParser extends AstParser{
  constructor(){
    super();
  }

  get type(){
    return this._clientSide;
  }

  getFilter(astTree) {
    if (astTree)
      return this._parseTree(astTree,[]);
    return "";
  }

  _parseTree(treeNode, result){
    if (treeNode.left) {
      result.push(this._createExpression(treeNode.connector, treeNode.left));
      if (treeNode.right)
        this._parseTree(treeNode.right, result);
    }
    else
      result.push(this._createExpression(treeNode.connector, treeNode));
    return result.join(" ");
  }


  _createExpression(connector, node){
    let result = "";
    let prefix = "record.";
    let fieldname = node.field;
    let operand = node.operand;
    let value = node.value;

    if (node.type=='string') {
      if (operand==='in') {
        result = _.map(value, val=>{
          return prefix + fieldname + ".toLowerCase() == '" + val.trim().toLowerCase() + "'"
        }).join(" || ");

      }
      else {
        let v = value.trim().toLowerCase();
        if (v.length >= 2) {
          if ((v.indexOf("%") === 0) && (v.lastIndexOf("%") === (v.length - 1)))
            result = prefix + fieldname + ".toLowerCase().includes('" + v.substring(1, value.length - 1) + "')"
          else if (v.indexOf("%") === 0)
            result = prefix + fieldname + ".toLowerCase().endsWith('" + v.substring(1, value.length) + "')"
          else if (v.lastIndexOf("%") === (value.length - 1))
            result = prefix + fieldname + ".toLowerCase().startsWith('" + v.substring(0, value.length - 1) + "')"
        }
        if (result == "")
          result = prefix + fieldname + ".toLowerCase() " + operand + " '" + v + "'";
      }
    }
    else if (node.type=='number'){
      result = prefix + fieldname + operand + " " + value;
    }
    else if (node.type=='date'){
      result = prefix + fieldname + operand + " '" + value + "'";
    }
    result=(connector? connector:"") +" (" + prefix + fieldname + "!=null && (" + result + "))";
    return result;
  }

  persistConfigurationTo(configurationInfo){
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo){
    super.restoreConfigurationFrom(configurationInfo);
  }

}

export class EmptySchemaProvider extends SchemaProvider{
  constructor(){
    super();
  }
  getSchema(){
    return new Promise((resolve, reject)=>{
      resolve(new Schema());
    });
  }
}

export class SchemaProvider extends Configurable{
  constructor(){
    super();
  }
  getSchema(){}

  persistConfigurationTo(configurationInfo){
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo){
    super.restoreConfigurationFrom(configurationInfo);
  };

}


export class StaticSchemaProvider extends SchemaProvider{
  constructor(){
    super();
  }

  schema;

  getSchema(){
    return new Promise((resolve, reject)=>{
      resolve(this.schema);
    });
  }

  persistConfigurationTo(configurationInfo){
    configurationInfo.addValue("schema", this.schema);
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo){
    this.schema = configurationInfo.getValue("schema");
    super.restoreConfigurationFrom(configurationInfo);
  };
}


import Swagger from "swagger-client";
export class SwaggerSchemaProvider extends SchemaProvider{
  constructor(){
    super();
  }

  modelName;
  methodName;
  apiName;
  definitionUrl;

  getSchema() {
    var self = this;
    return new Swagger({
      url: this._definitionUrl,
      usePromise: true
    }).then(client => {
      let result = new Schema();
      _.forEach(client.apis[self.apiName].apis[self.methodName].parameters, p=> {
        result.parameters.push(p);
      });
      if (client.definitions[self.modelName]) {
        _.forOwn(client.definitions[self.modelName].properties, (value, key)=> {
          result.fields.push({field: key, type: value.type});
        });
      }
      return result;
    });
  }
  persistConfigurationTo(configurationInfo){
      configurationInfo.addValue("schema", this.schema);
      super.persistConfigurationTo(configurationInfo);
  }
    
  restoreConfigurationFrom(configurationInfo){
      this.schema = configurationInfo.getValue("schema");
      super.restoreConfigurationFrom(configurationInfo);
  };

}
