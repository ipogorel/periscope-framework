define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var PermissionsManagerConfiguration = exports.PermissionsManagerConfiguration = function () {
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
  }();
});