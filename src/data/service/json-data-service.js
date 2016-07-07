import {DataService} from './data-service';
import * as _ from 'lodash';
import {inject, transient} from 'aurelia-framework';

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
