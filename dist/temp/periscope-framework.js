'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwaggerSchemaProvider = exports.StaticSchemaProvider = exports.SchemaProvider = exports.EmptySchemaProvider = exports.AstToJavascriptParser = exports.AstParser = exports.WidgetBehavior = exports.SettingsHandleBehavior = exports.ListenerBehavior = exports.DrillDownBehaviorConfiguration = exports.DrillDownBehavior = exports.DataSourceHandleBehavior = exports.DataSourceChangedBehavior = exports.DataSelectedBehavior = exports.DataFilterHandleBehavior = exports.DataFilterChangedBehavior = exports.DataFieldSelectedBehavior = exports.DataActivatedBehavior = exports.BroadcasterBehavior = exports.WidgetEvent = exports.WidgetEventMessage = exports.Widget = exports.SearchBox = exports.Grid = exports.DetailedView = exports.DataSourceConfigurator = exports.Chart = exports.ReplaceWidgetBehavior = exports.ManageNavigationStackBehavior = exports.DrillDownHandleBehavior = exports.DashboardBehavior = exports.CreateWidgetBehavior = exports.ChangeRouteBehavior = exports.LayoutWidget = exports.DashboardBase = exports.FormatValueConverter = exports.Grammar = exports.GrammarTree = exports.GrammarExpression = exports.StaticJsonDataService = exports.JsonDataService = exports.DataService = exports.Schema = exports.UserStateStorage = exports.Storage = exports.StateUrlParser = exports.StateDiscriminator = exports.PeriscopeObjectConfigurator = exports.DashboardSerializer = exports.ConfigurationInfo = exports.Configurable = exports.NavigationHistory = exports.HistoryStep = exports.BehaviorType = exports.PeriscopeFactory = exports.Factory = exports.DatasourceManager = exports.DashboardManager = exports.DefaultHttpClient = exports.UrlHelper = exports.StringHelper = exports.GuidHelper = exports.DataHelper = exports.ExpressionParser = exports.IntellisenceManager = exports.Query = exports.QueryExpressionEvaluator = exports.DataSourceConfiguration = exports.Datasource = exports.DataHolder = exports.DashboardConfiguration = exports.MemoryCacheStorage = exports.CacheStorage = exports.CacheManager = exports.PermissionsManager = exports.PermissionsManagerConfiguration = exports.PermissionsCustomAttribute = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _dec2, _class8, _class10, _dec3, _class11, _dec4, _class13, _dec5, _dec6, _class15, _dec7, _dec8, _class17, _dec9, _desc, _value, _class19, _dec10, _class30, _dec11, _class31, _dec12, _class32, _dec13, _class33, _dec14, _class35, _dec15, _class36, _dec16, _class37, _dec17, _class40;

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _pegjs = require('pegjs');

var peg = _interopRequireWildcard(_pegjs);

var _jsBase = require('js-base64');

var base64 = _interopRequireWildcard(_jsBase);

var _numeral = require('numeral');

var _numeral2 = _interopRequireDefault(_numeral);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _aureliaFramework = require('aurelia-framework');

var _aureliaFetchClient = require('aurelia-fetch-client');

var _aureliaRouter = require('aurelia-router');

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaEventAggregator = require('aurelia-event-aggregator');

var _swaggerClient = require('swagger-client');

var _swaggerClient2 = _interopRequireDefault(_swaggerClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PermissionsCustomAttribute = exports.PermissionsCustomAttribute = (_dec = (0, _aureliaFramework.inject)(Element, PermissionsManager), _dec(_class = function () {
  function PermissionsCustomAttribute(element, permissionsManager) {
    _classCallCheck(this, PermissionsCustomAttribute);

    this.element = element;
    this.permissionsManager = permissionsManager;
  }

  PermissionsCustomAttribute.prototype.bind = function bind() {
    var _this = this;

    if (!this.value) return;
    var rGroup = "";
    var permissions = [];
    if (_.isString(this.value)) {
      rGroup = this.element.au.permissions.scope.bindingContext.resourceGroup;
      permissions = this.value.split(",");
    } else if (_.isPlainObject(this.value)) {
      rGroup = this.value.resourceGroup;
      permissions = this.value.permissions.split(",");
    }

    this.element.hidden = true;
    this.element.disabled = true;

    var _loop = function _loop() {
      if (_isArray) {
        if (_i >= _iterator.length) return 'break';
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) return 'break';
        _ref = _i.value;
      }

      var p = _ref;

      _this.permissionsManager.hasPermisson(p, rGroup).then(function (result) {

        if (result) {
          if (p === 'read') _this.element.hidden = false;
          if (p === 'write') _this.element.disabled = false;
        }
      }, function (err) {});
    };

    for (var _iterator = permissions, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      var _ret = _loop();

      if (_ret === 'break') break;
    }
  };

  return PermissionsCustomAttribute;
}()) || _class);

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

var PermissionsManager = exports.PermissionsManager = function () {
  function PermissionsManager() {
    _classCallCheck(this, PermissionsManager);

    this.isConfigured = false;
  }

  PermissionsManager.prototype.configure = function configure(config) {
    var normalizedConfig = new PermissionsManagerConfiguration();
    config(normalizedConfig);
    this.permissionsDataSource = normalizedConfig.dataSource;
    this.isConfigured = true;
  };

  PermissionsManager.prototype.hasPermisson = function hasPermisson(permission, resourceGroup) {
    if (!this.isConfigured) {
      return new Promise(function (resolve, reject) {
        resolve(true);
      });
    }

    return this._getData().then(function (permissions) {
      var normalizedPermissions = _.map(permissions, function (p) {
        var a = p.toLowerCase().split("-");
        if (a.length == 2) return { permission: a[0], group: a[1] };
      });
      if (_.filter(normalizedPermissions, { 'permission': permission, 'group': resourceGroup }).length > 0) return true;
      return false;
    }, function (err) {
      return false;
    });
  };

  PermissionsManager.prototype._getData = function _getData() {
    var q = new Query();
    if (this._query) q.filter = this._query;
    return this.permissionsDataSource.getData(q).then(function (d) {
      return d.data;
    });
  };

  return PermissionsManager;
}();

var CacheManager = exports.CacheManager = function () {
  function CacheManager(storage) {
    _classCallCheck(this, CacheManager);

    this._cacheStorage = storage;
    this._cleanInterval = 5000;
  }

  CacheManager.prototype.startCleaner = function startCleaner() {
    var _this2 = this;

    if (!this.cleaner) {
      (function () {
        var self = _this2;
        _this2.cleaner = window.setInterval(function () {
          self._cacheStorage.removeExpired();
        }, _this2._cleanInterval);
      })();
    }
  };

  CacheManager.prototype.stopCleaner = function stopCleaner() {
    if (this.cleaner) window.clearInterval(this.cleaner);
  };

  CacheManager.prototype.getStorage = function getStorage() {
    return this._cacheStorage;
  };

  _createClass(CacheManager, [{
    key: 'cleanInterval',
    get: function get() {
      return this._cleanInterval;
    }
  }]);

  return CacheManager;
}();

var CacheStorage = exports.CacheStorage = function () {
  function CacheStorage() {
    _classCallCheck(this, CacheStorage);
  }

  CacheStorage.prototype.setItem = function setItem(key, value, expiration) {};

  CacheStorage.prototype.getItem = function getItem(key) {};

  CacheStorage.prototype.removeItem = function removeItem(key) {};

  CacheStorage.prototype.removeExpired = function removeExpired() {};

  return CacheStorage;
}();

var MemoryCacheStorage = exports.MemoryCacheStorage = function (_CacheStorage) {
  _inherits(MemoryCacheStorage, _CacheStorage);

  function MemoryCacheStorage() {
    _classCallCheck(this, MemoryCacheStorage);

    var _this3 = _possibleConstructorReturn(this, _CacheStorage.call(this));

    _this3._cache = {};
    return _this3;
  }

  MemoryCacheStorage.prototype.setItem = function setItem(key, value, seconds) {
    var t = new Date();
    t.setSeconds(t.getSeconds() + seconds);
    var v = _.assign({}, value);
    this._cache[key] = {
      value: v,
      exp: t
    };
  };

  MemoryCacheStorage.prototype.getItem = function getItem(key) {
    if (this._cache[key] && this._cache[key].exp >= Date.now()) return this._cache[key].value;
    return null;
  };

  MemoryCacheStorage.prototype.removeItem = function removeItem(key) {
    delete this._cache[key];
  };

  MemoryCacheStorage.prototype.removeExpired = function removeExpired() {
    var self = this;
    _.forOwn(self._cache, function (v, k) {
      if (self._cache[k].exp < Date.now()) {
        self.removeItem(k);
      }
    });
  };

  return MemoryCacheStorage;
}(CacheStorage);

var DashboardConfiguration = exports.DashboardConfiguration = function () {
  function DashboardConfiguration() {
    _classCallCheck(this, DashboardConfiguration);
  }

  DashboardConfiguration.prototype.invoke = function invoke() {};

  return DashboardConfiguration;
}();

var DataHolder = exports.DataHolder = function DataHolder() {
  _classCallCheck(this, DataHolder);
};

var Datasource = exports.Datasource = function (_Configurable) {
  _inherits(Datasource, _Configurable);

  function Datasource() {
    _classCallCheck(this, Datasource);

    var _this4 = _possibleConstructorReturn(this, _Configurable.call(this));

    _this4._liveRequest = {};
    return _this4;
  }

  Datasource.prototype.getData = function getData(query) {
    var _this5 = this;

    if (!this.readService) throw "readService is not configured";

    var cacheKey = this.readService.url + query.cacheKey();

    if (!this.cache) {
      return this._doWebRequest(cacheKey, query);
    } else {
      if (this._liveRequest[cacheKey]) {
        this._liveRequest[cacheKey] = this._liveRequest[cacheKey].then(function (l) {
          return _this5._fromCache(cacheKey);
        }).then(function (data) {
          return _this5._processData(cacheKey, query, data);
        }, function (err) {
          return _this5._doWebRequest(cacheKey, query);
        });
        return this._liveRequest[cacheKey];
      }
      try {
        var data = this._fromCache(cacheKey);
        return Promise.resolve(data).then(function (d) {
          return _this5._processData(cacheKey, query, d);
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
    var _this6 = this;

    return this.readService.read({
      fields: query.fields,
      filter: query.filter,
      take: query.take,
      skip: query.skip,
      sort: query.sort,
      sortDir: query.sortDir
    }).then(function (d) {
      return _this6._processData(cacheKey, query, d);
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
}(Configurable);

var DataSourceConfiguration = exports.DataSourceConfiguration = function DataSourceConfiguration() {
  _classCallCheck(this, DataSourceConfiguration);
};

String.prototype.in = function (array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == this) return true;
  }
  return false;
};

var QueryExpressionEvaluator = exports.QueryExpressionEvaluator = function () {
  function QueryExpressionEvaluator() {
    _classCallCheck(this, QueryExpressionEvaluator);
  }

  QueryExpressionEvaluator.prototype.evaluate = function evaluate(data, searchExpression) {
    var res = [];
    if (searchExpression != "") {
      for (var _iterator2 = data, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var record = _ref2;

        if (eval(searchExpression)) {
          res.push(record);
        }
      }
    } else res = data;
    return res;
  };

  return QueryExpressionEvaluator;
}();

var Query = exports.Query = function () {
  function Query() {
    _classCallCheck(this, Query);
  }

  Query.prototype.cacheKey = function cacheKey() {
    return Math.abs(StringHelper.hashCode((this.filter ? JSON.stringify(this.filter) : "") + (this.fields ? this.fields.join("") : "") + (this.sort ? this.sort : "") + (this.sortDir ? this.sortDir : "") + (this.take ? this.take : "0") + (this.skip ? this.skip : "0")));
  };

  return Query;
}();

var IntellisenceManager = exports.IntellisenceManager = function () {
  function IntellisenceManager(parser, dataSource, availableFields) {
    _classCallCheck(this, IntellisenceManager);

    this.dataSource = dataSource;
    this.fields = availableFields;
    this.parser = parser;
  }

  IntellisenceManager.prototype.populate = function populate(searchStr, lastWord) {
    var parserError = this._getParserError(searchStr);
    return this._getIntellisenseData(searchStr, lastWord, parserError);
  };

  IntellisenceManager.prototype._getParserError = function _getParserError(searchStr) {
    var result = null;
    if (searchStr != "") {
      try {
        this.parser.parse(searchStr);
        try {
          this.parser.parse(searchStr + "^");
        } catch (ex2) {
          result = ex2;
        }
      } catch (ex) {
        result = ex;
      }
    }
    return result;
  };

  IntellisenceManager.prototype._getLastFieldName = function _getLastFieldName(searchStr, fieldsArray, index) {
    var tmpArr = searchStr.substr(0, index).split(" ");

    var _loop2 = function _loop2(i) {
      var j = fieldsArray.findIndex(function (x) {
        return x.toLowerCase() == tmpArr[i].trim().toLowerCase();
      });
      if (j >= 0) return {
          v: fieldsArray[j]
        };
    };

    for (var i = tmpArr.length - 1; i >= 0; i--) {
      var _ret3 = _loop2(i);

      if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
    }
    return "";
  };

  IntellisenceManager.prototype._interpreteParserError = function _interpreteParserError(ex) {
    if (Object.prototype.toString.call(ex.expected) == "[object Array]") {
      for (var _iterator3 = ex.expected, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref3 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref3 = _i3.value;
        }

        var desc = _ref3;

        if (desc.type == "other" || desc.type == "end") {
          return desc.description;
        }
      }
    }
    return "";
  };

  IntellisenceManager.prototype._getIntellisenseData = function _getIntellisenseData(searchStr, lastWord, pegException) {
    var _this7 = this;

    var type = '';
    var result = [];
    var lastFldName = '';

    if (!pegException) return new Promise(function (resolve, reject) {
      resolve([]);
    });

    var tokenName = this._interpreteParserError(pegException);
    return new Promise(function (resolve, reject) {
      switch (tokenName) {
        case "STRING_FIELD_NAME":
        case "NUMERIC_FIELD_NAME":
        case "DATE_FIELD_NAME":
          var filteredFields = lastWord ? _.filter(_this7.fields, function (f) {
            return f.toLowerCase().startsWith(lastWord.toLowerCase());
          }) : _this7.fields;
          resolve(_this7._normalizeData("field", filteredFields.sort()));
          break;
        case "STRING_OPERATOR_EQUAL":
        case "STRING_OPERATOR_IN":
          resolve(_this7._normalizeData("operator", _this7._getStringComparisonOperatorsArray()));
          break;
        case "STRING_VALUE":
        case "STRING_PATTERN":
          lastFldName = _this7._getLastFieldName(searchStr, _this7.fields, pegException.column);
          _this7._getFieldValuesArray(lastFldName, lastWord).then(function (data) {
            resolve(_this7._normalizeData("string", data));
          });
          break;
        case "STRING_VALUES_ARRAY":
          lastFldName = _this7._getLastFieldName(searchStr, _this7.fields, pegException.column);
          _this7._getFieldValuesArray(lastFldName, lastWord).then(function (data) {
            resolve(_this7._normalizeData("array_string", data));
          });
          break;
          resolve(_this7._normalizeData("array_string", []));
          break;
        case "OPERATOR":
          resolve(_this7._normalizeData("operator", _this7._getComparisonOperatorsArray()));
          break;
        case "LOGIC_OPERATOR":
        case "end of input":
          resolve(_this7._normalizeData("operator", _this7._getLogicalOperatorsArray()));
          break;
        default:
          resolve([]);
          break;
      }
    });
  };

  IntellisenceManager.prototype._getFieldValuesArray = function _getFieldValuesArray(fieldName, lastWord) {
    var query = new Query();
    query.take = 100;
    query.skip = 0;
    if (lastWord) query.filter = this.parser.parse(fieldName + " = '" + lastWord + "%'");
    query.fields = [fieldName];
    return this.dataSource.getData(query).then(function (dH) {
      var result = _.map(dH.data, fieldName);
      return _.uniq(result).sort();
    });
  };

  IntellisenceManager.prototype._getStringComparisonOperatorsArray = function _getStringComparisonOperatorsArray() {
    return ["=", "in"];
  };

  IntellisenceManager.prototype._getLogicalOperatorsArray = function _getLogicalOperatorsArray() {
    return ["and", "or"];
  };

  IntellisenceManager.prototype._getComparisonOperatorsArray = function _getComparisonOperatorsArray() {
    return ["!=", "=", ">", "<", ">=", "<="];
  };

  IntellisenceManager.prototype._normalizeData = function _normalizeData(type, dataArray) {
    return _.map(dataArray, function (d) {
      return { type: type, value: d };
    });
  };

  return IntellisenceManager;
}();

var ExpressionParser = exports.ExpressionParser = function () {
  function ExpressionParser(grammarText) {
    _classCallCheck(this, ExpressionParser);

    this.parser = peg.buildParser(grammarText);
  }

  ExpressionParser.prototype.parse = function parse(searchString) {
    return this.parser.parse(searchString);
  };

  ExpressionParser.prototype.validate = function validate(searchString) {
    try {
      this.parser.parse(searchString);
      return true;
    } catch (ex) {
      return false;
    }
  };

  return ExpressionParser;
}();

var DataHelper = exports.DataHelper = function () {
  function DataHelper() {
    _classCallCheck(this, DataHelper);
  }

  DataHelper.getNumericFields = function getNumericFields(fields) {
    return _.filter(fields, function (f) {
      if (f.type == "number" || f.type == "currency") return f;
    });
  };

  DataHelper.getStringFields = function getStringFields(fields) {
    return _.filter(fields, { type: "string" });
  };

  DataHelper.getDateFields = function getDateFields(fields) {
    return _.filter(fields, { type: "date" });
  };

  DataHelper.getFieldType = function getFieldType(collection, fieldName) {
    var blankCount = 0;
    var result;
    for (var i = 0; i < collection.length; i++) {
      var val = collection[i][fieldName];
      if (val != undefined) {
        if (DataHelper.isString(val)) result = "string";else if (DataHelper.isNumber(val)) {
          if (DataHelper.isCurrency(collection, fieldName)) result = "currency";else result = "number";
        } else if (DataHelper.isDate(val)) result = "date";
        return result;
      } else {
        blankCount++;
      }
      if (blankCount > 300) {
        return undefined;
      }
    }
  };

  DataHelper.deserializeDates = function deserializeDates(jsonArray) {
    for (var r = 0; r < jsonArray.length; r++) {
      var jsonObj = jsonArray[r];
      for (var field in jsonObj) {
        if (jsonObj.hasOwnProperty(field)) {
          var value = jsonObj[field];
          if (value && typeof value == 'string' && value.indexOf('/Date') === 0) {
            jsonObj[field] = new Date(parseInt(value.substr(6)));
          }
        }
      }
    }
    return jsonArray;
  };

  DataHelper.isCurrency = function isCurrency(collection, fieldName) {
    if (collection.length === 0 || !fieldName) return false;
    var largeValues = _.filter(collection, function (x) {
      return Math.abs(x[fieldName]) >= 1000;
    }).length;
    if (largeValues / collection.length > 0.4) return true;
    return false;
  };

  DataHelper.isDate = function isDate(value) {
    return new Date(value) !== "Invalid Date" && !isNaN(new Date(value));
  };

  DataHelper.isString = function isString(value) {
    return typeof value === 'string' || value instanceof String;
  };

  DataHelper.isNumber = function isNumber(value) {
    return typeof value === 'number';
  };

  return DataHelper;
}();

var GuidHelper = exports.GuidHelper = function () {
  function GuidHelper() {
    _classCallCheck(this, GuidHelper);
  }

  GuidHelper.guid = function guid() {
    return GuidHelper._s4() + GuidHelper._s4() + '-' + GuidHelper._s4() + '-' + GuidHelper._s4() + '-' + GuidHelper._s4() + '-' + GuidHelper._s4() + GuidHelper._s4() + GuidHelper._s4();
  };

  GuidHelper._s4 = function _s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  };

  return GuidHelper;
}();

var StringHelper = exports.StringHelper = function () {
  function StringHelper() {
    _classCallCheck(this, StringHelper);
  }

  StringHelper.compare = function compare(string1, string2) {
    return string1.toUpperCase() === string2.toUpperCase();
  };

  StringHelper.replaceAll = function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
  };

  StringHelper.hashCode = function hashCode(str) {
    var hash = 0;
    if (str.length == 0) return hash;
    for (var i = 0; i < str.length; i++) {
      var char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash;
  };

  StringHelper.getEditDistance = function getEditDistance(a, b) {
    if (a.length == 0) return b.length;
    if (b.length == 0) return a.length;

    var matrix = [];

    var i;
    for (i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    var j;
    for (j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (i = 1; i <= b.length; i++) {
      for (j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) == a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
        }
      }
    }

    return matrix[b.length][a.length];
  };

  StringHelper.getPreviousWord = function getPreviousWord(str, position, separators) {
    var str = str.substring(0, position);
    var lastSeparatorIndex = 0;
    for (var i = 0; i < separators.length; i++) {
      if (str.lastIndexOf(separators[i]) > lastSeparatorIndex) lastSeparatorIndex = str.lastIndexOf(separators[i]);
    }
    if (lastSeparatorIndex == str.length) lastSeparatorIndex = 0;
    if (lastSeparatorIndex > 0 && lastSeparatorIndex < str.length) lastSeparatorIndex++;

    return str.substring(lastSeparatorIndex, str.length);
  };

  StringHelper.getNextWord = function getNextWord(str, position, separators) {
    var str = str.substring(position, str.length);
    var firstSeparatorIndex = str.length;
    for (var i = 0; i < separators.length; i++) {
      if (str.indexOf(separators[i]) < firstSeparatorIndex && str.indexOf(separators[i]) >= 0) firstSeparatorIndex = str.indexOf(separators[i]);
    }
    return str.substring(0, firstSeparatorIndex);
  };

  return StringHelper;
}();

var UrlHelper = exports.UrlHelper = function () {
  function UrlHelper() {
    _classCallCheck(this, UrlHelper);
  }

  UrlHelper.getAbsoluteBaseUrl = function getAbsoluteBaseUrl() {
    return window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
  };

  UrlHelper.objectToQuery = function objectToQuery(ar) {
    return encodeURIComponent(JSON.stringify(ar));
  };

  UrlHelper.queryToObject = function queryToObject(queryParam) {
    return JSON.parse(decodeURIComponent(queryParam));
  };

  UrlHelper.getParameterByName = function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  };

  return UrlHelper;
}();

var DefaultHttpClient = exports.DefaultHttpClient = function (_HttpClient) {
  _inherits(DefaultHttpClient, _HttpClient);

  function DefaultHttpClient() {
    _classCallCheck(this, DefaultHttpClient);

    var _this8 = _possibleConstructorReturn(this, _HttpClient.call(this));

    _this8.configure(function (config) {
      config.useStandardConfiguration().withDefaults({
        headers: {
          'Accept': 'application/json'
        }
      });
    });
    return _this8;
  }

  return DefaultHttpClient;
}(_aureliaFetchClient.HttpClient);

var DashboardManager = exports.DashboardManager = (_dec2 = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec2(_class8 = function () {
  function DashboardManager(router) {
    _classCallCheck(this, DashboardManager);

    this.dashboards = [];

    this._router = router;
  }

  DashboardManager.prototype.configure = function configure(configuration) {
    this.dashboardRouteName = configuration.dashboardRouteName;
  };

  DashboardManager.prototype.find = function find(dashboardName) {
    return _.find(this.dashboards, { name: dashboardName });
  };

  DashboardManager.prototype.createDashboard = function createDashboard(type, dashboardConfiguration) {
    var dashboard = new type();
    dashboard.configure(dashboardConfiguration);
    if (this.dashboardRouteName) {
      dashboard.route = UrlHelper.getAbsoluteBaseUrl() + "/" + this._router.generate(this.dashboardRouteName, { dashboard: dashboard.name });
    }

    this.dashboards.push(dashboard);
    return dashboard;
  };

  return DashboardManager;
}()) || _class8);

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
}();

var Factory = exports.Factory = (0, _aureliaFramework.resolver)(_class10 = function () {
  function Factory(Type) {
    _classCallCheck(this, Factory);

    this.Type = Type;
  }

  Factory.prototype.get = function get(container) {
    var _this9 = this;

    return function () {
      for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }

      return container.invoke(_this9.Type, rest);
    };
  };

  Factory.of = function of(Type) {
    return new Factory(Type);
  };

  return Factory;
}()) || _class10;

var PeriscopeFactory = exports.PeriscopeFactory = function () {
  function PeriscopeFactory() {
    _classCallCheck(this, PeriscopeFactory);

    this.references = [];
    this.container = _aureliaDependencyInjection.Container.instance.createChild();
  }

  PeriscopeFactory.prototype.addReference = function addReference(type) {
    this.references.push(type);
  };

  PeriscopeFactory.prototype.createObject = function createObject(typeName) {
    var t = _.find(this.references, function (r) {
      return r.name === typeName;
    });
    if (t) {
      var f = this.container.get(Factory.of(t));
      return f();
    }

    throw "reference to object " + typeName + " not found";
  };

  return PeriscopeFactory;
}();

var BehaviorType = exports.BehaviorType = function () {
  function BehaviorType() {
    _classCallCheck(this, BehaviorType);
  }

  _createClass(BehaviorType, null, [{
    key: 'listener',
    get: function get() {
      return "listener";
    }
  }, {
    key: 'broadcaster',
    get: function get() {
      return "broadcaster";
    }
  }]);

  return BehaviorType;
}();

var HistoryStep = exports.HistoryStep = (_dec3 = (0, _aureliaFramework.inject)(NavigationHistory, DashboardManager), _dec3(_class11 = function () {
  function HistoryStep(navigationHistory, dashboardManager) {
    _classCallCheck(this, HistoryStep);

    this._navigationHistory = navigationHistory;
    this._dashboardManager = dashboardManager;
  }

  HistoryStep.prototype.run = function run(routingContext, next) {
    var _this10 = this;

    if (routingContext.getAllInstructions().some(function (i) {
      return i.config.name === "dashboard";
    })) {
      var _dashboard = this._dashboardManager.find(routingContext.params.dashboard);
      if (_dashboard) {
        (function () {
          if (_this10.currentRouteItem) {
            (function () {
              var currentDashboard = _this10._dashboardManager.find(_this10.currentRouteItem.dashboardName);
              var currentWidgetsState = StateDiscriminator.discriminate(currentDashboard.getState());

              var url = currentDashboard.getRoute();

              if (_.filter(_this10._navigationHistory.items, function (i) {
                return StringHelper.compare(i.url, url);
              }).length === 0) {
                _this10._navigationHistory.add(url, _this10.currentRouteItem.title, currentDashboard.name, currentWidgetsState, new Date());
              } else if (!StringHelper.compare(url, _this10.currentRouteItem.route)) {
                _this10._navigationHistory.update(url, new Date());
              }
            })();
          }

          var newUrl = window.location.href;

          var allWidgetsState = StateDiscriminator.discriminate(_dashboard.getState());
          var routeWidgetsState = StateUrlParser.queryToState(newUrl);
          _.forEach(allWidgetsState, function (as) {
            var rs = _.find(routeWidgetsState, { "name": as.name });
            if (rs) as.value = rs.value;else as.value = null;
          });

          _dashboard.setState(allWidgetsState);

          if (_.filter(_this10._navigationHistory.items, function (i) {
            return StringHelper.compare(i.url, newUrl);
          }).length === 0) {
            _this10._navigationHistory.add(newUrl, _dashboard.title, _dashboard.name, _dashboard.getState(), new Date());
          }

          _this10.currentRouteItem = {
            dashboardName: _dashboard.name,
            title: _dashboard.title,
            route: newUrl
          };
        })();
      }
    } else this.currentRouteItem = null;
    return next();
  };

  _createClass(HistoryStep, [{
    key: 'currentRouteItem',
    get: function get() {
      return this._currentRoute;
    },
    set: function set(value) {
      this._currentRoute = value;
    }
  }]);

  return HistoryStep;
}()) || _class11);

var NavigationHistory = exports.NavigationHistory = function () {
  function NavigationHistory() {
    _classCallCheck(this, NavigationHistory);

    this._history = [];
  }

  NavigationHistory.prototype.add = function add(url, title, dashboard, state, dateTime) {
    this._history.push({ url: url, title: title, dashboard: dashboard, state: state, dateTime: dateTime });
  };

  NavigationHistory.prototype.update = function update(url, dateTime) {
    for (var _iterator4 = this._history, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
      var _ref4;

      if (_isArray4) {
        if (_i4 >= _iterator4.length) break;
        _ref4 = _iterator4[_i4++];
      } else {
        _i4 = _iterator4.next();
        if (_i4.done) break;
        _ref4 = _i4.value;
      }

      var h = _ref4;

      if (h.url === url) {
        h.dateTime = dateTime;
        break;
      }
    }
  };

  NavigationHistory.prototype.delete = function _delete(url) {
    for (var _iterator5 = this._history, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
      var _ref5;

      if (_isArray5) {
        if (_i5 >= _iterator5.length) break;
        _ref5 = _iterator5[_i5++];
      } else {
        _i5 = _iterator5.next();
        if (_i5.done) break;
        _ref5 = _i5.value;
      }

      var i = _ref5;

      if (i.url === url) {
        this._history.splice(i, 1);
        break;
      }
    }
  };

  NavigationHistory.prototype.deleteAll = function deleteAll() {
    this._history = [];
  };

  NavigationHistory.prototype.trimRight = function trimRight(url) {
    for (var i = this._history.length - 1; i >= 0; i--) {
      if (this._history[i].url === url) {
        this._history.splice(i + 1);
        return;
      }
    }
  };

  NavigationHistory.prototype.exists = function exists(url) {
    for (var _iterator6 = this._history, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
      var _ref6;

      if (_isArray6) {
        if (_i6 >= _iterator6.length) break;
        _ref6 = _iterator6[_i6++];
      } else {
        _i6 = _iterator6.next();
        if (_i6.done) break;
        _ref6 = _i6.value;
      }

      var i = _ref6;

      if (i.route === url) return true;
    }
    return false;
  };

  _createClass(NavigationHistory, [{
    key: 'items',
    get: function get() {
      return this._history;
    }
  }]);

  return NavigationHistory;
}();

var Configurable = exports.Configurable = function () {
  function Configurable() {
    _classCallCheck(this, Configurable);
  }

  Configurable.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {};

  Configurable.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {};

  return Configurable;
}();

var ConfigurationInfo = exports.ConfigurationInfo = function () {
  ConfigurationInfo.createInfo = function createInfo(configurator, object, objectConfig) {
    return new ConfigurationInfo(configurator, object.constructor.name, objectConfig);
  };

  function ConfigurationInfo(configurator, objectType, objectConfig) {
    _classCallCheck(this, ConfigurationInfo);

    this.configurator = configurator;
    this.type = objectType;
    this.config = objectConfig ? objectConfig : {};
  }

  ConfigurationInfo.prototype.addValue = function addValue(key, value) {
    var _this11 = this;

    if (value) {
      if (_.isArray(value)) {
        (function () {
          var aVal = [];
          _.forEach(value, function (v) {
            aVal.push(_this11._getConfig(v));
          });
          _this11.config[key] = aVal;
        })();
      } else this.config[key] = this._getConfig(value);
    }
  };

  ConfigurationInfo.prototype.addScript = function addScript(key, value) {
    if (value) this.config[key] = value.toString();
  };

  ConfigurationInfo.prototype.getValue = function getValue(key) {
    var _this12 = this;

    if (this.config[key]) {
      if (_.isArray(this.config[key])) {
        var _ret7 = function () {
          var aVal = [];
          _.forEach(_this12.config[key], function (v) {
            aVal.push(_this12._getObject(v));
          });
          return {
            v: aVal
          };
        }();

        if ((typeof _ret7 === 'undefined' ? 'undefined' : _typeof(_ret7)) === "object") return _ret7.v;
      } else {
        return this._getObject(this.config[key]);
      }
    }
    return null;
  };

  ConfigurationInfo.prototype.getScript = function getScript(key) {
    if (this.config[key]) {
      return eval("(" + this.config[key] + ")");
    }
    return null;
  };

  ConfigurationInfo.prototype.getInt = function getInt(key) {
    if (this.config[key]) {
      return parseInt(this.config[key]);
    }
    return null;
  };

  ConfigurationInfo.prototype.getBool = function getBool(key) {
    if (this.config[key]) {
      if (_.isBoolean(this.config[key])) return this.config[key];
      return this.config[key] === "true";
    }
    return null;
  };

  ConfigurationInfo.prototype._getConfig = function _getConfig(object) {
    if (this.configurator.isConfigurable(object)) return this.configurator.getConfiguration(object);else return object;
  };

  ConfigurationInfo.prototype._getObject = function _getObject(config) {
    if (config.type && config.config) {
      return this.configurator.getObject(config);
    }
    return config;
  };

  return ConfigurationInfo;
}();

var DashboardSerializer = exports.DashboardSerializer = function () {
  function DashboardSerializer(configurator) {
    _classCallCheck(this, DashboardSerializer);

    this.configurator = configurator;
  }

  DashboardSerializer.prototype.serialize = function serialize(dashoardsList) {
    var _this13 = this;

    var result = [];
    _.forEach(dashoardsList, function (d) {
      result.push(_this13.configurator.getConfiguration(d));
    });
    return result;
  };

  DashboardSerializer.prototype.deserialize = function deserialize(dashoardsConfiguration) {
    var _this14 = this;

    this.dashoardsConfigurationState = dashoardsConfiguration;
    var result = [];
    _.forEach(dashoardsConfiguration, function (d) {
      result.push(_this14.configurator.getObject(d));
    });
    return result;
  };

  return DashboardSerializer;
}();

var PeriscopeObjectConfigurator = exports.PeriscopeObjectConfigurator = function () {
  function PeriscopeObjectConfigurator(factory) {
    _classCallCheck(this, PeriscopeObjectConfigurator);

    this.factory = factory;
  }

  PeriscopeObjectConfigurator.prototype.isConfigurable = function isConfigurable(object) {
    if (!_.isObject(object) || !object.persistConfigurationTo) return false;
    return true;
  };

  PeriscopeObjectConfigurator.prototype.getConfiguration = function getConfiguration(object) {
    if (!this.isConfigurable(object)) throw "configurable object must implement persistConfigurationTo method";
    var info = ConfigurationInfo.createInfo(this, object);
    object.persistConfigurationTo(info);
    return {
      type: info.type,
      config: info.config
    };
  };

  PeriscopeObjectConfigurator.prototype.getObject = function getObject(objectConfig) {
    var obj = this.factory.createObject(objectConfig.type);
    var info = ConfigurationInfo.createInfo(this, obj);
    info.config = objectConfig.config;
    obj.restoreConfigurationFrom(info);
    return obj;
  };

  return PeriscopeObjectConfigurator;
}();

var StateDiscriminator = exports.StateDiscriminator = function () {
  function StateDiscriminator() {
    _classCallCheck(this, StateDiscriminator);
  }

  StateDiscriminator.discriminate = function discriminate(widgetStates) {
    var result = [];
    for (var _iterator7 = widgetStates, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
      var _ref7;

      if (_isArray7) {
        if (_i7 >= _iterator7.length) break;
        _ref7 = _iterator7[_i7++];
      } else {
        _i7 = _iterator7.next();
        if (_i7.done) break;
        _ref7 = _i7.value;
      }

      var ws = _ref7;

      if (ws.stateType === "searchBoxState") result.push(ws);
    }
    return result;
  };

  return StateDiscriminator;
}();

var StateUrlParser = exports.StateUrlParser = function () {
  function StateUrlParser() {
    _classCallCheck(this, StateUrlParser);
  }

  StateUrlParser.stateToQuery = function stateToQuery(widgetStates) {
    var params = [];
    for (var _iterator8 = widgetStates, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
      var _ref8;

      if (_isArray8) {
        if (_i8 >= _iterator8.length) break;
        _ref8 = _iterator8[_i8++];
      } else {
        _i8 = _iterator8.next();
        if (_i8.done) break;
        _ref8 = _i8.value;
      }

      var widgetState = _ref8;

      if (widgetState.value) params.push({ "sn": widgetState.name, "sv": widgetState.value });
    }
    return params.length > 0 ? "?q=" + Base64.encode(UrlHelper.objectToQuery(params)) : "";
  };

  StateUrlParser.queryToState = function queryToState(url) {
    var result = [];
    var q = UrlHelper.getParameterByName("q", url);
    if (q) {
      var widgetStates = UrlHelper.queryToObject(Base64.decode(q));
      for (var _iterator9 = widgetStates, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
        var _ref9;

        if (_isArray9) {
          if (_i9 >= _iterator9.length) break;
          _ref9 = _iterator9[_i9++];
        } else {
          _i9 = _iterator9.next();
          if (_i9.done) break;
          _ref9 = _i9.value;
        }

        var ws = _ref9;

        result.push({ "name": ws.sn, "value": ws.sv });
      }
    }
    return result;
  };

  return StateUrlParser;
}();

var Storage = exports.Storage = function () {
  function Storage() {
    _classCallCheck(this, Storage);

    this._provider = this._initProvider('Warning: Local Storage is disabled or unavailable.');
  }

  Storage.prototype.set = function set(key, value) {
    if (this._provider) return this._provider.setItem(key, JSON.stringify(value));
    return undefined;
  };

  Storage.prototype.get = function get(key) {

    if (this._provider) return JSON.parse(this._provider.getItem(key));
    return undefined;
  };

  Storage.prototype.clear = function clear() {
    if (this._provider) this._provider.clear();
  };

  Storage.prototype._initProvider = function _initProvider(warning) {
    if ('sessionStorage' in window && window['sessionStorage'] !== null) {
      return sessionStorage;
    } else {
      console.warn(warning);
      return undefined;
    }
  };

  return Storage;
}();

var STORAGE_KEY = "prcpfwk23875hrw28esgfds";

var UserStateStorage = exports.UserStateStorage = (_dec4 = (0, _aureliaFramework.inject)(Storage), _dec4(_class13 = function () {
  function UserStateStorage(storage) {
    _classCallCheck(this, UserStateStorage);

    this._storage = storage;
    this._key = STORAGE_KEY;
  }

  UserStateStorage.prototype.getAll = function getAll(namespace) {
    var data = this._storage.get(this._key);
    if (data) {
      if (!namespace) return data;
      namespace = this._createFullNamespace(namespace);
      return _.filter(data, function (x) {
        return x.key.indexOf(namespace) === 0;
      });
    }
    return [];
  };

  UserStateStorage.prototype.get = function get(key) {
    var o = this._getObj(key);
    if (o) return o.value;
    return undefined;
  };

  UserStateStorage.prototype.set = function set(key, value) {
    var all = this.getAll();
    var oldState = { key: key };
    var newState = { key: key, value: value };
    var item = _.find(all, { 'key': key });
    if (item) {
      oldState.value = item.value;
      item.value = value;
    } else all.push({ key: key, value: value });
    this._storage.set(this._key, all);
  };

  UserStateStorage.prototype.remove = function remove(key) {
    var all = this.getAll();
    _.remove(all, function (i) {
      return i.key == key;
    });
    this._storage.set(this._key, all);
  };

  UserStateStorage.prototype.clearAll = function clearAll() {
    this._storage.clear();
  };

  UserStateStorage.prototype.createKey = function createKey(namespace, key) {
    return this._createFullNamespace(namespace) + key;
  };

  UserStateStorage.prototype._createFullNamespace = function _createFullNamespace(namespace) {
    return namespace + ":";
  };

  UserStateStorage.prototype._getObj = function _getObj(k) {
    var data = this.getAll();
    var obj = _.find(data, { 'key': k });
    return obj;
  };

  return UserStateStorage;
}()) || _class13);

var Schema = exports.Schema = function Schema() {
  _classCallCheck(this, Schema);

  this.fields = [];
  this.parameters = [];
};

var DataService = exports.DataService = function (_Configurable2) {
  _inherits(DataService, _Configurable2);

  function DataService(httpClient) {
    _classCallCheck(this, DataService);

    var _this15 = _possibleConstructorReturn(this, _Configurable2.call(this));

    _this15.httpClient = httpClient;
    _this15.url = "";
    _this15.schemaProvider = new EmptySchemaProvider();
    return _this15;
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

    _Configurable2.prototype.persistConfigurationTo.call(this, configurationInfo);
  };

  DataService.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
    this.url = configurationInfo.getValue("url");
    this.schemaProvider = configurationInfo.getValue("schemaProvider");
    this.filterParser = configurationInfo.getValue("filterParser");
    this.totalMapper = configurationInfo.getScript("totalMapper");
    this.dataMapper = configurationInfo.getScript("dataMapper");

    _Configurable2.prototype.restoreConfigurationFrom.call(this, configurationInfo);
  };

  return DataService;
}(Configurable);

var JsonDataService = exports.JsonDataService = (_dec5 = (0, _aureliaFramework.transient)(), _dec6 = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec5(_class15 = _dec6(_class15 = function (_DataService) {
  _inherits(JsonDataService, _DataService);

  function JsonDataService(httpClient) {
    _classCallCheck(this, JsonDataService);

    var _this16 = _possibleConstructorReturn(this, _DataService.call(this, httpClient));

    _this16._cache = {};
    return _this16;
  }

  JsonDataService.prototype.read = function read(options) {
    var _this17 = this;

    var url = this.url;
    if (options.filter) url += this.filterParser ? this.filterParser.getFilter(options.filter) : options.filter;
    return this.httpClient.fetch(url).then(function (response) {
      return response.json();
    }).then(function (jsonData) {
      return {
        data: _this17.dataMapper ? _this17.dataMapper(jsonData) : jsonData,
        total: _this17.totalMapper ? _this17.totalMapper(jsonData) : jsonData.length
      };
    });
  };

  return JsonDataService;
}(DataService)) || _class15) || _class15);
var StaticJsonDataService = exports.StaticJsonDataService = (_dec7 = (0, _aureliaFramework.transient)(), _dec8 = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec7(_class17 = _dec8(_class17 = function (_DataService2) {
  _inherits(StaticJsonDataService, _DataService2);

  function StaticJsonDataService(httpClient) {
    _classCallCheck(this, StaticJsonDataService);

    return _possibleConstructorReturn(this, _DataService2.call(this, httpClient));
  }

  StaticJsonDataService.prototype.read = function read(options) {
    var _this19 = this;

    return this.httpClient.fetch(this.url).then(function (response) {
      return response.json();
    }).then(function (jsonData) {
      var d = _this19.dataMapper ? _this19.dataMapper(jsonData) : jsonData;
      if (options.filter) {
        var f = options.filter;
        if (_this19.filterParser && _this19.filterParser.type === "clientSide") f = _this19.filterParser.getFilter(options.filter);
        var evaluator = new QueryExpressionEvaluator();
        d = evaluator.evaluate(d, f);
      }
      var total = d.length;

      if (options.sort) d = _.orderBy(d, [options.sort], [options.sortDir]);
      var l = options.skip + options.take;
      d = l ? _.slice(d, options.skip, l > d.length ? d.length : l) : d;
      if (options.fields && options.fields.length > 0) d = _.map(d, function (item) {
        return _.pick(item, options.fields);
      });
      return {
        data: DataHelper.deserializeDates(d),
        total: _this19.totalMapper ? _this19.totalMapper(jsonData) : total
      };
    });
  };

  return StaticJsonDataService;
}(DataService)) || _class17) || _class17);


var DSL_GRAMMAR_EXPRESSION = '\n{\nfunction createStringExpression(fieldname, value){\n \t\tvar prefix = "record.";\n \t\tvar result = "";\n \t\tvar v = value.trim().toLowerCase();\n        if (v.length>=2){\n          if ((v.indexOf("%")===0)&&(v.lastIndexOf("%")===(v.length-1)))\n              result = prefix + fieldname + ".toLowerCase().includes(\'" + v.substring(1,value.length-1) + "\')"\n          else if (v.indexOf("%")===0)\n              result = prefix + fieldname + ".toLowerCase().endsWith(\'" + v.substring(1,value.length) + "\')"\n          else if (v.lastIndexOf("%")===(value.length-1))\n              result = prefix + fieldname + ".toLowerCase().startsWith(\'" + v.substring(0,value.length-1) + "\')"\n        }\n        if (result == "")\n          result = prefix + fieldname + ".toLowerCase() == \'" + v + "\'";\n\n        result="(" + prefix + fieldname + "!=null && " + result + ")"\n\n        return result;\n }\n  function createInExpression (fieldname, value) {\n    var result = "";\n    var values = value.split(\',\');\n    for (var i=0;i<values.length;i++)\n    {\n      var find = \'[\\"\\\']\';\n      var re = new RegExp(find, \'g\');\n      var v = values[i].replace(new RegExp(find, \'g\'), "");\n      //result += "record." + fieldname + ".toLowerCase() ==" + v.trim().toLowerCase();\n      result += createStringExpression(fieldname, v)\n      if (i<(values.length-1))\n        result += " || ";\n    }\n    if (result.length>0)\n      result = "(" + result + ")"\n    return result;\n  }\n}\n\nstart = expression\n\nexpression = c:condition j:join e:expression space? {return c+j+e;}\n           / c:condition space? {return c;}\n\njoin "LOGIC_OPERATOR"\n     = and\n     / or\n\nand = space* "and"i space* {return " && ";}\n\nor = space* "or"i space* {return " || ";}\n\n\ncondition = space? f:stringField o:op_eq v:stringValue {return createStringExpression(f,v);}\n          / space? f:stringField o:op_in a:valuesArray {return createInExpression(f,a);}\n          / space? f:numericField o:op v:numericValue {return "record." + f + o + v;}\n          / space? f:dateField o:op v:dateValue {return "record." + f + o + v;}\n          / "(" space? e:expression space* ")" space* {return "(" + e +")";}\n\n\n\nvaluesArray "STRING_VALUES_ARRAY"\n      = parentheses_l va:$(v:stringValue space* nextValue*)+ parentheses_r {return  va }\n\nnextValue = nv:(space* "," space* v:stringValue) {return  nv}\n\n\n\ndateValue "DATE_VALUE"\n        = quote? dt:$(date+) quote? {return "\'" + dt + "\'";}\n\n\nstringValue  "STRING_VALUE"\n\t  = quote w:$(char+) quote {return  w }\n      / quote quote {return "";}\n\n\nnumericValue  "NUMERIC_VALUE"\n       = $(numeric+)\n\n\nop "OPERATOR"\n   = op_eq\n   / ge\n   / gt\n   / le\n   / lt\n\nop_eq "STRING_OPERATOR_EQUAL"\n  = eq\n  / not_eq\n\nop_in "STRING_OPERATOR_IN"\n  = in\n\neq = space* "=" space* {return "==";}\n\nnot_eq = space* "!=" space* {return "!=";}\n\ngt = space* v:">" space* {return v;}\n\nge = space* v:">=" space* {return v;}\n\nlt = space* v:"<" space* {return v;}\n\nle = space* v:"<=" space* {return v;}\n\nin = space* v:"in" space* {return v;}\n\n\ndate = [0-9 \\:\\/]\n\nchar = [a-z0-9 \\%\\$\\_\\-\\:\\,\\.\\/]i\n\nnumeric = [0-9-\\.]\n\nspace = [ \\t\\n\\r]+\n\nparentheses_l = [\\(] space*\n\nparentheses_r = space* [\\)]\n\nfield "FIELD_NAME"\n      = stringField\n     / numericField\n     / dateField\n\nstringField "STRING_FIELD_NAME"\n     = @S@\n\nnumericField "NUMERIC_FIELD_NAME"\n     = @N@\n\ndateField "DATE_FIELD_NAME"\n     = @D@\n\nquote = [\\\'\\"]\n\n\n';

var GrammarExpression = exports.GrammarExpression = function (_Grammar) {
  _inherits(GrammarExpression, _Grammar);

  function GrammarExpression(dataFields) {
    _classCallCheck(this, GrammarExpression);

    var _this20 = _possibleConstructorReturn(this, _Grammar.call(this));

    _this20.text = DSL_GRAMMAR_EXPRESSION;
    _this20.dataFields = dataFields;
    return _this20;
  }

  GrammarExpression.prototype.getGrammar = function getGrammar() {
    var stringFieldList = _.map(DataHelper.getStringFields(this.dataFields), "field");
    var numericFieldList = _.map(DataHelper.getNumericFields(this.dataFields), "field");
    var dateFieldList = _.map(DataHelper.getDateFields(this.dataFields), "field");
    var parserText = this.text.replace('@S@', this._concatenateFields(stringFieldList)).replace('@N@', this._concatenateFields(numericFieldList)).replace('@D@', this._concatenateFields(dateFieldList));
    return parserText;
  };

  GrammarExpression.prototype._concatenateFields = function _concatenateFields(fieldList) {
    for (var i = 0; i < fieldList.length; i++) {
      fieldList[i] = '\'' + fieldList[i] + '\'i';
    }
    if (fieldList.length > 0) return fieldList.join('/ ');else return "'unknown_field'";
  };

  return GrammarExpression;
}(Grammar);

var DSL_GRAMMAR_TREE = '\n{\n  function findFirstLeftStatement(arr) {\n    if ( Array.isArray(arr) ) {\n      return findFirstLeftStatement(arr[0]["left"]);\n    } else if ( typeof arr === "object" ) {\n        return arr;\n    }\n  }\n\n  function inject(arr, connector) {\n    findFirstLeftStatement(arr)["connector"] = connector;\n    return arr;\n  }\n  function toArray (value) {\n    var res = value.split(\',\');\n    var re = new RegExp(\'[\\\'\\"]\', \'g\');\n    for (var i=0;i<res.length;i++)\n      res[i] = res[i].replace(re, "").trim();\n    return res;\n  }\n  \n  /*function createInExpression (fieldname, value) {\n    var result = []\n    var values = value.split(\',\');\n    for (var i=0;i<values.length;i++){\n    \tif (i!=0)\n    \t\tresult.push({field:fieldname, type:\'string\' ,value:values[i]});\n        else\n            result.push({field:fieldname, type:\'string\' ,value:values[i], connector:" || "});\n    }\n    return result;\n  }*/\n}\n\n//Start = statement *\nStart\n  = st:statement  {return st}  \n  \nstatement\n  = left:block cnct:connector right:statement \n    { return { left: left, right: inject(right, cnct) }; }\n  / left: block \n    { return left; }\n    \nblock\n  = pOpen block:statement* pClose space?\n    { return block[0]; }\n  / block:condition space?\n    { return block; }\n    \ncondition = space? f:stringField o:op_eq v:stringValue \n\t\t\t{return {field:f, type:"string", operand:o, value:v}}\n            / space? f:stringField o:op_in a:valuesArray \n       {return {field:f, type:"string", operand:o, value:toArray(a)}}            \n\t\t\t  / space? f:numericField o:op v:numericValue \n            {return {field:f, type:"number", operand:o, value:v}}\n          \t/ space? f:dateField o:op v:dateValue\n          {return {field:f, type:"date", operand:o, value:v}}\n\nconnector "LOGIC_OPERATOR"\n    = cn:(or / and) \n      { return cn.toString(); }\n      \nand = space* "and"i space* {return " && ";}\n\nor = space* "or"i space* {return " || ";}\n\nvaluesArray "STRING_VALUES_ARRAY"\n      = pOpen va:$(v:stringValue space* nextValue*)+ pClose {return  va }\n      \nnextValue = nv:(space* "," space* v:stringValue) {return  nv}      \n\ndateValue "DATE_VALUE"\n        = quote? dt:$(date+) quote? {return dt;}\n\n\nstringValue  "STRING_VALUE"\n\t  = quote w:$(char+) quote {return  w }\n      / quote quote {return "";}\n\n\nnumericValue  "NUMERIC_VALUE"\n       = $(numeric+)\n\nop "OPERAND"\n   = op_eq\n   / ge\n   / gt\n   / le\n   / lt\n\nop_eq "STRING_OPERATOR_EQUAL"\n  = eq\n  / not_eq\n\nop_in "STRING_OPERATOR_IN"\n  = in\n\neq = space* "=" space* {return "==";}\n\nnot_eq = space* "!=" space* {return "!=";}\n\ngt = space* v:">" space* {return v;}\n\nge = space* v:">=" space* {return v;}\n\nlt = space* v:"<" space* {return v;}\n\nle = space* v:"<=" space* {return v;}\n\nin = space* v:"in" space* {return v;}\n\n\ndate = [0-9\\:\\/]\n\nchar = [a-z0-9 \\%\\$\\_\\-\\:\\,\\.\\/]i\n\nnumeric = [0-9-\\.]\n\nspace = [ \\t\\n\\r]+\n\npOpen = [\\(] space*\n\npClose = space* [\\)]\n\nfield "FIELD_NAME"\n      = stringField\n     / numericField\n     / dateField\n\nstringField "STRING_FIELD_NAME"\n     = @S@\n\nnumericField "NUMERIC_FIELD_NAME"\n     = @N@\n\ndateField "DATE_FIELD_NAME"\n     = @D@\n\nquote = [\\\'\\"]\n';

var GrammarTree = exports.GrammarTree = function (_Grammar2) {
  _inherits(GrammarTree, _Grammar2);

  function GrammarTree(dataFields) {
    _classCallCheck(this, GrammarTree);

    var _this21 = _possibleConstructorReturn(this, _Grammar2.call(this));

    _this21.text = DSL_GRAMMAR_TREE;
    _this21.dataFields = dataFields;
    return _this21;
  }

  GrammarTree.prototype.getGrammar = function getGrammar() {
    var stringFieldList = _.map(DataHelper.getStringFields(this.dataFields), "field");
    var numericFieldList = _.map(DataHelper.getNumericFields(this.dataFields), "field");
    var dateFieldList = _.map(DataHelper.getDateFields(this.dataFields), "field");
    var parserText = this.text.replace('@S@', this._concatenateFields(stringFieldList)).replace('@N@', this._concatenateFields(numericFieldList)).replace('@D@', this._concatenateFields(dateFieldList));
    return parserText;
  };

  GrammarTree.prototype._concatenateFields = function _concatenateFields(fieldList) {
    for (var i = 0; i < fieldList.length; i++) {
      fieldList[i] = '\'' + fieldList[i] + '\'i';
    }
    if (fieldList.length > 0) return fieldList.join('/ ');else return "'unknown_field'";
  };

  return GrammarTree;
}(Grammar);

var Grammar = exports.Grammar = function () {
  function Grammar() {
    _classCallCheck(this, Grammar);
  }

  Grammar.prototype.getGrammar = function getGrammar() {};

  _createClass(Grammar, [{
    key: 'text',
    set: function set(value) {
      this._text = value;
    },
    get: function get() {
      return this._text;
    }
  }]);

  return Grammar;
}();

var FormatValueConverter = function () {
  function FormatValueConverter() {
    _classCallCheck(this, FormatValueConverter);
  }

  FormatValueConverter.format = function format(value, _format) {
    if (DataHelper.isDate(value)) return (0, _moment2.default)(value).format(_format);
    if (DataHelper.isNumber(value)) return (0, _numeral2.default)(value).format(_format);
    return value;
  };

  FormatValueConverter.prototype.toView = function toView(value, format) {
    return FormatValueConverter.format(value, format);
  };

  return FormatValueConverter;
}();

exports.FormatValueConverter = FormatValueConverter;

var DashboardBase = exports.DashboardBase = function (_Configurable3) {
  _inherits(DashboardBase, _Configurable3);

  function DashboardBase() {
    _classCallCheck(this, DashboardBase);

    var _this22 = _possibleConstructorReturn(this, _Configurable3.call(this));

    _this22.behaviors = [];
    _this22.layout = [];
    return _this22;
  }

  DashboardBase.prototype.configure = function configure(dashboardConfiguration) {
    this.name = dashboardConfiguration.name;
    this.title = dashboardConfiguration.title;
    this.resourceGroup = dashboardConfiguration.resourceGroup;
  };

  DashboardBase.prototype.getWidgetByName = function getWidgetByName(widgetName) {
    var wl = _.find(this.layout, function (w) {
      return w.widget.name === widgetName;
    });
    if (wl) return wl.widget;
  };

  DashboardBase.prototype.addWidget = function addWidget(widget, dimensions) {
    var lw = new LayoutWidget();
    lw.widget = widget;
    lw.sizeX = dimensions.sizeX;
    lw.sizeY = dimensions.sizeY;
    lw.col = dimensions.col;
    lw.row = dimensions.row;
    this.layout.push(lw);
    widget.dashboard = this;
  };

  DashboardBase.prototype.removeWidget = function removeWidget(widget) {
    _.remove(this.layout, function (w) {
      if (w.widget === widget) {
        widget.dispose();
        return true;
      }
      return false;
    });
  };

  DashboardBase.prototype.replaceWidget = function replaceWidget(oldWidget, newWidget) {
    var oldLw = _.find(this.layout, function (w) {
      return w.widget === oldWidget;
    });
    if (oldLw) {
      newWidget.dashboard = this;
      var newLw = new LayoutWidget();
      newLw.widget = newWidget;
      newLw.sizeX = oldLw.sizeX;
      newLw.sizeY = oldLw.sizeY;
      newLw.col = oldLw.col;
      newLw.row = oldLw.row;

      newLw.navigationStack.push(oldWidget);
      this.layout.splice(_.indexOf(this.layout, oldLw), 1, newLw);
    }
  };

  DashboardBase.prototype.restoreWidget = function restoreWidget(currentWidget) {
    var lw = _.find(this.layout, function (w) {
      return w.widget === currentWidget;
    });
    var previousWidget = lw.navigationStack.pop();
    if (previousWidget) {
      var previousLw = new LayoutWidget();
      previousLw.widget = previousWidget;
      previousLw.sizeX = lw.sizeX;
      previousLw.sizeY = lw.sizeY;
      previousLw.col = lw.col;
      previousLw.row = lw.row;
      this.layout.splice(_.indexOf(this.layout, lw), 1, previousLw);
    }
  };

  DashboardBase.prototype.resizeWidget = function resizeWidget(widget, newSize) {
    var lw = _.find(this.layout, function (w) {
      return w.widget === widget;
    });
    if (newSize) {
      var x = newSize.sizeX ? newSize.sizeX : lw.sizeX;
      var y = newSize.sizeY ? newSize.sizeY : lw.sizeY;
      lw.resize(x, y);
    } else lw.rollbackResize();
  };

  DashboardBase.prototype.refreshWidget = function refreshWidget(widget) {
    widget.refresh();
  };

  DashboardBase.prototype.refresh = function refresh() {
    for (var i = 0; i < this.layout.length; i++) {
      this.refreshWidget(this.layout[i].widget);
    }
  };

  DashboardBase.prototype.dispose = function dispose() {
    for (var i = 0; i < this.layout.length; i++) {
      this.layout[i].widget.dispose();
    }
    this.layout = [];

    while (true) {
      if (this.behaviors.length > 0) this.behaviors[0].detach();else break;
    }
  };

  DashboardBase.prototype.getState = function getState() {
    var result = [];
    _.forEach(this.layout, function (lw) {
      result.push({ name: lw.widget.name, value: lw.widget.getState(), stateType: lw.widget.stateType });
    });
    return result;
  };

  DashboardBase.prototype.setState = function setState(state) {
    for (var _iterator10 = state, _isArray10 = Array.isArray(_iterator10), _i10 = 0, _iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator]();;) {
      var _ref10;

      if (_isArray10) {
        if (_i10 >= _iterator10.length) break;
        _ref10 = _iterator10[_i10++];
      } else {
        _i10 = _iterator10.next();
        if (_i10.done) break;
        _ref10 = _i10.value;
      }

      var s = _ref10;

      for (var _iterator11 = this.layout, _isArray11 = Array.isArray(_iterator11), _i11 = 0, _iterator11 = _isArray11 ? _iterator11 : _iterator11[Symbol.iterator]();;) {
        var _ref11;

        if (_isArray11) {
          if (_i11 >= _iterator11.length) break;
          _ref11 = _iterator11[_i11++];
        } else {
          _i11 = _iterator11.next();
          if (_i11.done) break;
          _ref11 = _i11.value;
        }

        var lw = _ref11;

        if (lw.widget.name === s.name) {
          lw.widget.setState(s.value);
        }
      }
    }
  };

  DashboardBase.prototype.getRoute = function getRoute() {
    return this.route + StateUrlParser.stateToQuery(StateDiscriminator.discriminate(this.getState()));
  };

  DashboardBase.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
    configurationInfo.addValue("name", this.name);
    configurationInfo.addValue("resourceGroup", this.resourceGroup);
    configurationInfo.addValue("title", this.title);

    configurationInfo.addValue("route", this.route);
    configurationInfo.addValue("layout", this.layout);
    configurationInfo.addValue("behaviors", this.behaviors);
  };

  DashboardBase.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
    var _this23 = this;

    this.name = configurationInfo.getValue("name");
    this.resourceGroup = configurationInfo.getValue("resourceGroup");
    this.title = configurationInfo.getValue("title");
    this.route = configurationInfo.getValue("route");

    var layout = configurationInfo.getValue("layout");
    _.forEach(layout, function (lw) {
      _this23.addWidget(lw.widget, {
        sizeX: lw.sizeX,
        sizeY: lw.sizeY,
        col: lw.col,
        row: lw.row
      });
    });

    var behaviors = configurationInfo.getValue("behaviors");
    _.forEach(behaviors, function (b) {
      b.attach(_this23);
    });
  };

  return DashboardBase;
}(Configurable);

var LayoutWidget = exports.LayoutWidget = (_dec9 = (0, _aureliaFramework.computedFrom)('navigationStack'), (_class19 = function (_Configurable4) {
  _inherits(LayoutWidget, _Configurable4);

  function LayoutWidget() {
    var _temp, _this24, _ret8;

    _classCallCheck(this, LayoutWidget);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret8 = (_temp = (_this24 = _possibleConstructorReturn(this, _Configurable4.call.apply(_Configurable4, [this].concat(args))), _this24), _this24.navigationStack = [], _this24.resized = false, _temp), _possibleConstructorReturn(_this24, _ret8);
  }

  LayoutWidget.prototype.resize = function resize(newSizeX, newSizeY) {
    this._originalDimensions = { sizeX: this.sizeX, sizeY: this.sizeY };
    this.sizeX = newSizeX;
    this.sizeY = newSizeY;
    this.resized = true;
  };

  LayoutWidget.prototype.rollbackResize = function rollbackResize() {
    if (this._originalDimensions) {
      this.sizeX = this._originalDimensions.sizeX;
      this.sizeY = this._originalDimensions.sizeY;
    }
    this.resized = false;
  };

  LayoutWidget.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
    configurationInfo.addValue("sizeX", this.sizeX);
    configurationInfo.addValue("sizeY", this.sizeY);
    configurationInfo.addValue("col", this.col);
    configurationInfo.addValue("row", this.row);
    configurationInfo.addValue("widget", this.widget);
  };

  LayoutWidget.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
    this.sizeX = configurationInfo.getValue("sizeX");
    this.sizeY = configurationInfo.getValue("sizeY");
    this.col = configurationInfo.getValue("col");
    this.row = configurationInfo.getValue("row");
    this.widget = configurationInfo.getValue("widget");
  };

  _createClass(LayoutWidget, [{
    key: 'hasNavStack',
    get: function get() {
      return this.navigationStack && this.navigationStack.length > 0;
    }
  }]);

  return LayoutWidget;
}(Configurable), (_applyDecoratedDescriptor(_class19.prototype, 'hasNavStack', [_dec9], Object.getOwnPropertyDescriptor(_class19.prototype, 'hasNavStack'), _class19.prototype)), _class19));

var ChangeRouteBehavior = exports.ChangeRouteBehavior = function (_DashboardBehavior) {
  _inherits(ChangeRouteBehavior, _DashboardBehavior);

  function ChangeRouteBehavior(settings) {
    _classCallCheck(this, ChangeRouteBehavior);

    var _this25 = _possibleConstructorReturn(this, _DashboardBehavior.call(this));

    _this25.chanel = settings.chanel;
    _this25.eventAggregator = settings.eventAggregator;
    _this25.newRoute = settings.newRoute;
    _this25.router = settings.router;
    _this25.paramsMapper = settings.paramsMapper;
    return _this25;
  }

  ChangeRouteBehavior.prototype.attach = function attach(dashboard) {
    _DashboardBehavior.prototype.attach.call(this, dashboard);
    var me = this;
    this.subscription = this.eventAggregator.subscribe(this.chanel, function (message) {
      var params = me.paramsMapper ? me.paramsMapper(message) : "";
      if (params !== "" && params.indexOf("?") != 0) params = "?" + params;
      me.router.navigate(me.newRoute + (params !== "" ? params : ""));
    });
  };

  ChangeRouteBehavior.prototype.detach = function detach() {
    _DashboardBehavior.prototype.detach.call(this, dashboard);
    if (this.subscription) this.subscription.dispose();
  };

  ChangeRouteBehavior.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
    configurationInfo.addValue("chanel", this.chanel);
    configurationInfo.addValue("newRoute", this.newRoute);
    configurationInfo.addScript("paramsMapper", this.paramsMapper);
  };

  ChangeRouteBehavior.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
    this.chanel = configurationInfo.getValue("chanel");
    this.newRoute = configurationInfo.getValue("newRoute");
    this.paramsMapper = configurationInfo.addScript("paramsMapper");
  };

  return ChangeRouteBehavior;
}(DashboardBehavior);

var CreateWidgetBehavior = exports.CreateWidgetBehavior = function (_DashboardBehavior2) {
  _inherits(CreateWidgetBehavior, _DashboardBehavior2);

  function CreateWidgetBehavior(settings) {
    _classCallCheck(this, CreateWidgetBehavior);

    var _this26 = _possibleConstructorReturn(this, _DashboardBehavior2.call(this));

    _this26.eventAggregator = settings.eventAggregator;

    _this26.chanel = settings.chanel;
    _this26.widgetType = settings.widgetType;
    _this26.widgetSettings = settings.widgetSettings;
    _this26.widgetDimensions = settings.widgetDimensions;
    _this26.filterMapper = settings.filterMapper;
    return _this26;
  }

  CreateWidgetBehavior.prototype.attach = function attach(dashboard) {
    var _this27 = this;

    _DashboardBehavior2.prototype.attach.call(this, dashboard);
    var me = this;
    this.subscription = this.eventAggregator.subscribe(this.chanel, function (message) {
      var w = dashboard.getWidgetByName(me.widgetSettings.name);
      if (!w) {
        var w = new me.widgetType(me.widgetSettings);
        dashboard.addWidget(w, _this27.widgetDimensions);
      }
      w.dataFilter = me.filterMapper ? me.filterMapper(message) : "";
      w.refresh();
    });
  };

  CreateWidgetBehavior.prototype.detach = function detach() {
    _DashboardBehavior2.prototype.detach.call(this, dashboard);
    if (this.subscription) this.subscription.dispose();
  };

  return CreateWidgetBehavior;
}(DashboardBehavior);

var DashboardBehavior = exports.DashboardBehavior = function (_Configurable5) {
  _inherits(DashboardBehavior, _Configurable5);

  function DashboardBehavior() {
    _classCallCheck(this, DashboardBehavior);

    return _possibleConstructorReturn(this, _Configurable5.apply(this, arguments));
  }

  DashboardBehavior.prototype.attach = function attach(dashboard) {
    this._dashboard = dashboard;
    this._dashboard.behaviors.push(this);
  };

  DashboardBehavior.prototype.detach = function detach() {
    for (var i = 0; i < this.dashboard.behaviors.length; i++) {
      if (this.dashboard.behaviors[i] === this) {
        this.dashboard.behaviors.splice(i, 1);
        break;
      }
    }
  };

  DashboardBehavior.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {};

  DashboardBehavior.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {};

  _createClass(DashboardBehavior, [{
    key: 'dashboard',
    get: function get() {
      return this._dashboard;
    }
  }]);

  return DashboardBehavior;
}(Configurable);

var DrillDownHandleBehavior = exports.DrillDownHandleBehavior = function (_DashboardBehavior3) {
  _inherits(DrillDownHandleBehavior, _DashboardBehavior3);

  function DrillDownHandleBehavior(settings) {
    _classCallCheck(this, DrillDownHandleBehavior);

    var _this29 = _possibleConstructorReturn(this, _DashboardBehavior3.call(this));

    _this29._channel = settings.channel;
    _this29._widgetType = settings.widgetType;
    _this29._widgetSettings = settings.widgetSettings;
    _this29._eventAggregator = settings.eventAggregator;
    _this29._widgetToReplaceName = settings.widgetToReplaceName;
    return _this29;
  }

  DrillDownHandleBehavior.prototype.attach = function attach(dashboard) {
    _DashboardBehavior3.prototype.attach.call(this, dashboard);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._channel, function (message) {
      var originatorWidget = dashboard.getWidgetByName(me._widgetToReplaceName);

      var w = new me._widgetType(me._widgetSettings);
      dashboard.replaceWidget(originatorWidget, w);
      w.dataFilter = message.params.dataFilter;
      w.dataSource.transport.readService.configure({ url: message.params.dataServiceUrl });
      w.refresh();
    });
  };

  DrillDownHandleBehavior.prototype.detach = function detach() {
    _DashboardBehavior3.prototype.detach.call(this, dashboard);
    if (this.subscription) this.subscription.dispose();
  };

  return DrillDownHandleBehavior;
}(DashboardBehavior);

var ManageNavigationStackBehavior = exports.ManageNavigationStackBehavior = function (_DashboardBehavior4) {
  _inherits(ManageNavigationStackBehavior, _DashboardBehavior4);

  function ManageNavigationStackBehavior(eventAggregator) {
    _classCallCheck(this, ManageNavigationStackBehavior);

    var _this30 = _possibleConstructorReturn(this, _DashboardBehavior4.call(this));

    _this30._eventAggregator = eventAggregator;
    return _this30;
  }

  ManageNavigationStackBehavior.prototype.attach = function attach(dashboard) {
    _DashboardBehavior4.prototype.attach.call(this, dashboard);
    var me = this;

    this.subscription = this._eventAggregator.subscribe("widget-back-button-channel", function (message) {
      var originatorWidget = dashboard.getWidgetByName(message.originatorName);
      if (originatorWidget) {
        var previousWidget = message.params.navigationStack.pop();
        dashboard.replaceWidget(originatorWidget, previousWidget);
      }
    });
  };

  ManageNavigationStackBehavior.prototype.detach = function detach() {
    _DashboardBehavior4.prototype.detach.call(this, dashboard);
    if (this.subscription) this.subscription.dispose();
  };

  return ManageNavigationStackBehavior;
}(DashboardBehavior);

var ReplaceWidgetBehavior = exports.ReplaceWidgetBehavior = function (_DashboardBehavior5) {
  _inherits(ReplaceWidgetBehavior, _DashboardBehavior5);

  function ReplaceWidgetBehavior(settings) {
    _classCallCheck(this, ReplaceWidgetBehavior);

    var _this31 = _possibleConstructorReturn(this, _DashboardBehavior5.call(this));

    _this31._channel = settings.channel;
    _this31._widgetType = settings.widgetType;
    _this31._widgetSettings = settings.widgetSettings;
    _this31._eventAggregator = settings.eventAggregator;
    _this31._widgetToReplaceName = settings.widgetToReplaceName;
    _this31._mapper = settings.mapper;
    _this31._queryPattern = settings.queryPattern;
    return _this31;
  }

  ReplaceWidgetBehavior.prototype.attach = function attach(dashboard) {
    _DashboardBehavior5.prototype.attach.call(this, dashboard);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._channel, function (message) {
      var originatorWidget = dashboard.getWidgetByName(me._widgetToReplaceName);
      var w = new me._widgetType(me._widgetSettings);
      dashboard.replaceWidget(originatorWidget, w);
      w.dataFilter = me._mapper ? me._mapper(message) : message.params.dataFilter;
      w.refresh();
    });
  };

  ReplaceWidgetBehavior.prototype.detach = function detach() {
    _DashboardBehavior5.prototype.detach.call(this, dashboard);
    if (this.subscription) this.subscription.dispose();
  };

  return ReplaceWidgetBehavior;
}(DashboardBehavior);

var Chart = exports.Chart = function (_Widget) {
  _inherits(Chart, _Widget);

  function Chart() {
    _classCallCheck(this, Chart);

    var _this32 = _possibleConstructorReturn(this, _Widget.call(this));

    _this32.stateType = "chartState";
    _this32.attachBehaviors();
    return _this32;
  }

  Chart.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
    configurationInfo.addValue("categoriesField", this.categoriesField);
    configurationInfo.addValue("seriesDefaults", this.seriesDefaults);
    _Widget.prototype.persistConfigurationTo.call(this, configurationInfo);
  };

  Chart.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
    this.categoriesField = configurationInfo.getValue("categoriesField");
    this.seriesDefaults = configurationInfo.getValue("seriesDefaults");
    _Widget.prototype.restoreConfigurationFrom.call(this, configurationInfo);
  };

  return Chart;
}(Widget);

var DataSourceConfigurator = exports.DataSourceConfigurator = function (_Widget2) {
  _inherits(DataSourceConfigurator, _Widget2);

  function DataSourceConfigurator(settings) {
    _classCallCheck(this, DataSourceConfigurator);

    var _this33 = _possibleConstructorReturn(this, _Widget2.call(this, settings));

    _this33.dataSourceToConfigurate = settings.dataSourceToConfigurate;
    _this33.stateType = "dataSourceConfiguratorState";
    _this33._dataSourceChanged = new WidgetEvent();
    return _this33;
  }

  _createClass(DataSourceConfigurator, [{
    key: 'dataSourceToConfigurate',
    get: function get() {
      return this._dataSourceToConfigurate;
    },
    set: function set(value) {
      this._dataSourceToConfigurate = value;
    }
  }, {
    key: 'dataSourceChanged',
    get: function get() {
      return this._dataSourceChanged;
    },
    set: function set(handler) {
      this._dataSourceChanged.attach(handler);
    }
  }]);

  return DataSourceConfigurator;
}(Widget);

var DetailedView = exports.DetailedView = function (_Widget3) {
  _inherits(DetailedView, _Widget3);

  function DetailedView() {
    _classCallCheck(this, DetailedView);

    var _this34 = _possibleConstructorReturn(this, _Widget3.call(this));

    _this34.stateType = "detailedViewState";
    return _this34;
  }

  DetailedView.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
    configurationInfo.addValue("fields", this.fields);
    _Widget3.prototype.persistConfigurationTo.call(this, configurationInfo);
  };

  DetailedView.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
    this.fields = configurationInfo.getValue("fields");
    _Widget3.prototype.restoreConfigurationFrom.call(this, configurationInfo);
  };

  return DetailedView;
}(Widget);

var Grid = exports.Grid = function (_Widget4) {
  _inherits(Grid, _Widget4);

  function Grid() {
    _classCallCheck(this, Grid);

    var _this35 = _possibleConstructorReturn(this, _Widget4.call(this));

    _this35._dataSelected = new WidgetEvent();
    _this35._dataActivated = new WidgetEvent();
    _this35._dataFieldSelected = new WidgetEvent();

    _this35.stateType = "gridState";
    return _this35;
  }

  Grid.prototype.saveState = function saveState() {
    this.setState({ columns: this.columns });
  };

  Grid.prototype.restoreState = function restoreState() {
    var s = this.getState();
    if (s) this.columns = s.columns;
  };

  Grid.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
    configurationInfo.addValue("columns", this.columns);
    configurationInfo.addValue("navigatable", this.navigatable);
    configurationInfo.addValue("autoGenerateColumns", this.autoGenerateColumns);
    configurationInfo.addValue("pageSize", this.pageSize);
    configurationInfo.addValue("group", this.group);
    _Widget4.prototype.persistConfigurationTo.call(this, configurationInfo);
  };

  Grid.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
    this.columns = configurationInfo.getValue("columns");
    this.navigatable = configurationInfo.getBool("navigatable");
    this.autoGenerateColumns = configurationInfo.getBool("autoGenerateColumns");
    this.pageSize = configurationInfo.getInt("pageSize");
    this.group = configurationInfo.getValue("group");
    _Widget4.prototype.restoreConfigurationFrom.call(this, configurationInfo);
  };

  _createClass(Grid, [{
    key: 'dataSelected',
    get: function get() {
      return this._dataSelected;
    },
    set: function set(handler) {
      this._dataSelected.attach(handler);
    }
  }, {
    key: 'dataActivated',
    get: function get() {
      return this._dataActivated;
    },
    set: function set(handler) {
      this._dataActivated.attach(handler);
    }
  }, {
    key: 'dataFieldSelected',
    get: function get() {
      return this._dataFieldSelected;
    },
    set: function set(handler) {
      this._dataFieldSelected.attach(handler);
    }
  }]);

  return Grid;
}(Widget);

var SearchBox = exports.SearchBox = function (_Widget5) {
  _inherits(SearchBox, _Widget5);

  function SearchBox() {
    _classCallCheck(this, SearchBox);

    var _this36 = _possibleConstructorReturn(this, _Widget5.call(this));

    _this36._dataFilterChanged = new WidgetEvent();

    _this36.stateType = "searchBoxState";
    return _this36;
  }

  SearchBox.prototype.saveState = function saveState() {
    this.setState(this.searchString);
  };

  SearchBox.prototype.restoreState = function restoreState() {
    var s = this.getState();
    if (s) this.searchString = s;else this.searchString = "";
  };

  SearchBox.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
    configurationInfo.addValue("searchString", this.searchString);
    _Widget5.prototype.persistConfigurationTo.call(this, configurationInfo);
  };

  SearchBox.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
    this.searchString = configurationInfo.getValue("searchString");
    _Widget5.prototype.restoreConfigurationFrom.call(this, configurationInfo);
  };

  _createClass(SearchBox, [{
    key: 'dataFilterChanged',
    get: function get() {
      return this._dataFilterChanged;
    },
    set: function set(handler) {
      this._dataFilterChanged.attach(handler);
    }
  }]);

  return SearchBox;
}(Widget);

var Widget = exports.Widget = function (_Configurable6) {
  _inherits(Widget, _Configurable6);

  function Widget() {
    _classCallCheck(this, Widget);

    var _this37 = _possibleConstructorReturn(this, _Configurable6.call(this));

    _this37.behaviors = [];
    return _this37;
  }

  Widget.prototype.getStateKey = function getStateKey() {
    if (this.stateStorage) return this.stateStorage.createKey(this.dashboard.name, this.name);
    return "";
  };

  Widget.prototype.getState = function getState() {
    if (this.stateStorage) {
      var s = this.stateStorage.get(this.getStateKey());
      if (s) return s;
    }
    return undefined;
  };

  Widget.prototype.setState = function setState(value) {
    if (this.stateStorage) {
      if (!value) this.stateStorage.remove(this.getStateKey());else this.stateStorage.set(this.getStateKey(), value);
    }
  };

  Widget.prototype.attachBehavior = function attachBehavior(b) {
    b.attachToWidget(this);
  };

  Widget.prototype.attachBehaviors = function attachBehaviors() {
    if (this._unattachedBehaviors) {
      for (var _iterator12 = this._unattachedBehaviors, _isArray12 = Array.isArray(_iterator12), _i12 = 0, _iterator12 = _isArray12 ? _iterator12 : _iterator12[Symbol.iterator]();;) {
        var _ref12;

        if (_isArray12) {
          if (_i12 >= _iterator12.length) break;
          _ref12 = _iterator12[_i12++];
        } else {
          _i12 = _iterator12.next();
          if (_i12.done) break;
          _ref12 = _i12.value;
        }

        var b = _ref12;

        this.attachBehavior(b);
      }
    }
  };

  Widget.prototype.changeSettings = function changeSettings(newSettings) {
    var _this38 = this;

    if (newSettings) {
      _.forOwn(newSettings, function (v, k) {
        _this38[k] = v;
      });
      this.refresh();
    }
  };

  Widget.prototype.refresh = function refresh() {};

  Widget.prototype.dispose = function dispose() {
    while (true) {
      if (this.behavior.length > 0) this.behavior[0].detach();else break;
    }
  };

  Widget.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {

    configurationInfo.addValue("name", this.name);
    configurationInfo.addValue("resourceGroup", this.resourceGroup);
    configurationInfo.addValue("header", this.header);
    configurationInfo.addValue("minHeight", this.minHeight);
    configurationInfo.addValue("stateType", this.stateType);
    configurationInfo.addValue("showHeader", this.showHeader);
    configurationInfo.addValue("dataHolder", this.dataHolder);
    configurationInfo.addValue("dataSource", this.dataSource);
    configurationInfo.addValue("dataFilter", this.dataFilter);
    configurationInfo.addScript("dataMapper", this.dataMapper);
    configurationInfo.addValue("behaviors", this.behaviors);

    configurationInfo.addValue("stateStorage", this.stateStorage);
  };

  Widget.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
    var _this39 = this;

    this.name = configurationInfo.getValue("name");
    this.resourceGroup = configurationInfo.getValue("resourceGroup");
    this.header = configurationInfo.getValue("header");
    this.minHeight = configurationInfo.getInt("minHeight");
    this.stateType = configurationInfo.getValue("stateType");
    this.showHeader = configurationInfo.getBool("showHeader");

    this.dataHolder = configurationInfo.getValue("dataHolder");
    this.dataSource = configurationInfo.getValue("dataSource");
    this.dataFilter = configurationInfo.getValue("dataFilter");
    this.dataMapper = configurationInfo.getScript("dataMapper");

    var behaviors = configurationInfo.getValue("behaviors");
    _.forEach(behaviors, function (b) {
      b.attachToWidget(_this39);
    });

    this.stateStorage = configurationInfo.getValue("stateStorage");
  };

  _createClass(Widget, [{
    key: 'self',
    get: function get() {
      return this;
    }
  }]);

  return Widget;
}(Configurable);

var WidgetEventMessage = exports.WidgetEventMessage = function () {
  function WidgetEventMessage(widgetName) {
    _classCallCheck(this, WidgetEventMessage);

    this._originatorName = widgetName;
  }

  _createClass(WidgetEventMessage, [{
    key: 'originatorName',
    get: function get() {
      return this._originatorName;
    }
  }]);

  return WidgetEventMessage;
}();

var WidgetEvent = exports.WidgetEvent = function () {
  function WidgetEvent(widgetName) {
    _classCallCheck(this, WidgetEvent);

    this.handlers = [];

    this._originatorName = widgetName;
  }

  WidgetEvent.prototype.attach = function attach(handler) {
    if (this.handlers.some(function (e) {
      return e === handler;
    })) {
      return;
    }
    this.handlers.push(handler);
  };

  WidgetEvent.prototype.detach = function detach(handler) {
    var idx = this.handlers.indexOf(handler);
    if (idx < 0) {
      return;
    }
    this.handler.splice(idx, 1);
  };

  WidgetEvent.prototype.raise = function raise() {
    for (var i = 0; i < this.handlers.length; i++) {
      this.handlers[i].apply(this, arguments);
    }
  };

  _createClass(WidgetEvent, [{
    key: 'originatorName',
    get: function get() {
      return this._originatorName;
    }
  }]);

  return WidgetEvent;
}();

var BroadcasterBehavior = exports.BroadcasterBehavior = function (_WidgetBehavior) {
  _inherits(BroadcasterBehavior, _WidgetBehavior);

  function BroadcasterBehavior() {
    _classCallCheck(this, BroadcasterBehavior);

    var _this40 = _possibleConstructorReturn(this, _WidgetBehavior.call(this));

    _this40.behaviortype = BehaviorType.broadcaster;
    return _this40;
  }

  BroadcasterBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    if (!widget[this.eventToAttach]) throw "widget " + widget.name + " hasn't '" + this.eventToAttach + "' event";
    _WidgetBehavior.prototype.attachToWidget.call(this, widget);
  };

  BroadcasterBehavior.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
    configurationInfo.addValue("channel", this.channel);
  };

  BroadcasterBehavior.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
    this.channel = configurationInfo.getValue("channel");
  };

  return BroadcasterBehavior;
}(WidgetBehavior);

var DataActivatedBehavior = exports.DataActivatedBehavior = (_dec10 = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec10(_class30 = function (_BroadcasterBehavior) {
  _inherits(DataActivatedBehavior, _BroadcasterBehavior);

  function DataActivatedBehavior(eventAggregator) {
    _classCallCheck(this, DataActivatedBehavior);

    var _this41 = _possibleConstructorReturn(this, _BroadcasterBehavior.call(this));

    _this41.eventToAttach = "dataActivated";

    _this41._eventAggregator = eventAggregator;
    return _this41;
  }

  DataActivatedBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    _BroadcasterBehavior.prototype.attachToWidget.call(this, widget);
    var me = this;

    widget[this.eventToAttach] = function (currentRecord) {
      var message = new WidgetEventMessage(me.widget.name);
      message.params = { activatedData: currentRecord };
      me._eventAggregator.publish(me.channel, message);
    };
  };

  DataActivatedBehavior.prototype.detach = function detach() {
    _BroadcasterBehavior.prototype.detach.call(this, dashboard);
  };

  DataActivatedBehavior.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
    _BroadcasterBehavior.prototype.persistConfigurationTo.call(this, configurationInfo);
  };

  DataActivatedBehavior.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
    _BroadcasterBehavior.prototype.restoreConfigurationFrom.call(this, configurationInfo);
  };

  return DataActivatedBehavior;
}(BroadcasterBehavior)) || _class30);
var DataFieldSelectedBehavior = exports.DataFieldSelectedBehavior = (_dec11 = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec11(_class31 = function (_BroadcasterBehavior2) {
  _inherits(DataFieldSelectedBehavior, _BroadcasterBehavior2);

  function DataFieldSelectedBehavior(eventAggregator) {
    _classCallCheck(this, DataFieldSelectedBehavior);

    var _this42 = _possibleConstructorReturn(this, _BroadcasterBehavior2.call(this));

    _this42.eventToAttach = "dataFieldSelected";
    _this42._eventAggregator = eventAggregator;
    return _this42;
  }

  DataFieldSelectedBehavior.prototype.attachToWidget = function attachToWidget(widget) {

    _BroadcasterBehavior2.prototype.attachToWidget.call(this, widget);
    var me = this;

    widget[this.eventToAttach] = function (fieldName) {
      var message = new WidgetEventMessage(me.widget.name);
      message.params = { fieldName: fieldName };
      me._eventAggregator.publish(me.channel, message);
    };
  };

  DataFieldSelectedBehavior.prototype.detach = function detach() {
    _BroadcasterBehavior2.prototype.detach.call(this, dashboard);
  };

  DataFieldSelectedBehavior.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
    _BroadcasterBehavior2.prototype.persistConfigurationTo.call(this, configurationInfo);
  };

  DataFieldSelectedBehavior.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
    _BroadcasterBehavior2.prototype.restoreConfigurationFrom.call(this, configurationInfo);
  };

  return DataFieldSelectedBehavior;
}(BroadcasterBehavior)) || _class31);
var DataFilterChangedBehavior = exports.DataFilterChangedBehavior = (_dec12 = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec12(_class32 = function (_BroadcasterBehavior3) {
  _inherits(DataFilterChangedBehavior, _BroadcasterBehavior3);

  function DataFilterChangedBehavior(eventAggregator) {
    _classCallCheck(this, DataFilterChangedBehavior);

    var _this43 = _possibleConstructorReturn(this, _BroadcasterBehavior3.call(this));

    _this43.eventToAttach = "dataFilterChanged";
    _this43._eventAggregator = eventAggregator;
    return _this43;
  }

  DataFilterChangedBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    _BroadcasterBehavior3.prototype.attachToWidget.call(this, widget);
    var me = this;
    widget[this.eventToAttach] = function (filter) {
      var message = new WidgetEventMessage(me.widget.name);
      message.params = { dataFilter: filter };
      me._eventAggregator.publish(me.channel, message);
    };
  };

  DataFilterChangedBehavior.prototype.detach = function detach() {
    _BroadcasterBehavior3.prototype.detach.call(this, dashboard);
  };

  DataFilterChangedBehavior.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
    _BroadcasterBehavior3.prototype.persistConfigurationTo.call(this, configurationInfo);
  };

  DataFilterChangedBehavior.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
    _BroadcasterBehavior3.prototype.restoreConfigurationFrom.call(this, configurationInfo);
  };

  return DataFilterChangedBehavior;
}(BroadcasterBehavior)) || _class32);
var DataFilterHandleBehavior = exports.DataFilterHandleBehavior = (_dec13 = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec13(_class33 = function (_ListenerBehavior) {
  _inherits(DataFilterHandleBehavior, _ListenerBehavior);

  function DataFilterHandleBehavior(eventAggregator) {
    _classCallCheck(this, DataFilterHandleBehavior);

    var _this44 = _possibleConstructorReturn(this, _ListenerBehavior.call(this));

    _this44._eventAggregator = eventAggregator;
    return _this44;
  }

  DataFilterHandleBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    _ListenerBehavior.prototype.attachToWidget.call(this, widget);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this.channel, function (message) {
      var filterToApply = me._filterMapper ? me._filterMapper(message.params) : message.params.dataFilter;
      me.widget.dataFilter = filterToApply;
      me.widget.refresh();
    });
  };

  DataFilterHandleBehavior.prototype.detach = function detach() {
    _ListenerBehavior.prototype.detach.call(this, dashboard);
    if (this.subscription) this.subscription.dispose();
  };

  DataFilterHandleBehavior.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
    configurationInfo.addScript("filterMapper", this.filterMapper);
    _ListenerBehavior.prototype.persistConfigurationTo.call(this, configurationInfo);
  };

  DataFilterHandleBehavior.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
    this.filterMapper = configurationInfo.getScript("filterMapper");
    _ListenerBehavior.prototype.restoreConfigurationFrom.call(this, configurationInfo);
  };

  return DataFilterHandleBehavior;
}(ListenerBehavior)) || _class33);
var DataSelectedBehavior = exports.DataSelectedBehavior = (_dec14 = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec14(_class35 = function (_BroadcasterBehavior4) {
  _inherits(DataSelectedBehavior, _BroadcasterBehavior4);

  function DataSelectedBehavior(eventAggregator) {
    _classCallCheck(this, DataSelectedBehavior);

    var _this45 = _possibleConstructorReturn(this, _BroadcasterBehavior4.call(this));

    _this45.eventToAttach = "dataSelected";
    _this45._eventAggregator = eventAggregator;
    return _this45;
  }

  DataSelectedBehavior.prototype.attachToWidget = function attachToWidget(widget) {

    _BroadcasterBehavior4.prototype.attachToWidget.call(this, widget);
    var me = this;

    widget[this.eventToAttach] = function (currentRecord) {
      var message = new WidgetEventMessage(me.widget.name);
      message.params = { selectedData: currentRecord };
      me._eventAggregator.publish(me.channel, message);
    };
  };

  DataSelectedBehavior.prototype.detach = function detach() {
    _BroadcasterBehavior4.prototype.detach.call(this, dashboard);
  };

  DataSelectedBehavior.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
    _BroadcasterBehavior4.prototype.persistConfigurationTo.call(this, configurationInfo);
  };

  DataSelectedBehavior.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
    _BroadcasterBehavior4.prototype.restoreConfigurationFrom.call(this, configurationInfo);
  };

  return DataSelectedBehavior;
}(BroadcasterBehavior)) || _class35);
var DataSourceChangedBehavior = exports.DataSourceChangedBehavior = (_dec15 = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec15(_class36 = function (_BroadcasterBehavior5) {
  _inherits(DataSourceChangedBehavior, _BroadcasterBehavior5);

  function DataSourceChangedBehavior(eventAggregator) {
    _classCallCheck(this, DataSourceChangedBehavior);

    var _this46 = _possibleConstructorReturn(this, _BroadcasterBehavior5.call(this));

    _this46.eventToAttach = "dataSourceChanged";
    _this46._eventAggregator = eventAggregator;
    return _this46;
  }

  DataSourceChangedBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    _BroadcasterBehavior5.prototype.attachToWidget.call(this, widget);
    var me = this;
    widget[this.eventToAttach] = function (dataSource) {
      var message = new WidgetEventMessage(me.widget.name);
      message.params = { dataSource: dataSource };
      me._eventAggregator.publish(me.channel, message);
    };
  };

  DataSourceChangedBehavior.prototype.detach = function detach() {
    _BroadcasterBehavior5.prototype.detach.call(this, dashboard);
  };

  DataSourceChangedBehavior.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
    _BroadcasterBehavior5.prototype.persistConfigurationTo.call(this, configurationInfo);
  };

  DataSourceChangedBehavior.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
    _BroadcasterBehavior5.prototype.restoreConfigurationFrom.call(this, configurationInfo);
  };

  return DataSourceChangedBehavior;
}(BroadcasterBehavior)) || _class36);
var DataSourceHandleBehavior = exports.DataSourceHandleBehavior = (_dec16 = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec16(_class37 = function (_ListenerBehavior2) {
  _inherits(DataSourceHandleBehavior, _ListenerBehavior2);

  function DataSourceHandleBehavior(eventAggregator) {
    _classCallCheck(this, DataSourceHandleBehavior);

    var _this47 = _possibleConstructorReturn(this, _ListenerBehavior2.call(this));

    _this47._eventAggregator = eventAggregator;
    return _this47;
  }

  DataSourceHandleBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    _ListenerBehavior2.prototype.attachToWidget.call(this, widget);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this.channel, function (message) {
      me.widget.dataSource = message.params.dataSource;
      me.widget.refresh();
    });
  };

  DataSourceHandleBehavior.prototype.detach = function detach() {
    _ListenerBehavior2.prototype.detach.call(this, dashboard);
    if (this.subscription) this.subscription.dispose();
  };

  DataSourceHandleBehavior.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
    _ListenerBehavior2.prototype.persistConfigurationTo.call(this, configurationInfo);
  };

  DataSourceHandleBehavior.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
    _ListenerBehavior2.prototype.restoreConfigurationFrom.call(this, configurationInfo);
  };

  return DataSourceHandleBehavior;
}(ListenerBehavior)) || _class37);

var DrillDownBehavior = exports.DrillDownBehavior = function (_BroadcasterBehavior6) {
  _inherits(DrillDownBehavior, _BroadcasterBehavior6);

  function DrillDownBehavior(channel, eventAggregator, dataSource) {
    _classCallCheck(this, DrillDownBehavior);

    var _this48 = _possibleConstructorReturn(this, _BroadcasterBehavior6.call(this));

    _this48.queryPattern = "";
    _this48.dataServiceUrl = "";
    _this48.isConfigured = false;

    _this48.channel = channel;
    _this48.eventToAttach = "dataActivated";
    _this48._eventAggregator = eventAggregator;
    _this48._dataSource = dataSource;
    return _this48;
  }

  DrillDownBehavior.prototype.configure = function configure(drillDownBehaviorConfiguration) {
    this.queryPattern = drillDownBehaviorConfiguration.queryPattern;
    this.dataServiceUrl = drillDownBehaviorConfiguration.dataServiceUrl;
    this.isConfigured = true;
  };

  DrillDownBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    _BroadcasterBehavior6.prototype.attachToWidget.call(this, widget);
    var me = this;

    widget[this.eventToAttach] = function (currentRecord) {
      if (!me.isConfigured) return;
      var message = new WidgetEventMessage(me.widget.name);
      var query = me.queryPattern;
      _.forOwn(currentRecord, function (value, key) {
        query = StringHelper.replaceAll(query, "@" + key, value);
      });

      message.params = { dataFilter: query, dataServiceUrl: me.dataServiceUrl };
      me._eventAggregator.publish(me.channel, message);
    };
  };

  DrillDownBehavior.prototype.detach = function detach() {
    _BroadcasterBehavior6.prototype.detach.call(this, dashboard);
  };

  DrillDownBehavior.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
    _BroadcasterBehavior6.prototype.persistConfigurationTo.call(this, configurationInfo);
  };

  DrillDownBehavior.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
    _BroadcasterBehavior6.prototype.restoreConfigurationFrom.call(this, configurationInfo);
  };

  return DrillDownBehavior;
}(BroadcasterBehavior);

var DrillDownBehaviorConfiguration = exports.DrillDownBehaviorConfiguration = function DrillDownBehaviorConfiguration() {
  _classCallCheck(this, DrillDownBehaviorConfiguration);
};

var ListenerBehavior = exports.ListenerBehavior = function (_WidgetBehavior2) {
  _inherits(ListenerBehavior, _WidgetBehavior2);

  function ListenerBehavior() {
    _classCallCheck(this, ListenerBehavior);

    var _this49 = _possibleConstructorReturn(this, _WidgetBehavior2.call(this));

    _this49.behaviortype = BehaviorType.listener;
    return _this49;
  }

  ListenerBehavior.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
    _WidgetBehavior2.prototype.persistConfigurationTo.call(this, configurationInfo);
  };

  ListenerBehavior.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
    _WidgetBehavior2.prototype.restoreConfigurationFrom.call(this, configurationInfo);
  };

  return ListenerBehavior;
}(WidgetBehavior);

var SettingsHandleBehavior = exports.SettingsHandleBehavior = (_dec17 = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec17(_class40 = function (_ListenerBehavior3) {
  _inherits(SettingsHandleBehavior, _ListenerBehavior3);

  function SettingsHandleBehavior(eventAggregator) {
    _classCallCheck(this, SettingsHandleBehavior);

    var _this50 = _possibleConstructorReturn(this, _ListenerBehavior3.call(this));

    _this50._eventAggregator = eventAggregator;

    return _this50;
  }

  SettingsHandleBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    _ListenerBehavior3.prototype.attachToWidget.call(this, widget);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this.channel, function (message) {
      var settingsToApply = me.messageMapper ? me.messageMapper(message.params) : message.params;
      _.forOwn(settingsToApply, function (v, k) {
        me.widget[k] = v;
      });

      me.widget.refresh();
    });
  };

  SettingsHandleBehavior.prototype.detach = function detach() {
    _ListenerBehavior3.prototype.detach.call(this, dashboard);
    if (this.subscription) this.subscription.dispose();
  };

  SettingsHandleBehavior.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
    configurationInfo.addScript("messageMapper", this.messageMapper);
    _ListenerBehavior3.prototype.persistConfigurationTo.call(this, configurationInfo);
  };

  SettingsHandleBehavior.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
    this.messageMapper = configurationInfo.getScript("messageMapper");
    _ListenerBehavior3.prototype.restoreConfigurationFrom.call(this, configurationInfo);
  };

  return SettingsHandleBehavior;
}(ListenerBehavior)) || _class40);

var WidgetBehavior = exports.WidgetBehavior = function (_Configurable7) {
  _inherits(WidgetBehavior, _Configurable7);

  function WidgetBehavior() {
    _classCallCheck(this, WidgetBehavior);

    return _possibleConstructorReturn(this, _Configurable7.apply(this, arguments));
  }

  WidgetBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    this.widget = widget;
    this.widget.behaviors.push(this);
  };

  WidgetBehavior.prototype.detach = function detach() {
    if (!this.widget) return;
    for (var i = 0; i < this.widget.behaviors.length; i++) {
      if (this.widget.behaviors[i] === this) {
        this.widget.behaviors.splice(i, 1);
        break;
      }
    }
  };

  WidgetBehavior.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
    configurationInfo.addValue("channel", this.channel);
  };

  WidgetBehavior.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
    this.channel = configurationInfo.getValue("channel");
  };

  return WidgetBehavior;
}(Configurable);

var AstParser = exports.AstParser = function () {
  function AstParser() {
    _classCallCheck(this, AstParser);

    this._clientSide = "clientSide";
    this._serverSide = "serverSide";
  }

  AstParser.prototype.getFilter = function getFilter(astTree) {
    return {};
  };

  AstParser.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {};

  AstParser.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {};

  _createClass(AstParser, [{
    key: 'type',
    get: function get() {}
  }]);

  return AstParser;
}();

var AstToJavascriptParser = exports.AstToJavascriptParser = function (_AstParser) {
  _inherits(AstToJavascriptParser, _AstParser);

  function AstToJavascriptParser() {
    _classCallCheck(this, AstToJavascriptParser);

    return _possibleConstructorReturn(this, _AstParser.call(this));
  }

  AstToJavascriptParser.prototype.getFilter = function getFilter(astTree) {
    if (astTree) return this._parseTree(astTree, []);
    return "";
  };

  AstToJavascriptParser.prototype._parseTree = function _parseTree(treeNode, result) {
    if (treeNode.left) {
      result.push(this._createExpression(treeNode.connector, treeNode.left));
      if (treeNode.right) this._parseTree(treeNode.right, result);
    } else result.push(this._createExpression(treeNode.connector, treeNode));
    return result.join(" ");
  };

  AstToJavascriptParser.prototype._createExpression = function _createExpression(connector, node) {
    var result = "";
    var prefix = "record.";
    var fieldname = node.field;
    var operand = node.operand;
    var value = node.value;

    if (node.type == 'string') {
      if (operand === 'in') {
        result = _.map(value, function (val) {
          return prefix + fieldname + ".toLowerCase() == '" + val.trim().toLowerCase() + "'";
        }).join(" || ");
      } else {
        var v = value.trim().toLowerCase();
        if (v.length >= 2) {
          if (v.indexOf("%") === 0 && v.lastIndexOf("%") === v.length - 1) result = prefix + fieldname + ".toLowerCase().includes('" + v.substring(1, value.length - 1) + "')";else if (v.indexOf("%") === 0) result = prefix + fieldname + ".toLowerCase().endsWith('" + v.substring(1, value.length) + "')";else if (v.lastIndexOf("%") === value.length - 1) result = prefix + fieldname + ".toLowerCase().startsWith('" + v.substring(0, value.length - 1) + "')";
        }
        if (result == "") result = prefix + fieldname + ".toLowerCase() " + operand + " '" + v + "'";
      }
    } else if (node.type == 'number') {
      result = prefix + fieldname + operand + " " + value;
    } else if (node.type == 'date') {
      result = prefix + fieldname + operand + " '" + value + "'";
    }
    result = (connector ? connector : "") + " (" + prefix + fieldname + "!=null && (" + result + "))";
    return result;
  };

  AstToJavascriptParser.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
    _AstParser.prototype.persistConfigurationTo.call(this, configurationInfo);
  };

  AstToJavascriptParser.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
    _AstParser.prototype.restoreConfigurationFrom.call(this, configurationInfo);
  };

  _createClass(AstToJavascriptParser, [{
    key: 'type',
    get: function get() {
      return this._clientSide;
    }
  }]);

  return AstToJavascriptParser;
}(AstParser);

var EmptySchemaProvider = exports.EmptySchemaProvider = function (_SchemaProvider) {
  _inherits(EmptySchemaProvider, _SchemaProvider);

  function EmptySchemaProvider() {
    _classCallCheck(this, EmptySchemaProvider);

    return _possibleConstructorReturn(this, _SchemaProvider.call(this));
  }

  EmptySchemaProvider.prototype.getSchema = function getSchema() {
    return new Promise(function (resolve, reject) {
      resolve(new Schema());
    });
  };

  return EmptySchemaProvider;
}(SchemaProvider);

var SchemaProvider = exports.SchemaProvider = function (_Configurable8) {
  _inherits(SchemaProvider, _Configurable8);

  function SchemaProvider() {
    _classCallCheck(this, SchemaProvider);

    return _possibleConstructorReturn(this, _Configurable8.call(this));
  }

  SchemaProvider.prototype.getSchema = function getSchema() {};

  SchemaProvider.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
    _Configurable8.prototype.persistConfigurationTo.call(this, configurationInfo);
  };

  SchemaProvider.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
    _Configurable8.prototype.restoreConfigurationFrom.call(this, configurationInfo);
  };

  return SchemaProvider;
}(Configurable);

var StaticSchemaProvider = exports.StaticSchemaProvider = function (_SchemaProvider2) {
  _inherits(StaticSchemaProvider, _SchemaProvider2);

  function StaticSchemaProvider() {
    _classCallCheck(this, StaticSchemaProvider);

    return _possibleConstructorReturn(this, _SchemaProvider2.call(this));
  }

  StaticSchemaProvider.prototype.getSchema = function getSchema() {
    var _this56 = this;

    return new Promise(function (resolve, reject) {
      resolve(_this56.schema);
    });
  };

  StaticSchemaProvider.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
    configurationInfo.addValue("schema", this.schema);
    _SchemaProvider2.prototype.persistConfigurationTo.call(this, configurationInfo);
  };

  StaticSchemaProvider.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
    this.schema = configurationInfo.getValue("schema");
    _SchemaProvider2.prototype.restoreConfigurationFrom.call(this, configurationInfo);
  };

  return StaticSchemaProvider;
}(SchemaProvider);

var SwaggerSchemaProvider = exports.SwaggerSchemaProvider = function (_SchemaProvider3) {
  _inherits(SwaggerSchemaProvider, _SchemaProvider3);

  function SwaggerSchemaProvider() {
    _classCallCheck(this, SwaggerSchemaProvider);

    return _possibleConstructorReturn(this, _SchemaProvider3.call(this));
  }

  SwaggerSchemaProvider.prototype.getSchema = function getSchema() {
    var self = this;
    return new _swaggerClient2.default({
      url: this._definitionUrl,
      usePromise: true
    }).then(function (client) {
      var result = new Schema();
      _.forEach(client.apis[self.apiName].apis[self.methodName].parameters, function (p) {
        result.parameters.push(p);
      });
      if (client.definitions[self.modelName]) {
        _.forOwn(client.definitions[self.modelName].properties, function (value, key) {
          result.fields.push({ field: key, type: value.type });
        });
      }
      return result;
    });
  };

  SwaggerSchemaProvider.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
    configurationInfo.addValue("schema", this.schema);
    _SchemaProvider3.prototype.persistConfigurationTo.call(this, configurationInfo);
  };

  SwaggerSchemaProvider.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
    this.schema = configurationInfo.getValue("schema");
    _SchemaProvider3.prototype.restoreConfigurationFrom.call(this, configurationInfo);
  };

  return SwaggerSchemaProvider;
}(SchemaProvider);