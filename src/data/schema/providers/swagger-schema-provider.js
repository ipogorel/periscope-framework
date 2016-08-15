import {SchemaProvider} from './schema-provider';
import Swagger from "swagger-client";
import {Schema} from './../schema-object';
import * as _ from 'lodash';

export class SwaggerSchemaProvider extends SchemaProvider{
  constructor(){
    super();
  }

  modelName;
  methodName;
  apiName;
  definitionUrl;

  getSchema() {
    var self = this;
    return new Swagger({
      url: this._definitionUrl,
      usePromise: true
    }).then(client => {
      let result = new Schema();
      _.forEach(client.apis[self.apiName].apis[self.methodName].parameters, p=> {
        result.parameters.push(p);
      });
      if (client.definitions[self.modelName]) {
        _.forOwn(client.definitions[self.modelName].properties, (value, key)=> {
          result.fields.push({field: key, type: value.type});
        });
      }
      return result;
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
