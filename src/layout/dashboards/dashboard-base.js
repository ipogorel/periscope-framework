import {computedFrom} from 'aurelia-framework';
import * as _ from 'lodash';
import {StateDiscriminator} from './../../state/state-discriminator';
import {StateUrlParser} from './../../state/state-url-parser';
import {Configurable} from './../../serialization/configurable';

export class DashboardBase extends Configurable
{
  constructor() {
    super();
  }

  route;
  behaviors = [];
  layout = [];

  name;
  resourceGroup;
  title;



  configure(dashboardConfiguration){
    this.name = dashboardConfiguration.name;
    this.title = dashboardConfiguration.title;
    this.resourceGroup = dashboardConfiguration.resourceGroup;
  }


  getWidgetByName(widgetName) {
    var wl = _.find(this.layout, w=> { return w.widget.name === widgetName });
    if (wl)
      return wl.widget;
  }

  addWidget(widget, dimensions) {
    let lw = new LayoutWidget();
    lw.widget = widget;
    lw.sizeX = dimensions.sizeX;
    lw.sizeY = dimensions.sizeY;
    lw.col = dimensions.col;
    lw.row = dimensions.row;
    this.layout.push(lw);
    widget.dashboard = this;
  }

  removeWidget(widget) {
    _.remove(this.layout, w=>{
      if (w.widget === widget) {
        widget.dispose();
        return true;
      }
      return false;
    });
  }

  replaceWidget(oldWidget, newWidget) {
    let oldLw = _.find(this.layout, w=> {return w.widget === oldWidget});
    if (oldLw){
      newWidget.dashboard = this;
      let newLw = new LayoutWidget();
      newLw.widget = newWidget;
      newLw.sizeX = oldLw.sizeX;
      newLw.sizeY = oldLw.sizeY;
      newLw.col = oldLw.col;
      newLw.row = oldLw.row;

      newLw.navigationStack.push(oldWidget);
      this.layout.splice(_.indexOf(this.layout,oldLw), 1, newLw);
    }
  }

  restoreWidget(currentWidget){
    let lw = _.find(this.layout, w=> {return w.widget === currentWidget});
    let previousWidget = lw.navigationStack.pop();
    if (previousWidget){
      let previousLw = new LayoutWidget();
      previousLw.widget = previousWidget;
      previousLw.sizeX = lw.sizeX;
      previousLw.sizeY = lw.sizeY;
      previousLw.col = lw.col;
      previousLw.row = lw.row;
      this.layout.splice(_.indexOf(this.layout,lw), 1, previousLw);
    }
  }


  resizeWidget(widget, newSize){
    var lw = _.find(this.layout, w=> {return w.widget === widget});
    if (newSize) {
      let x = newSize.sizeX?newSize.sizeX:lw.sizeX;
      let y = newSize.sizeY?newSize.sizeY:lw.sizeY;
      lw.resize(x, y);
    }
    else
      lw.rollbackResize()
  }


  refreshWidget(widget){
    widget.refresh();
  }
  
  refresh() {
    for (let i=0; i<this.layout.length; i++) {
      this.refreshWidget(this.layout[i].widget);
    }
  }

  dispose(){
    for (let i=0; i<this.layout.length; i++) {
      this.layout[i].widget.dispose();
    }
    this.layout = [];

    while(true) {
      if (this.behaviors.length>0)
        this.behaviors[0].detach();
      else
        break;
    }
  }



  getState(){
    let result = [];
    _.forEach(this.layout,lw=>{
      result.push({name: lw.widget.name, value: lw.widget.getState(), stateType:lw.widget.stateType});
    })
    return result;
  }

  setState(state){
    for (let s of state){
      for (let lw of this.layout){
        if (lw.widget.name===s.name){
          lw.widget.setState(s.value);
        }
      }
    }
  }

  getRoute(){
    return this.route + StateUrlParser.stateToQuery(StateDiscriminator.discriminate(this.getState()));
  }


  persistConfigurationTo(configurationInfo){
    configurationInfo.addValue("name", this.name);
    configurationInfo.addValue("resourceGroup", this.resourceGroup);
    configurationInfo.addValue("title", this.title);

    configurationInfo.addValue("route", this.route);
    configurationInfo.addValue("layout", this.layout);
    configurationInfo.addValue("behaviors", this.behaviors);
  }
  restoreConfigurationFrom(configurationInfo){
    this.name = configurationInfo.getValue("name");
    this.resourceGroup = configurationInfo.getValue("resourceGroup");
    this.title = configurationInfo.getValue("title");

    this.route = configurationInfo.getValue("route");
    this.layout = configurationInfo.getValue("layout");


    //this.behaviors = configurationInfo.getValue("behaviors");
    let behaviors = configurationInfo.getValue("behaviors");
    _.forEach(behaviors, b=>{
      b.attach(this);
    })
  };
}

export class LayoutWidget extends Configurable {

  widget;
  navigationStack = [];
  sizeX;
  sizeY;
  col;
  row;
  resized = false;

  @computedFrom('navigationStack')
  get hasNavStack() {
    return this.navigationStack && this.navigationStack.length > 0;
  }

  resize(newSizeX, newSizeY){
    this._originalDimensions = {sizeX:this.sizeX, sizeY:this.sizeY};
    this.sizeX = newSizeX;
    this.sizeY = newSizeY;
    this.resized = true;
  }

  rollbackResize(){
    if (this._originalDimensions){
      this.sizeX = this._originalDimensions.sizeX;
      this.sizeY = this._originalDimensions.sizeY;
    }
    this.resized = false;
  }

  persistConfigurationTo(configurationInfo){
    configurationInfo.addValue("sizeX", this.sizeX);
    configurationInfo.addValue("sizeY", this.sizeY);
    configurationInfo.addValue("col", this.col);
    configurationInfo.addValue("row", this.row);
    configurationInfo.addValue("widget", this.widget);
  }

  restoreConfigurationFrom(configurationInfo){
    this.sizeX = configurationInfo.getInt("sizeX");
    this.sizeY = configurationInfo.getInt("sizeY");
    this.col = configurationInfo.getInt("col");
    this.row = configurationInfo.getInt("row");
    this.widget = configurationInfo.getValue("widget");
  }
}
