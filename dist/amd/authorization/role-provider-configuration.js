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

  var RoleProviderConfiguration = exports.RoleProviderConfiguration = function () {
    function RoleProviderConfiguration() {
      _classCallCheck(this, RoleProviderConfiguration);
    }

    RoleProviderConfiguration.prototype.withAuthService = function withAuthService(authService) {
      this.authService = authService;
      return this;
    };

    RoleProviderConfiguration.prototype.withDataSource = function withDataSource(dataSource) {
      this.dataSource = dataSource;
      return this;
    };

    RoleProviderConfiguration.prototype.withQuery = function withQuery(query) {
      this.query = query;
      return this;
    };

    return RoleProviderConfiguration;
  }();
});