"use strict";

System.register([], function (_export, _context) {
  "use strict";

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
        }

        PermissionsManagerConfiguration.prototype.withDataSource = function withDataSource(dataSource) {
          this.dataSource = dataSource;
          return this;
        };

        return PermissionsManagerConfiguration;
      }());

      _export("PermissionsManagerConfiguration", PermissionsManagerConfiguration);
    }
  };
});