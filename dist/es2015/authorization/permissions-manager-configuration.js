export let PermissionsManagerConfiguration = class PermissionsManagerConfiguration {
  constructor() {
    this.permissionsMatrix = [];
  }

  withPermissionsMatrix(matrix) {
    this.permissionsMatrix = matrix;
    return this;
  }

  withRoleProvider(roleProvider) {
    this.roleProvider = roleProvider;
    return this;
  }
};