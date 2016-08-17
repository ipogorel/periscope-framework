var _dec, _dec2, _class;

import { DataService } from './data-service';
import * as _ from 'lodash';
import { inject, transient } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

export let JsonDataService = (_dec = transient(), _dec2 = inject(HttpClient), _dec(_class = _dec2(_class = class JsonDataService extends DataService {

  constructor(httpClient) {
    super(httpClient);
    this._cache = {};
  }

  read(options) {
    let url = this.url;
    if (options.filter) url += this.filterParser ? this.filterParser.getFilter(options.filter) : options.filter;
    return this.httpClient.fetch(url).then(response => {
      return response.json();
    }).then(jsonData => {
      return {
        data: this.dataMapper ? this.dataMapper(jsonData) : jsonData,
        total: this.totalMapper ? this.totalMapper(jsonData) : jsonData.length
      };
    });
  }

}) || _class) || _class);