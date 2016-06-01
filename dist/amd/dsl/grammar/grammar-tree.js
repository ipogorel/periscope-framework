define(['exports', './grammar', './../../helpers/data-helper'], function (exports, _grammar, _dataHelper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GrammarTree = undefined;

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

  var DSL_GRAMMAR_TREE = '\n{\n  function findFirstLeftStatement(arr) {\n    if ( Array.isArray(arr) ) {\n      return findFirstLeftStatement(arr[0]["left"]);\n    } else if ( typeof arr === "object" ) {\n        return arr;\n    }\n  }\n\n  function inject(arr, connector) {\n    findFirstLeftStatement(arr)["connector"] = connector;\n    return arr;\n  }\n  function toArray (value) {\n    var res = value.split(\',\');\n    var re = new RegExp(\'[\\\'\\"]\', \'g\');\n    for (var i=0;i<res.length;i++)\n      res[i] = res[i].replace(re, "").trim();\n    return res;\n  }\n  \n  /*function createInExpression (fieldname, value) {\n    var result = []\n    var values = value.split(\',\');\n    for (var i=0;i<values.length;i++){\n    \tif (i!=0)\n    \t\tresult.push({field:fieldname, type:\'string\' ,value:values[i]});\n        else\n            result.push({field:fieldname, type:\'string\' ,value:values[i], connector:" || "});\n    }\n    return result;\n  }*/\n}\n\n//Start = statement *\nStart\n  = st:statement  {return st}  \n  \nstatement\n  = left:block cnct:connector right:statement \n    { return { left: left, right: inject(right, cnct) }; }\n  / left: block \n    { return left; }\n    \nblock\n  = pOpen block:statement* pClose space?\n    { return block[0]; }\n  / block:condition space?\n    { return block; }\n    \ncondition = space? f:stringField o:op_eq v:stringValue \n\t\t\t{return {field:f, type:"string", operand:o, value:v}}\n            / space? f:stringField o:op_in a:valuesArray \n       {return {field:f, type:"string", operand:o, value:toArray(a)}}            \n\t\t\t  / space? f:numericField o:op v:numericValue \n            {return {field:f, type:"number", operand:o, value:v}}\n          \t/ space? f:dateField o:op v:dateValue\n          {return {field:f, type:"date", operand:o, value:v}}\n\nconnector "LOGIC_OPERATOR"\n    = cn:(or / and) \n      { return cn.toString(); }\n      \nand = space* "and"i space* {return " && ";}\n\nor = space* "or"i space* {return " || ";}\n\nvaluesArray "STRING_VALUES_ARRAY"\n      = pOpen va:$(v:stringValue space* nextValue*)+ pClose {return  va }\n      \nnextValue = nv:(space* "," space* v:stringValue) {return  nv}      \n\ndateValue "DATE_VALUE"\n        = quote? dt:$(date+) quote? {return dt;}\n\n\nstringValue  "STRING_VALUE"\n\t  = quote w:$(char+) quote {return  w }\n      / quote quote {return "";}\n\n\nnumericValue  "NUMERIC_VALUE"\n       = $(numeric+)\n\nop "OPERAND"\n   = op_eq\n   / ge\n   / gt\n   / le\n   / lt\n\nop_eq "STRING_OPERATOR_EQUAL"\n  = eq\n  / not_eq\n\nop_in "STRING_OPERATOR_IN"\n  = in\n\neq = space* "=" space* {return "==";}\n\nnot_eq = space* "!=" space* {return "!=";}\n\ngt = space* v:">" space* {return v;}\n\nge = space* v:">=" space* {return v;}\n\nlt = space* v:"<" space* {return v;}\n\nle = space* v:"<=" space* {return v;}\n\nin = space* v:"in" space* {return v;}\n\n\ndate = [0-9\\:\\/]\n\nchar = [a-z0-9 \\%\\$\\_\\-\\:\\,\\.\\/]i\n\nnumeric = [0-9-\\.]\n\nspace = [ \\t\\n\\r]+\n\npOpen = [\\(] space*\n\npClose = space* [\\)]\n\nfield "FIELD_NAME"\n      = stringField\n     / numericField\n     / dateField\n\nstringField "STRING_FIELD_NAME"\n     = @S@\n\nnumericField "NUMERIC_FIELD_NAME"\n     = @N@\n\ndateField "DATE_FIELD_NAME"\n     = @D@\n\nquote = [\\\'\\"]\n';

  var GrammarTree = exports.GrammarTree = function (_Grammar) {
    _inherits(GrammarTree, _Grammar);

    function GrammarTree(dataFields) {
      _classCallCheck(this, GrammarTree);

      var _this = _possibleConstructorReturn(this, _Grammar.call(this));

      _this.text = DSL_GRAMMAR_TREE;
      _this.dataFields = dataFields;
      return _this;
    }

    GrammarTree.prototype.getGrammar = function getGrammar() {
      var stringFieldList = _.map(_dataHelper.DataHelper.getStringFields(this.dataFields), "field");
      var numericFieldList = _.map(_dataHelper.DataHelper.getNumericFields(this.dataFields), "field");
      var dateFieldList = _.map(_dataHelper.DataHelper.getDateFields(this.dataFields), "field");
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
  }(_grammar.Grammar);
});