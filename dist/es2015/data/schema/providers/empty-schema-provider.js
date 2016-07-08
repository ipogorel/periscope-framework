import { SchemaProvider } from './schema-provider';
import { Schema } from './../schema-object';

export let EmptySchemaProvider = class EmptySchemaProvider extends SchemaProvider {
  constructor() {
    super();
  }
  getSchema() {
    return new Promise((resolve, reject) => {
      resolve(new Schema());
    });
  }
};