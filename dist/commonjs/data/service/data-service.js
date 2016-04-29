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
    this.queryMapper = configuration.queryMapper;
    this.totalMapper = configuration.totalMapper;
    this.dataMapper = configuration.dataMapper;
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
  function DataServiceConfiguration(options) {
    _classCallCheck(this, DataServiceConfiguration);

    if (options) {
      this._url = options.url;
      this._schemaProvider = options.schemaProvider;
      this._totalMapper = options.totalMapper;
      this._queryMapper = options.queryMapper;
      this._dataMapper = options.dataMapper;
    }
  }

  _createClass(DataServiceConfiguration, [{
    key: "url",
    get: function get() {
      return this._url;
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
    key: "queryMapper",
    get: function get() {
      return this._queryMapper;
    }
  }, {
    key: "dataMapper",
    get: function get() {
      return this._dataMapper;
    }
  }]);

  return DataServiceConfiguration;
}();