define(['exports', 'lodash', 'aurelia-dependency-injection'], function (exports, _lodash, _aureliaDependencyInjection) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PeriscopeFactory = undefined;

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

  var PeriscopeFactory = exports.PeriscopeFactory = function () {
    function PeriscopeFactory() {
      _classCallCheck(this, PeriscopeFactory);

      this.references = [];
      this.container = _aureliaDependencyInjection.Container.instance.createChild();
    }

    PeriscopeFactory.prototype.addReference = function addReference(type) {
      this.references.push(type);
    };

    PeriscopeFactory.prototype.createObject = function createObject(typeName) {
      var t = _.find(this.references, function (r) {
        return r.name === typeName;
      });
      if (t) return this.container.get(t);
      throw "reference to object " + typeName + " not found";
    };

    return PeriscopeFactory;
  }();
});