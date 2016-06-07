'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PermissionsCustomAttribute = undefined;

var _dec, _class;

var _aureliaFramework = require('aurelia-framework');

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _permissionsManager = require('./permissions-manager');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PermissionsCustomAttribute = exports.PermissionsCustomAttribute = (_dec = (0, _aureliaFramework.inject)(Element, _permissionsManager.PermissionsManager), _dec(_class = function () {
  function PermissionsCustomAttribute(element, permissionsManager) {
    _classCallCheck(this, PermissionsCustomAttribute);

    this.element = element;
    this.permissionsManager = permissionsManager;
  }

  PermissionsCustomAttribute.prototype.bind = function bind() {
    var _this = this;

    if (!this.value) return;
    var widgetName = "";
    var permissions = [];
    if (_.isString(this.value)) {
      widgetName = this.element.au.permissions.scope.bindingContext.name;
      permissions = this.value.split(",");
    } else if (_.isPlainObject(this.value)) {
      widgetName = this.value.widgetName;
      permissions = this.value.permissions;
    }

    var _loop = function _loop() {
      if (_isArray) {
        if (_i >= _iterator.length) return 'break';
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) return 'break';
        _ref = _i.value;
      }

      var p = _ref;

      _this.permissionsManager.hasPermisson(p, widgetName).then(function (result) {
        if (!result) {
          if (p === 'r') _this.element.hidden = true;
          if (p === 'w') _this.element.disabled = true;
        } else {
          if (p === 'r') _this.element.hidden = false;
          if (p === 'w') _this.element.disabled = false;
        }
      });
    };

    for (var _iterator = permissions, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      var _ret = _loop();

      if (_ret === 'break') break;
    }
  };

  return PermissionsCustomAttribute;
}()) || _class);