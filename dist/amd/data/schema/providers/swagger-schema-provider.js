define(['exports', './schema-provider', 'swagger-client', './../schema-object', 'lodash'], function (exports, _schemaProvider, _swaggerClient, _schemaObject, _lodash) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SwaggerSchemaProvider = undefined;

  var _swaggerClient2 = _interopRequireDefault(_swaggerClient);

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

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var SwaggerSchemaProvider = exports.SwaggerSchemaProvider = function (_SchemaProvider) {
    _inherits(SwaggerSchemaProvider, _SchemaProvider);

    function SwaggerSchemaProvider() {
      _classCallCheck(this, SwaggerSchemaProvider);

      return _possibleConstructorReturn(this, _SchemaProvider.call(this));
    }

    SwaggerSchemaProvider.prototype.getSchema = function getSchema() {
      var self = this;
      return new _swaggerClient2.default({
        url: this._definitionUrl,
        usePromise: true
      }).then(function (client) {
        var result = new _schemaObject.Schema();
        _.forEach(client.apis[self.apiName].apis[self.methodName].parameters, function (p) {
          result.parameters.push(p);
        });
        if (client.definitions[self.modelName]) {
          _.forOwn(client.definitions[self.modelName].properties, function (value, key) {
            result.fields.push({ field: key, type: value.type });
          });
        }
        return result;
      });
    };

    SwaggerSchemaProvider.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
      configurationInfo.addValue("schema", this.schema);
      _SchemaProvider.prototype.persistConfigurationTo.call(this, configurationInfo);
    };

    SwaggerSchemaProvider.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
      this.schema = configurationInfo.getValue("schema");
      _SchemaProvider.prototype.restoreConfigurationFrom.call(this, configurationInfo);
    };

    return SwaggerSchemaProvider;
  }(_schemaProvider.SchemaProvider);
});