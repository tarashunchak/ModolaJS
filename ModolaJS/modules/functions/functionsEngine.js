Modola.defineFunction = (funcObj) => {
  let args = funcObj.args || {};
  let argNames = Object.keys(args) || undefined;

  return {
    type: "modolaFunc",
    returnType: funcObj.returnType,
    name: funcObj.name,
    //name: Modola.makeScopeName(funcObj.name),
    scope: funcObj.scope,
    args: argNames.map(name => ({
      name: name,
      type: args[name].type,
      default: args[name]?.default || undefined
    })) || undefined,
    body: (passedArgs = {}) => {
      Modola.enterScope(funcObj.name);
      const result = funcObj.body(passedArgs);
      Modola.exitScope();
      return result;
    },
  }
};

function isSuitableParamTypes(func, params) {
  let funcParams = func.paramTypes;
  let funcLength = func.paramTypes.length;

  let isSameTypeSc = (arg1, arg2) => Modola.types.isSameType(arg1, arg2) ||
    Modola.types.isSameType(Modola.makeRefType(arg1.type), arg2);

  let maxFuncLenght = funcLength;
  if (funcLength !== params.length) {
    for (let i = 0; i < funcLength; i++) {
      if (typeof funcParams[funcLength - 1 - i] !== "object") {
        Modola.killProgram();
        return;
      } else {
        maxFuncLenght = funcLength - 1 - i;
      }
    }
  }

  if (params.length >= maxFuncLenght) {
    for (let i = 0; i < maxFuncLenght; i++) {
      if (!isSameTypeSc({ type: funcParams[i] }, params[i])) {
        Modola.killProgram();
        return;
      }
    }
    return true;
  } else {
    Modola.killProgram();
  }

};

Modola.callFunction = (funcName, params = []) => {
  const func = Modola.getGlobalElement(funcName);
  func.body();
  /*if () {
    if (isSuitableParamTypes(func, params)) {
      return func.body(...params);
    } else {
      Modola.killProgram();
      return;
    }
  }*/
};