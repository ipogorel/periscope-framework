'use strict';

System.register(['./../data-helper', 'numeral', 'moment'], function (_export, _context) {
  var DataHelper, numeral, moment, FormatValueConverter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_dataHelper) {
      DataHelper = _dataHelper.DataHelper;
    }, function (_numeral) {
      numeral = _numeral.default;
    }, function (_moment) {
      moment = _moment.default;
    }],
    execute: function () {
      _export('FormatValueConverter', FormatValueConverter = function () {
        function FormatValueConverter() {
          _classCallCheck(this, FormatValueConverter);
        }

        FormatValueConverter.format = function format(value, _format) {
          if (DataHelper.isDate(value)) return moment(value).format(_format);
          if (DataHelper.isNumber(value)) return numeral(value).format(_format);
          return value;
        };

        FormatValueConverter.prototype.toView = function toView(value, format) {
          return FormatValueConverter.format(value, format);
        };

        return FormatValueConverter;
      }());

      _export('FormatValueConverter', FormatValueConverter);
    }
  };
});