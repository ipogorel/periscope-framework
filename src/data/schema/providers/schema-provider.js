import {Configurable} from './../../../serialization/configurable';
export class SchemaProvider extends Configurable{
  constructor(){
    super();
  }
  getSchema(){}

  persistConfigurationTo(configurationInfo){
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo){
    super.restoreConfigurationFrom(configurationInfo);
  };

}

