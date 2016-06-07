'use strict';

System.register(['./authorization/permissions-custom-attribute', './authorization/permissions-manager', './authorization/role-provider', './cache/cache-manager', './cache/cache-storage', './cache/memory-cache-storage', './config/dashboard-configuration', './data/data-holder', './data/data-source', './data/query', './data/query-expression-evaluator', './data/ast/parsers/ast-parser', './data/ast/parsers/ast-to-javascript-parser', './data/schema/schema-object', './data/schema/providers/schema-provider', './data/schema/providers/static-schema-provider', './data/schema/providers/swagger-schema-provider', './data/service/data-service', './data/service/json-data-service', './data/service/static-json-data-service', './dsl/grammar/grammar-expression', './dsl/grammar/grammar-tree', './dsl/grammar/grammar', './dsl/intellisence-manager', './dsl/parser', './helpers/converters/value-format', './helpers/data-helper', './helpers/guid-helper', './helpers/string-helper', './helpers/url-helper', './infrastructure/dashboard-manager', './infrastructure/factory', './layout/dashboards/dashboard-base', './layout/widgets/widget', './layout/widgets/data-source-configurator', './layout/widgets/detailed-view', './layout/widgets/grid', './layout/widgets/chart', './layout/widgets/search-box', './navigator/navigation-history', './navigator/history-step', './navigator/dashboardbehavior/change-route-behavior', './navigator/dashboardbehavior/create-widget-behavior', './navigator/dashboardbehavior/dashboard-behavior', './navigator/dashboardbehavior/manage-navigation-stack-behavior', './navigator/dashboardbehavior/replace-widget-behavior', './navigator/events/widget-event-message', './navigator/events/widget-event', './navigator/widgetbehavior/widget-behavior', './navigator/widgetbehavior/data-activated-behavior', './navigator/widgetbehavior/data-field-selected-behavior', './navigator/widgetbehavior/data-filter-changed-behavior', './navigator/widgetbehavior/data-filter-handle-behavior', './navigator/widgetbehavior/data-selected-behavior', './navigator/widgetbehavior/data-source-changed-behavior', './navigator/widgetbehavior/data-source-handle-behavior', './navigator/widgetbehavior/settings-handle-behavior', './state/state-discriminator', './state/state-url-parser', './state/storage', './state/user-state-storage'], function (_export, _context) {
  return {
    setters: [function (_authorizationPermissionsCustomAttribute) {
      var _exportObj = {};

      for (var _key in _authorizationPermissionsCustomAttribute) {
        if (_key !== "default") _exportObj[_key] = _authorizationPermissionsCustomAttribute[_key];
      }

      _export(_exportObj);
    }, function (_authorizationPermissionsManager) {
      var _exportObj2 = {};

      for (var _key2 in _authorizationPermissionsManager) {
        if (_key2 !== "default") _exportObj2[_key2] = _authorizationPermissionsManager[_key2];
      }

      _export(_exportObj2);
    }, function (_authorizationRoleProvider) {
      var _exportObj3 = {};

      for (var _key3 in _authorizationRoleProvider) {
        if (_key3 !== "default") _exportObj3[_key3] = _authorizationRoleProvider[_key3];
      }

      _export(_exportObj3);
    }, function (_cacheCacheManager) {
      var _exportObj4 = {};

      for (var _key4 in _cacheCacheManager) {
        if (_key4 !== "default") _exportObj4[_key4] = _cacheCacheManager[_key4];
      }

      _export(_exportObj4);
    }, function (_cacheCacheStorage) {
      var _exportObj5 = {};

      for (var _key5 in _cacheCacheStorage) {
        if (_key5 !== "default") _exportObj5[_key5] = _cacheCacheStorage[_key5];
      }

      _export(_exportObj5);
    }, function (_cacheMemoryCacheStorage) {
      var _exportObj6 = {};

      for (var _key6 in _cacheMemoryCacheStorage) {
        if (_key6 !== "default") _exportObj6[_key6] = _cacheMemoryCacheStorage[_key6];
      }

      _export(_exportObj6);
    }, function (_configDashboardConfiguration) {
      var _exportObj7 = {};

      for (var _key7 in _configDashboardConfiguration) {
        if (_key7 !== "default") _exportObj7[_key7] = _configDashboardConfiguration[_key7];
      }

      _export(_exportObj7);
    }, function (_dataDataHolder) {
      var _exportObj8 = {};

      for (var _key8 in _dataDataHolder) {
        if (_key8 !== "default") _exportObj8[_key8] = _dataDataHolder[_key8];
      }

      _export(_exportObj8);
    }, function (_dataDataSource) {
      var _exportObj9 = {};

      for (var _key9 in _dataDataSource) {
        if (_key9 !== "default") _exportObj9[_key9] = _dataDataSource[_key9];
      }

      _export(_exportObj9);
    }, function (_dataQuery) {
      var _exportObj10 = {};

      for (var _key10 in _dataQuery) {
        if (_key10 !== "default") _exportObj10[_key10] = _dataQuery[_key10];
      }

      _export(_exportObj10);
    }, function (_dataQueryExpressionEvaluator) {
      var _exportObj11 = {};

      for (var _key11 in _dataQueryExpressionEvaluator) {
        if (_key11 !== "default") _exportObj11[_key11] = _dataQueryExpressionEvaluator[_key11];
      }

      _export(_exportObj11);
    }, function (_dataAstParsersAstParser) {
      var _exportObj12 = {};

      for (var _key12 in _dataAstParsersAstParser) {
        if (_key12 !== "default") _exportObj12[_key12] = _dataAstParsersAstParser[_key12];
      }

      _export(_exportObj12);
    }, function (_dataAstParsersAstToJavascriptParser) {
      var _exportObj13 = {};

      for (var _key13 in _dataAstParsersAstToJavascriptParser) {
        if (_key13 !== "default") _exportObj13[_key13] = _dataAstParsersAstToJavascriptParser[_key13];
      }

      _export(_exportObj13);
    }, function (_dataSchemaSchemaObject) {
      var _exportObj14 = {};

      for (var _key14 in _dataSchemaSchemaObject) {
        if (_key14 !== "default") _exportObj14[_key14] = _dataSchemaSchemaObject[_key14];
      }

      _export(_exportObj14);
    }, function (_dataSchemaProvidersSchemaProvider) {
      var _exportObj15 = {};

      for (var _key15 in _dataSchemaProvidersSchemaProvider) {
        if (_key15 !== "default") _exportObj15[_key15] = _dataSchemaProvidersSchemaProvider[_key15];
      }

      _export(_exportObj15);
    }, function (_dataSchemaProvidersStaticSchemaProvider) {
      var _exportObj16 = {};

      for (var _key16 in _dataSchemaProvidersStaticSchemaProvider) {
        if (_key16 !== "default") _exportObj16[_key16] = _dataSchemaProvidersStaticSchemaProvider[_key16];
      }

      _export(_exportObj16);
    }, function (_dataSchemaProvidersSwaggerSchemaProvider) {
      var _exportObj17 = {};

      for (var _key17 in _dataSchemaProvidersSwaggerSchemaProvider) {
        if (_key17 !== "default") _exportObj17[_key17] = _dataSchemaProvidersSwaggerSchemaProvider[_key17];
      }

      _export(_exportObj17);
    }, function (_dataServiceDataService) {
      var _exportObj18 = {};

      for (var _key18 in _dataServiceDataService) {
        if (_key18 !== "default") _exportObj18[_key18] = _dataServiceDataService[_key18];
      }

      _export(_exportObj18);
    }, function (_dataServiceJsonDataService) {
      var _exportObj19 = {};

      for (var _key19 in _dataServiceJsonDataService) {
        if (_key19 !== "default") _exportObj19[_key19] = _dataServiceJsonDataService[_key19];
      }

      _export(_exportObj19);
    }, function (_dataServiceStaticJsonDataService) {
      var _exportObj20 = {};

      for (var _key20 in _dataServiceStaticJsonDataService) {
        if (_key20 !== "default") _exportObj20[_key20] = _dataServiceStaticJsonDataService[_key20];
      }

      _export(_exportObj20);
    }, function (_dslGrammarGrammarExpression) {
      var _exportObj21 = {};

      for (var _key21 in _dslGrammarGrammarExpression) {
        if (_key21 !== "default") _exportObj21[_key21] = _dslGrammarGrammarExpression[_key21];
      }

      _export(_exportObj21);
    }, function (_dslGrammarGrammarTree) {
      var _exportObj22 = {};

      for (var _key22 in _dslGrammarGrammarTree) {
        if (_key22 !== "default") _exportObj22[_key22] = _dslGrammarGrammarTree[_key22];
      }

      _export(_exportObj22);
    }, function (_dslGrammarGrammar) {
      var _exportObj23 = {};

      for (var _key23 in _dslGrammarGrammar) {
        if (_key23 !== "default") _exportObj23[_key23] = _dslGrammarGrammar[_key23];
      }

      _export(_exportObj23);
    }, function (_dslIntellisenceManager) {
      var _exportObj24 = {};

      for (var _key24 in _dslIntellisenceManager) {
        if (_key24 !== "default") _exportObj24[_key24] = _dslIntellisenceManager[_key24];
      }

      _export(_exportObj24);
    }, function (_dslParser) {
      var _exportObj25 = {};

      for (var _key25 in _dslParser) {
        if (_key25 !== "default") _exportObj25[_key25] = _dslParser[_key25];
      }

      _export(_exportObj25);
    }, function (_helpersConvertersValueFormat) {
      var _exportObj26 = {};

      for (var _key26 in _helpersConvertersValueFormat) {
        if (_key26 !== "default") _exportObj26[_key26] = _helpersConvertersValueFormat[_key26];
      }

      _export(_exportObj26);
    }, function (_helpersDataHelper) {
      var _exportObj27 = {};

      for (var _key27 in _helpersDataHelper) {
        if (_key27 !== "default") _exportObj27[_key27] = _helpersDataHelper[_key27];
      }

      _export(_exportObj27);
    }, function (_helpersGuidHelper) {
      var _exportObj28 = {};

      for (var _key28 in _helpersGuidHelper) {
        if (_key28 !== "default") _exportObj28[_key28] = _helpersGuidHelper[_key28];
      }

      _export(_exportObj28);
    }, function (_helpersStringHelper) {
      var _exportObj29 = {};

      for (var _key29 in _helpersStringHelper) {
        if (_key29 !== "default") _exportObj29[_key29] = _helpersStringHelper[_key29];
      }

      _export(_exportObj29);
    }, function (_helpersUrlHelper) {
      var _exportObj30 = {};

      for (var _key30 in _helpersUrlHelper) {
        if (_key30 !== "default") _exportObj30[_key30] = _helpersUrlHelper[_key30];
      }

      _export(_exportObj30);
    }, function (_infrastructureDashboardManager) {
      var _exportObj31 = {};

      for (var _key31 in _infrastructureDashboardManager) {
        if (_key31 !== "default") _exportObj31[_key31] = _infrastructureDashboardManager[_key31];
      }

      _export(_exportObj31);
    }, function (_infrastructureFactory) {
      var _exportObj32 = {};

      for (var _key32 in _infrastructureFactory) {
        if (_key32 !== "default") _exportObj32[_key32] = _infrastructureFactory[_key32];
      }

      _export(_exportObj32);
    }, function (_layoutDashboardsDashboardBase) {
      var _exportObj33 = {};

      for (var _key33 in _layoutDashboardsDashboardBase) {
        if (_key33 !== "default") _exportObj33[_key33] = _layoutDashboardsDashboardBase[_key33];
      }

      _export(_exportObj33);
    }, function (_layoutWidgetsWidget) {
      var _exportObj34 = {};

      for (var _key34 in _layoutWidgetsWidget) {
        if (_key34 !== "default") _exportObj34[_key34] = _layoutWidgetsWidget[_key34];
      }

      _export(_exportObj34);
    }, function (_layoutWidgetsDataSourceConfigurator) {
      var _exportObj35 = {};

      for (var _key35 in _layoutWidgetsDataSourceConfigurator) {
        if (_key35 !== "default") _exportObj35[_key35] = _layoutWidgetsDataSourceConfigurator[_key35];
      }

      _export(_exportObj35);
    }, function (_layoutWidgetsDetailedView) {
      var _exportObj36 = {};

      for (var _key36 in _layoutWidgetsDetailedView) {
        if (_key36 !== "default") _exportObj36[_key36] = _layoutWidgetsDetailedView[_key36];
      }

      _export(_exportObj36);
    }, function (_layoutWidgetsGrid) {
      var _exportObj37 = {};

      for (var _key37 in _layoutWidgetsGrid) {
        if (_key37 !== "default") _exportObj37[_key37] = _layoutWidgetsGrid[_key37];
      }

      _export(_exportObj37);
    }, function (_layoutWidgetsChart) {
      var _exportObj38 = {};

      for (var _key38 in _layoutWidgetsChart) {
        if (_key38 !== "default") _exportObj38[_key38] = _layoutWidgetsChart[_key38];
      }

      _export(_exportObj38);
    }, function (_layoutWidgetsSearchBox) {
      var _exportObj39 = {};

      for (var _key39 in _layoutWidgetsSearchBox) {
        if (_key39 !== "default") _exportObj39[_key39] = _layoutWidgetsSearchBox[_key39];
      }

      _export(_exportObj39);
    }, function (_navigatorNavigationHistory) {
      var _exportObj40 = {};

      for (var _key40 in _navigatorNavigationHistory) {
        if (_key40 !== "default") _exportObj40[_key40] = _navigatorNavigationHistory[_key40];
      }

      _export(_exportObj40);
    }, function (_navigatorHistoryStep) {
      var _exportObj41 = {};

      for (var _key41 in _navigatorHistoryStep) {
        if (_key41 !== "default") _exportObj41[_key41] = _navigatorHistoryStep[_key41];
      }

      _export(_exportObj41);
    }, function (_navigatorDashboardbehaviorChangeRouteBehavior) {
      var _exportObj42 = {};

      for (var _key42 in _navigatorDashboardbehaviorChangeRouteBehavior) {
        if (_key42 !== "default") _exportObj42[_key42] = _navigatorDashboardbehaviorChangeRouteBehavior[_key42];
      }

      _export(_exportObj42);
    }, function (_navigatorDashboardbehaviorCreateWidgetBehavior) {
      var _exportObj43 = {};

      for (var _key43 in _navigatorDashboardbehaviorCreateWidgetBehavior) {
        if (_key43 !== "default") _exportObj43[_key43] = _navigatorDashboardbehaviorCreateWidgetBehavior[_key43];
      }

      _export(_exportObj43);
    }, function (_navigatorDashboardbehaviorDashboardBehavior) {
      var _exportObj44 = {};

      for (var _key44 in _navigatorDashboardbehaviorDashboardBehavior) {
        if (_key44 !== "default") _exportObj44[_key44] = _navigatorDashboardbehaviorDashboardBehavior[_key44];
      }

      _export(_exportObj44);
    }, function (_navigatorDashboardbehaviorManageNavigationStackBehavior) {
      var _exportObj45 = {};

      for (var _key45 in _navigatorDashboardbehaviorManageNavigationStackBehavior) {
        if (_key45 !== "default") _exportObj45[_key45] = _navigatorDashboardbehaviorManageNavigationStackBehavior[_key45];
      }

      _export(_exportObj45);
    }, function (_navigatorDashboardbehaviorReplaceWidgetBehavior) {
      var _exportObj46 = {};

      for (var _key46 in _navigatorDashboardbehaviorReplaceWidgetBehavior) {
        if (_key46 !== "default") _exportObj46[_key46] = _navigatorDashboardbehaviorReplaceWidgetBehavior[_key46];
      }

      _export(_exportObj46);
    }, function (_navigatorEventsWidgetEventMessage) {
      var _exportObj47 = {};

      for (var _key47 in _navigatorEventsWidgetEventMessage) {
        if (_key47 !== "default") _exportObj47[_key47] = _navigatorEventsWidgetEventMessage[_key47];
      }

      _export(_exportObj47);
    }, function (_navigatorEventsWidgetEvent) {
      var _exportObj48 = {};

      for (var _key48 in _navigatorEventsWidgetEvent) {
        if (_key48 !== "default") _exportObj48[_key48] = _navigatorEventsWidgetEvent[_key48];
      }

      _export(_exportObj48);
    }, function (_navigatorWidgetbehaviorWidgetBehavior) {
      var _exportObj49 = {};

      for (var _key49 in _navigatorWidgetbehaviorWidgetBehavior) {
        if (_key49 !== "default") _exportObj49[_key49] = _navigatorWidgetbehaviorWidgetBehavior[_key49];
      }

      _export(_exportObj49);
    }, function (_navigatorWidgetbehaviorDataActivatedBehavior) {
      var _exportObj50 = {};

      for (var _key50 in _navigatorWidgetbehaviorDataActivatedBehavior) {
        if (_key50 !== "default") _exportObj50[_key50] = _navigatorWidgetbehaviorDataActivatedBehavior[_key50];
      }

      _export(_exportObj50);
    }, function (_navigatorWidgetbehaviorDataFieldSelectedBehavior) {
      var _exportObj51 = {};

      for (var _key51 in _navigatorWidgetbehaviorDataFieldSelectedBehavior) {
        if (_key51 !== "default") _exportObj51[_key51] = _navigatorWidgetbehaviorDataFieldSelectedBehavior[_key51];
      }

      _export(_exportObj51);
    }, function (_navigatorWidgetbehaviorDataFilterChangedBehavior) {
      var _exportObj52 = {};

      for (var _key52 in _navigatorWidgetbehaviorDataFilterChangedBehavior) {
        if (_key52 !== "default") _exportObj52[_key52] = _navigatorWidgetbehaviorDataFilterChangedBehavior[_key52];
      }

      _export(_exportObj52);
    }, function (_navigatorWidgetbehaviorDataFilterHandleBehavior) {
      var _exportObj53 = {};

      for (var _key53 in _navigatorWidgetbehaviorDataFilterHandleBehavior) {
        if (_key53 !== "default") _exportObj53[_key53] = _navigatorWidgetbehaviorDataFilterHandleBehavior[_key53];
      }

      _export(_exportObj53);
    }, function (_navigatorWidgetbehaviorDataSelectedBehavior) {
      var _exportObj54 = {};

      for (var _key54 in _navigatorWidgetbehaviorDataSelectedBehavior) {
        if (_key54 !== "default") _exportObj54[_key54] = _navigatorWidgetbehaviorDataSelectedBehavior[_key54];
      }

      _export(_exportObj54);
    }, function (_navigatorWidgetbehaviorDataSourceChangedBehavior) {
      var _exportObj55 = {};

      for (var _key55 in _navigatorWidgetbehaviorDataSourceChangedBehavior) {
        if (_key55 !== "default") _exportObj55[_key55] = _navigatorWidgetbehaviorDataSourceChangedBehavior[_key55];
      }

      _export(_exportObj55);
    }, function (_navigatorWidgetbehaviorDataSourceHandleBehavior) {
      var _exportObj56 = {};

      for (var _key56 in _navigatorWidgetbehaviorDataSourceHandleBehavior) {
        if (_key56 !== "default") _exportObj56[_key56] = _navigatorWidgetbehaviorDataSourceHandleBehavior[_key56];
      }

      _export(_exportObj56);
    }, function (_navigatorWidgetbehaviorSettingsHandleBehavior) {
      var _exportObj57 = {};

      for (var _key57 in _navigatorWidgetbehaviorSettingsHandleBehavior) {
        if (_key57 !== "default") _exportObj57[_key57] = _navigatorWidgetbehaviorSettingsHandleBehavior[_key57];
      }

      _export(_exportObj57);
    }, function (_stateStateDiscriminator) {
      var _exportObj58 = {};

      for (var _key58 in _stateStateDiscriminator) {
        if (_key58 !== "default") _exportObj58[_key58] = _stateStateDiscriminator[_key58];
      }

      _export(_exportObj58);
    }, function (_stateStateUrlParser) {
      var _exportObj59 = {};

      for (var _key59 in _stateStateUrlParser) {
        if (_key59 !== "default") _exportObj59[_key59] = _stateStateUrlParser[_key59];
      }

      _export(_exportObj59);
    }, function (_stateStorage) {
      var _exportObj60 = {};

      for (var _key60 in _stateStorage) {
        if (_key60 !== "default") _exportObj60[_key60] = _stateStorage[_key60];
      }

      _export(_exportObj60);
    }, function (_stateUserStateStorage) {
      var _exportObj61 = {};

      for (var _key61 in _stateUserStateStorage) {
        if (_key61 !== "default") _exportObj61[_key61] = _stateUserStateStorage[_key61];
      }

      _export(_exportObj61);
    }],
    execute: function () {
      function configure(aurelia) {
        aurelia.globalResources("./helpers/converters/value-format");
      }

      _export('configure', configure);
    }
  };
});