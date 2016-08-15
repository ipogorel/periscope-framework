define(["exports", "./schema-provider"], function (exports, _schemaProvider) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.StaticSchemaProvider = undefined;

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

  var StaticSchemaProvider = exports.StaticSchemaProvider = function (_SchemaProvider) {
    _inherits(StaticSchemaProvider, _SchemaProvider);

    function StaticSchemaProvider() {
      _classCallCheck(this, StaticSchemaProvider);

      return _possibleConstructorReturn(this, _SchemaProvider.call(this));
    }

    StaticSchemaProvider.prototype.getSchema = function getSchema() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        resolve(_this2.schema);
      });
    };

    StaticSchemaProvider.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
      configurationInfo.addValue("schema", this.schema);
      _SchemaProvider.prototype.persistConfigurationTo.call(this, configurationInfo);
    };

    StaticSchemaProvider.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
      this.schema = configurationInfo.getValue("schema");
      _SchemaProvider.prototype.restoreConfigurationFrom.call(this, configurationInfo);
    };

    return StaticSchemaProvider;
  }(_schemaProvider.SchemaProvider);
});