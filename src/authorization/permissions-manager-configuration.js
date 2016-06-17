export class PermissionsManagerConfiguration {
  dataSource;

  withDataSource(dataSource){
    this.dataSource = dataSource;
    return this;
  }

}
