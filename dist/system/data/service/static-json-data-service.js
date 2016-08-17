'use strict';

System.register(['./data-service', './../../helpers/data-helper', 'aurelia-framework', 'aurelia-fetch-client', './../query-expression-evaluator', 'lodash'], function (_export, _context) {
  "use strict";

  var DataService, DataHelper, inject, transient, HttpClient, QueryExpressionEvaluator, _, _dec, _dec2, _class, StaticJsonDataService;

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
    setters: [function (_dataService) {
      DataService = _dataService.DataService;
    }, function (_helpersDataHelper) {
      DataHelper = _helpersDataHelper.DataHelper;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      transient = _aureliaFramework.transient;
    }, function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
    }, function (_queryExpressionEvaluator) {
      QueryExpressionEvaluator = _queryExpressionEvaluator.QueryExpressionEvaluator;
    }, function (_lodash) {
      _ = _lodash;
    }],
    execute: function () {
      _export('StaticJsonDataService', StaticJsonDataService = (_dec = transient(), _dec2 = inject(HttpClient), _dec(_class = _dec2(_class = function (_DataService) {
        _inherits(StaticJsonDataService, _DataService);

        function StaticJsonDataService(httpClient) {
          _classCallCheck(this, StaticJsonDataService);

          return _possibleConstructorReturn(this, _DataService.call(this, httpClient));
        }

        StaticJsonDataService.prototype.read = function read(options) {
          var _this2 = this;

          return this.httpClient.fetch(this.url).then(function (response) {
            return response.json();
          }).then(function (jsonData) {
            var d = _this2.dataMapper ? _this2.dataMapper(jsonData) : jsonData;
            if (options.filter) {
              var f = options.filter;
              if (_this2.filterParser && _this2.filterParser.type === "clientSide") f = _this2.filterParser.getFilter(options.filter);
              var evaluator = new QueryExpressionEvaluator();
              d = evaluator.evaluate(d, f);
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
              total: _this2.totalMapper ? _this2.totalMapper(jsonData) : total
            };
          });
        };

        return StaticJsonDataService;
      }(DataService)) || _class) || _class));

      _export('StaticJsonDataService', StaticJsonDataService);
    }
  };
});