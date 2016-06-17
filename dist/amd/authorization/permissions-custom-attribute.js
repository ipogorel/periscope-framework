define(['exports', 'aurelia-framework', 'lodash', './permissions-manager'], function (exports, _aureliaFramework, _lodash, _permissionsManager) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PermissionsCustomAttribute = undefined;

  var _ = _interopRequireWildcard(_lodash);

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

  var PermissionsCustomAttribute = exports.PermissionsCustomAttribute = (_dec = (0, _aureliaFramework.inject)(Element, _permissionsManager.PermissionsManager), _dec(_class = function () {
    function PermissionsCustomAttribute(element, permissionsManager) {
      _classCallCheck(this, PermissionsCustomAttribute);

      this.element = element;
      this.permissionsManager = permissionsManager;
    }

    PermissionsCustomAttribute.prototype.bind = function bind() {
      var _this = this;

      if (!this.value) return;
      var widgetGroup = "";
      var permissions = [];
      if (_.isString(this.value)) {
        widgetGroup = this.element.au.permissions.scope.bindingContext.resourceGroup;
        permissions = this.value.split(",");
      } else if (_.isPlainObject(this.value)) {
        widgetGroup = this.value.resourceGroup;
        permissions = this.value.permissions.split(",");
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

        _this.permissionsManager.hasPermisson(p, widgetGroup).then(function (result) {
          if (!result) {
            if (p === 'read') _this.element.hidden = true;
            if (p === 'write') _this.element.disabled = true;
          } else {
            if (p === 'read') _this.element.hidden = false;
            if (p === 'write') _this.element.disabled = false;
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
});