'use strict';

System.register(['./schema-provider'], function (_export, _context) {
  "use strict";

  var SchemaProvider, StaticSchemaProvider;

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
    }],
    execute: function () {
      _export('StaticSchemaProvider', StaticSchemaProvider = function (_SchemaProvider) {
        _inherits(StaticSchemaProvider, _SchemaProvider);

        function StaticSchemaProvider(schema) {
          _classCallCheck(this, StaticSchemaProvider);

          var _this = _possibleConstructorReturn(this, _SchemaProvider.call(this));

          _this._schema = schema;
          return _this;
        }

        StaticSchemaProvider.prototype.getSchema = function getSchema() {
          var _this2 = this;

          return new Promise(function (resolve, reject) {
            resolve(_this2._schema);
          });
        };

        return StaticSchemaProvider;
      }(SchemaProvider));

      _export('StaticSchemaProvider', StaticSchemaProvider);
    }
  };
});