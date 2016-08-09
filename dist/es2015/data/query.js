import { StringHelper } from '../helpers/string-helper';

export let Query = class Query {
  constructor() {}

  cacheKey() {
    return Math.abs(StringHelper.hashCode((this.filter ? JSON.stringify(this.filter) : "") + (this.fields ? this.fields.join("") : "") + (this.sort ? this.sort : "") + (this.sortDir ? this.sortDir : "") + (this.take ? this.take : "0") + (this.skip ? this.skip : "0")));
  }
};