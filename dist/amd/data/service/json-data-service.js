define(['exports', './data-service', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _dataService, _aureliaFramework, _aureliaFetchClient) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.JsonDataService = undefined;

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

    var _dec, _dec2, _class;

    var JsonDataService = exports.JsonDataService = (_dec = (0, _aureliaFramework.transient)(), _dec2 = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = _dec2(_class = function (_DataService) {
        _inherits(JsonDataService, _DataService);

        function JsonDataService(http) {
            _classCallCheck(this, JsonDataService);

            var _this = _possibleConstructorReturn(this, _DataService.call(this));

            http.configure(function (config) {
                config.useStandardConfiguration();
            });
            _this._http = http;
            return _this;
        }

        JsonDataService.prototype.read = function read(options) {
            var _this2 = this;

            var url = this.url;
            if (options.filter) url += this.filterParser ? this.filterParser.getFilter(options.filter) : "";
            return this._http.fetch(url).then(function (response) {
                return response.json();
            }).then(function (jsonData) {
                return {
                    data: _this2.dataMapper ? _this2.dataMapper(jsonData) : jsonData,
                    total: _this2.totalMapper ? _this2.totalMapper(jsonData) : jsonData.length
                };
            });
        };

        return JsonDataService;
    }(_dataService.DataService)) || _class) || _class);
});