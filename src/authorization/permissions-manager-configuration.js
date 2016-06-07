export class PermissionsManagerConfiguration {
  permissionsMatrix = [];
  roleProvider;

  withPermissionsMatrix(matrix){
    this.permissionsMatrix = matrix;
    return this;
  }

  withRoleProvider(roleProvider){
    this.roleProvider = roleProvider;
    return this;
  }
}
