'use strict';

System.register(['lodash', 'aurelia-dependency-injection'], function (_export, _context) {
  var _, Container, NewInstance, PeriscopeFactory;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_lodash) {
      _ = _lodash;
    }, function (_aureliaDependencyInjection) {
      Container = _aureliaDependencyInjection.Container;
      NewInstance = _aureliaDependencyInjection.NewInstance;
    }],
    execute: function () {
      _export('PeriscopeFactory', PeriscopeFactory = function () {
        function PeriscopeFactory() {
          _classCallCheck(this, PeriscopeFactory);

          this.references = [];
          this.container = Container.instance.createChild();
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
      }());

      _export('PeriscopeFactory', PeriscopeFactory);
    }
  };
});