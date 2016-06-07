"use strict";

System.register([], function (_export, _context) {
  var PermissionsManagerConfiguration;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("PermissionsManagerConfiguration", PermissionsManagerConfiguration = function () {
        function PermissionsManagerConfiguration() {
          _classCallCheck(this, PermissionsManagerConfiguration);

          this.permissionsMatrix = [];
        }

        PermissionsManagerConfiguration.prototype.withPermissionsMatrix = function withPermissionsMatrix(matrix) {
          this.permissionsMatrix = matrix;
          return this;
        };

        PermissionsManagerConfiguration.prototype.withRoleProvider = function withRoleProvider(roleProvider) {
          this.roleProvider = roleProvider;
          return this;
        };

        return PermissionsManagerConfiguration;
      }());

      _export("PermissionsManagerConfiguration", PermissionsManagerConfiguration);
    }
  };
});