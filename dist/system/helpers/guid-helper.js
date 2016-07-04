'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var GuidHelper;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('GuidHelper', GuidHelper = function () {
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
      }());

      _export('GuidHelper', GuidHelper);
    }
  };
});