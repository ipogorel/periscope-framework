'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwaggerSchemaProvider = exports.StaticSchemaProvider = exports.SchemaProvider = exports.WidgetBehavior = exports.SettingsHandleBehavior = exports.DataSourceHandleBehavior = exports.DataSourceChangedBehavior = exports.DataSelectedBehavior = exports.DataFilterHandleBehavior = exports.DataFilterChangedBehavior = exports.DataFieldSelectedBehavior = exports.DataActivatedBehavior = exports.WidgetEvent = exports.WidgetEventMessage = exports.ReplaceWidgetBehavior = exports.ManageNavigationStackBehavior = exports.DashboardBehavior = exports.CreateWidgetBehavior = exports.ChangeRouteBehavior = exports.FormatValueConverter = exports.StaticJsonDataService = exports.JsonDataService = exports.DataServiceConfiguration = exports.DataService = exports.Schema = exports.UserStateStorage = exports.Storage = exports.StateUrlParser = exports.StateDiscriminator = exports.Factory = exports.DashboardManager = exports.PeriscopeRouter = exports.NavigationHistory = exports.UrlHelper = exports.StringHelper = exports.GuidHelper = exports.DataHelper = exports.Grammar = exports.ExpressionParser = exports.ExpressionParserFactory = exports.DslExpressionManager = exports.DslExpressionManagerFactory = exports.Query = exports.QueryExpressionEvaluator = exports.DataSourceConfiguration = exports.Datasource = exports.DataHolder = exports.DashboardConfiguration = exports.MemoryCacheStorage = exports.CacheStorage = exports.CacheManager = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _dec, _class, _dec2, _class2, _dec3, _class3, _class4, _dec4, _class5, _dec5, _dec6, _class6, _dec7, _dec8, _class7;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _pegjs = require('pegjs');

var peg = _interopRequireWildcard(_pegjs);

var _numeral = require('numeral');

var _numeral2 = _interopRequireDefault(_numeral);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _aureliaFramework = require('aurelia-framework');

var _aureliaFetchClient = require('aurelia-fetch-client');

var _aureliaEventAggregator = require('aurelia-event-aggregator');

var _aureliaRouter = require('aurelia-router');

var _swaggerClient = require('swagger-client');

var _swaggerClient2 = _interopRequireDefault(_swaggerClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CacheManager = exports.CacheManager = function () {
  function CacheManager(storage) {
    _classCallCheck(this, CacheManager);

    this._cacheStorage = storage;
    this._cleanInterval = 5000;
  }

  CacheManager.prototype.startCleaner = function startCleaner() {
    var _this = this;

    if (!this.cleaner) {
      (function () {
        var self = _this;
        _this.cleaner = window.setInterval(function () {
          self._cacheStorage.removeExpired();
        }, _this._cleanInterval);
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

    var _this2 = _possibleConstructorReturn(this, _CacheStorage.call(this));

    _this2._cache = {};
    return _this2;
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

var DataHolder = exports.DataHolder = function () {
  function DataHolder() {
    _classCallCheck(this, DataHolder);
  }

  _createClass(DataHolder, [{
    key: 'data',
    get: function get() {
      return this._data;
    },
    set: function set(value) {
      this._data = value;
    }
  }, {
    key: 'total',
    get: function get() {
      return this._total;
    },
    set: function set(value) {
      this._total = value;
    }
  }, {
    key: 'query',
    get: function get() {
      return this._query;
    },
    set: function set(value) {
      this._query = value;
    }
  }]);

  return DataHolder;
}();

var Datasource = exports.Datasource = function () {
  function Datasource(datasourceConfiguration) {
    _classCallCheck(this, Datasource);

    this._name = datasourceConfiguration.name;
    this._transport = datasourceConfiguration.transport;
    this._schemeConfig = datasourceConfiguration.schemeConfig;
    this._cache = datasourceConfiguration.cache;
  }

  Datasource.prototype.createDataHolder = function createDataHolder() {
    return new DataHolder(this);
  };

  Datasource.prototype.cacheOn = function cacheOn(cacheKey) {
    if (this._cache && this._cache.cacheManager) {
      var storage = this._cache.cacheManager.getStorage();
      return storage.getItem(cacheKey);
    }
  };

  Datasource.prototype.getData = function getData(query) {
    var _this3 = this;

    var dataHolder = new DataHolder();
    dataHolder.query = query;

    if (!this.transport && !this.transport.readService) throw "readService is not configured";

    var storage = void 0;
    var cacheKey = this.transport.readService.url + query.cacheKey();
    if (this._cache && this._cache.cacheManager) {
      storage = this._cache.cacheManager.getStorage();
      var cachedDataHolder = storage.getItem(cacheKey);
      if (cachedDataHolder) {
        dataHolder.data = cachedDataHolder.data;
        dataHolder.total = cachedDataHolder.total;
        return new Promise(function (resolve, reject) {
          resolve(dataHolder);
        });
      }
    }
    return this.transport.readService.read({
      fields: query.fields,
      filter: query.serverSideFilter ? query.serverSideFilter : "",
      take: query.take,
      skip: query.skip,
      sort: query.sort,
      sortDir: query.sortDir
    }).then(function (d) {
      dataHolder.data = _.isArray(d.data) ? d.data : [d.data];
      dataHolder.total = d.total;
      if (storage) storage.setItem(cacheKey, { data: dataHolder.data, total: dataHolder.total }, _this3._cache.cacheTimeSeconds);
      return dataHolder;
    });
  };

  Datasource.prototype.create = function create(entity) {
    if (!this.transport && !this.transport.createService) throw "createService is not configured";
    return this.transport.createService.create(entity);
  };

  Datasource.prototype.update = function update(id, entity) {
    if (!this.transport && !this.transport.updateService) throw "updateService is not configured";
    return this.transport.updateService.update(id, entity);
  };

  Datasource.prototype.delete = function _delete(id, entity) {
    if (!this.transport && !this.transport.deleteService) throw "deleteService is not configured";
    return this.transport.updateService.delete(entity);
  };

  _createClass(Datasource, [{
    key: 'name',
    get: function get() {
      return this._name;
    }
  }, {
    key: 'transport',
    get: function get() {
      return this._transport;
    }
  }, {
    key: 'cacheManager',
    get: function get() {
      return this._cacheManager;
    }
  }]);

  return Datasource;
}();

var DataSourceConfiguration = exports.DataSourceConfiguration = function () {
  function DataSourceConfiguration() {
    _classCallCheck(this, DataSourceConfiguration);
  }

  _createClass(DataSourceConfiguration, [{
    key: 'cache',
    get: function get() {
      return this._cache;
    },
    set: function set(value) {
      this._cache = value;
    }
  }, {
    key: 'transport',
    get: function get() {
      return this._transport;
    },
    set: function set(value) {
      this._transport = value;
    }
  }, {
    key: 'name',
    get: function get() {
      return this._name;
    },
    set: function set(value) {
      this._name = value;
    }
  }]);

  return DataSourceConfiguration;
}();

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
      for (var _iterator = data, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var record = _ref;

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
    return Math.abs(StringHelper.hashCode((this.serverSideFilter ? this.serverSideFilter : "") + (this.fields ? this.fields.join("") : "") + (this.sort ? this.sort : "") + (this.sortDir ? this.sortDir : "") + (this.take ? this.take : "0") + (this.skip ? this.skip : "0")));
  };

  _createClass(Query, [{
    key: 'sort',
    get: function get() {
      return this._sort;
    },
    set: function set(value) {
      this._sort = value;
    }
  }, {
    key: 'group',
    get: function get() {
      return this._group;
    },
    set: function set(value) {
      this._group = value;
    }
  }, {
    key: 'sortDir',
    get: function get() {
      return this._sortDir;
    },
    set: function set(value) {
      this._sortDir = value;
    }
  }, {
    key: 'take',
    get: function get() {
      return this._take;
    },
    set: function set(value) {
      this._take = value;
    }
  }, {
    key: 'fields',
    get: function get() {
      return this._fields;
    },
    set: function set(value) {
      this._fields = value;
    }
  }, {
    key: 'skip',
    get: function get() {
      return this._skip;
    },
    set: function set(value) {
      this._skip = value;
    }
  }, {
    key: 'serverSideFilter',
    get: function get() {
      return this._serverSideFilter;
    },
    set: function set(value) {
      this._serverSideFilter = value;
    }
  }]);

  return Query;
}();

var DslExpressionManagerFactory = exports.DslExpressionManagerFactory = (_dec = (0, _aureliaFramework.inject)(ExpressionParserFactory), _dec(_class = function () {
  function DslExpressionManagerFactory(expressionParserFactory) {
    _classCallCheck(this, DslExpressionManagerFactory);

    this.expressionParserFactory = expressionParserFactory;
  }

  DslExpressionManagerFactory.prototype.createInstance = function createInstance(dataSource, fields) {
    var _this4 = this;

    return dataSource.transport.readService.getSchema().then(function (schema) {
      var fields = schema.fields;
      var allFields = _.map(fields, "field");
      var numericFields = _.map(DataHelper.getNumericFields(fields), "field");
      var stringFields = _.map(DataHelper.getStringFields(fields), "field");
      var dateFields = _.map(DataHelper.getDateFields(fields), "field");
      var parser = _this4.expressionParserFactory.createInstance(numericFields, stringFields, dateFields);
      return new DslExpressionManager(parser, dataSource, allFields);
    });
  };

  return DslExpressionManagerFactory;
}()) || _class);

var DslExpressionManager = exports.DslExpressionManager = function () {
  function DslExpressionManager(parser, dataSource, fieldsList) {
    _classCallCheck(this, DslExpressionManager);

    this.dataSource = dataSource;
    this.fields = fieldsList;
    this.parser = parser;
  }

  DslExpressionManager.prototype.populate = function populate(searchStr, lastWord) {
    var parserError = this.getParserError(searchStr);
    return this._getIntellisenseData(searchStr, lastWord, parserError);
  };

  DslExpressionManager.prototype.parse = function parse(searchStr) {
    var expression = this.parser.parse(searchStr);
    return this._normalizeSerachExpression(expression);
  };

  DslExpressionManager.prototype.validate = function validate(searchStr) {
    return this.parser.validate(searchStr);
  };

  DslExpressionManager.prototype.expectedToken = function expectedToken(searchStr) {
    var tokenName = "";
    var parserError = this.getParserError(searchStr);
    if (parserError != null) tokenName = this._interpreteParserError(parserError);
    return tokenName;
  };

  DslExpressionManager.prototype.getParserError = function getParserError(searchStr) {
    var result = null;
    if (searchStr != "") {
      try {
        this.parse(searchStr);
        try {
          this.parse(searchStr + "^");
        } catch (ex2) {
          result = ex2;
        }
      } catch (ex) {
        result = ex;
      }
    }
    return result;
  };

  DslExpressionManager.prototype._getIntellisenseData = function _getIntellisenseData(searchStr, lastWord, pegException) {
    var _this5 = this;

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
          var filteredFields = lastWord ? _.filter(_this5.fields, function (f) {
            return f.toLowerCase().startsWith(lastWord.toLowerCase());
          }) : _this5.fields;
          resolve(_this5._normalizeData("field", filteredFields.sort()));
          break;
        case "STRING_OPERATOR_EQUAL":
        case "STRING_OPERATOR_IN":
          resolve(_this5._normalizeData("operator", _this5._getStringComparisonOperatorsArray()));
          break;
        case "STRING_VALUE":
        case "STRING_PATTERN":
          lastFldName = _this5._getLastFieldName(searchStr, _this5.fields, pegException.column);
          _this5._getFieldValuesArray(lastFldName, lastWord).then(function (data) {
            resolve(_this5._normalizeData("string", data));
          });
          break;
        case "STRING_VALUES_ARRAY":
          lastFldName = _this5._getLastFieldName(searchStr, _this5.fields, pegException.column);
          _this5._getFieldValuesArray(lastFldName, lastWord).then(function (data) {
            resolve(_this5._normalizeData("array_string", data));
          });
          break;
          resolve(_this5._normalizeData("array_string", []));
          break;
        case "OPERATOR":
          resolve(_this5._normalizeData("operator", _this5._getComparisonOperatorsArray()));
          break;
        case "LOGIC_OPERATOR":
        case "end of input":
          resolve(_this5._normalizeData("operator", _this5._getLogicalOperatorsArray()));
          break;
        default:
          resolve([]);
          break;
      }
    });
  };

  DslExpressionManager.prototype._interpreteParserError = function _interpreteParserError(ex) {
    if (Object.prototype.toString.call(ex.expected) == "[object Array]") {
      for (var _iterator2 = ex.expected, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var desc = _ref2;

        if (desc.type == "other" || desc.type == "end") {
          return desc.description;
        }
      }
    }
    return "";
  };

  DslExpressionManager.prototype._getLogicalOperatorsArray = function _getLogicalOperatorsArray() {
    return ["and", "or"];
  };

  DslExpressionManager.prototype._getComparisonOperatorsArray = function _getComparisonOperatorsArray() {
    return ["!=", "=", ">", "<", ">=", "<="];
  };

  DslExpressionManager.prototype._getLastFieldName = function _getLastFieldName(searchStr, fieldsArray, index) {
    var tmpArr = searchStr.substr(0, index).split(" ");

    var _loop = function _loop(i) {
      var j = fieldsArray.findIndex(function (x) {
        return x.toLowerCase() == tmpArr[i].trim().toLowerCase();
      });
      if (j >= 0) return {
          v: fieldsArray[j]
        };
    };

    for (var i = tmpArr.length - 1; i >= 0; i--) {
      var _ret2 = _loop(i);

      if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
    }
    return "";
  };

  DslExpressionManager.prototype._getStringComparisonOperatorsArray = function _getStringComparisonOperatorsArray() {
    return ["=", "in"];
  };

  DslExpressionManager.prototype._getFieldValuesArray = function _getFieldValuesArray(fieldName, lastWord) {
    var query = new Query();
    query.take = 100;
    query.skip = 0;
    if (lastWord) query.serverSideFilter = this.parse(fieldName + " = '" + lastWord + "%'");else query.serverSideFilter = "";
    query.fields = [fieldName];
    return this.dataSource.getData(query).then(function (dH) {
      var result = _.map(dH.data, fieldName);
      return _.uniq(result).sort();
    });
  };

  DslExpressionManager.prototype._normalizeData = function _normalizeData(type, dataArray) {
    return _.map(dataArray, function (d) {
      return { type: type, value: d };
    });
  };

  DslExpressionManager.prototype._normalizeSerachExpression = function _normalizeSerachExpression(searchExpression) {
    var expr = new RegExp('record.([a-zA-Z0-9\%\_\-]*)', 'g');
    var match;
    while ((match = expr.exec(searchExpression)) !== null) {
      for (var _iterator3 = this.fields, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref3 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref3 = _i3.value;
        }

        var fld = _ref3;

        if (match[1].toLowerCase() === fld.toLowerCase()) searchExpression = StringHelper.replaceAll(searchExpression, match[0], 'record.' + fld);
      }
    }
    return searchExpression;
  };

  return DslExpressionManager;
}();

var ExpressionParserFactory = exports.ExpressionParserFactory = (_dec2 = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec2(_class2 = function () {
  function ExpressionParserFactory(http) {
    _classCallCheck(this, ExpressionParserFactory);

    http.configure(function (config) {
      config.useStandardConfiguration();
    });
    this.http = http;
  }

  ExpressionParserFactory.prototype.createInstance = function createInstance(numericFieldList, stringFieldList, dateFieldList) {
    var that = this;
    var text = new Grammar().getGrammar();
    var parserText = text.replace('@S@', that.concatenateFieldList(stringFieldList)).replace('@N@', that.concatenateFieldList(numericFieldList)).replace('@D@', that.concatenateFieldList(dateFieldList));
    return new ExpressionParser(peg.buildParser(parserText));
  };

  ExpressionParserFactory.prototype.concatenateFieldList = function concatenateFieldList(fieldList) {
    for (var i = 0; i < fieldList.length; i++) {
      fieldList[i] = '\'' + fieldList[i] + '\'i';
    }
    if (fieldList.length > 0) return fieldList.join('/ ');else return "'unknown_field'";
  };

  return ExpressionParserFactory;
}()) || _class2);

var ExpressionParser = exports.ExpressionParser = function () {
  function ExpressionParser(pegParser) {
    _classCallCheck(this, ExpressionParser);

    this.parser = pegParser;
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

var DSL_GRAMMAR = '\n{\nfunction createStringExpression(fieldname, value){\n \t\tvar prefix = "record.";\n \t\tvar result = "";\n \t\tvar v = value.trim().toLowerCase();\n        if (v.length>=2){\n          if ((v.indexOf("%")===0)&&(v.lastIndexOf("%")===(v.length-1)))\n              result = prefix + fieldname + ".toLowerCase().includes(\'" + v.substring(1,value.length-1) + "\')"\n          else if (v.indexOf("%")===0)\n              result = prefix + fieldname + ".toLowerCase().endsWith(\'" + v.substring(1,value.length) + "\')"\n          else if (v.lastIndexOf("%")===(value.length-1))\n              result = prefix + fieldname + ".toLowerCase().startsWith(\'" + v.substring(0,value.length-1) + "\')"\n        }\n        if (result == "")\n          result = prefix + fieldname + ".toLowerCase() == \'" + v + "\'";\n\n        result="(" + prefix + fieldname + "!=null && " + result + ")"\n\n        return result;\n }\n  function createInExpression (fieldname, value) {\n    var result = "";\n    var values = value.split(\',\');\n    for (var i=0;i<values.length;i++)\n    {\n      var find = \'[\\"\\\']\';\n      var re = new RegExp(find, \'g\');\n      var v = values[i].replace(new RegExp(find, \'g\'), "");\n      //result += "record." + fieldname + ".toLowerCase() ==" + v.trim().toLowerCase();\n      result += createStringExpression(fieldname, v)\n      if (i<(values.length-1))\n        result += " || ";\n    }\n    if (result.length>0)\n      result = "(" + result + ")"\n    return result;\n  }\n}\n\nstart = expression\n\nexpression = c:condition j:join e:expression space? {return c+j+e;}\n           / c:condition space? {return c;}\n\njoin "LOGIC_OPERATOR"\n     = and\n     / or\n\nand = space* "and"i space* {return " && ";}\n\nor = space* "or"i space* {return " || ";}\n\n\ncondition = space? f:stringField o:op_eq v:stringValue {return createStringExpression(f,v);}\n          / space? f:stringField o:op_in a:valuesArray {return createInExpression(f,a);}\n          / space? f:numericField o:op v:numericValue {return "record." + f + o + v;}\n          / space? f:dateField o:op v:dateValue {return "record." + f + o + v;}\n          / "(" space? e:expression space* ")" space* {return "(" + e +")";}\n\n\n\nvaluesArray "STRING_VALUES_ARRAY"\n      = parentheses_l va:$(v:stringValue space* nextValue*)+ parentheses_r {return  va }\n\nnextValue = nv:(space* "," space* v:stringValue) {return  nv}\n\n\n\ndateValue "DATE_VALUE"\n        = quote? dt:$(date+) quote? {return "\'" + dt + "\'";}\n\n\nstringValue  "STRING_VALUE"\n\t  = quote w:$(char+) quote {return  w }\n      / quote quote {return "";}\n\n\nnumericValue  "NUMERIC_VALUE"\n       = $(numeric+)\n\n\nop "OPERATOR"\n   = op_eq\n   / ge\n   / gt\n   / le\n   / lt\n\nop_eq "STRING_OPERATOR_EQUAL"\n  = eq\n  / not_eq\n\nop_in "STRING_OPERATOR_IN"\n  = in\n\neq = space* "=" space* {return "==";}\n\nnot_eq = space* "!=" space* {return "!=";}\n\ngt = space* v:">" space* {return v;}\n\nge = space* v:">=" space* {return v;}\n\nlt = space* v:"<" space* {return v;}\n\nle = space* v:"<=" space* {return v;}\n\nin = space* v:"in" space* {return v;}\n\n\ndate = [0-9 \\:\\/]\n\nchar = [a-z0-9 \\%\\$\\_\\-\\:\\,\\.\\/]i\n\nnumeric = [0-9-\\.]\n\nspace = [ \\t\\n\\r]+\n\nparentheses_l = [\\(] space*\n\nparentheses_r = space* [\\)]\n\nfield "FIELD_NAME"\n      = stringField\n     / numericField\n     / dateField\n\nstringField "STRING_FIELD_NAME"\n     = @S@\n\nnumericField "NUMERIC_FIELD_NAME"\n     = @N@\n\ndateField "DATE_FIELD_NAME"\n     = @D@\n\nquote = [\\\'\\"]\n\n\n';

var Grammar = exports.Grammar = function () {
  function Grammar() {
    _classCallCheck(this, Grammar);
  }

  Grammar.prototype.getGrammar = function getGrammar() {
    return DSL_GRAMMAR;
  };

  return Grammar;
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

  UrlHelper.objectToQuery = function objectToQuery(ar) {
    return encodeURIComponent(JSON.stringify(ar));
  };

  UrlHelper.queryToObject = function queryToObject(queryParam) {
    return JSON.parse(queryParam);
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

var PeriscopeRouter = exports.PeriscopeRouter = (_dec3 = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _aureliaEventAggregator.EventAggregator, UserStateStorage, NavigationHistory, StateUrlParser), _dec3(_class3 = function () {
  function PeriscopeRouter(aureliaRouter, eventAggregator, userStateStorage, navigationHistory) {
    _classCallCheck(this, PeriscopeRouter);

    this._aureliaRouter = aureliaRouter;
    this._navigationHistory = navigationHistory;
    this._userStateStorage = userStateStorage;
    this._eventAggregator = eventAggregator;
  }

  PeriscopeRouter.prototype.navigate = function navigate(routeItem) {
    if (this.currentRouteItem) {
      var currentWidgetsState = StateDiscriminator.discriminate(this._userStateStorage.getAll(this.currentRouteItem.dashboardName));
      var url = "/" + this.currentRouteItem.dashboardName + StateUrlParser.stateToQuery(currentWidgetsState);
      if (_.filter(this._navigationHistory.items, function (i) {
        return StringHelper.compare(i.url, url);
      }).length === 0) {
        this._navigationHistory.add(url, this.currentRouteItem.title, this.currentRouteItem.dashboardName, currentWidgetsState, new Date());
      } else if (!StringHelper.compare(url, this.currentRouteItem.route)) {
        this._navigationHistory.update(url, new Date());
      }
    }

    var routeWidgetsState = StateUrlParser.queryToState(routeItem.route);
    var storageWidgetsState = StateDiscriminator.discriminate(this._userStateStorage.getAll(routeItem.dashboardName));
    for (var _iterator7 = storageWidgetsState, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
      var _ref7;

      if (_isArray7) {
        if (_i7 >= _iterator7.length) break;
        _ref7 = _iterator7[_i7++];
      } else {
        _i7 = _iterator7.next();
        if (_i7.done) break;
        _ref7 = _i7.value;
      }

      var oldSt = _ref7;

      this._userStateStorage.remove(oldSt.key);
    }for (var _iterator8 = routeWidgetsState, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
      var _ref8;

      if (_isArray8) {
        if (_i8 >= _iterator8.length) break;
        _ref8 = _iterator8[_i8++];
      } else {
        _i8 = _iterator8.next();
        if (_i8.done) break;
        _ref8 = _i8.value;
      }

      var newSt = _ref8;

      this._userStateStorage.set(newSt.key, newSt.value);
    }
    if (_.filter(this._navigationHistory.items, function (i) {
      return StringHelper.compare(i.url, routeItem.route);
    }).length === 0) {
      this._navigationHistory.add(routeItem.route, routeItem.title, routeItem.dashboardName, this._userStateStorage.getAll(routeItem.dashboardName), new Date());
    }

    this.currentRouteItem = routeItem;
    this._aureliaRouter.navigate(routeItem.route);
  };

  _createClass(PeriscopeRouter, [{
    key: 'currentRouteItem',
    get: function get() {
      return this._currentRoute;
    },
    set: function set(value) {
      this._currentRoute = value;
    }
  }]);

  return PeriscopeRouter;
}()) || _class3);

var DashboardManager = exports.DashboardManager = function () {
  function DashboardManager() {
    _classCallCheck(this, DashboardManager);

    this._dashboards = [];
  }

  DashboardManager.prototype.find = function find(dashboardName) {
    return _.find(this._dashboards, { name: dashboardName });
  };

  DashboardManager.prototype.createDashboard = function createDashboard(type, dashboardConfiguration) {
    var dashboard = new type();
    dashboard.configure(dashboardConfiguration);
    this._dashboards.push(dashboard);
    return dashboard;
  };

  _createClass(DashboardManager, [{
    key: 'dashboards',
    get: function get() {
      return this._dashboards;
    }
  }]);

  return DashboardManager;
}();

var Factory = exports.Factory = (0, _aureliaFramework.resolver)(_class4 = function () {
  function Factory(Type) {
    _classCallCheck(this, Factory);

    this.Type = Type;
  }

  Factory.prototype.get = function get(container) {
    var _this6 = this;

    return function () {
      for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }

      return container.invoke(_this6.Type, rest);
    };
  };

  Factory.of = function of(Type) {
    return new Factory(Type);
  };

  return Factory;
}()) || _class4;

var StateDiscriminator = exports.StateDiscriminator = function () {
  function StateDiscriminator() {
    _classCallCheck(this, StateDiscriminator);
  }

  StateDiscriminator.discriminate = function discriminate(widgetStates) {
    var result = [];
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

      if (ws.value.stateType === "searchBoxState") result.push(ws);
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
    for (var _iterator10 = widgetStates, _isArray10 = Array.isArray(_iterator10), _i10 = 0, _iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator]();;) {
      var _ref10;

      if (_isArray10) {
        if (_i10 >= _iterator10.length) break;
        _ref10 = _iterator10[_i10++];
      } else {
        _i10 = _iterator10.next();
        if (_i10.done) break;
        _ref10 = _i10.value;
      }

      var widgetState = _ref10;

      params.push({ "sk": widgetState.key, "sv": widgetState.value });
    }
    return params.length > 0 ? "?q=" + UrlHelper.objectToQuery(params) : "";
  };

  StateUrlParser.queryToState = function queryToState(url) {
    var result = [];
    var q = UrlHelper.getParameterByName("q", url);
    if (q) {
      var widgetStates = UrlHelper.queryToObject(q);
      for (var _iterator11 = widgetStates, _isArray11 = Array.isArray(_iterator11), _i11 = 0, _iterator11 = _isArray11 ? _iterator11 : _iterator11[Symbol.iterator]();;) {
        var _ref11;

        if (_isArray11) {
          if (_i11 >= _iterator11.length) break;
          _ref11 = _iterator11[_i11++];
        } else {
          _i11 = _iterator11.next();
          if (_i11.done) break;
          _ref11 = _i11.value;
        }

        var ws = _ref11;

        result.push({ "key": ws.sk, "value": ws.sv });
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

var UserStateStorage = exports.UserStateStorage = (_dec4 = (0, _aureliaFramework.inject)(Storage), _dec4(_class5 = function () {
  function UserStateStorage(storage) {
    _classCallCheck(this, UserStateStorage);

    this._storage = STORAGE_KEY;
    this._key = storageKey;
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
}()) || _class5);

var Schema = exports.Schema = function Schema() {
  _classCallCheck(this, Schema);

  this.fields = [];
  this.parameters = [];
};

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
    key: 'url',
    get: function get() {
      return this._url;
    }
  }, {
    key: 'schemaProvider',
    get: function get() {
      return this._schemaProvider;
    }
  }, {
    key: 'totalMapper',
    get: function get() {
      return this._totalMapper;
    }
  }, {
    key: 'queryMapper',
    get: function get() {
      return this._queryMapper;
    }
  }, {
    key: 'dataMapper',
    get: function get() {
      return this._dataMapper;
    }
  }]);

  return DataServiceConfiguration;
}();

var JsonDataService = exports.JsonDataService = (_dec5 = (0, _aureliaFramework.transient)(), _dec6 = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec5(_class6 = _dec6(_class6 = function (_DataService) {
  _inherits(JsonDataService, _DataService);

  function JsonDataService(http) {
    _classCallCheck(this, JsonDataService);

    var _this7 = _possibleConstructorReturn(this, _DataService.call(this));

    http.configure(function (config) {
      config.useStandardConfiguration();
    });
    _this7._http = http;
    return _this7;
  }

  JsonDataService.prototype.read = function read(options) {
    var _this8 = this;

    var url = this.url + (this.queryMapper ? this.queryMapper(options) : "");
    return this._http.fetch(this.url).then(function (response) {
      return response.json();
    }).then(function (jsonData) {
      return {
        data: _this8.dataMapper ? _this8.dataMapper(jsonData) : jsonData,
        total: _this8.totalMapper ? _this8.totalMapper(jsonData) : jsonData.length
      };
    });
  };

  return JsonDataService;
}(DataService)) || _class6) || _class6);
var StaticJsonDataService = exports.StaticJsonDataService = (_dec7 = (0, _aureliaFramework.transient)(), _dec8 = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec7(_class7 = _dec8(_class7 = function (_DataService2) {
  _inherits(StaticJsonDataService, _DataService2);

  function StaticJsonDataService(http) {
    _classCallCheck(this, StaticJsonDataService);

    var _this9 = _possibleConstructorReturn(this, _DataService2.call(this));

    http.configure(function (config) {
      config.useStandardConfiguration();
    });
    _this9._http = http;
    return _this9;
  }

  StaticJsonDataService.prototype.read = function read(options) {
    var _this10 = this;

    return this._http.fetch(this.url).then(function (response) {
      return response.json();
    }).then(function (jsonData) {
      var d = jsonData;
      d = _this10.dataMapper ? _this10.dataMapper(d) : d;
      if (options.filter) {
        var evaluator = new QueryExpressionEvaluator();
        d = evaluator.evaluate(d, options.filter);
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
        total: _this10.totalMapper ? _this10.totalMapper(jsonData) : total
      };
    });
  };

  return StaticJsonDataService;
}(DataService)) || _class7) || _class7);

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

var ChangeRouteBehavior = exports.ChangeRouteBehavior = function (_DashboardBehavior) {
  _inherits(ChangeRouteBehavior, _DashboardBehavior);

  function ChangeRouteBehavior(settings) {
    _classCallCheck(this, ChangeRouteBehavior);

    var _this11 = _possibleConstructorReturn(this, _DashboardBehavior.call(this));

    _this11._chanel = settings.chanel;
    _this11._eventAggregator = settings.eventAggregator;
    _this11._newRoute = settings.newRoute;
    _this11._router = settings.router;
    _this11._paramsMapper = settings.paramsMapper;
    return _this11;
  }

  ChangeRouteBehavior.prototype.attach = function attach(dashboard) {
    _DashboardBehavior.prototype.attach.call(this, dashboard);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._chanel, function (message) {
      var params = me._paramsMapper ? me._paramsMapper(message) : "";
      if (params !== "" && params.indexOf("?") != 0) params = "?" + params;
      var navItem = {
        route: me._newRoute.route + (params !== "" ? params : ""),
        title: me._newRoute.title,
        dashboardName: me._newRoute.dashboardName
      };
      me._router.navigate(navItem);
    });
  };

  ChangeRouteBehavior.prototype.detach = function detach() {
    _DashboardBehavior.prototype.detach.call(this, dashboard);
    if (this.subscription) this.subscription.dispose();
  };

  return ChangeRouteBehavior;
}(DashboardBehavior);

var CreateWidgetBehavior = exports.CreateWidgetBehavior = function (_DashboardBehavior2) {
  _inherits(CreateWidgetBehavior, _DashboardBehavior2);

  function CreateWidgetBehavior(chanel, widgetType, widgetSettings, widgetDimensions, eventAggregator, filterMapper) {
    _classCallCheck(this, CreateWidgetBehavior);

    var _this12 = _possibleConstructorReturn(this, _DashboardBehavior2.call(this));

    _this12._chanel = chanel;
    _this12._widgetType = widgetType;
    _this12._widgetSettings = widgetSettings;
    _this12._widgetDimensions = widgetDimensions;
    _this12._eventAggregator = eventAggregator;
    _this12._filterMapper = filterMapper;
    return _this12;
  }

  CreateWidgetBehavior.prototype.attach = function attach(dashboard) {
    var _this13 = this;

    _DashboardBehavior2.prototype.attach.call(this, dashboard);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._chanel, function (message) {
      var w = dashboard.getWidgetByName(me._widgetSettings.name);
      if (!w) {
        var w = new me._widgetType(me._widgetSettings);
        dashboard.addWidget(w, _this13._widgetDimensions);
      }
      w.dataFilter = me._filterMapper ? me._filterMapper(message) : "";
      w.refresh();
    });
  };

  CreateWidgetBehavior.prototype.detach = function detach() {
    _DashboardBehavior2.prototype.detach.call(this, dashboard);
    if (this.subscription) this.subscription.dispose();
  };

  return CreateWidgetBehavior;
}(DashboardBehavior);

var DashboardBehavior = exports.DashboardBehavior = function () {
  function DashboardBehavior() {
    _classCallCheck(this, DashboardBehavior);
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

  _createClass(DashboardBehavior, [{
    key: 'dashboard',
    get: function get() {
      return this._dashboard;
    }
  }]);

  return DashboardBehavior;
}();

var ManageNavigationStackBehavior = exports.ManageNavigationStackBehavior = function (_DashboardBehavior3) {
  _inherits(ManageNavigationStackBehavior, _DashboardBehavior3);

  function ManageNavigationStackBehavior(eventAggregator) {
    _classCallCheck(this, ManageNavigationStackBehavior);

    var _this14 = _possibleConstructorReturn(this, _DashboardBehavior3.call(this));

    _this14._eventAggregator = eventAggregator;
    return _this14;
  }

  ManageNavigationStackBehavior.prototype.attach = function attach(dashboard) {
    _DashboardBehavior3.prototype.attach.call(this, dashboard);
    var me = this;

    this.subscription = this._eventAggregator.subscribe("widget-back-button-channel", function (message) {
      var originatorWidget = dashboard.getWidgetByName(message.originatorName);
      if (originatorWidget) {
        var previousWidget = message.navigationStack.pop();
        dashboard.replaceWidget(originatorWidget, previousWidget);
      }
    });
  };

  ManageNavigationStackBehavior.prototype.detach = function detach() {
    _DashboardBehavior3.prototype.detach.call(this, dashboard);
    if (this.subscription) this.subscription.dispose();
  };

  return ManageNavigationStackBehavior;
}(DashboardBehavior);

var ReplaceWidgetBehavior = exports.ReplaceWidgetBehavior = function (_DashboardBehavior4) {
  _inherits(ReplaceWidgetBehavior, _DashboardBehavior4);

  function ReplaceWidgetBehavior(chanel, eventAggregator, widgetToReplaceName, widgetType, widgetSettings, mapper) {
    _classCallCheck(this, ReplaceWidgetBehavior);

    var _this15 = _possibleConstructorReturn(this, _DashboardBehavior4.call(this));

    _this15._chanel = chanel;
    _this15._widgetType = widgetType;
    _this15._widgetSettings = widgetSettings;
    _this15._eventAggregator = eventAggregator;
    _this15._widgetToReplaceName = widgetToReplaceName;
    _this15._mapper = mapper;
    return _this15;
  }

  ReplaceWidgetBehavior.prototype.attach = function attach(dashboard) {
    _DashboardBehavior4.prototype.attach.call(this, dashboard);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._chanel, function (message) {
      var originatorWidget = dashboard.getWidgetByName(me._widgetToReplaceName);
      var w = new me._widgetType(me._widgetSettings);
      dashboard.replaceWidget(originatorWidget, w);
      if (me._mapper) w.dataFilter = me._mapper(message);
      w.refresh();
    });
  };

  ReplaceWidgetBehavior.prototype.detach = function detach() {
    _DashboardBehavior4.prototype.detach.call(this, dashboard);
    if (this.subscription) this.subscription.dispose();
  };

  return ReplaceWidgetBehavior;
}(DashboardBehavior);

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

    this._handlers = [];
    this._originatorName = widgetName;
  }

  WidgetEvent.prototype.attach = function attach(handler) {
    if (this._handlers.some(function (e) {
      return e === handler;
    })) {
      return;
    }
    this._handlers.push(handler);
  };

  WidgetEvent.prototype.detach = function detach(handler) {
    var idx = this._handlers.indexOf(handler);
    if (idx < 0) {
      return;
    }
    this.handler.splice(idx, 1);
  };

  WidgetEvent.prototype.raise = function raise() {
    for (var i = 0; i < this._handlers.length; i++) {
      this._handlers[i].apply(this, arguments);
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

var DataActivatedBehavior = exports.DataActivatedBehavior = function (_WidgetBehavior) {
  _inherits(DataActivatedBehavior, _WidgetBehavior);

  function DataActivatedBehavior(chanel, eventAggregator) {
    _classCallCheck(this, DataActivatedBehavior);

    var _this16 = _possibleConstructorReturn(this, _WidgetBehavior.call(this));

    _this16._chanel = chanel;
    _this16._eventAggregator = eventAggregator;
    return _this16;
  }

  DataActivatedBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    _WidgetBehavior.prototype.attachToWidget.call(this, widget);
    var me = this;

    widget.dataActivated = function (currentRecord) {
      var message = new WidgetEventMessage(me.widget.name);
      message.activatedData = currentRecord;
      me._eventAggregator.publish(me._chanel, message);
    };
  };

  DataActivatedBehavior.prototype.detach = function detach() {
    _WidgetBehavior.prototype.detach.call(this, dashboard);
  };

  return DataActivatedBehavior;
}(WidgetBehavior);

var DataFieldSelectedBehavior = exports.DataFieldSelectedBehavior = function (_WidgetBehavior2) {
  _inherits(DataFieldSelectedBehavior, _WidgetBehavior2);

  function DataFieldSelectedBehavior(chanel, eventAggregator) {
    _classCallCheck(this, DataFieldSelectedBehavior);

    var _this17 = _possibleConstructorReturn(this, _WidgetBehavior2.call(this));

    _this17._chanel = chanel;
    _this17._eventAggregator = eventAggregator;
    return _this17;
  }

  DataFieldSelectedBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    _WidgetBehavior2.prototype.attachToWidget.call(this, widget);
    var me = this;

    widget.dataFieldSelected = function (fieldName) {
      var message = new WidgetEventMessage(me.widget.name);
      message.fieldName = fieldName;
      me._eventAggregator.publish(me._chanel, message);
    };
  };

  DataFieldSelectedBehavior.prototype.detach = function detach() {
    _WidgetBehavior2.prototype.detach.call(this, dashboard);
  };

  return DataFieldSelectedBehavior;
}(WidgetBehavior);

var DataFilterChangedBehavior = exports.DataFilterChangedBehavior = function (_WidgetBehavior3) {
  _inherits(DataFilterChangedBehavior, _WidgetBehavior3);

  function DataFilterChangedBehavior(channel, eventAggregator) {
    _classCallCheck(this, DataFilterChangedBehavior);

    var _this18 = _possibleConstructorReturn(this, _WidgetBehavior3.call(this));

    _this18._channel = channel;
    _this18._eventAggregator = eventAggregator;
    return _this18;
  }

  DataFilterChangedBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    _WidgetBehavior3.prototype.attachToWidget.call(this, widget);
    var me = this;
    widget.dataFilterChanged = function (filter) {
      var message = new WidgetEventMessage(me.widget.name);
      message.dataFilter = filter;
      me._eventAggregator.publish(me._channel, message);
    };
  };

  DataFilterChangedBehavior.prototype.detach = function detach() {
    _WidgetBehavior3.prototype.detach.call(this, dashboard);
  };

  return DataFilterChangedBehavior;
}(WidgetBehavior);

var DataFilterHandleBehavior = exports.DataFilterHandleBehavior = function (_WidgetBehavior4) {
  _inherits(DataFilterHandleBehavior, _WidgetBehavior4);

  function DataFilterHandleBehavior(channel, eventAggregator, filterMapper) {
    _classCallCheck(this, DataFilterHandleBehavior);

    var _this19 = _possibleConstructorReturn(this, _WidgetBehavior4.call(this));

    _this19._channel = channel;
    _this19._eventAggregator = eventAggregator;
    _this19._filterMapper = filterMapper;
    return _this19;
  }

  DataFilterHandleBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    _WidgetBehavior4.prototype.attachToWidget.call(this, widget);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._channel, function (message) {
      var filterToApply = me._filterMapper ? me._filterMapper(message) : message.dataFilter;
      me.widget.dataFilter = filterToApply;
      me.widget.refresh();
    });
  };

  DataFilterHandleBehavior.prototype.detach = function detach() {
    _WidgetBehavior4.prototype.detach.call(this, dashboard);
    if (this.subscription) this.subscription.dispose();
  };

  return DataFilterHandleBehavior;
}(WidgetBehavior);

var DataSelectedBehavior = exports.DataSelectedBehavior = function (_WidgetBehavior5) {
  _inherits(DataSelectedBehavior, _WidgetBehavior5);

  function DataSelectedBehavior(chanel, eventAggregator) {
    _classCallCheck(this, DataSelectedBehavior);

    var _this20 = _possibleConstructorReturn(this, _WidgetBehavior5.call(this));

    _this20._chanel = chanel;
    _this20._eventAggregator = eventAggregator;
    return _this20;
  }

  DataSelectedBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    _WidgetBehavior5.prototype.attachToWidget.call(this, widget);
    var me = this;

    widget.dataSelected = function (currentRecord) {
      var message = new WidgetEventMessage(me.widget.name);
      message.selectedData = currentRecord;
      me._eventAggregator.publish(me._chanel, message);
    };
  };

  DataSelectedBehavior.prototype.detach = function detach() {
    _WidgetBehavior5.prototype.detach.call(this, dashboard);
  };

  return DataSelectedBehavior;
}(WidgetBehavior);

var DataSourceChangedBehavior = exports.DataSourceChangedBehavior = function (_WidgetBehavior6) {
  _inherits(DataSourceChangedBehavior, _WidgetBehavior6);

  function DataSourceChangedBehavior(channel, eventAggregator) {
    _classCallCheck(this, DataSourceChangedBehavior);

    var _this21 = _possibleConstructorReturn(this, _WidgetBehavior6.call(this));

    _this21._channel = channel;
    _this21._eventAggregator = eventAggregator;
    return _this21;
  }

  DataSourceChangedBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    _WidgetBehavior6.prototype.attachToWidget.call(this, widget);
    var me = this;
    widget.dataSourceChanged = function (dataSource) {
      var message = new WidgetEventMessage(me.widget.name);
      message.dataSource = dataSource;
      me._eventAggregator.publish(me._channel, message);
    };
  };

  DataSourceChangedBehavior.prototype.detach = function detach() {
    _WidgetBehavior6.prototype.detach.call(this, dashboard);
  };

  return DataSourceChangedBehavior;
}(WidgetBehavior);

var DataSourceHandleBehavior = exports.DataSourceHandleBehavior = function (_WidgetBehavior7) {
  _inherits(DataSourceHandleBehavior, _WidgetBehavior7);

  function DataSourceHandleBehavior(channel, eventAggregator) {
    _classCallCheck(this, DataSourceHandleBehavior);

    var _this22 = _possibleConstructorReturn(this, _WidgetBehavior7.call(this));

    _this22._channel = channel;
    _this22._eventAggregator = eventAggregator;
    return _this22;
  }

  DataSourceHandleBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    _WidgetBehavior7.prototype.attachToWidget.call(this, widget);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._channel, function (message) {
      me.widget.dataSource = message.dataSource;
      me.widget.refresh();
    });
  };

  DataSourceHandleBehavior.prototype.detach = function detach() {
    _WidgetBehavior7.prototype.detach.call(this, dashboard);
    if (this.subscription) this.subscription.dispose();
  };

  return DataSourceHandleBehavior;
}(WidgetBehavior);

var SettingsHandleBehavior = exports.SettingsHandleBehavior = function (_WidgetBehavior8) {
  _inherits(SettingsHandleBehavior, _WidgetBehavior8);

  function SettingsHandleBehavior(channel, eventAggregator, messageMapper) {
    _classCallCheck(this, SettingsHandleBehavior);

    var _this23 = _possibleConstructorReturn(this, _WidgetBehavior8.call(this));

    _this23._channel = channel;
    _this23._eventAggregator = eventAggregator;
    _this23._messageMapper = messageMapper;
    return _this23;
  }

  SettingsHandleBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    _WidgetBehavior8.prototype.attachToWidget.call(this, widget);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._channel, function (message) {
      var settingsToApply = me._messageMapper ? me._messageMapper(message) : message;
      _.forOwn(settingsToApply, function (v, k) {
        me.widget[k] = v;
      });

      me.widget.refresh();
    });
  };

  SettingsHandleBehavior.prototype.detach = function detach() {
    _WidgetBehavior8.prototype.detach.call(this, dashboard);
    if (this.subscription) this.subscription.dispose();
  };

  return SettingsHandleBehavior;
}(WidgetBehavior);

var WidgetBehavior = exports.WidgetBehavior = function () {
  function WidgetBehavior() {
    _classCallCheck(this, WidgetBehavior);
  }

  WidgetBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    this._widget = widget;
    this._widget.behaviors.push(this);
  };

  WidgetBehavior.prototype.detach = function detach() {
    for (var i = 0; i < this.widget.behaviors.length; i++) {
      if (this.widget.behaviors[i] === this) {
        this.widget.behaviors.splice(i, 1);
        break;
      }
    }
  };

  _createClass(WidgetBehavior, [{
    key: 'widget',
    get: function get() {
      return this._widget;
    }
  }]);

  return WidgetBehavior;
}();

var SchemaProvider = exports.SchemaProvider = function () {
  function SchemaProvider() {
    _classCallCheck(this, SchemaProvider);
  }

  SchemaProvider.prototype.getSchema = function getSchema() {};

  return SchemaProvider;
}();

var StaticSchemaProvider = exports.StaticSchemaProvider = function (_SchemaProvider) {
  _inherits(StaticSchemaProvider, _SchemaProvider);

  function StaticSchemaProvider(schema) {
    _classCallCheck(this, StaticSchemaProvider);

    var _this24 = _possibleConstructorReturn(this, _SchemaProvider.call(this));

    _this24._schema = schema;
    return _this24;
  }

  StaticSchemaProvider.prototype.getSchema = function getSchema() {
    var _this25 = this;

    return new Promise(function (resolve, reject) {
      resolve(_this25._schema);
    });
  };

  return StaticSchemaProvider;
}(SchemaProvider);

var SwaggerSchemaProvider = exports.SwaggerSchemaProvider = function (_SchemaProvider2) {
  _inherits(SwaggerSchemaProvider, _SchemaProvider2);

  function SwaggerSchemaProvider(definitionUrl, apiName, methodName, modelName) {
    _classCallCheck(this, SwaggerSchemaProvider);

    var _this26 = _possibleConstructorReturn(this, _SchemaProvider2.call(this));

    _this26._modelName = modelName;
    _this26._methodName = methodName;
    _this26._apiName = apiName;
    _this26._definitionUrl = definitionUrl;
    return _this26;
  }

  SwaggerSchemaProvider.prototype.getSchema = function getSchema() {
    var self = this;
    return new _swaggerClient2.default({
      url: this._definitionUrl,
      usePromise: true }).then(function (client) {
      var result = new Schema();
      _.forEach(client.apis[self._apiName].apis[self._methodName].parameters, function (p) {
        result.parameters.push(p);
      });
      if (client.definitions[self._modelName]) {
        _.forOwn(client.definitions[self._modelName].properties, function (value, key) {
          result.fields.push({ field: key, type: value.type });
        });
      }
      return result;
    });
  };

  return SwaggerSchemaProvider;
}(SchemaProvider);