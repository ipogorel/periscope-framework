import * as _ from 'lodash';
import * as peg from 'pegjs';
import numeral from 'numeral';
import moment from 'moment';
import {inject,resolver,transient} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';

export class CacheManager{
  constructor(storage){
    this._cacheStorage = storage;
    this._cleanInterval = 5000;
  }

  get cleanInterval() {return this._cleanInterval;}

  startCleaner(){
    if (!this.cleaner) {
      var self = this;
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
        this._name = datasourceConfiguration.name;
        this._transport = datasourceConfiguration.transport;
        this._schemeConfig = datasourceConfiguration.schemeConfig;
        this._cache = datasourceConfiguration.cache;
    }

    get name() {
        return this._name;
    }

    get transport(){
      return this._transport;
    }

    get cacheManager(){
      return this._cacheManager;
    }

    createDataHolder(){
      return new DataHolder(this);
    }

    cacheOn(cacheKey){
      if (this._cache&&this._cache.cacheManager) {
        var storage = this._cache.cacheManager.getStorage();
        return storage.getItem(cacheKey);
      }
    }

    getData(query) {
      let dataHolder = new DataHolder();
      dataHolder.query = query;

      if ((!this.transport)&&(!this.transport.readService))
        throw "readService is not configured";

      let storage;
      let cacheKey = this.transport.readService.url + query.cacheKey();
      if (this._cache&&this._cache.cacheManager){
        storage = this._cache.cacheManager.getStorage();
        let cachedDataHolder = storage.getItem(cacheKey);
        if (cachedDataHolder) {
          dataHolder.data = cachedDataHolder.data;
          dataHolder.total = cachedDataHolder.total;
          return new Promise((resolve, reject)=> {
            resolve(dataHolder);
          });
        }
      }
      return this.transport.readService.read(
          {
            fields: query.fields,
            filter: (query.serverSideFilter? query.serverSideFilter:""),
            take: query.take,
            skip: query.skip,
            sort: query.sort,
            sortDir: query.sortDir
          })
          .then(d => {
            dataHolder.data = _.isArray(d.data)?d.data : [d.data];
            dataHolder.total = d.total;
            if (storage)
              storage.setItem(cacheKey, {data:dataHolder.data, total:dataHolder.total}, this._cache.cacheTimeSeconds);
            return dataHolder;
      });
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
}

export class DataSourceConfiguration {
  get cache(){
    return this._cache;
  }
  set cache(value){
    this._cache = value;
  }

  get transport(){
    return this._transport;
  }
  set transport(value){
    this._transport = value;
  }
  
  get name(){
    return this._name;
  }
  set name(value){
    this._name = value;
  }
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

  /*get clientSideFilter() {
    return this._clientSideFilter;
  }
  set clientSideFilter(value) {
    this._clientSideFilter = value;
  }*/


  get serverSideFilter() {
    return this._serverSideFilter;
  }
  set serverSideFilter(value) {
    this._serverSideFilter = value;
  }

  cacheKey(){
    return Math.abs(StringHelper.hashCode(
        ((this.serverSideFilter)?this.serverSideFilter:"") +
        (this.fields?this.fields.join(""):"") +
        (this.sort?this.sort:"") +
        (this.sortDir?this.sortDir:"") +
        (this.take?this.take:"0") +
        (this.skip?this.skip:"0")));
  }
  
}


@inject(ExpressionParserFactory)
export class DslExpressionManagerFactory {

  constructor(expressionParserFactory) {
    this.expressionParserFactory = expressionParserFactory;
  }

  createInstance(dataSource, fields) {
    return dataSource.transport.readService.getSchema().then(schema=>{
      let fields = schema.fields;
      var allFields = _.map(fields,"field");
      var numericFields = _.map(DataHelper.getNumericFields(fields),"field");
      var stringFields = _.map(DataHelper.getStringFields(fields),"field");
      var dateFields = _.map(DataHelper.getDateFields(fields),"field");
      let parser = this.expressionParserFactory.createInstance(numericFields, stringFields, dateFields);
      return new DslExpressionManager(parser, dataSource, allFields);
    })

  }
}

export class DslExpressionManager {

  constructor(parser, dataSource, fieldsList) {
    this.dataSource = dataSource;
    this.fields = fieldsList;
    this.parser = parser;
  }

  populate(searchStr, lastWord) {
    let parserError = this.getParserError(searchStr);
    return this._getIntellisenseData(searchStr, lastWord, parserError);
  }

  parse(searchStr){
    var expression = this.parser.parse(searchStr);
    return this._normalizeSerachExpression(expression);
  }

  validate(searchStr) {
    return this.parser.validate(searchStr);
  }

  expectedToken(searchStr) {
    let tokenName = "";
    let parserError = this.getParserError(searchStr);
    if (parserError!=null)
      tokenName = this._interpreteParserError(parserError);
    return tokenName;
  }


  getParserError(searchStr)
  {
    let result = null;
    if (searchStr!="")
    {
      try {
        this.parse(searchStr);
        try{
          this.parse(searchStr + "^");
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

  _getLogicalOperatorsArray() {
    return (["and", "or"]);
  }

  _getComparisonOperatorsArray() {
    return (["!=", "=", ">", "<", ">=", "<="])
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

  _getStringComparisonOperatorsArray() {
    return (["=", "in"]);
  }


  _getFieldValuesArray(fieldName, lastWord) {
    let query = new Query();
    query.take = 100;
    query.skip = 0;
    if (lastWord)
      query.serverSideFilter = this.parse(fieldName + " = '" + lastWord + "%'");
    else
      query.serverSideFilter ="";
    query.fields = [fieldName];
    return this.dataSource.getData(query).then(dH=>{
      var result = _.map(dH.data,fieldName);
      return _.uniq(result).sort();
    })
  }

  _normalizeData(type, dataArray) {
    return _.map(dataArray,d=>{ return { type: type, value: d }});
  }

  _normalizeSerachExpression(searchExpression){
    var expr = new RegExp('record.([a-zA-Z0-9\%\_\-]*)', 'g');
    var match;
    while ((match = expr.exec(searchExpression)) !== null) {
      for (let fld of this.fields){
        if (match[1].toLowerCase()===fld.toLowerCase())
            searchExpression = StringHelper.replaceAll(searchExpression, match[0], 'record.' + fld);
      }
    }
    return searchExpression;
  }


}

@inject(HttpClient)
export class ExpressionParserFactory {

  constructor(http) {
    http.configure(config => {
      config.useStandardConfiguration();
    });
    this.http = http;
  }

  createInstance(numericFieldList, stringFieldList, dateFieldList) {
    var that = this;
    var text = new Grammar().getGrammar();
    var parserText = text.replace('@S@', that.concatenateFieldList(stringFieldList))
      .replace('@N@', that.concatenateFieldList(numericFieldList))
      .replace('@D@', that.concatenateFieldList(dateFieldList));
    return new ExpressionParser(peg.buildParser(parserText));
  }

  concatenateFieldList(fieldList){
    for (var i = 0; i < fieldList.length; i++) {
      fieldList[i] = '\'' + fieldList[i] + '\'i';
    }
    if (fieldList.length>0)
      return fieldList.join('/ ');
    else
      return "'unknown_field'"
  }
}


export class ExpressionParser {

  constructor(pegParser)
  {
    this.parser =  pegParser;
  }

  parse(searchString)
  {
    return this.parser.parse(searchString);
  }

  validate(searchString)
  {
    try{
      this.parser.parse(searchString);
      return true;
    }
    catch(ex)
    {
      return false;
    }
  }

}


const DSL_GRAMMAR = `
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


export class Grammar {
  getGrammar(){
    return DSL_GRAMMAR;
  }
}

export class DashboardManager {
  constructor(){
    this._dashboards = [];
  }

  get dashboards(){
    return this._dashboards;
  }

  find(dashboardName){
    return  _.find(this._dashboards, {name:dashboardName});
  }
  
  createDashboard(type, dashboardConfiguration){
    var dashboard = new type();
    dashboard.configure(dashboardConfiguration);
    this._dashboards.push(dashboard);
    return dashboard;
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

  static objectToQuery(ar){
    return encodeURIComponent(JSON.stringify(ar));
  }

  static queryToObject(queryParam){
    return JSON.parse(queryParam);
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

@inject(Router, EventAggregator, UserStateStorage, NavigationHistory, StateUrlParser)
export class PeriscopeRouter {
  constructor(aureliaRouter, eventAggregator, userStateStorage, navigationHistory){
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

  navigate(routeItem){
    // update the history with the current state
    if (this.currentRouteItem){
      var currentWidgetsState = StateDiscriminator.discriminate(this._userStateStorage.getAll(this.currentRouteItem.dashboardName));
      var url = "/" + this.currentRouteItem.dashboardName + StateUrlParser.stateToQuery(currentWidgetsState);
      if (_.filter(this._navigationHistory.items,i=>StringHelper.compare(i.url, url)).length===0){
        this._navigationHistory.add(url, this.currentRouteItem.title, this.currentRouteItem.dashboardName, currentWidgetsState, new Date());
      }
      else if (!StringHelper.compare(url,this.currentRouteItem.route)) { // state change but there already a route with the same state
        this._navigationHistory.update(url,new Date());
      }
    }

    // synchronize a stored state and a state from the route
    var routeWidgetsState = StateUrlParser.queryToState(routeItem.route);
    var storageWidgetsState = StateDiscriminator.discriminate(this._userStateStorage.getAll(routeItem.dashboardName));
    for (let oldSt of storageWidgetsState)
      this._userStateStorage.remove(oldSt.key);
    for (let newSt of routeWidgetsState)
      this._userStateStorage.set(newSt.key,newSt.value);

    // add the new route to the history
    if (_.filter(this._navigationHistory.items,i=>StringHelper.compare(i.url, routeItem.route)).length===0){ // add new history item
      this._navigationHistory.add(routeItem.route, routeItem.title, routeItem.dashboardName, this._userStateStorage.getAll(routeItem.dashboardName), new Date());
    }
    // navigate to the new route
    this.currentRouteItem = routeItem;
    this._aureliaRouter.navigate(routeItem.route);
  }


}


export class StateDiscriminator{
  static discriminate(widgetStates){
    var result = []
    for (let ws of widgetStates){
      if (ws.value.stateType==="searchBoxState")
        result.push(ws);
    }
    return result;
  }

}

export class StateUrlParser{
  static stateToQuery(widgetStates){
    var params = []
    for (let widgetState of widgetStates)
        params.push({"sk": widgetState.key, "sv":widgetState.value});
    //.widgetName, "st":widgetState.value.stateType, "so":widgetState.value.stateObject
    return ((params.length>0)? "?q=" + UrlHelper.objectToQuery(params) :"");
  }

  static queryToState(url){
    var result = [];
    var q = UrlHelper.getParameterByName("q", url);
    if (q){
      var widgetStates = UrlHelper.queryToObject(q);
      for (var ws of widgetStates){
        result.push({"key":ws.sk, "value":ws.sv});
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

@inject(Storage, AppConfig)
export class UserStateStorage{

    constructor(storage, config){
      this._storage = storage;
      this._key = config.appStorageKey;
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
  configure(configuration){
    this.url = configuration.url;
    this.schemaProvider = configuration.schemaProvider;
    this.queryMapper = configuration.queryMapper;
    this.totalMapper = configuration.totalMapper;
    this.dataMapper = configuration.dataMapper;
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

  constructor(options){
    if (options) {
      this._url = options.url;
      this._schemaProvider = options.schemaProvider;
      this._totalMapper = options.totalMapper;
      this._queryMapper = options.queryMapper;
      this._dataMapper = options.dataMapper;
    }
  }

  get url() {
    return this._url;
  }

  get schemaProvider(){
    return this._schemaProvider
  }

  get totalMapper(){
    return this._totalMapper;
  }

  get queryMapper(){
    return this._queryMapper;
  }

  get dataMapper(){
    return this._dataMapper;
  }

}

@transient()
@inject(HttpClient)
export class JsonDataService extends DataService {
    constructor(http) {
      super();
        http.configure(config => {
            config.useStandardConfiguration();
        });
        this._http = http;
    }

    read(options) { //options: fields,query, take, skip, sort
        var url = this.url + (this.queryMapper? this.queryMapper(options) : "");
        return this._http
            .fetch(this.url)
            .then(response => {return response.json(); })
            .then(jsonData => {
                return {
                  data: (this.dataMapper? this.dataMapper(jsonData) : jsonData),
                  total: (this.totalMapper? this.totalMapper(jsonData) : jsonData.length)
                }
            });
    }
}

@transient()
@inject(HttpClient)
export class StaticJsonDataService extends DataService {
  constructor(http) {
    super();
    http.configure(config => {
      config.useStandardConfiguration();
    });
    this._http = http;
  }
  

  read(options) {
    return this._http
      .fetch(this.url)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        var d = jsonData;
        d = this.dataMapper? this.dataMapper(d) : d;
        if (options.filter){
          var evaluator = new QueryExpressionEvaluator();
          d = evaluator.evaluate(d, options.filter);
        }
        var total = d.length;
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
      var navItem = {
          //route: me._newRoute.route,
          route: me._newRoute.route + (params!==""? params : ""),
          title: me._newRoute.title,
          dashboardName: me._newRoute.dashboardName
      }
      me._router.navigate(navItem);
    });
  }

  detach(){
    super.detach(dashboard);
    if (this.subscription)
      this.subscription.dispose();
  }
}


export class CreateWidgetBehavior extends DashboardBehavior {

  constructor(chanel, widgetType, widgetSettings, widgetDimensions, eventAggregator, filterMapper) {
    super();
    this._chanel = chanel;
    this._widgetType = widgetType;
    this._widgetSettings = widgetSettings;
    this._widgetDimensions = widgetDimensions;
    this._eventAggregator = eventAggregator;
    this._filterMapper = filterMapper;
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
        var previousWidget = message.navigationStack.pop();
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

  constructor(chanel, eventAggregator, widgetToReplaceName, widgetType, widgetSettings, mapper) {
    super();
    this._chanel = chanel;
    this._widgetType = widgetType;
    this._widgetSettings = widgetSettings;
    this._eventAggregator = eventAggregator;
    this._widgetToReplaceName = widgetToReplaceName;
    this._mapper = mapper;
  }

  attach(dashboard){
    super.attach(dashboard);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._chanel, message => {
      var originatorWidget = dashboard.getWidgetByName(me._widgetToReplaceName);
      var w = new me._widgetType(me._widgetSettings);
      dashboard.replaceWidget(originatorWidget, w);
      if (me._mapper)
        w.dataFilter =  me._mapper(message);
      w.refresh();
    });
  }

  detach(){
    super.detach(dashboard);
    if (this.subscription)
      this.subscription.dispose();
  }
}

export class DataActivatedBehavior extends WidgetBehavior {
  constructor(chanel, eventAggregator) {
    super();
    this._chanel = chanel;
    this._eventAggregator = eventAggregator;
  }

  attachToWidget(widget)   {
    super.attachToWidget(widget);
    var me = this;

    widget.dataActivated =  function(currentRecord) {
      var message = new WidgetEventMessage(me.widget.name);
      message.activatedData = currentRecord;
      me._eventAggregator.publish(me._chanel, message);
    };
  }

  detach(){
    super.detach(dashboard);
  }
}

export class DataFieldSelectedBehavior extends WidgetBehavior {
  constructor(chanel, eventAggregator) {
    super();
    this._chanel = chanel;
    this._eventAggregator = eventAggregator;
  }

  attachToWidget(widget)   {
    super.attachToWidget(widget);
    var me = this;

    widget.dataFieldSelected =  function(fieldName) {
      var message = new WidgetEventMessage(me.widget.name);
      message.fieldName = fieldName;
      me._eventAggregator.publish(me._chanel, message);
    };
  }

  detach(){
    super.detach(dashboard);
  }
}


export class DataFilterChangedBehavior extends WidgetBehavior
{
  constructor(channel, eventAggregator) {
    super();
    this._channel = channel;
    this._eventAggregator = eventAggregator;
  }

  attachToWidget(widget) {
    super.attachToWidget(widget);
    var me = this;
    widget.dataFilterChanged = function(filter)
    {
      var message = new WidgetEventMessage(me.widget.name);
      message.dataFilter = filter;
      me._eventAggregator.publish(me._channel, message);
    };
  }

  detach(){
    super.detach(dashboard);
  }
}

export class DataFilterHandleBehavior extends WidgetBehavior
{
  constructor(channel, eventAggregator, filterMapper) {
    super();
    this._channel = channel;
    this._eventAggregator = eventAggregator;
    this._filterMapper = filterMapper;
  }

  attachToWidget(widget){
    super.attachToWidget(widget);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._channel, message => {
      var filterToApply = me._filterMapper ? me._filterMapper(message) : message.dataFilter;
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

export class DataSelectedBehavior extends WidgetBehavior {
  constructor(chanel, eventAggregator) {
    super();
    this._chanel = chanel;
    this._eventAggregator = eventAggregator;
  }

  attachToWidget(widget)   {
    super.attachToWidget(widget);
    var me = this;

    widget.dataSelected =  function(currentRecord) {
      var message = new WidgetEventMessage(me.widget.name);
      message.selectedData = currentRecord;
      me._eventAggregator.publish(me._chanel, message);
    };
  }

  detach(){
    super.detach(dashboard);
  }
}

export class DataSourceChangedBehavior extends WidgetBehavior
{
  constructor(channel, eventAggregator) {
    super();
    this._channel = channel;
    this._eventAggregator = eventAggregator;
  }

  attachToWidget(widget) {
    super.attachToWidget(widget);
    var me = this;
    widget.dataSourceChanged = function(dataSource)
    {
      var message = new WidgetEventMessage(me.widget.name);
      message.dataSource = dataSource;
      me._eventAggregator.publish(me._channel, message);
    };
  }

  detach(){
    super.detach(dashboard);
  }
}

export class DataSourceHandleBehavior extends WidgetBehavior
{
  constructor(channel, eventAggregator) {
    super();
    this._channel = channel;
    this._eventAggregator = eventAggregator;
  }

  attachToWidget(widget){
    super.attachToWidget(widget);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._channel, message => {
      me.widget.dataSource = message.dataSource;
      me.widget.refresh();
    });
  }

  detach(){
    super.detach(dashboard);
    if (this.subscription)
      this.subscription.dispose();
  }
}


export class SettingsHandleBehavior extends WidgetBehavior
{
  constructor(channel, eventAggregator, messageMapper) {
    super();
    this._channel = channel;
    this._eventAggregator = eventAggregator;
    this._messageMapper = messageMapper;
  }

  attachToWidget(widget){
    super.attachToWidget(widget);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._channel, message => {
      var settingsToApply = me._messageMapper ? me._messageMapper(message) : message;
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

  get widget() {
    return this._widget;
  }

  attachToWidget(widget) {
    this._widget = widget;
    this._widget.behaviors.push(this);
  }

  detach(){
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
    this._handlers = [];
    this._originatorName = widgetName;
  }

  get originatorName()  {
    return this._originatorName;
  }

  attach(handler){
    if(this._handlers.some(e=>e === handler)) {
      return; //already attached
    }
    this._handlers.push(handler);
  }

  detach(handler) {
    var idx = this._handlers.indexOf(handler);
    if(idx < 0){
      return; //not attached, do nothing
    }
    this.handler.splice(idx,1);
  }

  raise(){
    for(var i = 0; i< this._handlers.length; i++) {
      this._handlers[i].apply(this, arguments);
    }
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
