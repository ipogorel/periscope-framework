import {DataService} from './data-service';
import {inject, transient} from 'aurelia-framework';

@transient()
export class JsonDataService extends DataService {
    constructor() {
      super();
    }

    read(options) { //options: fields,filter, take, skip, sort
        let url = this.url
        if (options.filter)
          url+= (this.filterParser? this.filterParser.getFilter(options.filter) : "");
        return this.httpClient
            .fetch(url)
            .then(response => {return response.json(); })
            .then(jsonData => {
                return {
                  data: (this.dataMapper? this.dataMapper(jsonData) : jsonData),
                  total: (this.totalMapper? this.totalMapper(jsonData) : jsonData.length)
                }
            });
    }
}
