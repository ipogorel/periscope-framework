'use strict';

System.register(['aurelia-framework', './widget', './../../navigator/events/widget-event'], function (_export, _context) {
  var Decorators, customElement, bindable, inject, useView, noView, Widget, WidgetEvent, _createClass, Grid;

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
      Decorators = _aureliaFramework.Decorators;
      customElement = _aureliaFramework.customElement;
      bindable = _aureliaFramework.bindable;
      inject = _aureliaFramework.inject;
      useView = _aureliaFramework.useView;
      noView = _aureliaFramework.noView;
    }, function (_widget) {
      Widget = _widget.Widget;
    }, function (_navigatorEventsWidgetEvent) {
      WidgetEvent = _navigatorEventsWidgetEvent.WidgetEvent;
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

      _export('Grid', Grid = function (_Widget) {
        _inherits(Grid, _Widget);

        function Grid(settings) {
          _classCallCheck(this, Grid);

          var _this = _possibleConstructorReturn(this, _Widget.call(this, settings));

          _this.columns = settings.columns ? settings.columns : [];
          _this.navigatable = settings.navigatable;
          _this.autoGenerateColumns = settings.autoGenerateColumns;
          _this.pageSize = settings.pageSize;
          _this.group = settings.group;

          _this.stateType = "gridState";

          _this._dataSelected = new WidgetEvent();
          _this._dataActivated = new WidgetEvent();
          _this._dataFieldSelected = new WidgetEvent();

          _this.attachBehaviors();
          return _this;
        }

        Grid.prototype.saveState = function saveState() {
          this.state = { columns: this.columns };
        };

        Grid.prototype.restoreState = function restoreState() {
          if (this.state) this.columns = this.state.columns;
        };

        _createClass(Grid, [{
          key: 'columns',
          get: function get() {
            return this._columns;
          },
          set: function set(value) {
            this._columns = value;
          }
        }, {
          key: 'navigatable',
          get: function get() {
            return this._navigatable;
          },
          set: function set(value) {
            this._navigatable = value;
          }
        }, {
          key: 'autoGenerateColumns',
          get: function get() {
            return this._autoGenerateColumns;
          },
          set: function set(value) {
            this._autoGenerateColumns = value;
          }
        }, {
          key: 'pageSize',
          get: function get() {
            return this._pageSize;
          },
          set: function set(value) {
            this._pageSize = value;
          }
        }, {
          key: 'group',
          get: function get() {
            return this._group;
          },
          set: function set(value) {
            this._group = value;
          }
        }, {
          key: 'dataSelected',
          get: function get() {
            return this._dataSelected;
          },
          set: function set(handler) {
            this._dataSelected.attach(handler);
          }
        }, {
          key: 'dataActivated',
          get: function get() {
            return this._dataActivated;
          },
          set: function set(handler) {
            this._dataActivated.attach(handler);
          }
        }, {
          key: 'dataFieldSelected',
          get: function get() {
            return this._dataFieldSelected;
          },
          set: function set(handler) {
            this._dataFieldSelected.attach(handler);
          }
        }]);

        return Grid;
      }(Widget));

      _export('Grid', Grid);
    }
  };
});