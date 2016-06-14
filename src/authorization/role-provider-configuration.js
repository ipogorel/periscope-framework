export class RoleProviderConfiguration {
  authService;
  dataSource;
  query;

  withAuthService(authService){
    this.authService = authService;
    return this;
  }

  withDataSource(dataSource){
    this.dataSource = dataSource;
    return this;
  }

  withQuery(query){
    this.query = query;
    return this;
  }

}
