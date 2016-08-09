import * as _ from 'lodash';
import {Configurable} from './../../serialization/configurable';

export class Widget extends Configurable{

  constructor(settings) {
    super();
    // call method in child class
    //this._settings = settings;
    //this._behaviors = [];
    _.forOwn(settings, (v, k)=> {
      if (k=="behavior"){
        this._unattachedBehaviors = v;
      }
      else
        this[k] = v;
    });
  }

  type;
  name;
  dashboard;
  header;
  minHeight;
  resourceGroup;
  behavior = [];
  stateType;
  showHeader;
  dataHolder;
  stateStorage;
  dataSource;
  dataFilter;
  dataMapper;


  get self() {
    return this;
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


  attachBehavior(b){
    b.attachToWidget(this);
  }

  attachBehaviors(){
    if (this._unattachedBehaviors) {
      for (let b of this._unattachedBehaviors)
        this.attachBehavior(b);
    }
  }

  ///METHODS
  changeSettings(newSettings){
    if (newSettings) {
      //merge settings
      _.forOwn(newSettings, (v, k)=> {
        this[k] = v;
      });
      this.refresh();
    }
  }

  refresh(){

  }


  dispose(){
    while(true) {
      if (this.behavior.length>0)
        this.behavior[0].detach();
      else
        break;
    }
  }

  persistConfigurationTo(configurationInfo){
    /*dashboard;
    behavior = [];*/


    configurationInfo.addValue("name", this.name);
    configurationInfo.addValue("resourceGroup", this.resourceGroup);
    configurationInfo.addValue("header", this.header);
    configurationInfo.addValue("minHeight", this.minHeight);
    configurationInfo.addValue("stateType", this.stateType);
    configurationInfo.addValue("showHeader", this.showHeader);
    configurationInfo.addValue("dataHolder", this.dataHolder);
    configurationInfo.addValue("dataSource", this.dataSource);
    configurationInfo.addValue("dataFilter", this.dataFilter);
    configurationInfo.addScript("dataMapper", this.dataMapper);
    configurationInfo.addValue("behavior", this.behavior);


    configurationInfo.addValue("stateStorage", this.stateStorage); // move to constructor
  }
  restoreConfigurationFrom(configurationInfo){
    this.name = configurationInfo.getValue("name");
    this.resourceGroup = configurationInfo.getValue("resourceGroup");
    this.header = configurationInfo.getValue("header");
    this.minHeight = configurationInfo.getInt("minHeight");
    this.stateType = configurationInfo.getValue("stateType");
    this.showHeader = configurationInfo.getBool("showHeader");

    this.dataHolder = configurationInfo.getValue("dataHolder");
    this.dataSource = configurationInfo.getValue("dataSource");
    this.dataFilter = configurationInfo.getValue("dataFilter");
    this.dataMapper = configurationInfo.getScript("dataMapper");

    let behaviors = configurationInfo.getScript("behavior");
    _.forEach(behaviors, b=>{
      b.attachToWidget(this);
    })

    this.stateStorage = configurationInfo.getValue("stateStorage"); // move to constructor
  };

}








