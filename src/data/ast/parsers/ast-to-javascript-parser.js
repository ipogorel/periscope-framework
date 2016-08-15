import {AstParser} from './ast-parser';

export class AstToJavascriptParser extends AstParser{
  constructor(){
    super();
  }

  get type(){
    return this._clientSide;
  }

  getFilter(astTree) {
    if (astTree)
      return this._parseTree(astTree,[]);
    return "";
  }

  _parseTree(treeNode, result){
    if (treeNode.left) {
      result.push(this._createExpression(treeNode.connector, treeNode.left));
      if (treeNode.right)
        this._parseTree(treeNode.right, result);
    }
    else
      result.push(this._createExpression(treeNode.connector, treeNode));
    return result.join(" ");
  }


  _createExpression(connector, node){
    let result = "";
    let prefix = "record.";
    let fieldname = node.field;
    let operand = node.operand;
    let value = node.value;

    if (node.type=='string') {
      if (operand==='in') {
        result = _.map(value, val=>{
          return prefix + fieldname + ".toLowerCase() == '" + val.trim().toLowerCase() + "'"
        }).join(" || ");

      }
      else {
        let v = value.trim().toLowerCase();
        if (v.length >= 2) {
          if ((v.indexOf("%") === 0) && (v.lastIndexOf("%") === (v.length - 1)))
            result = prefix + fieldname + ".toLowerCase().includes('" + v.substring(1, value.length - 1) + "')"
          else if (v.indexOf("%") === 0)
            result = prefix + fieldname + ".toLowerCase().endsWith('" + v.substring(1, value.length) + "')"
          else if (v.lastIndexOf("%") === (value.length - 1))
            result = prefix + fieldname + ".toLowerCase().startsWith('" + v.substring(0, value.length - 1) + "')"
        }
        if (result == "")
          result = prefix + fieldname + ".toLowerCase() " + operand + " '" + v + "'";
      }
    }
    else if (node.type=='number'){
      result = prefix + fieldname + operand + " " + value;
    }
    else if (node.type=='date'){
      result = prefix + fieldname + operand + " '" + value + "'";
    }
    result=(connector? connector:"") +" (" + prefix + fieldname + "!=null && (" + result + "))";
    return result;
  }

  persistConfigurationTo(configurationInfo){
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo){
    super.restoreConfigurationFrom(configurationInfo);
  }

}
