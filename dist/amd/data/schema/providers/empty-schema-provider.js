define(['exports', './schema-provider', './../schema-object'], function (exports, _schemaProvider, _schemaObject) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.EmptySchemaProvider = undefined;

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

  var EmptySchemaProvider = exports.EmptySchemaProvider = function (_SchemaProvider) {
    _inherits(EmptySchemaProvider, _SchemaProvider);

    function EmptySchemaProvider() {
      _classCallCheck(this, EmptySchemaProvider);

      return _possibleConstructorReturn(this, _SchemaProvider.call(this));
    }

    EmptySchemaProvider.prototype.getSchema = function getSchema() {
      return new Promise(function (resolve, reject) {
        resolve(new _schemaObject.Schema());
      });
    };

    return EmptySchemaProvider;
  }(_schemaProvider.SchemaProvider);
});