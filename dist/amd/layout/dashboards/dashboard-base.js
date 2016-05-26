define(['exports', 'aurelia-framework', 'lodash'], function (exports, _aureliaFramework, _lodash) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.LayoutWidget = exports.DashboardBase = undefined;

  var _ = _interopRequireWildcard(_lodash);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

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

  var _dec, _desc, _value, _class;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
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
});