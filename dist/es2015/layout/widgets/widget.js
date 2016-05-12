import lodash from 'lodash';

export let Widget = class Widget {

  constructor(settings) {
    this._settings = settings;
    this._behaviors = [];
  }

  get self() {
    return this;
  }

  get settings() {
    return this._settings;
  }

  get behaviors() {
    return this._behaviors;
  }

  get name() {
    return this.settings.name;
  }

  get minHeight() {
    return this.settings.minHeight;
  }
  set minHeight(value) {
    this.settings.minHeight = value;
  }

  get state() {
    if (this.stateStorage) {
      var key = this.stateStorage.createKey(this.dashboard.name, this.name);
      var s = this.stateStorage.get(key);
      if (s) return s.stateObject;
    }
    return undefined;
  }

  set state(value) {
    if (this.stateStorage) {
      var key = this.stateStorage.createKey(this.dashboard.name, this.name);
      if (!value) this.stateStorage.remove(key);else {
        var s = { stateType: this.stateType, stateObject: value };
        this.stateStorage.set(key, s);
      }
    }
  }

  get stateType() {
    return this._type;
  }
  set stateType(value) {
    this._type = value;
  }

  get showHeader() {
    return this.settings.showHeader;
  }

  set dataHolder(value) {
    this._dataHolder = value;
  }
  get dataHolder() {
    return this._dataHolder;
  }

  get header() {
    return this.settings.header;
  }
  set header(value) {
    this.settings.header = value;
  }

  get stateStorage() {
    return this.settings.stateStorage;
  }

  set dataSource(value) {
    this.settings.dataSource = value;
  }
  get dataSource() {
    return this.settings.dataSource;
  }

  get dataMapper() {
    return this.settings.dataMapper;
  }

  get dataFilter() {
    return this._dataFilter;
  }

  set dataFilter(value) {
    this._dataFilter = value;
  }

  get type() {
    return this._type;
  }

  get dashboard() {
    return this._dashboard;
  }
  set dashboard(value) {
    this._dashboard = value;
  }

  attachBehavior(behavior) {
    behavior.attachToWidget(this);
  }

  attachBehaviors() {
    if (this.settings.behavior) {
      for (let b of this.settings.behavior) this.attachBehavior(b);
    }
  }

  changeSettings(newSettings) {
    if (newSettings) {
      _.forOwn(newSettings, (v, k) => {
        this.settings[k] = v;
      });
      this.refresh();
    }
  }

  refresh() {}

  dispose() {
    while (true) {
      if (this.behaviors.length > 0) this.behaviors[0].detach();else break;
    }
  }

};