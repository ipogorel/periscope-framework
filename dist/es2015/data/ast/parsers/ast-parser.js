import { Configurable } from './../../../serialization/configurable';

export let AstParser = class AstParser {
  constructor() {
    this._clientSide = "clientSide";
    this._serverSide = "serverSide";
  }
  get type() {}
  getFilter(astTree) {
    return {};
  }
  persistConfigurationTo(configurationInfo) {}
  restoreConfigurationFrom(configurationInfo) {}
};