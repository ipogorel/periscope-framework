'use strict';

System.register(['./grammar', 'aurelia-framework', 'aurelia-fetch-client', './../dsl/expression-parser', 'pegjs'], function (_export, _context) {
  var Grammar, inject, HttpClient, ExpressionParser, peg, _dec, _class, ExpressionParserFactory;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_grammar) {
      Grammar = _grammar.Grammar;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
    }, function (_dslExpressionParser) {
      ExpressionParser = _dslExpressionParser.ExpressionParser;
    }, function (_pegjs) {
      peg = _pegjs;
    }],
    execute: function () {
      _export('ExpressionParserFactory', ExpressionParserFactory = (_dec = inject(HttpClient), _dec(_class = function () {
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
      }()) || _class));

      _export('ExpressionParserFactory', ExpressionParserFactory);
    }
  };
});