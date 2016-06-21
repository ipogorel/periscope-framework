export class DataService{
  
  configure(configuration){
    this.url = configuration.url;
    this.schemaProvider = configuration.schemaProvider;
    this.filterParser = configuration.filterParser;
    this.totalMapper = configuration.totalMapper;
    this.dataMapper = configuration.dataMapper;
    this.httpClient = configuration.httpClient;
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
