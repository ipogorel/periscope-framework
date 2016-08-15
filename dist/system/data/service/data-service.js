'use strict';

System.register(['./../schema/providers/empty-schema-provider', './../../serialization/configurable'], function (_export, _context) {
  var EmptySchemaProvider, Configurable, DataService;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_schemaProvidersEmptySchemaProvider) {
      EmptySchemaProvider = _schemaProvidersEmptySchemaProvider.EmptySchemaProvider;
    }, function (_serializationConfigurable) {
      Configurable = _serializationConfigurable.Configurable;
    }],
    execute: function () {
      _export('DataService', DataService = function (_Configurable) {
        _inherits(DataService, _Configurable);

        function DataService() {
          _classCallCheck(this, DataService);

          var _this = _possibleConstructorReturn(this, _Configurable.call(this));

          _this.url = "";
          _this.schemaProvider = new EmptySchemaProvider();
          return _this;
        }

        DataService.prototype.getSchema = function getSchema() {
          return this.schemaProvider.getSchema();
        };

        DataService.prototype.read = function read(options) {};

        DataService.prototype.create = function create(entity) {};

        DataService.prototype.update = function update(id, entity) {};

        DataService.prototype.delete = function _delete(id) {};

        DataService.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
          configurationInfo.addValue("url", this.url);
          configurationInfo.addValue("schemaProvider", this.schemaProvider);
          configurationInfo.addValue("filterParser", this.filterParser);
          configurationInfo.addScript("totalMapper", this.totalMapper);
          configurationInfo.addScript("dataMapper", this.dataMapper);

          configurationInfo.addValue("httpClient", this.httpClient);

          _Configurable.prototype.persistConfigurationTo.call(this, configurationInfo);
        };

        DataService.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
          this.url = configurationInfo.getValue("url");
          this.schemaProvider = configurationInfo.getValue("schemaProvider");
          this.filterParser = configurationInfo.getValue("filterParser");
          this.totalMapper = configurationInfo.getScript("totalMapper");
          this.dataMapper = configurationInfo.getScript("dataMapper");

          this.httpClient = configurationInfo.getValue("httpClient");

          _Configurable.prototype.restoreConfigurationFrom.call(this, configurationInfo);
        };

        return DataService;
      }(Configurable));

      _export('DataService', DataService);
    }
  };
});