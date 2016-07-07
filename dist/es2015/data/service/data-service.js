export let DataService = class DataService {
  configure(configuration) {
    this.url = configuration.url ? configuration.url : this.url;
    this.schemaProvider = configuration.schemaProvider ? configuration.schemaProvider : this.schemaProvider;
    this.filterParser = configuration.filterParser ? configuration.filterParser : this.filterParser;
    this.totalMapper = configuration.totalMapper ? configuration.totalMapper : this.totalMapper;
    this.dataMapper = configuration.dataMapper ? configuration.dataMapper : this.dataMapper;
    this.httpClient = configuration.httpClient ? configuration.httpClient : this.httpClient;
  }

  getSchema() {
    return this.schemaProvider.getSchema();
  }
  read(options) {}
  create(entity) {}
  update(id, entity) {}
  delete(id) {}

};

export let DataServiceConfiguration = class DataServiceConfiguration {

  constructor(configuration) {
    if (configuration) {
      this._url = configuration.url;
      this._schemaProvider = configuration.schemaProvider;
      this._totalMapper = configuration.totalMapper;
      this._filterParser = configuration.filterParser;
      this._dataMapper = configuration.dataMapper;
      this._httpClient = configuration.httpClient;
    }
  }

  get url() {
    return this._url;
  }

  get httpClient() {
    return this._httpClient;
  }

  get schemaProvider() {
    return this._schemaProvider;
  }

  get totalMapper() {
    return this._totalMapper;
  }

  get filterParser() {
    return this._filterParser;
  }

  get dataMapper() {
    return this._dataMapper;
  }

};