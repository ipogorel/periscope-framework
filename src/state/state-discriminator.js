
export class StateDiscriminator{
  static discriminate(widgetStates){
    var result = []
    for (let ws of widgetStates){
      if (ws.stateType==="searchBoxState")
        result.push(ws);
    }
    return result;
  }

}
