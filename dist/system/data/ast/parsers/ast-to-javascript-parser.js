"use strict";

System.register(["./ast-parser"], function (_export, _context) {
  var AstParser, _createClass, AstToJavascriptParser;

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
    setters: [function (_astParser) {
      AstParser = _astParser.AstParser;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export("AstToJavascriptParser", AstToJavascriptParser = function (_AstParser) {
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

        _createClass(AstToJavascriptParser, [{
          key: "type",
          get: function get() {
            return this._clientSide;
          }
        }]);

        return AstToJavascriptParser;
      }(AstParser));

      _export("AstToJavascriptParser", AstToJavascriptParser);
    }
  };
});