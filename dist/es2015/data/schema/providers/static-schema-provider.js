import { SchemaProvider } from './schema-provider';

export let StaticSchemaProvider = class StaticSchemaProvider extends SchemaProvider {
  constructor() {
    super();
  }

  getSchema() {
    return new Promise((resolve, reject) => {
      resolve(this.schema);
    });
  }

  persistConfigurationTo(configurationInfo) {
    configurationInfo.addValue("schema", this.schema);
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo) {
    this.schema = configurationInfo.getValue("schema");
    super.restoreConfigurationFrom(configurationInfo);
  }
};