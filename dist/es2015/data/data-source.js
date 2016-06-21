import * as _ from 'lodash';
import { DataHolder } from './data-holder';

export let Datasource = class Datasource {

  constructor(datasourceConfiguration) {
    this._liveRequest = {};

    this.name = datasourceConfiguration.name;
    this.transport = datasourceConfiguration.transport;
    this.cache = datasourceConfiguration.cache;
  }

  getData(query) {
    if (!this.transport && !this.transport.readService) throw "readService is not configured";

    let cacheKey = this.transport.readService.url + query.cacheKey();

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
    if (!this.transport && !this.transport.createService) throw "createService is not configured";
    return this.transport.createService.create(entity);
  }

  update(id, entity) {
    if (!this.transport && !this.transport.updateService) throw "updateService is not configured";
    return this.transport.updateService.update(id, entity);
  }

  delete(id, entity) {
    if (!this.transport && !this.transport.deleteService) throw "deleteService is not configured";
    return this.transport.updateService.delete(entity);
  }

  _doWebRequest(cacheKey, query) {
    return this.transport.readService.read({
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

};

export let DataSourceConfiguration = class DataSourceConfiguration {};