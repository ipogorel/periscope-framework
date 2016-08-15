import { EmptySchemaProvider } from './../schema/providers/empty-schema-provider';
import { Configurable } from './../../serialization/configurable';

export let DataService = class DataService extends Configurable {
  constructor() {
    super();
    this.url = "";
    this.schemaProvider = new EmptySchemaProvider();
  }

  getSchema() {
    return this.schemaProvider.getSchema();
  }
  read(options) {}
  create(entity) {}
  update(id, entity) {}
  delete(id) {}

  persistConfigurationTo(configurationInfo) {
    configurationInfo.addValue("url", this.url);
    configurationInfo.addValue("schemaProvider", this.schemaProvider);
    configurationInfo.addValue("filterParser", this.filterParser);
    configurationInfo.addScript("totalMapper", this.totalMapper);
    configurationInfo.addScript("dataMapper", this.dataMapper);

    configurationInfo.addValue("httpClient", this.httpClient);

    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo) {
    this.url = configurationInfo.getValue("url");
    this.schemaProvider = configurationInfo.getValue("schemaProvider");
    this.filterParser = configurationInfo.getValue("filterParser");
    this.totalMapper = configurationInfo.getScript("totalMapper");
    this.dataMapper = configurationInfo.getScript("dataMapper");

    this.httpClient = configurationInfo.getValue("httpClient");

    super.restoreConfigurationFrom(configurationInfo);
  }
};