var _dec, _dec2, _class;

import { DataService } from './data-service';
import { DataHelper } from './../../helpers/data-helper';
import { inject, transient } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { QueryExpressionEvaluator } from './../query-expression-evaluator';
import * as _ from 'lodash';

export let StaticJsonDataService = (_dec = transient(), _dec2 = inject(HttpClient), _dec(_class = _dec2(_class = class StaticJsonDataService extends DataService {
  constructor(httpClient) {
    super(httpClient);
  }

  read(options) {
    return this.httpClient.fetch(this.url).then(response => {
      return response.json();
    }).then(jsonData => {
      let d = this.dataMapper ? this.dataMapper(jsonData) : jsonData;
      if (options.filter) {
        let f = options.filter;
        if (this.filterParser && this.filterParser.type === "clientSide") f = this.filterParser.getFilter(options.filter);
        let evaluator = new QueryExpressionEvaluator();
        d = evaluator.evaluate(d, f);
      }
      let total = d.length;

      if (options.sort) d = _.orderBy(d, [options.sort], [options.sortDir]);
      var l = options.skip + options.take;
      d = l ? _.slice(d, options.skip, l > d.length ? d.length : l) : d;
      if (options.fields && options.fields.length > 0) d = _.map(d, item => {
        return _.pick(item, options.fields);
      });
      return {
        data: DataHelper.deserializeDates(d),
        total: this.totalMapper ? this.totalMapper(jsonData) : total
      };
    });
  }

}) || _class) || _class);