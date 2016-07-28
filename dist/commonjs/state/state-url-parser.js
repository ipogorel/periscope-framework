'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateUrlParser = undefined;

var _urlHelper = require('./../helpers/url-helper');

var _jsBase = require('js-base64');

var base64 = _interopRequireWildcard(_jsBase);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StateUrlParser = exports.StateUrlParser = function () {
  function StateUrlParser() {
    _classCallCheck(this, StateUrlParser);
  }

  StateUrlParser.stateToQuery = function stateToQuery(widgetStates) {
    var params = [];
    for (var _iterator = widgetStates, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var widgetState = _ref;

      if (widgetState.value) params.push({ "sn": widgetState.name, "sv": widgetState.value });
    }
    return params.length > 0 ? "?q=" + Base64.encode(_urlHelper.UrlHelper.objectToQuery(params)) : "";
  };

  StateUrlParser.queryToState = function queryToState(url) {
    var result = [];
    var q = _urlHelper.UrlHelper.getParameterByName("q", url);
    if (q) {
      var widgetStates = _urlHelper.UrlHelper.queryToObject(Base64.decode(q));
      for (var _iterator2 = widgetStates, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var ws = _ref2;

        result.push({ "name": ws.sn, "value": ws.sv });
      }
    }
    return result;
  };

  return StateUrlParser;
}();