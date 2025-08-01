Modola.types.isSameType = (a, b) => {
  if (typeof a === typeof b && typeof a !== "object")
    return true;

  if (Modola.types.typeOf(a) === Modola.types.typeOf(b)) return true;

  if (a.type.replace('&', '') === b.type.replace('&', '')) return true;

  return false;
};

Modola.types.isConstant = (x) => Modola.constants[x];

Modola.types.isAssignable = (x) => {
  if (typeof x === "string") {
    if (Modola.variables[Modola.makeScopeName(x)])
      return true;
    else if (Modola.types.isConstant(x))
      return false;
    else
      return undefined;
  }
  return false;
};

Modola.types.isReference = (x) => Modola.references[x];

Modola.types.isInt = (x) => {
  if (typeof x === "number") {
    return Number.isInteger(x);
  } else if (typeof x === "string") {
    let xVal = Modola.getVariableValue(x);
    if (xVal) {
      return typeof xVal === "number" && Number.isInteger(xVal);
    }
  }
};


Modola.types.isFloat = (x) => typeof x === "number" && Number.isFloat(x);