'use strict';

exports.__esModule = true;
exports.DslExpressionManagerFactory = undefined;

var _dec, _class;

var _aureliaFramework = require('aurelia-framework');

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _dataHelper = require('./../helpers/data-helper');

var _dslExpressionManager = require('./../dsl/dsl-expression-manager');

var _expressionParserFactory = require('./../dsl/expression-parser-factory');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DslExpressionManagerFactory = exports.DslExpressionManagerFactory = (_dec = (0, _aureliaFramework.inject)(_expressionParserFactory.ExpressionParserFactory), _dec(_class = function () {
  function DslExpressionManagerFactory(expressionParserFactory) {
    _classCallCheck(this, DslExpressionManagerFactory);

    this.expressionParserFactory = expressionParserFactory;
  }

  DslExpressionManagerFactory.prototype.createInstance = function createInstance(dataSource, fields) {
    var _this = this;

    return dataSource.transport.readService.getSchema().then(function (schema) {
      var fields = schema.fields;
      var allFields = _.map(fields, "field");
      var numericFields = _.map(_dataHelper.DataHelper.getNumericFields(fields), "field");
      var stringFields = _.map(_dataHelper.DataHelper.getStringFields(fields), "field");
      var dateFields = _.map(_dataHelper.DataHelper.getDateFields(fields), "field");
      var parser = _this.expressionParserFactory.createInstance(numericFields, stringFields, dateFields);
      return new _dslExpressionManager.DslExpressionManager(parser, dataSource, allFields);
    });
  };

  return DslExpressionManagerFactory;
}()) || _class);