"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AstParser = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _configurable = require("./../../../serialization/configurable");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AstParser = exports.AstParser = function () {
  function AstParser() {
    _classCallCheck(this, AstParser);

    this._clientSide = "clientSide";
    this._serverSide = "serverSide";
  }

  AstParser.prototype.getFilter = function getFilter(astTree) {
    return {};
  };

  AstParser.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {};

  AstParser.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {};

  _createClass(AstParser, [{
    key: "type",
    get: function get() {}
  }]);

  return AstParser;
}();