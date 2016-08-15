import {SchemaProvider} from './schema-provider';

export class StaticSchemaProvider extends SchemaProvider{
  constructor(){
    super();
  }

  schema;

  getSchema(){
    return new Promise((resolve, reject)=>{
      resolve(this.schema);
    });
  }

  persistConfigurationTo(configurationInfo){
    configurationInfo.addValue("schema", this.schema);
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo){
    this.schema = configurationInfo.getValue("schema");
    super.restoreConfigurationFrom(configurationInfo);
  };
}

