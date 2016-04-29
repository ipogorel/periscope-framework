define(['exports', './grammar', 'aurelia-framework', 'aurelia-fetch-client', './../dsl/expression-parser', 'pegjs'], function (exports, _grammar, _aureliaFramework, _aureliaFetchClient, _expressionParser, _pegjs) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ExpressionParserFactory = undefined;

  var peg = _interopRequireWildcard(_pegjs);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var ExpressionParserFactory = exports.ExpressionParserFactory = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function ExpressionParserFactory(http) {
      _classCallCheck(this, ExpressionParserFactory);

      http.configure(function (config) {
        config.useStandardConfiguration();
      });
      this.http = http;
    }

    ExpressionParserFactory.prototype.createInstance = function createInstance(numericFieldList, stringFieldList, dateFieldList) {
      var that = this;
      var text = new _grammar.Grammar().getGrammar();
      var parserText = text.replace('@S@', that.concatenateFieldList(stringFieldList)).replace('@N@', that.concatenateFieldList(numericFieldList)).replace('@D@', that.concatenateFieldList(dateFieldList));
      return new _expressionParser.ExpressionParser(peg.buildParser(parserText));
    };

    ExpressionParserFactory.prototype.concatenateFieldList = function concatenateFieldList(fieldList) {
      for (var i = 0; i < fieldList.length; i++) {
        fieldList[i] = '\'' + fieldList[i] + '\'i';
      }
      if (fieldList.length > 0) return fieldList.join('/ ');else return "'unknown_field'";
    };

    return ExpressionParserFactory;
  }()) || _class);
});