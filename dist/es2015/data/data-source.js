import * as _ from 'lodash';
import { DataHolder } from './data-holder';
import { Configurable } from './../serialization/configurable';

export let Datasource = class Datasource extends Configurable {

  constructor() {
    super();
    this._liveRequest = {};
  }

  getData(query) {
    if (!this.readService) throw "readService is not configured";

    let cacheKey = this.readService.url + query.cacheKey();

    if (!this.cache) {
      return this._doWebRequest(cacheKey, query);
    } else {
      if (this._liveRequest[cacheKey]) {
        this._liveRequest[cacheKey] = this._liveRequest[cacheKey].then(l => this._fromCache(cacheKey)).then(data => this._processData(cacheKey, query, data), err => this._doWebRequest(cacheKey, query));
        return this._liveRequest[cacheKey];
      }
      try {
        let data = this._fromCache(cacheKey);
        return Promise.resolve(data).then(d => this._processData(cacheKey, query, d));
      } catch (ex) {}
      this._liveRequest[cacheKey] = this._doWebRequest(cacheKey, query);
      return this._liveRequest[cacheKey];
    }
  }

  create(entity) {
    if (!this.createService) throw "createService is not configured";
    return this.createService.create(entity);
  }

  update(id, entity) {
    if (!this.updateService) throw "updateService is not configured";
    return this.updateService.update(id, entity);
  }

  delete(id, entity) {
    if (!this.deleteService) throw "deleteService is not configured";
    return this.deleteService.delete(entity);
  }

  _doWebRequest(cacheKey, query) {
    return this.readService.read({
      fields: query.fields,
      filter: query.filter,
      take: query.take,
      skip: query.skip,
      sort: query.sort,
      sortDir: query.sortDir
    }).then(d => {
      return this._processData(cacheKey, query, d);
    });
  }

  _processData(cacheKey, query, jsonData) {
    this._liveRequest[cacheKey] = null;
    this._setCache(jsonData, cacheKey);
    let dataHolder = new DataHolder();
    dataHolder.query = query;
    dataHolder.data = _.isArray(jsonData.data) ? jsonData.data : [jsonData.data];
    dataHolder.total = jsonData.total;
    return dataHolder;
  }

  _fromCache(cacheKey) {
    let storage = this.cache.cacheManager.getStorage();
    let d = storage.getItem(cacheKey);
    if (d) return d;
    throw "data not found: " + cacheKey;
  }
  _setCache(data, cacheKey) {
    if (this.cache && this.cache.cacheManager) {
      let storage = this.cache.cacheManager.getStorage();
      storage.setItem(cacheKey, data, this.cache.cacheTimeSeconds);
    }
  }

  persistConfigurationTo(configurationInfo) {
    configurationInfo.addValue("name", this.name);
    configurationInfo.addValue("readService", this.readService);
    configurationInfo.addValue("updateService", this.updateService);
    configurationInfo.addValue("createService", this.createService);
    configurationInfo.addValue("deleteService", this.deleteService);
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo) {
    this.name = configurationInfo.getValue("name");
    this.readService = configurationInfo.getValue("readService");
    this.updateService = configurationInfo.getValue("updateService");
    this.createService = configurationInfo.getValue("createService");
    this.deleteService = configurationInfo.getValue("deleteService");
    super.restoreConfigurationFrom(configurationInfo);
  }
};

export let DataSourceConfiguration = class DataSourceConfiguration {};