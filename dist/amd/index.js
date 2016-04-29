define(['exports', './cache/cache-manager', './cache/cache-storage', './cache/memory-cache-storage', './config/dashboard-configuration', './data/data-holder', './data/data-source', './data/query', './data/query-expression-evaluator', './data/schema/schema-object', './data/schema/providers/schema-provider', './data/schema/providers/static-schema-provider', './data/schema/providers/swagger-schema-provider', './data/service/data-service', './data/service/json-data-service', './data/service/static-json-data-service', './dsl/dsl-expression-manager-factory', './dsl/dsl-expression-manager', './dsl/expression-parser-factory', './dsl/expression-parser', './dsl/grammar', './helpers/converters/value-format', './helpers/data-helper', './helpers/guid-helper', './helpers/string-helper', './helpers/url-helper', './infrastructure/dashboard-manager', './infrastructure/factory', './layout/dashboards/dashboard-base', './layout/widgets/widget', './layout/widgets/data-source-configurator', './layout/widgets/detailed-view', './layout/widgets/grid', './layout/widgets/chart', './layout/widgets/search-box', './navigator/navigation-history', './navigator/periscope-router', './navigator/dashboardbehavior/change-route-behavior', './navigator/dashboardbehavior/create-widget-behavior', './navigator/dashboardbehavior/dashboard-behavior', './navigator/dashboardbehavior/manage-navigation-stack-behavior', './navigator/dashboardbehavior/replace-widget-behavior', './navigator/events/widget-event-message', './navigator/events/widget-event', './navigator/widgetbehavior/widget-behavior', './navigator/widgetbehavior/data-activated-behavior', './navigator/widgetbehavior/data-field-selected-behavior', './navigator/widgetbehavior/data-filter-changed-behavior', './navigator/widgetbehavior/data-filter-handle-behavior', './navigator/widgetbehavior/data-selected-behavior', './navigator/widgetbehavior/data-source-changed-behavior', './navigator/widgetbehavior/data-source-handle-behavior', './navigator/widgetbehavior/settings-handle-behavior', './state/state-discriminator', './state/state-url-parser', './state/storage', './state/user-state-storage'], function (exports, _cacheManager, _cacheStorage, _memoryCacheStorage, _dashboardConfiguration, _dataHolder, _dataSource, _query, _queryExpressionEvaluator, _schemaObject, _schemaProvider, _staticSchemaProvider, _swaggerSchemaProvider, _dataService, _jsonDataService, _staticJsonDataService, _dslExpressionManagerFactory, _dslExpressionManager, _expressionParserFactory, _expressionParser, _grammar, _valueFormat, _dataHelper, _guidHelper, _stringHelper, _urlHelper, _dashboardManager, _factory, _dashboardBase, _widget, _dataSourceConfigurator, _detailedView, _grid, _chart, _searchBox, _navigationHistory, _periscopeRouter, _changeRouteBehavior, _createWidgetBehavior, _dashboardBehavior, _manageNavigationStackBehavior, _replaceWidgetBehavior, _widgetEventMessage, _widgetEvent, _widgetBehavior, _dataActivatedBehavior, _dataFieldSelectedBehavior, _dataFilterChangedBehavior, _dataFilterHandleBehavior, _dataSelectedBehavior, _dataSourceChangedBehavior, _dataSourceHandleBehavior, _settingsHandleBehavior, _stateDiscriminator, _stateUrlParser, _storage, _userStateStorage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_cacheManager).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _cacheManager[key];
      }
    });
  });
  Object.keys(_cacheStorage).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _cacheStorage[key];
      }
    });
  });
  Object.keys(_memoryCacheStorage).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _memoryCacheStorage[key];
      }
    });
  });
  Object.keys(_dashboardConfiguration).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _dashboardConfiguration[key];
      }
    });
  });
  Object.keys(_dataHolder).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _dataHolder[key];
      }
    });
  });
  Object.keys(_dataSource).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _dataSource[key];
      }
    });
  });
  Object.keys(_query).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _query[key];
      }
    });
  });
  Object.keys(_queryExpressionEvaluator).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _queryExpressionEvaluator[key];
      }
    });
  });
  Object.keys(_schemaObject).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _schemaObject[key];
      }
    });
  });
  Object.keys(_schemaProvider).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _schemaProvider[key];
      }
    });
  });
  Object.keys(_staticSchemaProvider).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _staticSchemaProvider[key];
      }
    });
  });
  Object.keys(_swaggerSchemaProvider).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _swaggerSchemaProvider[key];
      }
    });
  });
  Object.keys(_dataService).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _dataService[key];
      }
    });
  });
  Object.keys(_jsonDataService).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _jsonDataService[key];
      }
    });
  });
  Object.keys(_staticJsonDataService).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _staticJsonDataService[key];
      }
    });
  });
  Object.keys(_dslExpressionManagerFactory).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _dslExpressionManagerFactory[key];
      }
    });
  });
  Object.keys(_dslExpressionManager).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _dslExpressionManager[key];
      }
    });
  });
  Object.keys(_expressionParserFactory).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _expressionParserFactory[key];
      }
    });
  });
  Object.keys(_expressionParser).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _expressionParser[key];
      }
    });
  });
  Object.keys(_grammar).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _grammar[key];
      }
    });
  });
  Object.keys(_valueFormat).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _valueFormat[key];
      }
    });
  });
  Object.keys(_dataHelper).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _dataHelper[key];
      }
    });
  });
  Object.keys(_guidHelper).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _guidHelper[key];
      }
    });
  });
  Object.keys(_stringHelper).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _stringHelper[key];
      }
    });
  });
  Object.keys(_urlHelper).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _urlHelper[key];
      }
    });
  });
  Object.keys(_dashboardManager).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _dashboardManager[key];
      }
    });
  });
  Object.keys(_factory).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _factory[key];
      }
    });
  });
  Object.keys(_dashboardBase).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _dashboardBase[key];
      }
    });
  });
  Object.keys(_widget).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _widget[key];
      }
    });
  });
  Object.keys(_dataSourceConfigurator).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _dataSourceConfigurator[key];
      }
    });
  });
  Object.keys(_detailedView).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _detailedView[key];
      }
    });
  });
  Object.keys(_grid).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _grid[key];
      }
    });
  });
  Object.keys(_chart).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _chart[key];
      }
    });
  });
  Object.keys(_searchBox).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _searchBox[key];
      }
    });
  });
  Object.keys(_navigationHistory).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _navigationHistory[key];
      }
    });
  });
  Object.keys(_periscopeRouter).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _periscopeRouter[key];
      }
    });
  });
  Object.keys(_changeRouteBehavior).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _changeRouteBehavior[key];
      }
    });
  });
  Object.keys(_createWidgetBehavior).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _createWidgetBehavior[key];
      }
    });
  });
  Object.keys(_dashboardBehavior).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _dashboardBehavior[key];
      }
    });
  });
  Object.keys(_manageNavigationStackBehavior).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _manageNavigationStackBehavior[key];
      }
    });
  });
  Object.keys(_replaceWidgetBehavior).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _replaceWidgetBehavior[key];
      }
    });
  });
  Object.keys(_widgetEventMessage).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _widgetEventMessage[key];
      }
    });
  });
  Object.keys(_widgetEvent).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _widgetEvent[key];
      }
    });
  });
  Object.keys(_widgetBehavior).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _widgetBehavior[key];
      }
    });
  });
  Object.keys(_dataActivatedBehavior).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _dataActivatedBehavior[key];
      }
    });
  });
  Object.keys(_dataFieldSelectedBehavior).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _dataFieldSelectedBehavior[key];
      }
    });
  });
  Object.keys(_dataFilterChangedBehavior).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _dataFilterChangedBehavior[key];
      }
    });
  });
  Object.keys(_dataFilterHandleBehavior).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _dataFilterHandleBehavior[key];
      }
    });
  });
  Object.keys(_dataSelectedBehavior).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _dataSelectedBehavior[key];
      }
    });
  });
  Object.keys(_dataSourceChangedBehavior).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _dataSourceChangedBehavior[key];
      }
    });
  });
  Object.keys(_dataSourceHandleBehavior).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _dataSourceHandleBehavior[key];
      }
    });
  });
  Object.keys(_settingsHandleBehavior).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _settingsHandleBehavior[key];
      }
    });
  });
  Object.keys(_stateDiscriminator).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _stateDiscriminator[key];
      }
    });
  });
  Object.keys(_stateUrlParser).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _stateUrlParser[key];
      }
    });
  });
  Object.keys(_storage).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _storage[key];
      }
    });
  });
  Object.keys(_userStateStorage).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _userStateStorage[key];
      }
    });
  });
  exports.configure = configure;
  function configure(aurelia) {
    aurelia.globalResources("./helpers/converters/value-format");
  }
});