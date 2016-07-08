'use strict';

System.register(['./data-service', 'lodash', 'aurelia-framework'], function (_export, _context) {
  var DataService, _, inject, transient, _dec, _class, JsonDataService;

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
    }, function (_lodash) {
      _ = _lodash;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      transient = _aureliaFramework.transient;
    }],
    execute: function () {
      _export('JsonDataService', JsonDataService = (_dec = transient(), _dec(_class = function (_DataService) {
        _inherits(JsonDataService, _DataService);

        function JsonDataService() {
          _classCallCheck(this, JsonDataService);

          var _this = _possibleConstructorReturn(this, _DataService.call(this));

          _this._cache = {};
          return _this;
        }

        JsonDataService.prototype.read = function read(options) {
          var _this2 = this;

          var url = this.url;
          if (options.filter) url += this.filterParser ? this.filterParser.getFilter(options.filter) : options.filter;
          return this.httpClient.fetch(url).then(function (response) {
            return response.json();
          }).then(function (jsonData) {
            return {
              data: _this2.dataMapper ? _this2.dataMapper(jsonData) : jsonData,
              total: _this2.totalMapper ? _this2.totalMapper(jsonData) : jsonData.length
            };
          });
        };

        return JsonDataService;
      }(DataService)) || _class));

      _export('JsonDataService', JsonDataService);
    }
  };
});