import * as _ from 'lodash';
import { Datasource } from './../data/data-source';

export let DatasourceManager = class DatasourceManager {
  constructor() {
    this._datasources = [];
  }
  get datasources() {
    return this._datasources;
  }

  find(datasourceName) {
    return _.find(this._datasources, { name: datasourceName });
  }

  createDatasource(datasourceConfiguration) {
    if (this.find(datasourceConfiguration.name)) throw "Datasource with the name '" + datasourceConfiguration.name + "' already exists";
    var datasource = new Datasource(datasourceConfiguration);
    this._datasources.push(datasource);
    return datasource;
  }
};