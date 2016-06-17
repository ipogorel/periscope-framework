"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PermissionsManagerConfiguration = exports.PermissionsManagerConfiguration = function () {
  function PermissionsManagerConfiguration() {
    _classCallCheck(this, PermissionsManagerConfiguration);
  }

  PermissionsManagerConfiguration.prototype.withDataSource = function withDataSource(dataSource) {
    this.dataSource = dataSource;
    return this;
  };

  return PermissionsManagerConfiguration;
}();