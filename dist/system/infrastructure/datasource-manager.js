'use strict';

System.register(['lodash', './../data/data-source'], function (_export, _context) {
  "use strict";

  var _, Datasource, _createClass, DatasourceManager;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_lodash) {
      _ = _lodash;
    }, function (_dataDataSource) {
      Datasource = _dataDataSource.Datasource;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('DatasourceManager', DatasourceManager = function () {
        function DatasourceManager() {
          _classCallCheck(this, DatasourceManager);

          this._datasources = [];
        }

        DatasourceManager.prototype.find = function find(datasourceName) {
          return _.find(this._datasources, { name: datasourceName });
        };

        DatasourceManager.prototype.createDatasource = function createDatasource(datasourceConfiguration) {
          if (this.find(datasourceConfiguration.name)) throw "Datasource with the name '" + datasourceConfiguration.name + "' already exists";
          var datasource = new Datasource(datasourceConfiguration);
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
      }());

      _export('DatasourceManager', DatasourceManager);
    }
  };
});