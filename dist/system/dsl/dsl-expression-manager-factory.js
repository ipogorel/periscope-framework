'use strict';

System.register(['aurelia-framework', 'lodash', './../helpers/data-helper', './../dsl/dsl-expression-manager', './../dsl/expression-parser-factory'], function (_export, _context) {
  var inject, _, DataHelper, DslExpressionManager, ExpressionParserFactory, _dec, _class, DslExpressionManagerFactory;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_lodash) {
      _ = _lodash;
    }, function (_helpersDataHelper) {
      DataHelper = _helpersDataHelper.DataHelper;
    }, function (_dslDslExpressionManager) {
      DslExpressionManager = _dslDslExpressionManager.DslExpressionManager;
    }, function (_dslExpressionParserFactory) {
      ExpressionParserFactory = _dslExpressionParserFactory.ExpressionParserFactory;
    }],
    execute: function () {
      _export('DslExpressionManagerFactory', DslExpressionManagerFactory = (_dec = inject(ExpressionParserFactory), _dec(_class = function () {
        function DslExpressionManagerFactory(expressionParserFactory) {
          _classCallCheck(this, DslExpressionManagerFactory);

          this.expressionParserFactory = expressionParserFactory;
        }

        DslExpressionManagerFactory.prototype.createInstance = function createInstance(dataSource, fields) {
          var _this = this;

          return dataSource.transport.readService.getSchema().then(function (schema) {
            var fields = schema.fields;
            var allFields = _.map(fields, "field");
            var numericFields = _.map(DataHelper.getNumericFields(fields), "field");
            var stringFields = _.map(DataHelper.getStringFields(fields), "field");
            var dateFields = _.map(DataHelper.getDateFields(fields), "field");
            var parser = _this.expressionParserFactory.createInstance(numericFields, stringFields, dateFields);
            return new DslExpressionManager(parser, dataSource, allFields);
          });
        };

        return DslExpressionManagerFactory;
      }()) || _class));

      _export('DslExpressionManagerFactory', DslExpressionManagerFactory);
    }
  };
});