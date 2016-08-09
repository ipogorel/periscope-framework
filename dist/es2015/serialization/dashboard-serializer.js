import * as _ from 'lodash';
export let DashboardSerializer = class DashboardSerializer {
  constructor(configurator) {
    this.configurator = configurator;
  }

  serialize(dashoardsList) {
    let result = [];
    _.forEach(dashoardsList, d => {
      result.push(this.configurator.getConfiguration(d));
    });
    return result;
  }

  deserialize(dashoardsConfiguration) {
    this.dashoardsConfigurationState = dashoardsConfiguration;
    let result = [];
    _.forEach(dashoardsConfiguration, d => {
      result.push(this.configurator.getObject(d));
    });
    return result;
  }
};