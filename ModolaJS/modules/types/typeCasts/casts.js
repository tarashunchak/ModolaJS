Modola.types.canCast = (fromType, toType) => {
  return Modola.types[fromType]?.castableTo?.includes(toType) || false;
};

Modola.types.cast = (varObj, toType) => {
  if (Modola.traits.isVariableOrObject(varObj)) {
    if (Modola.types.canCast(varObj.type, toType)) {
      return Modola.callOperator(toType, varObj);
    } else {
      return undefined;
    }
  }
};