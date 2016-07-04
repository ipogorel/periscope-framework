'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatasourceManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _dataSource = require('./../data/data-source');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DatasourceManager = exports.DatasourceManager = function () {
  function DatasourceManager() {
    _classCallCheck(this, DatasourceManager);

    this._datasources = [];
  }

  DatasourceManager.prototype.find = function find(datasourceName) {
    return _.find(this._datasources, { name: datasourceName });
  };

  DatasourceManager.prototype.createDatasource = function createDatasource(datasourceConfiguration) {
    if (this.find(datasourceConfiguration.name)) throw "Datasource with the name '" + datasourceConfiguration.name + "' already exists";
    var datasource = new _dataSource.Datasource(datasourceConfiguration);
    this._datasources.push(datasource);
    return datasource;
  };

  _createClass(DatasourceManager, [{
    key: 'datasources',
    get: function get() {
      return this._datasources;
    }
  }]);

  return DatasourceManager;
}();