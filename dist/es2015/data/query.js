import { StringHelper } from '../helpers/string-helper';

export let Query = class Query {

  get sort() {
    return this._sort;
  }
  set sort(value) {
    this._sort = value;
  }

  get group() {
    return this._group;
  }
  set group(value) {
    this._group = value;
  }

  get sortDir() {
    return this._sortDir;
  }
  set sortDir(value) {
    this._sortDir = value;
  }

  get take() {
    return this._take;
  }
  set take(value) {
    this._take = value;
  }

  get fields() {
    return this._fields;
  }
  set fields(value) {
    this._fields = value;
  }

  get skip() {
    return this._skip;
  }
  set skip(value) {
    this._skip = value;
  }

  get serverSideFilter() {
    return this._serverSideFilter;
  }
  set serverSideFilter(value) {
    this._serverSideFilter = value;
  }

  cacheKey() {
    return Math.abs(StringHelper.hashCode((this.serverSideFilter ? this.serverSideFilter : "") + (this.fields ? this.fields.join("") : "") + (this.sort ? this.sort : "") + (this.sortDir ? this.sortDir : "") + (this.take ? this.take : "0") + (this.skip ? this.skip : "0")));
  }

};