export let RoleProviderConfiguration = class RoleProviderConfiguration {

  withAuthService(authService) {
    this.authService = authService;
    return this;
  }

  withDataSource(dataSource) {
    this.dataSource = dataSource;
    return this;
  }

  withQueryPattern(queryPattern) {
    this.queryPattern = queryPattern;
    return this;
  }

  withRolesArray(userRolesArray) {
    this.userRolesArray = userRolesArray;
    return this;
  }
};