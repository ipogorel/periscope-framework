"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Grammar = exports.Grammar = function () {
  function Grammar() {
    _classCallCheck(this, Grammar);
  }

  Grammar.prototype.getGrammar = function getGrammar() {};

  _createClass(Grammar, [{
    key: "text",
    set: function set(value) {
      this._text = value;
    },
    get: function get() {
      return this._text;
    }
  }]);

  return Grammar;
}();