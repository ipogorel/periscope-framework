'use strict';

System.register(['./schema-provider', './../schema-object'], function (_export, _context) {
  var SchemaProvider, Schema, EmptySchemaProvider;

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
    setters: [function (_schemaProvider) {
      SchemaProvider = _schemaProvider.SchemaProvider;
    }, function (_schemaObject) {
      Schema = _schemaObject.Schema;
    }],
    execute: function () {
      _export('EmptySchemaProvider', EmptySchemaProvider = function (_SchemaProvider) {
        _inherits(EmptySchemaProvider, _SchemaProvider);

        function EmptySchemaProvider() {
          _classCallCheck(this, EmptySchemaProvider);

          return _possibleConstructorReturn(this, _SchemaProvider.call(this));
        }

        EmptySchemaProvider.prototype.getSchema = function getSchema() {
          return new Promise(function (resolve, reject) {
            resolve(new Schema());
          });
        };

        return EmptySchemaProvider;
      }(SchemaProvider));

      _export('EmptySchemaProvider', EmptySchemaProvider);
    }
  };
});