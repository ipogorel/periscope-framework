'use strict';

System.register(['./schema-provider', 'swagger-client', './../schema-object', 'lodash'], function (_export, _context) {
  "use strict";

  var SchemaProvider, Swagger, Schema, _, SwaggerSchemaProvider;

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
    }, function (_swaggerClient) {
      Swagger = _swaggerClient.default;
    }, function (_schemaObject) {
      Schema = _schemaObject.Schema;
    }, function (_lodash) {
      _ = _lodash;
    }],
    execute: function () {
      _export('SwaggerSchemaProvider', SwaggerSchemaProvider = function (_SchemaProvider) {
        _inherits(SwaggerSchemaProvider, _SchemaProvider);

        function SwaggerSchemaProvider(definitionUrl, apiName, methodName, modelName) {
          _classCallCheck(this, SwaggerSchemaProvider);

          var _this = _possibleConstructorReturn(this, _SchemaProvider.call(this));

          _this._modelName = modelName;
          _this._methodName = methodName;
          _this._apiName = apiName;
          _this._definitionUrl = definitionUrl;
          return _this;
        }

        SwaggerSchemaProvider.prototype.getSchema = function getSchema() {
          var self = this;
          return new Swagger({
            url: this._definitionUrl,
            usePromise: true }).then(function (client) {
            var result = new Schema();
            _.forEach(client.apis[self._apiName].apis[self._methodName].parameters, function (p) {
              result.parameters.push(p);
            });
            if (client.definitions[self._modelName]) {
              _.forOwn(client.definitions[self._modelName].properties, function (value, key) {
                result.fields.push({ field: key, type: value.type });
              });
            }
            return result;
          });
        };

        return SwaggerSchemaProvider;
      }(SchemaProvider));

      _export('SwaggerSchemaProvider', SwaggerSchemaProvider);
    }
  };
});