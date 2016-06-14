export let RoleProviderConfiguration = class RoleProviderConfiguration {

  withAuthService(authService) {
    this.authService = authService;
    return this;
  }

  withDataSource(dataSource) {
    this.dataSource = dataSource;
    return this;
  }

  withQuery(query) {
    this.query = query;
    return this;
  }

};