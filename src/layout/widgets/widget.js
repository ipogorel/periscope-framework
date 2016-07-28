import lodash from 'lodash';

export class Widget {

  constructor(settings) {
    // call method in child class
    this._settings = settings;
    this._behaviors = [];

  }

  get self() {
    return this;
  }

  get settings(){
    return this._settings;
  }


  get behaviors() {
    return this._behaviors;
  }

  get name(){
    return this.settings.name;
  }

  get resourceGroup() {
    return this.settings.resourceGroup;
  }

  get minHeight(){
    return this.settings.minHeight;
  }
  set minHeight(value){
    this.settings.minHeight = value;
  }
  

  get stateType() {
    return this._type;
  }
  set stateType(value) {
    this._type = value;
  }

  get showHeader(){
    return this.settings.showHeader;
  }

  set dataHolder(value){
    this._dataHolder = value;
  }
  get dataHolder(){
    return this._dataHolder;
  }

  get header() {
    return this.settings.header;
  }
  set header(value) {
    this.settings.header = value;
  }


  get stateStorage(){
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

  getStateKey() {
    if (this.stateStorage)
      return this.stateStorage.createKey(this.dashboard.name, this.name);
    return "";
  }

  getState() {
    if (this.stateStorage) {
      var s = this.stateStorage.get(this.getStateKey());
      if (s)
        return s;
    }
    return undefined;
  }

  setState(value) {
    if (this.stateStorage) {
      if (!value)
        this.stateStorage.remove(this.getStateKey());
      else
        this.stateStorage.set(this.getStateKey(), value);
    }
  }
  

  attachBehavior(behavior){
    behavior.attachToWidget(this);
  }

  attachBehaviors(){
    if (this.settings.behavior) {
      for (let b of this.settings.behavior)
        this.attachBehavior(b);
    }
  }

  ///METHODS
  changeSettings(newSettings){
    if (newSettings) {
      //merge settings
      _.forOwn(newSettings, (v, k)=> {
        this.settings[k] = v;
      });
      this.refresh();
    }
  }

  refresh(){

  }
  

  dispose(){
    while(true) {
      if (this.behaviors.length>0)
        this.behaviors[0].detach();
      else
        break;
    }
  }


}



