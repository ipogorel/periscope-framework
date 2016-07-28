export class UrlHelper {
  static getAbsoluteBaseUrl(){
    return window.location.protocol + "//" + window.location.hostname + (window.location.port? ":" + window.location.port : "")
  }

  static objectToQuery(ar){
    return encodeURIComponent(JSON.stringify(ar));
  }

  static queryToObject(queryParam){
    return JSON.parse(decodeURIComponent(queryParam));
  }

  static getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

}
