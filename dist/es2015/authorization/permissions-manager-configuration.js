export let PermissionsManagerConfiguration = class PermissionsManagerConfiguration {

  withDataSource(dataSource) {
    this.dataSource = dataSource;
    return this;
  }

};