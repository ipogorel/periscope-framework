'use strict';

System.register(['aurelia-framework', 'lodash', './../../state/state-discriminator', './../../state/state-url-parser', './../../serialization/configurable'], function (_export, _context) {
  var computedFrom, _, StateDiscriminator, StateUrlParser, Configurable, _createClass, _dec, _desc, _value, _class2, DashboardBase, LayoutWidget;

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
    setters: [function (_aureliaFramework) {
      computedFrom = _aureliaFramework.computedFrom;
    }, function (_lodash) {
      _ = _lodash;
    }, function (_stateStateDiscriminator) {
      StateDiscriminator = _stateStateDiscriminator.StateDiscriminator;
    }, function (_stateStateUrlParser) {
      StateUrlParser = _stateStateUrlParser.StateUrlParser;
    }, function (_serializationConfigurable) {
      Configurable = _serializationConfigurable.Configurable;
    }],
    execute: function () {
      _createClass = function () {
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

      _export('DashboardBase', DashboardBase = function (_Configurable) {
        _inherits(DashboardBase, _Configurable);

        function DashboardBase() {
          _classCallCheck(this, DashboardBase);

          var _this = _possibleConstructorReturn(this, _Configurable.call(this));

          _this.behaviors = [];
          _this.layout = [];
          return _this;
        }

        DashboardBase.prototype.configure = function configure(dashboardConfiguration) {
          this.name = dashboardConfiguration.name;
          this.title = dashboardConfiguration.title;
          this.resourceGroup = dashboardConfiguration.resourceGroup;
        };

        DashboardBase.prototype.getWidgetByName = function getWidgetByName(widgetName) {
          var wl = _.find(this.layout, function (w) {
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
          this.layout.push(lw);
          widget.dashboard = this;
        };

        DashboardBase.prototype.removeWidget = function removeWidget(widget) {
          _.remove(this.layout, function (w) {
            if (w.widget === widget) {
              widget.dispose();
              return true;
            }
            return false;
          });
        };

        DashboardBase.prototype.replaceWidget = function replaceWidget(oldWidget, newWidget) {
          var oldLw = _.find(this.layout, function (w) {
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
            this.layout.splice(_.indexOf(this.layout, oldLw), 1, newLw);
          }
        };

        DashboardBase.prototype.restoreWidget = function restoreWidget(currentWidget) {
          var lw = _.find(this.layout, function (w) {
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
            this.layout.splice(_.indexOf(this.layout, lw), 1, previousLw);
          }
        };

        DashboardBase.prototype.resizeWidget = function resizeWidget(widget, newSize) {
          var lw = _.find(this.layout, function (w) {
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
          for (var i = 0; i < this.layout.length; i++) {
            this.refreshWidget(this.layout[i].widget);
          }
        };

        DashboardBase.prototype.dispose = function dispose() {
          for (var i = 0; i < this.layout.length; i++) {
            this.layout[i].widget.dispose();
          }
          this.layout = [];

          while (true) {
            if (this.behaviors.length > 0) this.behaviors[0].detach();else break;
          }
        };

        DashboardBase.prototype.getState = function getState() {
          var result = [];
          _.forEach(this.layout, function (lw) {
            result.push({ name: lw.widget.name, value: lw.widget.getState(), stateType: lw.widget.stateType });
          });
          return result;
        };

        DashboardBase.prototype.setState = function setState(state) {
          for (var _iterator = state, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var s = _ref;

            for (var _iterator2 = this.layout, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
              var _ref2;

              if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
              } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
              }

              var lw = _ref2;

              if (lw.widget.name === s.name) {
                lw.widget.setState(s.value);
              }
            }
          }
        };

        DashboardBase.prototype.getRoute = function getRoute() {
          return this.route + StateUrlParser.stateToQuery(StateDiscriminator.discriminate(this.getState()));
        };

        DashboardBase.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
          configurationInfo.addValue("name", this.name);
          configurationInfo.addValue("resourceGroup", this.resourceGroup);
          configurationInfo.addValue("title", this.title);

          configurationInfo.addValue("route", this.route);
          configurationInfo.addValue("layout", this.layout);
          configurationInfo.addValue("behaviors", this.behaviors);
        };

        DashboardBase.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
          var _this2 = this;

          this.name = configurationInfo.getValue("name");
          this.resourceGroup = configurationInfo.getValue("resourceGroup");
          this.title = configurationInfo.getValue("title");

          this.route = configurationInfo.getValue("route");
          this.layout = configurationInfo.getValue("layout");

          var behaviors = configurationInfo.getValue("behaviors");
          _.forEach(behaviors, function (b) {
            b.attach(_this2);
          });
        };

        return DashboardBase;
      }(Configurable));

      _export('DashboardBase', DashboardBase);

      _export('LayoutWidget', LayoutWidget = (_dec = computedFrom('navigationStack'), (_class2 = function (_Configurable2) {
        _inherits(LayoutWidget, _Configurable2);

        function LayoutWidget() {
          var _temp, _this3, _ret;

          _classCallCheck(this, LayoutWidget);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, _Configurable2.call.apply(_Configurable2, [this].concat(args))), _this3), _this3.navigationStack = [], _this3.resized = false, _temp), _possibleConstructorReturn(_this3, _ret);
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

        LayoutWidget.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
          configurationInfo.addValue("sizeX", this.sizeX);
          configurationInfo.addValue("sizeY", this.sizeY);
          configurationInfo.addValue("col", this.col);
          configurationInfo.addValue("row", this.row);
          configurationInfo.addValue("widget", this.widget);
        };

        LayoutWidget.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
          this.sizeX = configurationInfo.getInt("sizeX");
          this.sizeY = configurationInfo.getInt("sizeY");
          this.col = configurationInfo.getInt("col");
          this.row = configurationInfo.getInt("row");
          this.widget = configurationInfo.getValue("widget");
        };

        _createClass(LayoutWidget, [{
          key: 'hasNavStack',
          get: function get() {
            return this.navigationStack && this.navigationStack.length > 0;
          }
        }]);

        return LayoutWidget;
      }(Configurable), (_applyDecoratedDescriptor(_class2.prototype, 'hasNavStack', [_dec], Object.getOwnPropertyDescriptor(_class2.prototype, 'hasNavStack'), _class2.prototype)), _class2)));

      _export('LayoutWidget', LayoutWidget);
    }
  };
});