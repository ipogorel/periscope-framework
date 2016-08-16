'use strict';

System.register(['lodash', './data-holder', './../serialization/configurable'], function (_export, _context) {
  "use strict";

  var _, DataHolder, Configurable, Datasource, DataSourceConfiguration;

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
    setters: [function (_lodash) {
      _ = _lodash;
    }, function (_dataHolder) {
      DataHolder = _dataHolder.DataHolder;
    }, function (_serializationConfigurable) {
      Configurable = _serializationConfigurable.Configurable;
    }],
    execute: function () {
      _export('Datasource', Datasource = function (_Configurable) {
        _inherits(Datasource, _Configurable);

        function Datasource() {
          _classCallCheck(this, Datasource);

          var _this = _possibleConstructorReturn(this, _Configurable.call(this));

          _this._liveRequest = {};
          return _this;
        }

        Datasource.prototype.getData = function getData(query) {
          var _this2 = this;

          if (!this.readService) throw "readService is not configured";

          var cacheKey = this.readService.url + query.cacheKey();

          if (!this.cache) {
            return this._doWebRequest(cacheKey, query);
          } else {
            if (this._liveRequest[cacheKey]) {
              this._liveRequest[cacheKey] = this._liveRequest[cacheKey].then(function (l) {
                return _this2._fromCache(cacheKey);
              }).then(function (data) {
                return _this2._processData(cacheKey, query, data);
              }, function (err) {
                return _this2._doWebRequest(cacheKey, query);
              });
              return this._liveRequest[cacheKey];
            }
            try {
              var data = this._fromCache(cacheKey);
              return Promise.resolve(data).then(function (d) {
                return _this2._processData(cacheKey, query, d);
              });
            } catch (ex) {}
            this._liveRequest[cacheKey] = this._doWebRequest(cacheKey, query);
            return this._liveRequest[cacheKey];
          }
        };

        Datasource.prototype.create = function create(entity) {
          if (!this.createService) throw "createService is not configured";
          return this.createService.create(entity);
        };

        Datasource.prototype.update = function update(id, entity) {
          if (!this.updateService) throw "updateService is not configured";
          return this.updateService.update(id, entity);
        };

        Datasource.prototype.delete = function _delete(id, entity) {
          if (!this.deleteService) throw "deleteService is not configured";
          return this.deleteService.delete(entity);
        };

        Datasource.prototype._doWebRequest = function _doWebRequest(cacheKey, query) {
          var _this3 = this;

          return this.readService.read({
            fields: query.fields,
            filter: query.filter,
            take: query.take,
            skip: query.skip,
            sort: query.sort,
            sortDir: query.sortDir
          }).then(function (d) {
            return _this3._processData(cacheKey, query, d);
          });
        };

        Datasource.prototype._processData = function _processData(cacheKey, query, jsonData) {
          this._liveRequest[cacheKey] = null;
          this._setCache(jsonData, cacheKey);
          var dataHolder = new DataHolder();
          dataHolder.query = query;
          dataHolder.data = _.isArray(jsonData.data) ? jsonData.data : [jsonData.data];
          dataHolder.total = jsonData.total;
          return dataHolder;
        };

        Datasource.prototype._fromCache = function _fromCache(cacheKey) {
          var storage = this.cache.cacheManager.getStorage();
          var d = storage.getItem(cacheKey);
          if (d) return d;
          throw "data not found: " + cacheKey;
        };

        Datasource.prototype._setCache = function _setCache(data, cacheKey) {
          if (this.cache && this.cache.cacheManager) {
            var storage = this.cache.cacheManager.getStorage();
            storage.setItem(cacheKey, data, this.cache.cacheTimeSeconds);
          }
        };

        Datasource.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
          configurationInfo.addValue("name", this.name);
          configurationInfo.addValue("readService", this.readService);
          configurationInfo.addValue("updateService", this.updateService);
          configurationInfo.addValue("createService", this.createService);
          configurationInfo.addValue("deleteService", this.deleteService);
          _Configurable.prototype.persistConfigurationTo.call(this, configurationInfo);
        };

        Datasource.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
          this.name = configurationInfo.getValue("name");
          this.readService = configurationInfo.getValue("readService");
          this.updateService = configurationInfo.getValue("updateService");
          this.createService = configurationInfo.getValue("createService");
          this.deleteService = configurationInfo.getValue("deleteService");
          _Configurable.prototype.restoreConfigurationFrom.call(this, configurationInfo);
        };

        return Datasource;
      }(Configurable));

      _export('Datasource', Datasource);

      _export('DataSourceConfiguration', DataSourceConfiguration = function DataSourceConfiguration() {
        _classCallCheck(this, DataSourceConfiguration);
      });

      _export('DataSourceConfiguration', DataSourceConfiguration);
    }
  };
});