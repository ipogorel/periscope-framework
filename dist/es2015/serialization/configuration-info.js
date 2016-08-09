import * as _ from 'lodash';
export let ConfigurationInfo = class ConfigurationInfo {
  static createInfo(configurator, object, objectConfig) {
    return new ConfigurationInfo(configurator, object.constructor.name, objectConfig);
  }

  constructor(configurator, objectType, objectConfig) {
    this.configurator = configurator;
    this.type = objectType;
    this.config = objectConfig ? objectConfig : {};
  }

  addValue(key, value) {
    if (value) {
      if (_.isArray(value)) {
        let aVal = [];
        _.forEach(value, v => {
          if (this.configurator.isConfigurable(v)) aVal.push(this.configurator.getConfiguration(v));else aVal.push(v);
        });
        this.config[key] = aVal;
      } else {
        if (this.configurator.isConfigurable(value)) this.config[key] = this.configurator.getConfiguration(value);else this.config[key] = value;
      }
    }
  }

  addScript(key, value) {
    if (value) this.config[key] = value.toString();
  }

  getValue(key) {
    if (this.config[key]) {
      let result;
      if (this.config[key].type) {
        return this.configurator.getObject(this.config[key]);
      }
      return this.config[key];
    }
    return null;
  }

  getScript(key) {
    if (this.config[key]) {
      return this.config[key];
    }
    return null;
  }

  getInt(key) {
    if (this.config[key]) {
      return parseInt(this.config[key]);
    }
    return null;
  }

  getBool(key) {
    if (this.config[key]) {
      return this.config[key] === "true";
    }
    return null;
  }
};