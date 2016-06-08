"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataService = exports.DataService = function () {
  function DataService() {
    _classCallCheck(this, DataService);
  }

  DataService.prototype.configure = function configure(configuration) {
    this.url = configuration.url;
    this.schemaProvider = configuration.schemaProvider;
    this.filterParser = configuration.filterParser;
    this.totalMapper = configuration.totalMapper;
    this.dataMapper = configuration.dataMapper;
    this.httpClient = configuration.httpClient;
  };

  DataService.prototype.getSchema = function getSchema() {
    return this.schemaProvider.getSchema();
  };

  DataService.prototype.read = function read(options) {};

  DataService.prototype.create = function create(entity) {};

  DataService.prototype.update = function update(id, entity) {};

  DataService.prototype.delete = function _delete(id) {};

  return DataService;
}();

var DataServiceConfiguration = exports.DataServiceConfiguration = function () {
  function DataServiceConfiguration(configuration) {
    _classCallCheck(this, DataServiceConfiguration);

    if (configuration) {
      this._url = configuration.url;
      this._schemaProvider = configuration.schemaProvider;
      this._totalMapper = configuration.totalMapper;
      this._filterParser = configuration.filterParser;
      this._dataMapper = configuration.dataMapper;
      this._httpClient = configuration.httpClient;
    }
  }

  _createClass(DataServiceConfiguration, [{
    key: "url",
    get: function get() {
      return this._url;
    }
  }, {
    key: "httpClient",
    get: function get() {
      return this._httpClient;
    }
  }, {
    key: "schemaProvider",
    get: function get() {
      return this._schemaProvider;
    }
  }, {
    key: "totalMapper",
    get: function get() {
      return this._totalMapper;
    }
  }, {
    key: "filterParser",
    get: function get() {
      return this._filterParser;
    }
  }, {
    key: "dataMapper",
    get: function get() {
      return this._dataMapper;
    }
  }]);

  return DataServiceConfiguration;
}();