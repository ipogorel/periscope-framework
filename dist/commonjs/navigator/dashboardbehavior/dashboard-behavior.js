"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    key: "dashboard",
    get: function get() {
      return this._dashboard;
    }
  }]);

  return DashboardBehavior;
}();