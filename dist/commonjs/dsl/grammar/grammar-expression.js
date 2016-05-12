'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GrammarExpression = undefined;

var _grammar = require('./grammar');

var _dataHelper = require('./../../helpers/data-helper');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DSL_GRAMMAR_EXPRESSION = '\n{\nfunction createStringExpression(fieldname, value){\n \t\tvar prefix = "record.";\n \t\tvar result = "";\n \t\tvar v = value.trim().toLowerCase();\n        if (v.length>=2){\n          if ((v.indexOf("%")===0)&&(v.lastIndexOf("%")===(v.length-1)))\n              result = prefix + fieldname + ".toLowerCase().includes(\'" + v.substring(1,value.length-1) + "\')"\n          else if (v.indexOf("%")===0)\n              result = prefix + fieldname + ".toLowerCase().endsWith(\'" + v.substring(1,value.length) + "\')"\n          else if (v.lastIndexOf("%")===(value.length-1))\n              result = prefix + fieldname + ".toLowerCase().startsWith(\'" + v.substring(0,value.length-1) + "\')"\n        }\n        if (result == "")\n          result = prefix + fieldname + ".toLowerCase() == \'" + v + "\'";\n\n        result="(" + prefix + fieldname + "!=null && " + result + ")"\n\n        return result;\n }\n  function createInExpression (fieldname, value) {\n    var result = "";\n    var values = value.split(\',\');\n    for (var i=0;i<values.length;i++)\n    {\n      var find = \'[\\"\\\']\';\n      var re = new RegExp(find, \'g\');\n      var v = values[i].replace(new RegExp(find, \'g\'), "");\n      //result += "record." + fieldname + ".toLowerCase() ==" + v.trim().toLowerCase();\n      result += createStringExpression(fieldname, v)\n      if (i<(values.length-1))\n        result += " || ";\n    }\n    if (result.length>0)\n      result = "(" + result + ")"\n    return result;\n  }\n}\n\nstart = expression\n\nexpression = c:condition j:join e:expression space? {return c+j+e;}\n           / c:condition space? {return c;}\n\njoin "LOGIC_OPERATOR"\n     = and\n     / or\n\nand = space* "and"i space* {return " && ";}\n\nor = space* "or"i space* {return " || ";}\n\n\ncondition = space? f:stringField o:op_eq v:stringValue {return createStringExpression(f,v);}\n          / space? f:stringField o:op_in a:valuesArray {return createInExpression(f,a);}\n          / space? f:numericField o:op v:numericValue {return "record." + f + o + v;}\n          / space? f:dateField o:op v:dateValue {return "record." + f + o + v;}\n          / "(" space? e:expression space* ")" space* {return "(" + e +")";}\n\n\n\nvaluesArray "STRING_VALUES_ARRAY"\n      = parentheses_l va:$(v:stringValue space* nextValue*)+ parentheses_r {return  va }\n\nnextValue = nv:(space* "," space* v:stringValue) {return  nv}\n\n\n\ndateValue "DATE_VALUE"\n        = quote? dt:$(date+) quote? {return "\'" + dt + "\'";}\n\n\nstringValue  "STRING_VALUE"\n\t  = quote w:$(char+) quote {return  w }\n      / quote quote {return "";}\n\n\nnumericValue  "NUMERIC_VALUE"\n       = $(numeric+)\n\n\nop "OPERATOR"\n   = op_eq\n   / ge\n   / gt\n   / le\n   / lt\n\nop_eq "STRING_OPERATOR_EQUAL"\n  = eq\n  / not_eq\n\nop_in "STRING_OPERATOR_IN"\n  = in\n\neq = space* "=" space* {return "==";}\n\nnot_eq = space* "!=" space* {return "!=";}\n\ngt = space* v:">" space* {return v;}\n\nge = space* v:">=" space* {return v;}\n\nlt = space* v:"<" space* {return v;}\n\nle = space* v:"<=" space* {return v;}\n\nin = space* v:"in" space* {return v;}\n\n\ndate = [0-9 \\:\\/]\n\nchar = [a-z0-9 \\%\\$\\_\\-\\:\\,\\.\\/]i\n\nnumeric = [0-9-\\.]\n\nspace = [ \\t\\n\\r]+\n\nparentheses_l = [\\(] space*\n\nparentheses_r = space* [\\)]\n\nfield "FIELD_NAME"\n      = stringField\n     / numericField\n     / dateField\n\nstringField "STRING_FIELD_NAME"\n     = @S@\n\nnumericField "NUMERIC_FIELD_NAME"\n     = @N@\n\ndateField "DATE_FIELD_NAME"\n     = @D@\n\nquote = [\\\'\\"]\n\n\n';

var GrammarExpression = exports.GrammarExpression = function (_Grammar) {
  _inherits(GrammarExpression, _Grammar);

  function GrammarExpression(dataFields) {
    _classCallCheck(this, GrammarExpression);

    var _this = _possibleConstructorReturn(this, _Grammar.call(this));

    _this.text = DSL_GRAMMAR_EXPRESSION;
    _this.dataFields = dataFields;
    return _this;
  }

  GrammarExpression.prototype.getGrammar = function getGrammar() {
    var stringFieldList = _.map(_dataHelper.DataHelper.getStringFields(this.dataFields), "field");
    var numericFieldList = _.map(_dataHelper.DataHelper.getNumericFields(this.dataFields), "field");
    var dateFieldList = _.map(_dataHelper.DataHelper.getDateFields(this.dataFields), "field");
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
}(_grammar.Grammar);