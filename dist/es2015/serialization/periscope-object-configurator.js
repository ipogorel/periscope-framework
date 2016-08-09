import { ConfigurationInfo } from './configuration-info';
import * as _ from 'lodash';

export let PeriscopeObjectConfigurator = class PeriscopeObjectConfigurator {
  constructor(factory) {
    this.factory = factory;
  }

  isConfigurable(object) {
    if (!_.isObject(object) || !object.persistConfigurationTo) return false;
    return true;
  }

  getConfiguration(object) {
    if (!this.isConfigurable(object)) throw "configurable object must implement persistConfigurationTo method";
    let info = ConfigurationInfo.createInfo(this, object);
    object.persistConfigurationTo(info);
    return {
      type: info.type,
      config: info.config
    };
  }

  getObject(objectConfig) {
    let obj = this.factory.createObject(objectConfig.type);
    let info = ConfigurationInfo.createInfo(this, obj);
    info.config = objectConfig.config;
    obj.restoreConfigurationFrom(info);
    return obj;
  }
};