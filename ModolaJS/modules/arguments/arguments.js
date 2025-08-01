Modola.resolveArguments = (argsNameList) => {
  return argsNameList.map(name => {
    if (Modola.variables[name]) return { ...Modola.variables[name], name, isVariable: true };
    if (Modola.constants[name]) return { ...Modola.constants[name], name, isConstant: true };
    if (Modola.references[name]) return { ...Modola.references[name], name, isReference: true };
  });
};

Modola.isSameArgsType = (defArgs, callArgs) => {
  let isSameType = Modola.types["isSameType"];
  let makeRefType = Modola["makeReferenceType"];

  let isSameTypeSc = (defArgs, callArgs) => {
    for (let i = 0; i < callArgs.length; i++) {
      if (!(isSameType(defArgs[i], callArgs[i]) || isSameType(makeRefType(defArgs[i].type), callArgs[i]))) {
        return false;
      }
    }

    return true;
  };

  isSameTypeSc(defArgs, callArgs);
};