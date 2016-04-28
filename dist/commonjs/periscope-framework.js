'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DslExpressionManagerFactory = exports.DslExpressionManager = exports.PeriscopeRouter = exports.MemoryCacheStorage = exports.ExpressionParserFactory = exports.DataSourceConfiguration = exports.Datasource = exports.StaticJsonDataService = exports.FormatValueConverter = exports.Query = exports.StateUrlParser = exports.UserStateStorage = exports.SwaggerSchemaProvider = exports.JsonDataService = exports.SearchBox = exports.Grid = exports.DetailedView = exports.DataSourceConfigurator = exports.Chart = exports.ReplaceWidgetBehavior = exports.ManageNavigationStackBehavior = exports.CreateWidgetBehavior = exports.ChangeRouteBehavior = exports.DataSourceChangedBehavior = exports.DataSelectedBehavior = exports.DataFilterChangedBehavior = exports.DataFieldSelectedBehavior = exports.DataActivatedBehavior = exports.SettingsHandleBehavior = exports.DataSourceHandleBehavior = exports.DataFilterHandleBehavior = exports.StaticSchemaProvider = exports.CacheManager = exports.CacheStorage = exports.DashboardConfiguration = exports.ExpressionParser = exports.Grammar = exports.DataHolder = exports.QueryExpressionEvaluator = exports.DataHelper = exports.GuidHelper = exports.StringHelper = exports.UrlHelper = exports.DashboardManager = exports.Factory = exports.StateDiscriminator = exports.Storage = exports.NavigationHistory = exports.Schema = exports.DataServiceConfiguration = exports.DataService = exports.LayoutWidget = exports.DashboardBase = exports.Widget = exports.DashboardBehavior = exports.WidgetEventMessage = exports.WidgetEvent = exports.WidgetBehavior = exports.SchemaProvider = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _dec, _desc, _value, _class, _class2, _dec2, _dec3, _class3, _dec4, _class4, _dec5, _dec6, _class5, _dec7, _class6, _dec8, _class7, _dec9, _class8;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.configure = configure;

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _numeral = require('numeral');

var _numeral2 = _interopRequireDefault(_numeral);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _pegjs = require('pegjs');

var peg = _interopRequireWildcard(_pegjs);

var _aureliaFramework = require('aurelia-framework');

var _aureliaFetchClient = require('aurelia-fetch-client');

var _aureliaEventAggregator = require('aurelia-event-aggregator');

var _aureliaRouter = require('aurelia-router');

var _swaggerClient = require('swagger-client');

var _swaggerClient2 = _interopRequireDefault(_swaggerClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SchemaProvider = exports.SchemaProvider = function () {
  function SchemaProvider() {
    _classCallCheck(this, SchemaProvider);
  }

  SchemaProvider.prototype.getSchema = function getSchema() {};

  return SchemaProvider;
}();

var WidgetBehavior = exports.WidgetBehavior = function () {
  function WidgetBehavior() {
    _classCallCheck(this, WidgetBehavior);
  }

  WidgetBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    this._widget = widget;
    this._widget.behaviors.push(this);
  };

  WidgetBehavior.prototype.detach = function detach() {
    for (var i = 0; i < this.widget.behaviors.length; i++) {
      if (this.widget.behaviors[i] === this) {
        this.widget.behaviors.splice(i, 1);
        break;
      }
    }
  };

  _createClass(WidgetBehavior, [{
    key: 'widget',
    get: function get() {
      return this._widget;
    }
  }]);

  return WidgetBehavior;
}();

var WidgetEvent = exports.WidgetEvent = function () {
  function WidgetEvent(widgetName) {
    _classCallCheck(this, WidgetEvent);

    this._handlers = [];
    this._originatorName = widgetName;
  }

  WidgetEvent.prototype.attach = function attach(handler) {
    if (this._handlers.some(function (e) {
      return e === handler;
    })) {
      return;
    }
    this._handlers.push(handler);
  };

  WidgetEvent.prototype.detach = function detach(handler) {
    var idx = this._handlers.indexOf(handler);
    if (idx < 0) {
      return;
    }
    this.handler.splice(idx, 1);
  };

  WidgetEvent.prototype.raise = function raise() {
    for (var i = 0; i < this._handlers.length; i++) {
      this._handlers[i].apply(this, arguments);
    }
  };

  _createClass(WidgetEvent, [{
    key: 'originatorName',
    get: function get() {
      return this._originatorName;
    }
  }]);

  return WidgetEvent;
}();

var WidgetEventMessage = exports.WidgetEventMessage = function () {
  function WidgetEventMessage(widgetName) {
    _classCallCheck(this, WidgetEventMessage);

    this._originatorName = widgetName;
  }

  _createClass(WidgetEventMessage, [{
    key: 'originatorName',
    get: function get() {
      return this._originatorName;
    }
  }]);

  return WidgetEventMessage;
}();

var DashboardBehavior = exports.DashboardBehavior = function () {
  function DashboardBehavior() {
    _classCallCheck(this, DashboardBehavior);
  }

  DashboardBehavior.prototype.attach = function attach(dashboard) {
    this._dashboard = dashboard;
    this._dashboard.behaviors.push(this);
  };

  DashboardBehavior.prototype.detach = function detach() {
    for (var i = 0; i < this.dashboard.behaviors.length; i++) {
      if (this.dashboard.behaviors[i] === this) {
        this.dashboard.behaviors.splice(i, 1);
        break;
      }
    }
  };

  _createClass(DashboardBehavior, [{
    key: 'dashboard',
    get: function get() {
      return this._dashboard;
    }
  }]);

  return DashboardBehavior;
}();

var Widget = exports.Widget = function () {
  function Widget(settings) {
    _classCallCheck(this, Widget);

    this._settings = settings;
    this._behaviors = [];
  }

  Widget.prototype.attachBehavior = function attachBehavior(behavior) {
    behavior.attachToWidget(this);
  };

  Widget.prototype.attachBehaviors = function attachBehaviors() {
    if (this.settings.behavior) {
      for (var _iterator = this.settings.behavior, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var b = _ref;

        this.attachBehavior(b);
      }
    }
  };

  Widget.prototype.changeSettings = function changeSettings(newSettings) {
    var _this = this;

    if (newSettings) {
      _.forOwn(newSettings, function (v, k) {
        _this.settings[k] = v;
      });
      this.refresh();
    }
  };

  Widget.prototype.refresh = function refresh() {};

  Widget.prototype.dispose = function dispose() {
    while (true) {
      if (this.behaviors.length > 0) this.behaviors[0].detach();else break;
    }
  };

  Widget.prototype._calculateHeight = function _calculateHeight(contentContainerElement) {
    if (!contentContainerElement) return this.settings.minHeight;
    var p = $(contentContainerElement).parents(".widget-container");
    var headerHeight = p.find(".portlet-header")[0].scrollHeight;
    var parentHeight = p[0].offsetHeight - headerHeight;
    return parentHeight > this.settings.minHeight ? parentHeight : this.settings.minHeight;
  };

  _createClass(Widget, [{
    key: 'self',
    get: function get() {
      return this;
    }
  }, {
    key: 'settings',
    get: function get() {
      return this._settings;
    }
  }, {
    key: 'behaviors',
    get: function get() {
      return this._behaviors;
    }
  }, {
    key: 'name',
    get: function get() {
      return this.settings.name;
    }
  }, {
    key: 'state',
    get: function get() {
      if (this.stateStorage) {
        var key = this.stateStorage.createKey(this.dashboard.name, this.name);
        var s = this.stateStorage.get(key);
        if (s) return s.stateObject;
      }
      return undefined;
    },
    set: function set(value) {
      if (this.stateStorage) {
        var key = this.stateStorage.createKey(this.dashboard.name, this.name);
        if (!value) this.stateStorage.remove(key);else {
          var s = { stateType: this.stateType, stateObject: value };
          this.stateStorage.set(key, s);
        }
      }
    }
  }, {
    key: 'stateType',
    get: function get() {
      return this._type;
    },
    set: function set(value) {
      this._type = value;
    }
  }, {
    key: 'showHeader',
    get: function get() {
      return this.settings.showHeader;
    }
  }, {
    key: 'dataHolder',
    set: function set(value) {
      this._dataHolder = value;
    },
    get: function get() {
      return this._dataHolder;
    }
  }, {
    key: 'header',
    get: function get() {
      return this.settings.header;
    },
    set: function set(value) {
      this.settings.header = value;
    }
  }, {
    key: 'stateStorage',
    get: function get() {
      return this.settings.stateStorage;
    }
  }, {
    key: 'dataSource',
    set: function set(value) {
      this.settings.dataSource = value;
    },
    get: function get() {
      return this.settings.dataSource;
    }
  }, {
    key: 'dataMapper',
    get: function get() {
      return this.settings.dataMapper;
    }
  }, {
    key: 'dataFilter',
    get: function get() {
      return this._dataFilter;
    },
    set: function set(value) {
      this._dataFilter = value;
    }
  }, {
    key: 'type',
    get: function get() {
      return this._type;
    }
  }, {
    key: 'dashboard',
    get: function get() {
      return this._dashboard;
    },
    set: function set(value) {
      this._dashboard = value;
    }
  }]);

  return Widget;
}();

var DashboardBase = exports.DashboardBase = function () {
  function DashboardBase() {
    _classCallCheck(this, DashboardBase);

    this._layout = [];
    this._behaviors = [];
  }

  DashboardBase.prototype.configure = function configure(dashboardConfiguration) {
    this._name = dashboardConfiguration.name;
    this._title = dashboardConfiguration.title;
    this._route = dashboardConfiguration.route;
  };

  DashboardBase.prototype.getWidgetByName = function getWidgetByName(widgetName) {
    var wl = _.find(this._layout, function (w) {
      return w.widget.name === widgetName;
    });
    if (wl) return wl.widget;
  };

  DashboardBase.prototype.addWidget = function addWidget(widget, dimensions) {
    var lw = new LayoutWidget();
    lw.widget = widget;
    lw.sizeX = dimensions.sizeX;
    lw.sizeY = dimensions.sizeY;
    lw.col = dimensions.col;
    lw.row = dimensions.row;
    this._layout.push(lw);
    widget.dashboard = this;
  };

  DashboardBase.prototype.removeWidget = function removeWidget(widget) {
    _.remove(this._layout, function (w) {
      if (w.widget === widget) {
        widget.dispose();
        return true;
      }
      return false;
    });
  };

  DashboardBase.prototype.replaceWidget = function replaceWidget(oldWidget, newWidget) {
    var oldLw = _.find(this._layout, function (w) {
      return w.widget === oldWidget;
    });
    if (oldLw) {
      newWidget.dashboard = this;
      var newLw = new LayoutWidget();
      newLw.widget = newWidget;
      newLw.sizeX = oldLw.sizeX;
      newLw.sizeY = oldLw.sizeY;
      newLw.col = oldLw.col;
      newLw.row = oldLw.row;

      newLw.navigationStack.push(oldWidget);
      this._layout.splice(_.indexOf(this._layout, oldLw), 1, newLw);
    }
  };

  DashboardBase.prototype.restoreWidget = function restoreWidget(currentWidget) {
    var lw = _.find(this._layout, function (w) {
      return w.widget === currentWidget;
    });
    var previousWidget = lw.navigationStack.pop();
    if (previousWidget) {
      var previousLw = new LayoutWidget();
      previousLw.widget = previousWidget;
      previousLw.sizeX = lw.sizeX;
      previousLw.sizeY = lw.sizeY;
      previousLw.col = lw.col;
      previousLw.row = lw.row;
      this._layout.splice(_.indexOf(this._layout, lw), 1, previousLw);
    }
  };

  DashboardBase.prototype.resizeWidget = function resizeWidget(widget, newSize) {
    var lw = _.find(this._layout, function (w) {
      return w.widget === widget;
    });
    if (newSize) {
      var x = newSize.sizeX ? newSize.sizeX : lw.sizeX;
      var y = newSize.sizeY ? newSize.sizeY : lw.sizeY;
      lw.resize(x, y);
    } else lw.rollbackResize();
  };

  DashboardBase.prototype.refreshWidget = function refreshWidget(widget) {
    widget.refresh();
  };

  DashboardBase.prototype.refresh = function refresh() {
    for (var i = 0; i < this._layout.length; i++) {
      this.refreshWidget(this._layout[i].widget);
    }
  };

  DashboardBase.prototype.dispose = function dispose() {
    for (var i = 0; i < this._layout.length; i++) {
      this._layout[i].widget.dispose();
    }
    this._layout = [];

    while (true) {
      if (this._behaviors.length > 0) this._behaviors[0].detach();else break;
    }
  };

  _createClass(DashboardBase, [{
    key: 'name',
    get: function get() {
      return this._name;
    }
  }, {
    key: 'route',
    get: function get() {
      return this._route;
    }
  }, {
    key: 'title',
    get: function get() {
      return this._title;
    }
  }, {
    key: 'layout',
    get: function get() {
      return this._layout;
    }
  }, {
    key: 'behaviors',
    get: function get() {
      return this._behaviors;
    }
  }]);

  return DashboardBase;
}();

var LayoutWidget = exports.LayoutWidget = (_dec = (0, _aureliaFramework.computedFrom)('navigationStack'), (_class = function () {
  function LayoutWidget() {
    _classCallCheck(this, LayoutWidget);

    this.navigationStack = [];
    this.resized = false;
  }

  LayoutWidget.prototype.resize = function resize(newSizeX, newSizeY) {
    this._originalDimensions = { sizeX: this.sizeX, sizeY: this.sizeY };
    this.sizeX = newSizeX;
    this.sizeY = newSizeY;
    this.resized = true;
  };

  LayoutWidget.prototype.rollbackResize = function rollbackResize() {
    if (this._originalDimensions) {
      this.sizeX = this._originalDimensions.sizeX;
      this.sizeY = this._originalDimensions.sizeY;
    }
    this.resized = false;
  };

  _createClass(LayoutWidget, [{
    key: 'widget',
    get: function get() {
      return this._widget;
    },
    set: function set(value) {
      this._widget = value;
    }
  }, {
    key: 'navigationStack',
    get: function get() {
      return this._navigationStack;
    },
    set: function set(value) {
      this._navigationStack = value;
    }
  }, {
    key: 'sizeX',
    get: function get() {
      return this._sizeX;
    },
    set: function set(value) {
      this._sizeX = value;
    }
  }, {
    key: 'sizeY',
    get: function get() {
      return this._sizeY;
    },
    set: function set(value) {
      this._sizeY = value;
    }
  }, {
    key: 'col',
    get: function get() {
      return this._col;
    },
    set: function set(value) {
      this._col = value;
    }
  }, {
    key: 'row',
    get: function get() {
      return this._row;
    },
    set: function set(value) {
      this._row = value;
    }
  }, {
    key: 'resized',
    get: function get() {
      return this._resized;
    },
    set: function set(value) {
      this._resized = value;
    }
  }, {
    key: 'hasNavStack',
    get: function get() {
      return this.navigationStack && this.navigationStack.length > 0;
    }
  }]);

  return LayoutWidget;
}(), (_applyDecoratedDescriptor(_class.prototype, 'hasNavStack', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'hasNavStack'), _class.prototype)), _class));

var DataService = exports.DataService = function () {
  function DataService() {
    _classCallCheck(this, DataService);
  }

  DataService.prototype.configure = function configure(configuration) {
    this.url = configuration.url;
    this.schemaProvider = configuration.schemaProvider;
    this.queryMapper = configuration.queryMapper;
    this.totalMapper = configuration.totalMapper;
    this.dataMapper = configuration.dataMapper;
  };

  DataService.prototype.getSchema = function getSchema() {
    return this.schemaProvider.getSchema();
  };

  DataService.prototype.read = function read(options) {};

  DataService.prototype.create = function create(entity) {};

  DataService.prototype.update = function update(id, entity) {};

  DataService.prototype.delete = function _delete(id) {};

  return DataService;
}();

var DataServiceConfiguration = exports.DataServiceConfiguration = function () {
  function DataServiceConfiguration(options) {
    _classCallCheck(this, DataServiceConfiguration);

    if (options) {
      this._url = options.url;
      this._schemaProvider = options.schemaProvider;
      this._totalMapper = options.totalMapper;
      this._queryMapper = options.queryMapper;
      this._dataMapper = options.dataMapper;
    }
  }

  _createClass(DataServiceConfiguration, [{
    key: 'url',
    get: function get() {
      return this._url;
    }
  }, {
    key: 'schemaProvider',
    get: function get() {
      return this._schemaProvider;
    }
  }, {
    key: 'totalMapper',
    get: function get() {
      return this._totalMapper;
    }
  }, {
    key: 'queryMapper',
    get: function get() {
      return this._queryMapper;
    }
  }, {
    key: 'dataMapper',
    get: function get() {
      return this._dataMapper;
    }
  }]);

  return DataServiceConfiguration;
}();

var Schema = exports.Schema = function Schema() {
  _classCallCheck(this, Schema);

  this.fields = [];
  this.parameters = [];
};

var NavigationHistory = exports.NavigationHistory = function () {
  function NavigationHistory() {
    _classCallCheck(this, NavigationHistory);

    this._history = [];
  }

  NavigationHistory.prototype.add = function add(url, title, dashboard, state, dateTime) {
    this._history.push({ url: url, title: title, dashboard: dashboard, state: state, dateTime: dateTime });
  };

  NavigationHistory.prototype.update = function update(url, dateTime) {
    for (var _iterator2 = this._history, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var h = _ref2;

      if (h.url === url) {
        h.dateTime = dateTime;
        break;
      }
    }
  };

  NavigationHistory.prototype.delete = function _delete(url) {
    for (var _iterator3 = this._history, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref3 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref3 = _i3.value;
      }

      var i = _ref3;

      if (i.url === url) {
        this._history.splice(i, 1);
        break;
      }
    }
  };

  NavigationHistory.prototype.deleteAll = function deleteAll() {
    this._history = [];
  };

  NavigationHistory.prototype.trimRight = function trimRight(url) {
    for (var i = this._history.length - 1; i >= 0; i--) {
      if (this._history[i].url === url) {
        this._history.splice(i + 1);
        return;
      }
    }
  };

  NavigationHistory.prototype.exists = function exists(url) {
    for (var _iterator4 = this._history, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
      var _ref4;

      if (_isArray4) {
        if (_i4 >= _iterator4.length) break;
        _ref4 = _iterator4[_i4++];
      } else {
        _i4 = _iterator4.next();
        if (_i4.done) break;
        _ref4 = _i4.value;
      }

      var i = _ref4;

      if (i.route === url) return true;
    }
    return false;
  };

  _createClass(NavigationHistory, [{
    key: 'items',
    get: function get() {
      return this._history;
    }
  }]);

  return NavigationHistory;
}();

var Storage = exports.Storage = function () {
  function Storage() {
    _classCallCheck(this, Storage);

    this._provider = this._initProvider('Warning: Local Storage is disabled or unavailable.');
  }

  Storage.prototype.set = function set(key, value) {
    if (this._provider) return this._provider.setItem(key, JSON.stringify(value));
    return undefined;
  };

  Storage.prototype.get = function get(key) {

    if (this._provider) return JSON.parse(this._provider.getItem(key));
    return undefined;
  };

  Storage.prototype.clear = function clear() {
    if (this._provider) this._provider.clear();
  };

  Storage.prototype._initProvider = function _initProvider(warning) {
    if ('sessionStorage' in window && window['sessionStorage'] !== null) {
      return sessionStorage;
    } else {
      console.warn(warning);
      return undefined;
    }
  };

  return Storage;
}();

var StateDiscriminator = exports.StateDiscriminator = function () {
  function StateDiscriminator() {
    _classCallCheck(this, StateDiscriminator);
  }

  StateDiscriminator.discriminate = function discriminate(widgetStates) {
    var result = [];
    for (var _iterator5 = widgetStates, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
      var _ref5;

      if (_isArray5) {
        if (_i5 >= _iterator5.length) break;
        _ref5 = _iterator5[_i5++];
      } else {
        _i5 = _iterator5.next();
        if (_i5.done) break;
        _ref5 = _i5.value;
      }

      var ws = _ref5;

      if (ws.value.stateType === "searchBoxState") result.push(ws);
    }
    return result;
  };

  return StateDiscriminator;
}();

var Factory = exports.Factory = (0, _aureliaFramework.resolver)(_class2 = function () {
  function Factory(Type) {
    _classCallCheck(this, Factory);

    this.Type = Type;
  }

  Factory.prototype.get = function get(container) {
    var _this2 = this;

    return function () {
      for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }

      return container.invoke(_this2.Type, rest);
    };
  };

  Factory.of = function of(Type) {
    return new Factory(Type);
  };

  return Factory;
}()) || _class2;

var DashboardManager = exports.DashboardManager = function () {
  function DashboardManager() {
    _classCallCheck(this, DashboardManager);

    this._dashboards = [];
  }

  DashboardManager.prototype.find = function find(dashboardName) {
    return _.find(this._dashboards, { name: dashboardName });
  };

  DashboardManager.prototype.createDashboard = function createDashboard(type, dashboardConfiguration) {
    var dashboard = new type();
    dashboard.configure(dashboardConfiguration);
    this._dashboards.push(dashboard);
    return dashboard;
  };

  _createClass(DashboardManager, [{
    key: 'dashboards',
    get: function get() {
      return this._dashboards;
    }
  }]);

  return DashboardManager;
}();

var UrlHelper = exports.UrlHelper = function () {
  function UrlHelper() {
    _classCallCheck(this, UrlHelper);
  }

  UrlHelper.objectToQuery = function objectToQuery(ar) {
    return encodeURIComponent(JSON.stringify(ar));
  };

  UrlHelper.queryToObject = function queryToObject(queryParam) {
    return JSON.parse(queryParam);
  };

  UrlHelper.getParameterByName = function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  };

  return UrlHelper;
}();

var StringHelper = exports.StringHelper = function () {
  function StringHelper() {
    _classCallCheck(this, StringHelper);
  }

  StringHelper.compare = function compare(string1, string2) {
    return string1.toUpperCase() === string2.toUpperCase();
  };

  StringHelper.replaceAll = function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
  };

  StringHelper.hashCode = function hashCode(str) {
    var hash = 0;
    if (str.length == 0) return hash;
    for (var i = 0; i < str.length; i++) {
      var char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash;
  };

  StringHelper.getEditDistance = function getEditDistance(a, b) {
    if (a.length == 0) return b.length;
    if (b.length == 0) return a.length;

    var matrix = [];

    var i;
    for (i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    var j;
    for (j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (i = 1; i <= b.length; i++) {
      for (j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) == a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
        }
      }
    }

    return matrix[b.length][a.length];
  };

  StringHelper.getPreviousWord = function getPreviousWord(str, position, separators) {
    var str = str.substring(0, position);
    var lastSeparatorIndex = 0;
    for (var i = 0; i < separators.length; i++) {
      if (str.lastIndexOf(separators[i]) > lastSeparatorIndex) lastSeparatorIndex = str.lastIndexOf(separators[i]);
    }
    if (lastSeparatorIndex == str.length) lastSeparatorIndex = 0;
    if (lastSeparatorIndex > 0 && lastSeparatorIndex < str.length) lastSeparatorIndex++;

    return str.substring(lastSeparatorIndex, str.length);
  };

  StringHelper.getNextWord = function getNextWord(str, position, separators) {
    var str = str.substring(position, str.length);
    var firstSeparatorIndex = str.length;
    for (var i = 0; i < separators.length; i++) {
      if (str.indexOf(separators[i]) < firstSeparatorIndex && str.indexOf(separators[i]) >= 0) firstSeparatorIndex = str.indexOf(separators[i]);
    }
    return str.substring(0, firstSeparatorIndex);
  };

  return StringHelper;
}();

var GuidHelper = exports.GuidHelper = function () {
  function GuidHelper() {
    _classCallCheck(this, GuidHelper);
  }

  GuidHelper.guid = function guid() {
    return GuidHelper._s4() + GuidHelper._s4() + '-' + GuidHelper._s4() + '-' + GuidHelper._s4() + '-' + GuidHelper._s4() + '-' + GuidHelper._s4() + GuidHelper._s4() + GuidHelper._s4();
  };

  GuidHelper._s4 = function _s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  };

  return GuidHelper;
}();

var DataHelper = exports.DataHelper = function () {
  function DataHelper() {
    _classCallCheck(this, DataHelper);
  }

  DataHelper.getNumericFields = function getNumericFields(fields) {
    return _.filter(fields, function (f) {
      if (f.type == "number" || f.type == "currency") return f;
    });
  };

  DataHelper.getStringFields = function getStringFields(fields) {
    return _.filter(fields, { type: "string" });
  };

  DataHelper.getDateFields = function getDateFields(fields) {
    return _.filter(fields, { type: "date" });
  };

  DataHelper.getFieldType = function getFieldType(collection, fieldName) {
    var blankCount = 0;
    var result;
    for (var i = 0; i < collection.length; i++) {
      var val = collection[i][fieldName];
      if (val != undefined) {
        if (DataHelper.isString(val)) result = "string";else if (DataHelper.isNumber(val)) {
          if (DataHelper.isCurrency(collection, fieldName)) result = "currency";else result = "number";
        } else if (DataHelper.isDate(val)) result = "date";
        return result;
      } else {
        blankCount++;
      }
      if (blankCount > 300) {
        return undefined;
      }
    }
  };

  DataHelper.deserializeDates = function deserializeDates(jsonArray) {
    for (var r = 0; r < jsonArray.length; r++) {
      var jsonObj = jsonArray[r];
      for (var field in jsonObj) {
        if (jsonObj.hasOwnProperty(field)) {
          var value = jsonObj[field];
          if (value && typeof value == 'string' && value.indexOf('/Date') === 0) {
            jsonObj[field] = new Date(parseInt(value.substr(6)));
          }
        }
      }
    }
    return jsonArray;
  };

  DataHelper.isCurrency = function isCurrency(collection, fieldName) {
    if (collection.length === 0 || !fieldName) return false;
    var largeValues = _.filter(collection, function (x) {
      return Math.abs(x[fieldName]) >= 1000;
    }).length;
    if (largeValues / collection.length > 0.4) return true;
    return false;
  };

  DataHelper.isDate = function isDate(value) {
    return new Date(value) !== "Invalid Date" && !isNaN(new Date(value));
  };

  DataHelper.isString = function isString(value) {
    return typeof value === 'string' || value instanceof String;
  };

  DataHelper.isNumber = function isNumber(value) {
    return typeof value === 'number';
  };

  return DataHelper;
}();

String.prototype.in = function (array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == this) return true;
  }
  return false;
};

var QueryExpressionEvaluator = exports.QueryExpressionEvaluator = function () {
  function QueryExpressionEvaluator() {
    _classCallCheck(this, QueryExpressionEvaluator);
  }

  QueryExpressionEvaluator.prototype.evaluate = function evaluate(data, searchExpression) {
    var res = [];
    if (searchExpression != "") {
      for (var _iterator6 = data, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
        var _ref6;

        if (_isArray6) {
          if (_i6 >= _iterator6.length) break;
          _ref6 = _iterator6[_i6++];
        } else {
          _i6 = _iterator6.next();
          if (_i6.done) break;
          _ref6 = _i6.value;
        }

        var record = _ref6;

        if (eval(searchExpression)) {
          res.push(record);
        }
      }
    } else res = data;
    return res;
  };

  return QueryExpressionEvaluator;
}();

var DataHolder = exports.DataHolder = function () {
  function DataHolder() {
    _classCallCheck(this, DataHolder);
  }

  _createClass(DataHolder, [{
    key: 'data',
    get: function get() {
      return this._data;
    },
    set: function set(value) {
      this._data = value;
    }
  }, {
    key: 'total',
    get: function get() {
      return this._total;
    },
    set: function set(value) {
      this._total = value;
    }
  }, {
    key: 'query',
    get: function get() {
      return this._query;
    },
    set: function set(value) {
      this._query = value;
    }
  }]);

  return DataHolder;
}();

var DSL_GRAMMAR = '\n{\nfunction createStringExpression(fieldname, value){\n \t\tvar prefix = "record.";\n \t\tvar result = "";\n \t\tvar v = value.trim().toLowerCase();\n        if (v.length>=2){\n          if ((v.indexOf("%")===0)&&(v.lastIndexOf("%")===(v.length-1)))\n              result = prefix + fieldname + ".toLowerCase().includes(\'" + v.substring(1,value.length-1) + "\')"\n          else if (v.indexOf("%")===0)\n              result = prefix + fieldname + ".toLowerCase().endsWith(\'" + v.substring(1,value.length) + "\')"\n          else if (v.lastIndexOf("%")===(value.length-1))\n              result = prefix + fieldname + ".toLowerCase().startsWith(\'" + v.substring(0,value.length-1) + "\')"\n        }\n        if (result == "")\n          result = prefix + fieldname + ".toLowerCase() == \'" + v + "\'";\n\n        result="(" + prefix + fieldname + "!=null && " + result + ")"\n\n        return result;\n }\n  function createInExpression (fieldname, value) {\n    var result = "";\n    var values = value.split(\',\');\n    for (var i=0;i<values.length;i++)\n    {\n      var find = \'[\\"\\\']\';\n      var re = new RegExp(find, \'g\');\n      var v = values[i].replace(new RegExp(find, \'g\'), "");\n      //result += "record." + fieldname + ".toLowerCase() ==" + v.trim().toLowerCase();\n      result += createStringExpression(fieldname, v)\n      if (i<(values.length-1))\n        result += " || ";\n    }\n    if (result.length>0)\n      result = "(" + result + ")"\n    return result;\n  }\n}\n\nstart = expression\n\nexpression = c:condition j:join e:expression space? {return c+j+e;}\n           / c:condition space? {return c;}\n\njoin "LOGIC_OPERATOR"\n     = and\n     / or\n\nand = space* "and"i space* {return " && ";}\n\nor = space* "or"i space* {return " || ";}\n\n\ncondition = space? f:stringField o:op_eq v:stringValue {return createStringExpression(f,v);}\n          / space? f:stringField o:op_in a:valuesArray {return createInExpression(f,a);}\n          / space? f:numericField o:op v:numericValue {return "record." + f + o + v;}\n          / space? f:dateField o:op v:dateValue {return "record." + f + o + v;}\n          / "(" space? e:expression space* ")" space* {return "(" + e +")";}\n\n\n\nvaluesArray "STRING_VALUES_ARRAY"\n      = parentheses_l va:$(v:stringValue space* nextValue*)+ parentheses_r {return  va }\n\nnextValue = nv:(space* "," space* v:stringValue) {return  nv}\n\n\n\ndateValue "DATE_VALUE"\n        = quote? dt:$(date+) quote? {return "\'" + dt + "\'";}\n\n\nstringValue  "STRING_VALUE"\n\t  = quote w:$(char+) quote {return  w }\n      / quote quote {return "";}\n\n\nnumericValue  "NUMERIC_VALUE"\n       = $(numeric+)\n\n\nop "OPERATOR"\n   = op_eq\n   / ge\n   / gt\n   / le\n   / lt\n\nop_eq "STRING_OPERATOR_EQUAL"\n  = eq\n  / not_eq\n\nop_in "STRING_OPERATOR_IN"\n  = in\n\neq = space* "=" space* {return "==";}\n\nnot_eq = space* "!=" space* {return "!=";}\n\ngt = space* v:">" space* {return v;}\n\nge = space* v:">=" space* {return v;}\n\nlt = space* v:"<" space* {return v;}\n\nle = space* v:"<=" space* {return v;}\n\nin = space* v:"in" space* {return v;}\n\n\ndate = [0-9 \\:\\/]\n\nchar = [a-z0-9 \\%\\$\\_\\-\\:\\,\\.\\/]i\n\nnumeric = [0-9-\\.]\n\nspace = [ \\t\\n\\r]+\n\nparentheses_l = [\\(] space*\n\nparentheses_r = space* [\\)]\n\nfield "FIELD_NAME"\n      = stringField\n     / numericField\n     / dateField\n\nstringField "STRING_FIELD_NAME"\n     = @S@\n\nnumericField "NUMERIC_FIELD_NAME"\n     = @N@\n\ndateField "DATE_FIELD_NAME"\n     = @D@\n\nquote = [\\\'\\"]\n\n\n';

var Grammar = exports.Grammar = function () {
  function Grammar() {
    _classCallCheck(this, Grammar);
  }

  Grammar.prototype.getGrammar = function getGrammar() {
    return DSL_GRAMMAR;
  };

  return Grammar;
}();

var ExpressionParser = exports.ExpressionParser = function () {
  function ExpressionParser(pegParser) {
    _classCallCheck(this, ExpressionParser);

    this.parser = pegParser;
  }

  ExpressionParser.prototype.parse = function parse(searchString) {
    return this.parser.parse(searchString);
  };

  ExpressionParser.prototype.validate = function validate(searchString) {
    try {
      this.parser.parse(searchString);
      return true;
    } catch (ex) {
      return false;
    }
  };

  return ExpressionParser;
}();

var DashboardConfiguration = exports.DashboardConfiguration = function () {
  function DashboardConfiguration() {
    _classCallCheck(this, DashboardConfiguration);
  }

  DashboardConfiguration.prototype.invoke = function invoke() {};

  return DashboardConfiguration;
}();

var CacheStorage = exports.CacheStorage = function () {
  function CacheStorage() {
    _classCallCheck(this, CacheStorage);
  }

  CacheStorage.prototype.setItem = function setItem(key, value, expiration) {};

  CacheStorage.prototype.getItem = function getItem(key) {};

  CacheStorage.prototype.removeItem = function removeItem(key) {};

  CacheStorage.prototype.removeExpired = function removeExpired() {};

  return CacheStorage;
}();

var CacheManager = exports.CacheManager = function () {
  function CacheManager(storage) {
    _classCallCheck(this, CacheManager);

    this._cacheStorage = storage;
    this._cleanInterval = 5000;
  }

  CacheManager.prototype.startCleaner = function startCleaner() {
    var _this3 = this;

    if (!this.cleaner) {
      (function () {
        var self = _this3;
        _this3.cleaner = window.setInterval(function () {
          self._cacheStorage.removeExpired();
        }, _this3._cleanInterval);
      })();
    }
  };

  CacheManager.prototype.stopCleaner = function stopCleaner() {
    if (this.cleaner) window.clearInterval(this.cleaner);
  };

  CacheManager.prototype.getStorage = function getStorage() {
    return this._cacheStorage;
  };

  _createClass(CacheManager, [{
    key: 'cleanInterval',
    get: function get() {
      return this._cleanInterval;
    }
  }]);

  return CacheManager;
}();

function configure(aurelia) {
  aurelia.globalResources("./helpers/converters/value-format");
}

var StaticSchemaProvider = exports.StaticSchemaProvider = function (_SchemaProvider) {
  _inherits(StaticSchemaProvider, _SchemaProvider);

  function StaticSchemaProvider(schema) {
    _classCallCheck(this, StaticSchemaProvider);

    var _this4 = _possibleConstructorReturn(this, _SchemaProvider.call(this));

    _this4._schema = schema;
    return _this4;
  }

  StaticSchemaProvider.prototype.getSchema = function getSchema() {
    var _this5 = this;

    return new Promise(function (resolve, reject) {
      resolve(_this5._schema);
    });
  };

  return StaticSchemaProvider;
}(SchemaProvider);

var DataFilterHandleBehavior = exports.DataFilterHandleBehavior = function (_WidgetBehavior) {
  _inherits(DataFilterHandleBehavior, _WidgetBehavior);

  function DataFilterHandleBehavior(channel, eventAggregator, filterMapper) {
    _classCallCheck(this, DataFilterHandleBehavior);

    var _this6 = _possibleConstructorReturn(this, _WidgetBehavior.call(this));

    _this6._channel = channel;
    _this6._eventAggregator = eventAggregator;
    _this6._filterMapper = filterMapper;
    return _this6;
  }

  DataFilterHandleBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    _WidgetBehavior.prototype.attachToWidget.call(this, widget);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._channel, function (message) {
      var filterToApply = me._filterMapper ? me._filterMapper(message) : message.dataFilter;
      me.widget.dataFilter = filterToApply;
      me.widget.refresh();
    });
  };

  DataFilterHandleBehavior.prototype.detach = function detach() {
    _WidgetBehavior.prototype.detach.call(this, dashboard);
    if (this.subscription) this.subscription.dispose();
  };

  return DataFilterHandleBehavior;
}(WidgetBehavior);

var DataSourceHandleBehavior = exports.DataSourceHandleBehavior = function (_WidgetBehavior2) {
  _inherits(DataSourceHandleBehavior, _WidgetBehavior2);

  function DataSourceHandleBehavior(channel, eventAggregator) {
    _classCallCheck(this, DataSourceHandleBehavior);

    var _this7 = _possibleConstructorReturn(this, _WidgetBehavior2.call(this));

    _this7._channel = channel;
    _this7._eventAggregator = eventAggregator;
    return _this7;
  }

  DataSourceHandleBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    _WidgetBehavior2.prototype.attachToWidget.call(this, widget);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._channel, function (message) {
      me.widget.dataSource = message.dataSource;
      me.widget.refresh();
    });
  };

  DataSourceHandleBehavior.prototype.detach = function detach() {
    _WidgetBehavior2.prototype.detach.call(this, dashboard);
    if (this.subscription) this.subscription.dispose();
  };

  return DataSourceHandleBehavior;
}(WidgetBehavior);

var SettingsHandleBehavior = exports.SettingsHandleBehavior = function (_WidgetBehavior3) {
  _inherits(SettingsHandleBehavior, _WidgetBehavior3);

  function SettingsHandleBehavior(channel, eventAggregator, messageMapper) {
    _classCallCheck(this, SettingsHandleBehavior);

    var _this8 = _possibleConstructorReturn(this, _WidgetBehavior3.call(this));

    _this8._channel = channel;
    _this8._eventAggregator = eventAggregator;
    _this8._messageMapper = messageMapper;
    return _this8;
  }

  SettingsHandleBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    _WidgetBehavior3.prototype.attachToWidget.call(this, widget);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._channel, function (message) {
      var settingsToApply = me._messageMapper ? me._messageMapper(message) : message;
      _.forOwn(settingsToApply, function (v, k) {
        me.widget[k] = v;
      });

      me.widget.refresh();
    });
  };

  SettingsHandleBehavior.prototype.detach = function detach() {
    _WidgetBehavior3.prototype.detach.call(this, dashboard);
    if (this.subscription) this.subscription.dispose();
  };

  return SettingsHandleBehavior;
}(WidgetBehavior);

var DataActivatedBehavior = exports.DataActivatedBehavior = function (_WidgetBehavior4) {
  _inherits(DataActivatedBehavior, _WidgetBehavior4);

  function DataActivatedBehavior(chanel, eventAggregator) {
    _classCallCheck(this, DataActivatedBehavior);

    var _this9 = _possibleConstructorReturn(this, _WidgetBehavior4.call(this));

    _this9._chanel = chanel;
    _this9._eventAggregator = eventAggregator;
    return _this9;
  }

  DataActivatedBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    _WidgetBehavior4.prototype.attachToWidget.call(this, widget);
    var me = this;

    widget.dataActivated = function (currentRecord) {
      var message = new WidgetEventMessage(me.widget.name);
      message.activatedData = currentRecord;
      me._eventAggregator.publish(me._chanel, message);
    };
  };

  DataActivatedBehavior.prototype.detach = function detach() {
    _WidgetBehavior4.prototype.detach.call(this, dashboard);
  };

  return DataActivatedBehavior;
}(WidgetBehavior);

var DataFieldSelectedBehavior = exports.DataFieldSelectedBehavior = function (_WidgetBehavior5) {
  _inherits(DataFieldSelectedBehavior, _WidgetBehavior5);

  function DataFieldSelectedBehavior(chanel, eventAggregator) {
    _classCallCheck(this, DataFieldSelectedBehavior);

    var _this10 = _possibleConstructorReturn(this, _WidgetBehavior5.call(this));

    _this10._chanel = chanel;
    _this10._eventAggregator = eventAggregator;
    return _this10;
  }

  DataFieldSelectedBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    _WidgetBehavior5.prototype.attachToWidget.call(this, widget);
    var me = this;

    widget.dataFieldSelected = function (fieldName) {
      var message = new WidgetEventMessage(me.widget.name);
      message.fieldName = fieldName;
      me._eventAggregator.publish(me._chanel, message);
    };
  };

  DataFieldSelectedBehavior.prototype.detach = function detach() {
    _WidgetBehavior5.prototype.detach.call(this, dashboard);
  };

  return DataFieldSelectedBehavior;
}(WidgetBehavior);

var DataFilterChangedBehavior = exports.DataFilterChangedBehavior = function (_WidgetBehavior6) {
  _inherits(DataFilterChangedBehavior, _WidgetBehavior6);

  function DataFilterChangedBehavior(channel, eventAggregator) {
    _classCallCheck(this, DataFilterChangedBehavior);

    var _this11 = _possibleConstructorReturn(this, _WidgetBehavior6.call(this));

    _this11._channel = channel;
    _this11._eventAggregator = eventAggregator;
    return _this11;
  }

  DataFilterChangedBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    _WidgetBehavior6.prototype.attachToWidget.call(this, widget);
    var me = this;
    widget.dataFilterChanged = function (filter) {
      var message = new WidgetEventMessage(me.widget.name);
      message.dataFilter = filter;
      me._eventAggregator.publish(me._channel, message);
    };
  };

  DataFilterChangedBehavior.prototype.detach = function detach() {
    _WidgetBehavior6.prototype.detach.call(this, dashboard);
  };

  return DataFilterChangedBehavior;
}(WidgetBehavior);

var DataSelectedBehavior = exports.DataSelectedBehavior = function (_WidgetBehavior7) {
  _inherits(DataSelectedBehavior, _WidgetBehavior7);

  function DataSelectedBehavior(chanel, eventAggregator) {
    _classCallCheck(this, DataSelectedBehavior);

    var _this12 = _possibleConstructorReturn(this, _WidgetBehavior7.call(this));

    _this12._chanel = chanel;
    _this12._eventAggregator = eventAggregator;
    return _this12;
  }

  DataSelectedBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    _WidgetBehavior7.prototype.attachToWidget.call(this, widget);
    var me = this;

    widget.dataSelected = function (currentRecord) {
      var message = new WidgetEventMessage(me.widget.name);
      message.selectedData = currentRecord;
      me._eventAggregator.publish(me._chanel, message);
    };
  };

  DataSelectedBehavior.prototype.detach = function detach() {
    _WidgetBehavior7.prototype.detach.call(this, dashboard);
  };

  return DataSelectedBehavior;
}(WidgetBehavior);

var DataSourceChangedBehavior = exports.DataSourceChangedBehavior = function (_WidgetBehavior8) {
  _inherits(DataSourceChangedBehavior, _WidgetBehavior8);

  function DataSourceChangedBehavior(channel, eventAggregator) {
    _classCallCheck(this, DataSourceChangedBehavior);

    var _this13 = _possibleConstructorReturn(this, _WidgetBehavior8.call(this));

    _this13._channel = channel;
    _this13._eventAggregator = eventAggregator;
    return _this13;
  }

  DataSourceChangedBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    _WidgetBehavior8.prototype.attachToWidget.call(this, widget);
    var me = this;
    widget.dataSourceChanged = function (dataSource) {
      var message = new WidgetEventMessage(me.widget.name);
      message.dataSource = dataSource;
      me._eventAggregator.publish(me._channel, message);
    };
  };

  DataSourceChangedBehavior.prototype.detach = function detach() {
    _WidgetBehavior8.prototype.detach.call(this, dashboard);
  };

  return DataSourceChangedBehavior;
}(WidgetBehavior);

var ChangeRouteBehavior = exports.ChangeRouteBehavior = function (_DashboardBehavior) {
  _inherits(ChangeRouteBehavior, _DashboardBehavior);

  function ChangeRouteBehavior(settings) {
    _classCallCheck(this, ChangeRouteBehavior);

    var _this14 = _possibleConstructorReturn(this, _DashboardBehavior.call(this));

    _this14._chanel = settings.chanel;
    _this14._eventAggregator = settings.eventAggregator;
    _this14._newRoute = settings.newRoute;
    _this14._router = settings.router;
    _this14._paramsMapper = settings.paramsMapper;
    return _this14;
  }

  ChangeRouteBehavior.prototype.attach = function attach(dashboard) {
    _DashboardBehavior.prototype.attach.call(this, dashboard);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._chanel, function (message) {
      var params = me._paramsMapper ? me._paramsMapper(message) : "";
      if (params !== "" && params.indexOf("?") != 0) params = "?" + params;
      var navItem = {
        route: me._newRoute.route + (params !== "" ? params : ""),
        title: me._newRoute.title,
        dashboardName: me._newRoute.dashboardName
      };
      me._router.navigate(navItem);
    });
  };

  ChangeRouteBehavior.prototype.detach = function detach() {
    _DashboardBehavior.prototype.detach.call(this, dashboard);
    if (this.subscription) this.subscription.dispose();
  };

  return ChangeRouteBehavior;
}(DashboardBehavior);

var CreateWidgetBehavior = exports.CreateWidgetBehavior = function (_DashboardBehavior2) {
  _inherits(CreateWidgetBehavior, _DashboardBehavior2);

  function CreateWidgetBehavior(chanel, widgetType, widgetSettings, widgetDimensions, eventAggregator, filterMapper) {
    _classCallCheck(this, CreateWidgetBehavior);

    var _this15 = _possibleConstructorReturn(this, _DashboardBehavior2.call(this));

    _this15._chanel = chanel;
    _this15._widgetType = widgetType;
    _this15._widgetSettings = widgetSettings;
    _this15._widgetDimensions = widgetDimensions;
    _this15._eventAggregator = eventAggregator;
    _this15._filterMapper = filterMapper;
    return _this15;
  }

  CreateWidgetBehavior.prototype.attach = function attach(dashboard) {
    var _this16 = this;

    _DashboardBehavior2.prototype.attach.call(this, dashboard);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._chanel, function (message) {
      var w = dashboard.getWidgetByName(me._widgetSettings.name);
      if (!w) {
        var w = new me._widgetType(me._widgetSettings);
        dashboard.addWidget(w, _this16._widgetDimensions);
      }
      w.dataFilter = me._filterMapper ? me._filterMapper(message) : "";
      w.refresh();
    });
  };

  CreateWidgetBehavior.prototype.detach = function detach() {
    _DashboardBehavior2.prototype.detach.call(this, dashboard);
    if (this.subscription) this.subscription.dispose();
  };

  return CreateWidgetBehavior;
}(DashboardBehavior);

var ManageNavigationStackBehavior = exports.ManageNavigationStackBehavior = function (_DashboardBehavior3) {
  _inherits(ManageNavigationStackBehavior, _DashboardBehavior3);

  function ManageNavigationStackBehavior(eventAggregator) {
    _classCallCheck(this, ManageNavigationStackBehavior);

    var _this17 = _possibleConstructorReturn(this, _DashboardBehavior3.call(this));

    _this17._eventAggregator = eventAggregator;
    return _this17;
  }

  ManageNavigationStackBehavior.prototype.attach = function attach(dashboard) {
    _DashboardBehavior3.prototype.attach.call(this, dashboard);
    var me = this;

    this.subscription = this._eventAggregator.subscribe("widget-back-button-channel", function (message) {
      var originatorWidget = dashboard.getWidgetByName(message.originatorName);
      if (originatorWidget) {
        var previousWidget = message.navigationStack.pop();
        dashboard.replaceWidget(originatorWidget, previousWidget);
      }
    });
  };

  ManageNavigationStackBehavior.prototype.detach = function detach() {
    _DashboardBehavior3.prototype.detach.call(this, dashboard);
    if (this.subscription) this.subscription.dispose();
  };

  return ManageNavigationStackBehavior;
}(DashboardBehavior);

var ReplaceWidgetBehavior = exports.ReplaceWidgetBehavior = function (_DashboardBehavior4) {
  _inherits(ReplaceWidgetBehavior, _DashboardBehavior4);

  function ReplaceWidgetBehavior(chanel, eventAggregator, widgetToReplaceName, widgetType, widgetSettings, mapper) {
    _classCallCheck(this, ReplaceWidgetBehavior);

    var _this18 = _possibleConstructorReturn(this, _DashboardBehavior4.call(this));

    _this18._chanel = chanel;
    _this18._widgetType = widgetType;
    _this18._widgetSettings = widgetSettings;
    _this18._eventAggregator = eventAggregator;
    _this18._widgetToReplaceName = widgetToReplaceName;
    _this18._mapper = mapper;
    return _this18;
  }

  ReplaceWidgetBehavior.prototype.attach = function attach(dashboard) {
    _DashboardBehavior4.prototype.attach.call(this, dashboard);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._chanel, function (message) {
      var originatorWidget = dashboard.getWidgetByName(me._widgetToReplaceName);
      var w = new me._widgetType(me._widgetSettings);
      dashboard.replaceWidget(originatorWidget, w);
      if (me._mapper) w.dataFilter = me._mapper(message);
      w.refresh();
    });
  };

  ReplaceWidgetBehavior.prototype.detach = function detach() {
    _DashboardBehavior4.prototype.detach.call(this, dashboard);
    if (this.subscription) this.subscription.dispose();
  };

  return ReplaceWidgetBehavior;
}(DashboardBehavior);

var Chart = exports.Chart = function (_Widget) {
  _inherits(Chart, _Widget);

  function Chart(settings) {
    _classCallCheck(this, Chart);

    var _this19 = _possibleConstructorReturn(this, _Widget.call(this, settings));

    _this19.categoriesField = settings.categoriesField;
    _this19.seriesDefaults = settings.seriesDefaults;
    _this19.stateType = "chartState";
    _this19.attachBehaviors();
    return _this19;
  }

  _createClass(Chart, [{
    key: 'categoriesField',
    get: function get() {
      return this._categoriesField;
    },
    set: function set(value) {
      this._categoriesField = value;
    }
  }, {
    key: 'seriesDefaults',
    get: function get() {
      return this._seriesDefaults;
    },
    set: function set(value) {
      this._seriesDefaults = value;
    }
  }]);

  return Chart;
}(Widget);

var DataSourceConfigurator = exports.DataSourceConfigurator = function (_Widget2) {
  _inherits(DataSourceConfigurator, _Widget2);

  function DataSourceConfigurator(settings) {
    _classCallCheck(this, DataSourceConfigurator);

    var _this20 = _possibleConstructorReturn(this, _Widget2.call(this, settings));

    _this20.dataSourceToConfigurate = settings.dataSourceToConfigurate;
    _this20.stateType = "dataSourceConfiguratorState";
    _this20._dataSourceChanged = new WidgetEvent();
    _this20.attachBehaviors();
    return _this20;
  }

  _createClass(DataSourceConfigurator, [{
    key: 'dataSourceToConfigurate',
    get: function get() {
      return this._dataSourceToConfigurate;
    },
    set: function set(value) {
      this._dataSourceToConfigurate = value;
    }
  }, {
    key: 'dataSourceChanged',
    get: function get() {
      return this._dataSourceChanged;
    },
    set: function set(handler) {
      this._dataSourceChanged.attach(handler);
    }
  }]);

  return DataSourceConfigurator;
}(Widget);

var DetailedView = exports.DetailedView = function (_Widget3) {
  _inherits(DetailedView, _Widget3);

  function DetailedView(settings) {
    _classCallCheck(this, DetailedView);

    var _this21 = _possibleConstructorReturn(this, _Widget3.call(this, settings));

    _this21.fields = settings.fields;
    _this21.stateType = "detailedViewState";
    _this21.attachBehaviors();
    return _this21;
  }

  _createClass(DetailedView, [{
    key: 'fields',
    get: function get() {
      return this._fields;
    },
    set: function set(value) {
      this._fields = value;
    }
  }]);

  return DetailedView;
}(Widget);

var Grid = exports.Grid = function (_Widget4) {
  _inherits(Grid, _Widget4);

  function Grid(settings) {
    _classCallCheck(this, Grid);

    var _this22 = _possibleConstructorReturn(this, _Widget4.call(this, settings));

    _this22.columns = settings.columns ? settings.columns : [];
    _this22.navigatable = settings.navigatable;
    _this22.autoGenerateColumns = settings.autoGenerateColumns;
    _this22.pageSize = settings.pageSize;
    _this22.group = settings.group;

    _this22.stateType = "gridState";

    _this22._dataSelected = new WidgetEvent();
    _this22._dataActivated = new WidgetEvent();
    _this22._dataFieldSelected = new WidgetEvent();

    _this22.attachBehaviors();
    return _this22;
  }

  Grid.prototype.saveState = function saveState() {
    this.state = { columns: this.columns };
  };

  Grid.prototype.restoreState = function restoreState() {
    if (this.state) this.columns = this.state.columns;
  };

  _createClass(Grid, [{
    key: 'columns',
    get: function get() {
      return this._columns;
    },
    set: function set(value) {
      this._columns = value;
    }
  }, {
    key: 'navigatable',
    get: function get() {
      return this._navigatable;
    },
    set: function set(value) {
      this._navigatable = value;
    }
  }, {
    key: 'autoGenerateColumns',
    get: function get() {
      return this._autoGenerateColumns;
    },
    set: function set(value) {
      this._autoGenerateColumns = value;
    }
  }, {
    key: 'pageSize',
    get: function get() {
      return this._pageSize;
    },
    set: function set(value) {
      this._pageSize = value;
    }
  }, {
    key: 'group',
    get: function get() {
      return this._group;
    },
    set: function set(value) {
      this._group = value;
    }
  }, {
    key: 'dataSelected',
    get: function get() {
      return this._dataSelected;
    },
    set: function set(handler) {
      this._dataSelected.attach(handler);
    }
  }, {
    key: 'dataActivated',
    get: function get() {
      return this._dataActivated;
    },
    set: function set(handler) {
      this._dataActivated.attach(handler);
    }
  }, {
    key: 'dataFieldSelected',
    get: function get() {
      return this._dataFieldSelected;
    },
    set: function set(handler) {
      this._dataFieldSelected.attach(handler);
    }
  }]);

  return Grid;
}(Widget);

var SearchBox = exports.SearchBox = function (_Widget5) {
  _inherits(SearchBox, _Widget5);

  function SearchBox(settings) {
    _classCallCheck(this, SearchBox);

    var _this23 = _possibleConstructorReturn(this, _Widget5.call(this, settings));

    _this23.stateType = "searchBoxState";
    _this23._dataFilterChanged = new WidgetEvent();
    _this23.attachBehaviors();
    return _this23;
  }

  _createClass(SearchBox, [{
    key: 'dataFilterChanged',
    get: function get() {
      return this._dataFilterChanged;
    },
    set: function set(handler) {
      this._dataFilterChanged.attach(handler);
    }
  }]);

  return SearchBox;
}(Widget);

var JsonDataService = exports.JsonDataService = (_dec2 = (0, _aureliaFramework.transient)(), _dec3 = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec2(_class3 = _dec3(_class3 = function (_DataService) {
  _inherits(JsonDataService, _DataService);

  function JsonDataService(http) {
    _classCallCheck(this, JsonDataService);

    var _this24 = _possibleConstructorReturn(this, _DataService.call(this));

    http.configure(function (config) {
      config.useStandardConfiguration();
    });
    _this24._http = http;
    return _this24;
  }

  JsonDataService.prototype.read = function read(options) {
    var _this25 = this;

    var url = this.url + (this.queryMapper ? this.queryMapper(options) : "");
    return this._http.fetch(this.url).then(function (response) {
      return response.json();
    }).then(function (jsonData) {
      return {
        data: _this25.dataMapper ? _this25.dataMapper(jsonData) : jsonData,
        total: _this25.totalMapper ? _this25.totalMapper(jsonData) : jsonData.length
      };
    });
  };

  return JsonDataService;
}(DataService)) || _class3) || _class3);

var SwaggerSchemaProvider = exports.SwaggerSchemaProvider = function (_SchemaProvider2) {
  _inherits(SwaggerSchemaProvider, _SchemaProvider2);

  function SwaggerSchemaProvider(definitionUrl, apiName, methodName, modelName) {
    _classCallCheck(this, SwaggerSchemaProvider);

    var _this26 = _possibleConstructorReturn(this, _SchemaProvider2.call(this));

    _this26._modelName = modelName;
    _this26._methodName = methodName;
    _this26._apiName = apiName;
    _this26._definitionUrl = definitionUrl;
    return _this26;
  }

  SwaggerSchemaProvider.prototype.getSchema = function getSchema() {
    var self = this;
    return new _swaggerClient2.default({
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
}(SchemaProvider);

var STORAGE_KEY = "prcpfwk23875hrw28esgfds";

var UserStateStorage = exports.UserStateStorage = (_dec4 = (0, _aureliaFramework.inject)(Storage), _dec4(_class4 = function () {
  function UserStateStorage(storage) {
    _classCallCheck(this, UserStateStorage);

    this._storage = storage;
    this._key = STORAGE_KEY;
  }

  UserStateStorage.prototype.getAll = function getAll(namespace) {
    var data = this._storage.get(this._key);
    if (data) {
      if (!namespace) return data;
      namespace = this._createFullNamespace(namespace);
      return _.filter(data, function (x) {
        return x.key.indexOf(namespace) === 0;
      });
    }
    return [];
  };

  UserStateStorage.prototype.get = function get(key) {
    var o = this._getObj(key);
    if (o) return o.value;
    return undefined;
  };

  UserStateStorage.prototype.set = function set(key, value) {
    var all = this.getAll();
    var oldState = { key: key };
    var newState = { key: key, value: value };
    var item = _.find(all, { 'key': key });
    if (item) {
      oldState.value = item.value;
      item.value = value;
    } else all.push({ key: key, value: value });
    this._storage.set(this._key, all);
  };

  UserStateStorage.prototype.remove = function remove(key) {
    var all = this.getAll();
    _.remove(all, function (i) {
      return i.key == key;
    });
    this._storage.set(this._key, all);
  };

  UserStateStorage.prototype.clearAll = function clearAll() {
    this._storage.clear();
  };

  UserStateStorage.prototype.createKey = function createKey(namespace, key) {
    return this._createFullNamespace(namespace) + key;
  };

  UserStateStorage.prototype._createFullNamespace = function _createFullNamespace(namespace) {
    return namespace + ":";
  };

  UserStateStorage.prototype._getObj = function _getObj(k) {
    var data = this.getAll();
    var obj = _.find(data, { 'key': k });
    return obj;
  };

  return UserStateStorage;
}()) || _class4);

var StateUrlParser = exports.StateUrlParser = function () {
  function StateUrlParser() {
    _classCallCheck(this, StateUrlParser);
  }

  StateUrlParser.stateToQuery = function stateToQuery(widgetStates) {
    var params = [];
    for (var _iterator7 = widgetStates, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
      var _ref7;

      if (_isArray7) {
        if (_i7 >= _iterator7.length) break;
        _ref7 = _iterator7[_i7++];
      } else {
        _i7 = _iterator7.next();
        if (_i7.done) break;
        _ref7 = _i7.value;
      }

      var widgetState = _ref7;

      params.push({ "sk": widgetState.key, "sv": widgetState.value });
    }
    return params.length > 0 ? "?q=" + UrlHelper.objectToQuery(params) : "";
  };

  StateUrlParser.queryToState = function queryToState(url) {
    var result = [];
    var q = UrlHelper.getParameterByName("q", url);
    if (q) {
      var widgetStates = UrlHelper.queryToObject(q);
      for (var _iterator8 = widgetStates, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
        var _ref8;

        if (_isArray8) {
          if (_i8 >= _iterator8.length) break;
          _ref8 = _iterator8[_i8++];
        } else {
          _i8 = _iterator8.next();
          if (_i8.done) break;
          _ref8 = _i8.value;
        }

        var ws = _ref8;

        result.push({ "key": ws.sk, "value": ws.sv });
      }
    }
    return result;
  };

  return StateUrlParser;
}();

var Query = exports.Query = function () {
  function Query() {
    _classCallCheck(this, Query);
  }

  Query.prototype.cacheKey = function cacheKey() {
    return Math.abs(StringHelper.hashCode((this.serverSideFilter ? this.serverSideFilter : "") + (this.fields ? this.fields.join("") : "") + (this.sort ? this.sort : "") + (this.sortDir ? this.sortDir : "") + (this.take ? this.take : "0") + (this.skip ? this.skip : "0")));
  };

  _createClass(Query, [{
    key: 'sort',
    get: function get() {
      return this._sort;
    },
    set: function set(value) {
      this._sort = value;
    }
  }, {
    key: 'group',
    get: function get() {
      return this._group;
    },
    set: function set(value) {
      this._group = value;
    }
  }, {
    key: 'sortDir',
    get: function get() {
      return this._sortDir;
    },
    set: function set(value) {
      this._sortDir = value;
    }
  }, {
    key: 'take',
    get: function get() {
      return this._take;
    },
    set: function set(value) {
      this._take = value;
    }
  }, {
    key: 'fields',
    get: function get() {
      return this._fields;
    },
    set: function set(value) {
      this._fields = value;
    }
  }, {
    key: 'skip',
    get: function get() {
      return this._skip;
    },
    set: function set(value) {
      this._skip = value;
    }
  }, {
    key: 'serverSideFilter',
    get: function get() {
      return this._serverSideFilter;
    },
    set: function set(value) {
      this._serverSideFilter = value;
    }
  }]);

  return Query;
}();

var FormatValueConverter = function () {
  function FormatValueConverter() {
    _classCallCheck(this, FormatValueConverter);
  }

  FormatValueConverter.format = function format(value, _format) {
    if (DataHelper.isDate(value)) return (0, _moment2.default)(value).format(_format);
    if (DataHelper.isNumber(value)) return (0, _numeral2.default)(value).format(_format);
    return value;
  };

  FormatValueConverter.prototype.toView = function toView(value, format) {
    return FormatValueConverter.format(value, format);
  };

  return FormatValueConverter;
}();

exports.FormatValueConverter = FormatValueConverter;
var StaticJsonDataService = exports.StaticJsonDataService = (_dec5 = (0, _aureliaFramework.transient)(), _dec6 = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec5(_class5 = _dec6(_class5 = function (_DataService2) {
  _inherits(StaticJsonDataService, _DataService2);

  function StaticJsonDataService(http) {
    _classCallCheck(this, StaticJsonDataService);

    var _this27 = _possibleConstructorReturn(this, _DataService2.call(this));

    http.configure(function (config) {
      config.useStandardConfiguration();
    });
    _this27._http = http;
    return _this27;
  }

  StaticJsonDataService.prototype.read = function read(options) {
    var _this28 = this;

    return this._http.fetch(this.url).then(function (response) {
      return response.json();
    }).then(function (jsonData) {
      var d = jsonData;
      d = _this28.dataMapper ? _this28.dataMapper(d) : d;
      if (options.filter) {
        var evaluator = new QueryExpressionEvaluator();
        d = evaluator.evaluate(d, options.filter);
      }
      var total = d.length;

      if (options.sort) d = _.orderBy(d, [options.sort], [options.sortDir]);
      var l = options.skip + options.take;
      d = l ? _.slice(d, options.skip, l > d.length ? d.length : l) : d;
      if (options.fields && options.fields.length > 0) d = _.map(d, function (item) {
        return _.pick(item, options.fields);
      });
      return {
        data: DataHelper.deserializeDates(d),
        total: _this28.totalMapper ? _this28.totalMapper(jsonData) : total
      };
    });
  };

  return StaticJsonDataService;
}(DataService)) || _class5) || _class5);

var Datasource = exports.Datasource = function () {
  function Datasource(datasourceConfiguration) {
    _classCallCheck(this, Datasource);

    this._name = datasourceConfiguration.name;
    this._transport = datasourceConfiguration.transport;
    this._schemeConfig = datasourceConfiguration.schemeConfig;
    this._cache = datasourceConfiguration.cache;
  }

  Datasource.prototype.createDataHolder = function createDataHolder() {
    return new DataHolder(this);
  };

  Datasource.prototype.cacheOn = function cacheOn(cacheKey) {
    if (this._cache && this._cache.cacheManager) {
      var storage = this._cache.cacheManager.getStorage();
      return storage.getItem(cacheKey);
    }
  };

  Datasource.prototype.getData = function getData(query) {
    var _this29 = this;

    var dataHolder = new DataHolder();
    dataHolder.query = query;

    if (!this.transport && !this.transport.readService) throw "readService is not configured";

    var storage = void 0;
    var cacheKey = this.transport.readService.url + query.cacheKey();
    if (this._cache && this._cache.cacheManager) {
      storage = this._cache.cacheManager.getStorage();
      var cachedDataHolder = storage.getItem(cacheKey);
      if (cachedDataHolder) {
        dataHolder.data = cachedDataHolder.data;
        dataHolder.total = cachedDataHolder.total;
        return new Promise(function (resolve, reject) {
          resolve(dataHolder);
        });
      }
    }
    return this.transport.readService.read({
      fields: query.fields,
      filter: query.serverSideFilter ? query.serverSideFilter : "",
      take: query.take,
      skip: query.skip,
      sort: query.sort,
      sortDir: query.sortDir
    }).then(function (d) {
      dataHolder.data = _.isArray(d.data) ? d.data : [d.data];
      dataHolder.total = d.total;
      if (storage) storage.setItem(cacheKey, { data: dataHolder.data, total: dataHolder.total }, _this29._cache.cacheTimeSeconds);
      return dataHolder;
    });
  };

  Datasource.prototype.create = function create(entity) {
    if (!this.transport && !this.transport.createService) throw "createService is not configured";
    return this.transport.createService.create(entity);
  };

  Datasource.prototype.update = function update(id, entity) {
    if (!this.transport && !this.transport.updateService) throw "updateService is not configured";
    return this.transport.updateService.update(id, entity);
  };

  Datasource.prototype.delete = function _delete(id, entity) {
    if (!this.transport && !this.transport.deleteService) throw "deleteService is not configured";
    return this.transport.updateService.delete(entity);
  };

  _createClass(Datasource, [{
    key: 'name',
    get: function get() {
      return this._name;
    }
  }, {
    key: 'transport',
    get: function get() {
      return this._transport;
    }
  }, {
    key: 'cacheManager',
    get: function get() {
      return this._cacheManager;
    }
  }]);

  return Datasource;
}();

var DataSourceConfiguration = exports.DataSourceConfiguration = function () {
  function DataSourceConfiguration() {
    _classCallCheck(this, DataSourceConfiguration);
  }

  _createClass(DataSourceConfiguration, [{
    key: 'cache',
    get: function get() {
      return this._cache;
    },
    set: function set(value) {
      this._cache = value;
    }
  }, {
    key: 'transport',
    get: function get() {
      return this._transport;
    },
    set: function set(value) {
      this._transport = value;
    }
  }, {
    key: 'name',
    get: function get() {
      return this._name;
    },
    set: function set(value) {
      this._name = value;
    }
  }]);

  return DataSourceConfiguration;
}();

var ExpressionParserFactory = exports.ExpressionParserFactory = (_dec7 = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec7(_class6 = function () {
  function ExpressionParserFactory(http) {
    _classCallCheck(this, ExpressionParserFactory);

    http.configure(function (config) {
      config.useStandardConfiguration();
    });
    this.http = http;
  }

  ExpressionParserFactory.prototype.createInstance = function createInstance(numericFieldList, stringFieldList, dateFieldList) {
    var that = this;
    var text = new Grammar().getGrammar();
    var parserText = text.replace('@S@', that.concatenateFieldList(stringFieldList)).replace('@N@', that.concatenateFieldList(numericFieldList)).replace('@D@', that.concatenateFieldList(dateFieldList));
    return new ExpressionParser(peg.buildParser(parserText));
  };

  ExpressionParserFactory.prototype.concatenateFieldList = function concatenateFieldList(fieldList) {
    for (var i = 0; i < fieldList.length; i++) {
      fieldList[i] = '\'' + fieldList[i] + '\'i';
    }
    if (fieldList.length > 0) return fieldList.join('/ ');else return "'unknown_field'";
  };

  return ExpressionParserFactory;
}()) || _class6);

var MemoryCacheStorage = exports.MemoryCacheStorage = function (_CacheStorage) {
  _inherits(MemoryCacheStorage, _CacheStorage);

  function MemoryCacheStorage() {
    _classCallCheck(this, MemoryCacheStorage);

    var _this30 = _possibleConstructorReturn(this, _CacheStorage.call(this));

    _this30._cache = {};
    return _this30;
  }

  MemoryCacheStorage.prototype.setItem = function setItem(key, value, seconds) {
    var t = new Date();
    t.setSeconds(t.getSeconds() + seconds);
    var v = _.assign({}, value);
    this._cache[key] = {
      value: v,
      exp: t
    };
  };

  MemoryCacheStorage.prototype.getItem = function getItem(key) {
    if (this._cache[key] && this._cache[key].exp >= Date.now()) return this._cache[key].value;
  };

  MemoryCacheStorage.prototype.removeItem = function removeItem(key) {
    delete this._cache[key];
  };

  MemoryCacheStorage.prototype.removeExpired = function removeExpired() {
    var self = this;
    _.forOwn(self._cache, function (v, k) {
      if (self._cache[k].exp < Date.now()) {
        self.removeItem(k);
      }
    });
  };

  return MemoryCacheStorage;
}(CacheStorage);

var PeriscopeRouter = exports.PeriscopeRouter = (_dec8 = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _aureliaEventAggregator.EventAggregator, UserStateStorage, NavigationHistory, StateUrlParser), _dec8(_class7 = function () {
  function PeriscopeRouter(aureliaRouter, eventAggregator, userStateStorage, navigationHistory) {
    _classCallCheck(this, PeriscopeRouter);

    this._aureliaRouter = aureliaRouter;
    this._navigationHistory = navigationHistory;
    this._userStateStorage = userStateStorage;
    this._eventAggregator = eventAggregator;
  }

  PeriscopeRouter.prototype.navigate = function navigate(routeItem) {
    if (this.currentRouteItem) {
      var currentWidgetsState = StateDiscriminator.discriminate(this._userStateStorage.getAll(this.currentRouteItem.dashboardName));
      var url = "/" + this.currentRouteItem.dashboardName + StateUrlParser.stateToQuery(currentWidgetsState);
      if (_.filter(this._navigationHistory.items, function (i) {
        return StringHelper.compare(i.url, url);
      }).length === 0) {
        this._navigationHistory.add(url, this.currentRouteItem.title, this.currentRouteItem.dashboardName, currentWidgetsState, new Date());
      } else if (!StringHelper.compare(url, this.currentRouteItem.route)) {
        this._navigationHistory.update(url, new Date());
      }
    }

    var routeWidgetsState = StateUrlParser.queryToState(routeItem.route);
    var storageWidgetsState = StateDiscriminator.discriminate(this._userStateStorage.getAll(routeItem.dashboardName));
    for (var _iterator9 = storageWidgetsState, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
      var _ref9;

      if (_isArray9) {
        if (_i9 >= _iterator9.length) break;
        _ref9 = _iterator9[_i9++];
      } else {
        _i9 = _iterator9.next();
        if (_i9.done) break;
        _ref9 = _i9.value;
      }

      var oldSt = _ref9;

      this._userStateStorage.remove(oldSt.key);
    }for (var _iterator10 = routeWidgetsState, _isArray10 = Array.isArray(_iterator10), _i10 = 0, _iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator]();;) {
      var _ref10;

      if (_isArray10) {
        if (_i10 >= _iterator10.length) break;
        _ref10 = _iterator10[_i10++];
      } else {
        _i10 = _iterator10.next();
        if (_i10.done) break;
        _ref10 = _i10.value;
      }

      var newSt = _ref10;

      this._userStateStorage.set(newSt.key, newSt.value);
    }
    if (_.filter(this._navigationHistory.items, function (i) {
      return StringHelper.compare(i.url, routeItem.route);
    }).length === 0) {
      this._navigationHistory.add(routeItem.route, routeItem.title, routeItem.dashboardName, this._userStateStorage.getAll(routeItem.dashboardName), new Date());
    }

    this.currentRouteItem = routeItem;
    this._aureliaRouter.navigate(routeItem.route);
  };

  _createClass(PeriscopeRouter, [{
    key: 'currentRouteItem',
    get: function get() {
      return this._currentRoute;
    },
    set: function set(value) {
      this._currentRoute = value;
    }
  }]);

  return PeriscopeRouter;
}()) || _class7);

var DslExpressionManager = exports.DslExpressionManager = function () {
  function DslExpressionManager(parser, dataSource, fieldsList) {
    _classCallCheck(this, DslExpressionManager);

    this.dataSource = dataSource;
    this.fields = fieldsList;
    this.parser = parser;
  }

  DslExpressionManager.prototype.populate = function populate(searchStr, lastWord) {
    var parserError = this.getParserError(searchStr);
    return this._getIntellisenseData(searchStr, lastWord, parserError);
  };

  DslExpressionManager.prototype.parse = function parse(searchStr) {
    var expression = this.parser.parse(searchStr);
    return this._normalizeSerachExpression(expression);
  };

  DslExpressionManager.prototype.validate = function validate(searchStr) {
    return this.parser.validate(searchStr);
  };

  DslExpressionManager.prototype.expectedToken = function expectedToken(searchStr) {
    var tokenName = "";
    var parserError = this.getParserError(searchStr);
    if (parserError != null) tokenName = this._interpreteParserError(parserError);
    return tokenName;
  };

  DslExpressionManager.prototype.getParserError = function getParserError(searchStr) {
    var result = null;
    if (searchStr != "") {
      try {
        this.parse(searchStr);
        try {
          this.parse(searchStr + "^");
        } catch (ex2) {
          result = ex2;
        }
      } catch (ex) {
        result = ex;
      }
    }
    return result;
  };

  DslExpressionManager.prototype._getIntellisenseData = function _getIntellisenseData(searchStr, lastWord, pegException) {
    var _this31 = this;

    var type = '';
    var result = [];
    var lastFldName = '';

    if (!pegException) return new Promise(function (resolve, reject) {
      resolve([]);
    });

    var tokenName = this._interpreteParserError(pegException);
    return new Promise(function (resolve, reject) {
      switch (tokenName) {
        case "STRING_FIELD_NAME":
        case "NUMERIC_FIELD_NAME":
        case "DATE_FIELD_NAME":
          var filteredFields = lastWord ? _.filter(_this31.fields, function (f) {
            return f.toLowerCase().startsWith(lastWord.toLowerCase());
          }) : _this31.fields;
          resolve(_this31._normalizeData("field", filteredFields.sort()));
          break;
        case "STRING_OPERATOR_EQUAL":
        case "STRING_OPERATOR_IN":
          resolve(_this31._normalizeData("operator", _this31._getStringComparisonOperatorsArray()));
          break;
        case "STRING_VALUE":
        case "STRING_PATTERN":
          lastFldName = _this31._getLastFieldName(searchStr, _this31.fields, pegException.column);
          _this31._getFieldValuesArray(lastFldName, lastWord).then(function (data) {
            resolve(_this31._normalizeData("string", data));
          });
          break;
        case "STRING_VALUES_ARRAY":
          lastFldName = _this31._getLastFieldName(searchStr, _this31.fields, pegException.column);
          _this31._getFieldValuesArray(lastFldName, lastWord).then(function (data) {
            resolve(_this31._normalizeData("array_string", data));
          });
          break;
          resolve(_this31._normalizeData("array_string", []));
          break;
        case "OPERATOR":
          resolve(_this31._normalizeData("operator", _this31._getComparisonOperatorsArray()));
          break;
        case "LOGIC_OPERATOR":
        case "end of input":
          resolve(_this31._normalizeData("operator", _this31._getLogicalOperatorsArray()));
          break;
        default:
          resolve([]);
          break;
      }
    });
  };

  DslExpressionManager.prototype._interpreteParserError = function _interpreteParserError(ex) {
    if (Object.prototype.toString.call(ex.expected) == "[object Array]") {
      for (var _iterator11 = ex.expected, _isArray11 = Array.isArray(_iterator11), _i11 = 0, _iterator11 = _isArray11 ? _iterator11 : _iterator11[Symbol.iterator]();;) {
        var _ref11;

        if (_isArray11) {
          if (_i11 >= _iterator11.length) break;
          _ref11 = _iterator11[_i11++];
        } else {
          _i11 = _iterator11.next();
          if (_i11.done) break;
          _ref11 = _i11.value;
        }

        var desc = _ref11;

        if (desc.type == "other" || desc.type == "end") {
          return desc.description;
        }
      }
    }
    return "";
  };

  DslExpressionManager.prototype._getLogicalOperatorsArray = function _getLogicalOperatorsArray() {
    return ["and", "or"];
  };

  DslExpressionManager.prototype._getComparisonOperatorsArray = function _getComparisonOperatorsArray() {
    return ["!=", "=", ">", "<", ">=", "<="];
  };

  DslExpressionManager.prototype._getLastFieldName = function _getLastFieldName(searchStr, fieldsArray, index) {
    var tmpArr = searchStr.substr(0, index).split(" ");

    var _loop = function _loop(i) {
      var j = fieldsArray.findIndex(function (x) {
        return x.toLowerCase() == tmpArr[i].trim().toLowerCase();
      });
      if (j >= 0) return {
          v: fieldsArray[j]
        };
    };

    for (var i = tmpArr.length - 1; i >= 0; i--) {
      var _ret2 = _loop(i);

      if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
    }
    return "";
  };

  DslExpressionManager.prototype._getStringComparisonOperatorsArray = function _getStringComparisonOperatorsArray() {
    return ["=", "in"];
  };

  DslExpressionManager.prototype._getFieldValuesArray = function _getFieldValuesArray(fieldName, lastWord) {
    var query = new Query();
    query.take = 100;
    query.skip = 0;
    if (lastWord) query.serverSideFilter = this.parse(fieldName + " = '" + lastWord + "%'");else query.serverSideFilter = "";
    query.fields = [fieldName];
    return this.dataSource.getData(query).then(function (dH) {
      var result = _.map(dH.data, fieldName);
      return _.uniq(result).sort();
    });
  };

  DslExpressionManager.prototype._normalizeData = function _normalizeData(type, dataArray) {
    return _.map(dataArray, function (d) {
      return { type: type, value: d };
    });
  };

  DslExpressionManager.prototype._normalizeSerachExpression = function _normalizeSerachExpression(searchExpression) {
    var expr = new RegExp('record.([a-zA-Z0-9\%\_\-]*)', 'g');
    var match;
    while ((match = expr.exec(searchExpression)) !== null) {
      for (var _iterator12 = this.fields, _isArray12 = Array.isArray(_iterator12), _i12 = 0, _iterator12 = _isArray12 ? _iterator12 : _iterator12[Symbol.iterator]();;) {
        var _ref12;

        if (_isArray12) {
          if (_i12 >= _iterator12.length) break;
          _ref12 = _iterator12[_i12++];
        } else {
          _i12 = _iterator12.next();
          if (_i12.done) break;
          _ref12 = _i12.value;
        }

        var fld = _ref12;

        if (match[1].toLowerCase() === fld.toLowerCase()) searchExpression = StringHelper.replaceAll(searchExpression, match[0], 'record.' + fld);
      }
    }
    return searchExpression;
  };

  return DslExpressionManager;
}();

var DslExpressionManagerFactory = exports.DslExpressionManagerFactory = (_dec9 = (0, _aureliaFramework.inject)(ExpressionParserFactory), _dec9(_class8 = function () {
  function DslExpressionManagerFactory(expressionParserFactory) {
    _classCallCheck(this, DslExpressionManagerFactory);

    this.expressionParserFactory = expressionParserFactory;
  }

  DslExpressionManagerFactory.prototype.createInstance = function createInstance(dataSource, fields) {
    var _this32 = this;

    return dataSource.transport.readService.getSchema().then(function (schema) {
      var fields = schema.fields;
      var allFields = _.map(fields, "field");
      var numericFields = _.map(DataHelper.getNumericFields(fields), "field");
      var stringFields = _.map(DataHelper.getStringFields(fields), "field");
      var dateFields = _.map(DataHelper.getDateFields(fields), "field");
      var parser = _this32.expressionParserFactory.createInstance(numericFields, stringFields, dateFields);
      return new DslExpressionManager(parser, dataSource, allFields);
    });
  };

  return DslExpressionManagerFactory;
}()) || _class8);