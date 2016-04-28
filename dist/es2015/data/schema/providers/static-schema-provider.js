import { SchemaProvider } from './schema-provider';

export let StaticSchemaProvider = class StaticSchemaProvider extends SchemaProvider {
  constructor(schema) {
    super();
    this._schema = schema;
  }
  getSchema() {
    return new Promise((resolve, reject) => {
      resolve(this._schema);
    });
  }
};