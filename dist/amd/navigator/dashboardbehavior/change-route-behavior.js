define(["exports", "./dashboard-behavior"], function (exports, _dashboardBehavior) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ChangeRouteBehavior = undefined;

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

  var ChangeRouteBehavior = exports.ChangeRouteBehavior = function (_DashboardBehavior) {
    _inherits(ChangeRouteBehavior, _DashboardBehavior);

    function ChangeRouteBehavior(settings) {
      _classCallCheck(this, ChangeRouteBehavior);

      var _this = _possibleConstructorReturn(this, _DashboardBehavior.call(this));

      _this.chanel = settings.chanel;
      _this.eventAggregator = settings.eventAggregator;
      _this.newRoute = settings.newRoute;
      _this.router = settings.router;
      _this.paramsMapper = settings.paramsMapper;
      return _this;
    }

    ChangeRouteBehavior.prototype.attach = function attach(dashboard) {
      _DashboardBehavior.prototype.attach.call(this, dashboard);
      var me = this;
      this.subscription = this.eventAggregator.subscribe(this.chanel, function (message) {
        var params = me.paramsMapper ? me.paramsMapper(message) : "";
        if (params !== "" && params.indexOf("?") != 0) params = "?" + params;
        me.router.navigate(me.newRoute + (params !== "" ? params : ""));
      });
    };

    ChangeRouteBehavior.prototype.detach = function detach() {
      _DashboardBehavior.prototype.detach.call(this, dashboard);
      if (this.subscription) this.subscription.dispose();
    };

    ChangeRouteBehavior.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
      configurationInfo.addValue("chanel", this.chanel);
      configurationInfo.addValue("newRoute", this.newRoute);
      configurationInfo.addScript("paramsMapper", this.paramsMapper);
    };

    ChangeRouteBehavior.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
      this.chanel = configurationInfo.getValue("chanel");
      this.newRoute = configurationInfo.getValue("newRoute");
      this.paramsMapper = configurationInfo.addScript("paramsMapper");
    };

    return ChangeRouteBehavior;
  }(_dashboardBehavior.DashboardBehavior);
});