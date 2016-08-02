import * as _ from 'lodash';
import * as peg from 'pegjs';
import * as base64 from 'js-base64';
import numeral from 'numeral';
import moment from 'moment';
import {inject,bindable,resolver,transient,customElement,useView,Decorators,noView,computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-fetch-client';

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


export class DataHolder {
  constructor(){
  }
  get data(){
    return this._data;
  }
  set data(value){
    this._data = value;
  }

  get total(){
    return this._total;
  }
  set total(value){
    this._total = value;
  }

  // Query object
  get query(){
    return this._query;
  }
  set query(value){
    this._query = value;
  }


}

export class Datasource {
    
    constructor(datasourceConfiguration) {
        this.name = datasourceConfiguration.name;
        this.transport = datasourceConfiguration.transport;
        this.cache = datasourceConfiguration.cache;
    }

    name;
    transport;
    cacheManager;

    _liveRequest = {};



    getData(query) {
      if ((!this.transport)&&(!this.transport.readService))
        throw "readService is not configured";

      let cacheKey = this.transport.readService.url + query.cacheKey();

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
      if ((!this.transport)&&(!this.transport.createService))
        throw "createService is not configured";
      return this.transport.createService.create(entity);
    }

    update(id, entity){
      if ((!this.transport)&&(!this.transport.updateService))
        throw "updateService is not configured";
      return this.transport.updateService.update(id, entity);
    }

    delete(id, entity){
      if ((!this.transport)&&(!this.transport.deleteService))
        throw "deleteService is not configured";
      return this.transport.updateService.delete(entity);
    }

    _doWebRequest(cacheKey, query){
      return this.transport.readService.read(
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

}

export class DataSourceConfiguration {
  cache;
  transport;
  name;
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
    //this.filter = [];
  }

  get sort(){
    return this._sort;
  }
  set sort(value){
    this._sort = value;
  }

  get group(){
    return this._group;
  }
  set group(value){
    this._group = value;
  }

  get sortDir(){
    return this._sortDir;
  }
  set sortDir(value){
    this._sortDir = value;
  }

  get take(){
    return this._take;
  }
  set take(value){
    this._take = value;
  }

  get fields(){
    return this._fields;
  }
  set fields(value){
    this._fields = value;
  }

  get skip(){
    return this._skip;
  }
  set skip(value){
    this._skip = value;
  }

  /*get serverSideFilter() {
    return this._serverSideFilter;
  }
  set serverSideFilter(value) {
    this._serverSideFilter = value;
  }*/

  get filter(){
    return this._filter;
  }
  set filter(value){
    this._filter = value;
  }

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

export class DashboardConfiguration {
  invoke(){

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

export class DataService{
  url = "";
  schemaProvider = new EmptySchemaProvider();
  filterParser;
  totalMapper;
  dataMapper;
  httpClient;

  configure(configuration){
    this.url = configuration.url?configuration.url:this.url;
    this.schemaProvider = configuration.schemaProvider?configuration.schemaProvider:this.schemaProvider;
    this.filterParser = configuration.filterParser?configuration.filterParser:this.filterParser;
    this.totalMapper = configuration.totalMapper?configuration.totalMapper:this.totalMapper;
    this.dataMapper = configuration.dataMapper?configuration.dataMapper:this.dataMapper;
    this.httpClient = configuration.httpClient?configuration.httpClient:this.httpClient;
  }

  getSchema(){
    return this.schemaProvider.getSchema();
  }
  read(options) {}
  create(entity) {}
  update(id, entity) {}
  delete(id) {}
  
}

export class DataServiceConfiguration {

  constructor(configuration){
    if (configuration) {
      this._url = configuration.url;
      this._schemaProvider = configuration.schemaProvider;
      this._totalMapper = configuration.totalMapper;
      this._filterParser = configuration.filterParser;
      this._dataMapper = configuration.dataMapper;
      this._httpClient = configuration.httpClient
    }
  }

  get url() {
    return this._url;
  }

  get httpClient() {
    return this._httpClient;
  }

  get schemaProvider(){
    return this._schemaProvider
  }

  get totalMapper(){
    return this._totalMapper;
  }

  get filterParser(){
    return this._filterParser;
  }

  get dataMapper(){
    return this._dataMapper;
  }

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

export class Chart extends Widget {
  constructor(settings) {
    super(settings);
    this.categoriesField = settings.categoriesField;
    this.seriesDefaults = settings.seriesDefaults;
    this.stateType = "chartState";
    this.attachBehaviors();
  }

  get categoriesField(){
    return this._categoriesField;
  }
  set categoriesField(value){
    this._categoriesField = value;
  }

  get seriesDefaults(){
    return this._seriesDefaults;
  }
  set seriesDefaults(value){
    this._seriesDefaults = value;
  }

}

export class DataSourceConfigurator extends Widget {
  constructor(settings) {
    super(settings);
    this.dataSourceToConfigurate = settings.dataSourceToConfigurate;
    this.stateType = "dataSourceConfiguratorState";
    this._dataSourceChanged = new WidgetEvent();
    this.attachBehaviors();
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
  constructor(settings) {
    super(settings);
    this.fields = settings.fields;
    this.stateType = "detailedViewState";
    this.attachBehaviors();
  }

  get fields(){
    return this._fields;
  }
  set fields(value) {
    this._fields = value;
  }
}


export class Grid extends Widget {
  constructor(settings) {
    super(settings);

    this.columns = settings.columns? settings.columns : [];
    this.navigatable = settings.navigatable;
    this.autoGenerateColumns = settings.autoGenerateColumns;
    this.pageSize = settings.pageSize;
    this.group = settings.group;

    this.stateType = "gridState";

    this._dataSelected = new WidgetEvent();
    this._dataActivated = new WidgetEvent();
    this._dataFieldSelected = new WidgetEvent();

    this.attachBehaviors();
  }

  get columns(){
    return this._columns;
  }
  set columns(value) {
    this._columns = value;
  }

  get navigatable(){
    return this._navigatable;
  }
  set navigatable(value) {
    this._navigatable = value;
  }

  get autoGenerateColumns(){
    return this._autoGenerateColumns;
  }
  set autoGenerateColumns(value) {
    this._autoGenerateColumns = value;
  }

  get pageSize(){
    return this._pageSize;
  }
  set pageSize(value) {
    this._pageSize = value;
  }

  get group(){
    return this._group;
  }
  set group(value){
    this._group = value;
  }

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
}

export class SearchBox extends Widget {
  constructor(settings) {
    super(settings);
    this.stateType = "searchBoxState";
    this._dataFilterChanged = new WidgetEvent();
    this._searchString = "";
    this.attachBehaviors();
  }


  get dataFilterChanged() {
    return this._dataFilterChanged;
  }
  set dataFilterChanged(handler) {
    this._dataFilterChanged.attach(handler);
  }

  get searchString(){
    return this._searchString;
  }
  set searchString(value) {
    this._searchString = value;
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
}

export class Widget {

  constructor(settings) {
    // call method in child class
    this._settings = settings;
    this._behaviors = [];

  }

  get self() {
    return this;
  }

  get settings(){
    return this._settings;
  }


  get behaviors() {
    return this._behaviors;
  }

  get name(){
    return this.settings.name;
  }

  get resourceGroup() {
    return this.settings.resourceGroup;
  }

  get minHeight(){
    return this.settings.minHeight;
  }
  set minHeight(value){
    this.settings.minHeight = value;
  }


  get stateType() {
    return this._type;
  }
  set stateType(value) {
    this._type = value;
  }

  get showHeader(){
    return this.settings.showHeader;
  }

  set dataHolder(value){
    this._dataHolder = value;
  }
  get dataHolder(){
    return this._dataHolder;
  }

  get header() {
    return this.settings.header;
  }
  set header(value) {
    this.settings.header = value;
  }


  get stateStorage(){
    return this.settings.stateStorage;
  }


  set dataSource(value) {
    this.settings.dataSource = value;
  }
  get dataSource() {
    return this.settings.dataSource;
  }

  get dataMapper() {
    return this.settings.dataMapper;
  }

  get dataFilter() {
    return this._dataFilter;
  }

  set dataFilter(value) {
    this._dataFilter = value;
  }

  get type() {
    return this._type;
  }

  get dashboard() {
    return this._dashboard;
  }
  set dashboard(value) {
    this._dashboard = value;
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


  attachBehavior(behavior){
    behavior.attachToWidget(this);
  }

  attachBehaviors(){
    if (this.settings.behavior) {
      for (let b of this.settings.behavior)
        this.attachBehavior(b);
    }
  }

  ///METHODS
  changeSettings(newSettings){
    if (newSettings) {
      //merge settings
      _.forOwn(newSettings, (v, k)=> {
        this.settings[k] = v;
      });
      this.refresh();
    }
  }

  refresh(){

  }


  dispose(){
    while(true) {
      if (this.behaviors.length>0)
        this.behaviors[0].detach();
      else
        break;
    }
  }


}






export class DashboardBase
{
  constructor() {

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
}

export class LayoutWidget{

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

}

export class ChangeRouteBehavior extends DashboardBehavior {
  constructor(settings) {
    super();
    this._chanel = settings.chanel;
    this._eventAggregator = settings.eventAggregator;
    this._newRoute = settings.newRoute;
    this._router = settings.router;
    this._paramsMapper = settings.paramsMapper;
  }

  attach(dashboard) {
    super.attach(dashboard);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._chanel, message => {
      var params = me._paramsMapper ? me._paramsMapper(message) : "";
      if ((params!=="")&&(params.indexOf("?")!=0))
        params="?" + params;
      me._router.navigate(me._newRoute + (params!==""? params : ""));
    });
  }

  detach(){
    super.detach(dashboard);
    if (this.subscription)
      this.subscription.dispose();
  }
}


export class CreateWidgetBehavior extends DashboardBehavior {

  constructor(settings) {
    super();
    this._chanel = settings.chanel;
    this._widgetType = settings.widgetType;
    this._widgetSettings = settings.widgetSettings;
    this._widgetDimensions = settings.widgetDimensions;
    this._eventAggregator = settings.eventAggregator;
    this._filterMapper = settings.filterMapper;
  }

  attach(dashboard){
    super.attach(dashboard);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._chanel, message => {
      //make sure the widget exists
      var w = dashboard.getWidgetByName(me._widgetSettings.name);
      if(!w){ //widget not exist.
        var w = new me._widgetType(me._widgetSettings);
        dashboard.addWidget(w, this._widgetDimensions);
      }
      w.dataFilter =  me._filterMapper ? me._filterMapper(message) : "";
      w.refresh();

    });
  }

  detach(){
    super.detach(dashboard);
    if (this.subscription)
      this.subscription.dispose();
  }


}

export class DashboardBehavior {

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

export class BroadcasterBehavior extends WidgetBehavior {
  constructor(){
    super();
    this.type = BehaviorType.broadcaster;
  }

  eventToAttach;

  attachToWidget(widget) {
    if (!widget[this.eventToAttach])
      throw "widget " + widget.name + " hasn't '" + this.eventToAttach + "' event";
    super.attachToWidget(widget);
  }
}

export class DataActivatedBehavior extends BroadcasterBehavior {
  constructor(channel, eventAggregator) {
    super();
    this.channel = channel;
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
}

export class DataFieldSelectedBehavior extends BroadcasterBehavior {
  constructor(channel, eventAggregator) {
    super();
    this.channel = channel;
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
}


export class DataFilterChangedBehavior extends BroadcasterBehavior
{
  constructor(channel, eventAggregator) {
    super();
    this.channel = channel;
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
}

export class DataFilterHandleBehavior extends ListenerBehavior
{
  constructor(channel, eventAggregator, filterMapper) {
    super();
    this.channel = channel;
    this._eventAggregator = eventAggregator;
    this._filterMapper = filterMapper;
  }

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
}

export class DataSelectedBehavior extends BroadcasterBehavior {
  constructor(channel, eventAggregator) {
    super();
    this.channel = channel;
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
}

export class DataSourceChangedBehavior extends BroadcasterBehavior
{
  constructor(channel, eventAggregator) {
    super();
    this.channel = channel;
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
}

export class DataSourceHandleBehavior extends ListenerBehavior
{
  constructor(channel, eventAggregator) {
    super();
    this.channel = channel;

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
}

export class DrillDownBehaviorConfiguration {
  queryPattern;
  dataServiceUrl;
}


export class ListenerBehavior extends WidgetBehavior {
  constructor(){
    super();
    this.type = BehaviorType.listener;
  }
}

export class SettingsHandleBehavior extends ListenerBehavior
{
  constructor(channel, eventAggregator, messageMapper) {
    super();
    this.channel = channel;
    this._eventAggregator = eventAggregator;

    this._messageMapper = messageMapper;
  }

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
}


export class WidgetBehavior {

  type;
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

export class AstParser{
  constructor(){
    this._clientSide = "clientSide";
    this._serverSide = "serverSide";
  }
  get type(){}
  getFilter(astTree){
    return {};
  }
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

export class SchemaProvider{
  getSchema(){}
}


export class StaticSchemaProvider extends SchemaProvider{
  constructor(schema){
    super();
    this._schema = schema;
  }
  getSchema(){
    return new Promise((resolve, reject)=>{
      resolve(this._schema);
    });
  }
}


import Swagger from "swagger-client";
export class SwaggerSchemaProvider extends SchemaProvider{
  constructor(definitionUrl, apiName, methodName, modelName){
    super();
    this._modelName = modelName;
    this._methodName = methodName;
    this._apiName = apiName;
    this._definitionUrl = definitionUrl;
  }
  getSchema(){
    var self = this;
    return new Swagger({
      url: this._definitionUrl,
      usePromise: true}).then(client => {
        let result = new Schema();
        _.forEach(client.apis[self._apiName].apis[self._methodName].parameters, p=>{
          result.parameters.push(p);
        });
        if (client.definitions[self._modelName]) {
          _.forOwn(client.definitions[self._modelName].properties, (value, key)=> {
            result.fields.push({field: key, type: value.type});
          });
        }
        return result;
    });
  }
}
