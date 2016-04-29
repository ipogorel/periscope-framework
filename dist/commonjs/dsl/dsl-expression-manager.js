'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DslExpressionManager = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _query = require('./../data/query');

var _stringHelper = require('./../helpers/string-helper');

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    var _this = this;

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
          var filteredFields = lastWord ? _.filter(_this.fields, function (f) {
            return f.toLowerCase().startsWith(lastWord.toLowerCase());
          }) : _this.fields;
          resolve(_this._normalizeData("field", filteredFields.sort()));
          break;
        case "STRING_OPERATOR_EQUAL":
        case "STRING_OPERATOR_IN":
          resolve(_this._normalizeData("operator", _this._getStringComparisonOperatorsArray()));
          break;
        case "STRING_VALUE":
        case "STRING_PATTERN":
          lastFldName = _this._getLastFieldName(searchStr, _this.fields, pegException.column);
          _this._getFieldValuesArray(lastFldName, lastWord).then(function (data) {
            resolve(_this._normalizeData("string", data));
          });
          break;
        case "STRING_VALUES_ARRAY":
          lastFldName = _this._getLastFieldName(searchStr, _this.fields, pegException.column);
          _this._getFieldValuesArray(lastFldName, lastWord).then(function (data) {
            resolve(_this._normalizeData("array_string", data));
          });
          break;
          resolve(_this._normalizeData("array_string", []));
          break;
        case "OPERATOR":
          resolve(_this._normalizeData("operator", _this._getComparisonOperatorsArray()));
          break;
        case "LOGIC_OPERATOR":
        case "end of input":
          resolve(_this._normalizeData("operator", _this._getLogicalOperatorsArray()));
          break;
        default:
          resolve([]);
          break;
      }
    });
  };

  DslExpressionManager.prototype._interpreteParserError = function _interpreteParserError(ex) {
    if (Object.prototype.toString.call(ex.expected) == "[object Array]") {
      for (var _iterator = ex.expected, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var desc = _ref;

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
      var _ret = _loop(i);

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
    return "";
  };

  DslExpressionManager.prototype._getStringComparisonOperatorsArray = function _getStringComparisonOperatorsArray() {
    return ["=", "in"];
  };

  DslExpressionManager.prototype._getFieldValuesArray = function _getFieldValuesArray(fieldName, lastWord) {
    var query = new _query.Query();
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
      for (var _iterator2 = this.fields, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var fld = _ref2;

        if (match[1].toLowerCase() === fld.toLowerCase()) searchExpression = _stringHelper.StringHelper.replaceAll(searchExpression, match[0], 'record.' + fld);
      }
    }
    return searchExpression;
  };

  return DslExpressionManager;
}();