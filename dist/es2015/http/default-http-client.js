import { HttpClient } from 'aurelia-fetch-client';
export let DefaultHttpClient = class DefaultHttpClient extends HttpClient {
  constructor(auth) {
    super();
    this.configure(config => {
      config.useStandardConfiguration().withDefaults({
        headers: {
          'Accept': 'application/json'
        }
      });
    });
  }
};