import * as _ from 'lodash';
export class ConfigurationInfo {
  static createInfo(configurator, object, objectConfig){
    return new ConfigurationInfo(configurator, object.constructor.name, objectConfig);
  }

  constructor(configurator, objectType, objectConfig){
    this.configurator = configurator;
    this.type = objectType;
    this.config = objectConfig?objectConfig:{};
  }

  configurator;
  type;
  config;

  addValue(key, value){
    if (value){
      if (_.isArray(value)){
        let aVal = [];
        _.forEach(value,v=>{
          aVal.push(this._getConfig(v))
        })
        this.config[key] = aVal;
      }
      else
        this.config[key] = this._getConfig(value);
    }
  }

  addScript(key, value){
    if (value)
      this.config[key] = value.toString();
  }

  getValue(key){
    if (this.config[key]){
      if (_.isArray(this.config[key])) {
        let aVal = [];
        _.forEach(this.config[key],v=>{
          aVal.push(this._getObject(v));
        });
        return aVal;
      }
      else {
        return this._getObject(this.config[key])
      }
    }
    return null;
  }

  getScript(key){
    if (this.config[key]){
      return eval("(" + this.config[key] + ")");
    }
    return null;
  }

  getInt(key){
    if (this.config[key]){
      return parseInt(this.config[key]);
    }
    return null;
  }

  getBool(key){
    if (this.config[key]){
      return (this.config[key] === "true");
    }
    return null;
  }


  _getConfig(object){
    if (this.configurator.isConfigurable(object))
      return this.configurator.getConfiguration(object);
    else
      return object;
  }
  _getObject(config){
    if (config.type && config.config) {//serializable
      return this.configurator.getObject(config);
    }
    return config;
  }
}
