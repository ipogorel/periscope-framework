import { UrlHelper } from './../helpers/url-helper';
import * as base64 from 'js-base64';

export let StateUrlParser = class StateUrlParser {
  static stateToQuery(widgetStates) {
    var params = [];
    for (let widgetState of widgetStates) {
      if (widgetState.value) params.push({ "sn": widgetState.name, "sv": widgetState.value });
    }
    return params.length > 0 ? "?q=" + Base64.encode(UrlHelper.objectToQuery(params)) : "";
  }

  static queryToState(url) {
    var result = [];
    var q = UrlHelper.getParameterByName("q", url);
    if (q) {
      var widgetStates = UrlHelper.queryToObject(Base64.decode(q));
      for (var ws of widgetStates) {
        result.push({ "name": ws.sn, "value": ws.sv });
      }
    }
    return result;
  }
};