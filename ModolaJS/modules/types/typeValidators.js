Modola.types.isSameType = (a, b) => {
  if (typeof a === typeof b && typeof a !== "object")
    return true;

  if (typeof a === "object" && typeof b !== "object") {
    const cleanType = a.type;

    console.log("🔍 Checking type:", `"${cleanType}"`, "=>", cleanType);
    console.log("🧾 Available types:", Object.keys(Modola.typesDescription));

    if (!Modola.typesDescription[cleanType]) {
      console.log("type is not exist");
      return false;
    };

    if (Modola.typesDescription[cleanType].default === undefined) {
      for (const type of Modola.typesDescription[cleanType].castableTo) {
        if (type === Modola.types.typeOf(b)) return true;
      }
      return false;
    };

    console.log("type is exist");
    return typeof Modola.typesDescription[cleanType].default === typeof b;
  };

  if (Modola.types.typeOf(a) === Modola.types.typeOf(b))
    return true;

  if (
    a?.type?.replace("&", "") === b?.type?.replace("&", "")
  )
    return true;

  return false;
};

Modola.types.isReferenceType = (x) => typeof x === "string" && x.endsWith("&");

Modola.types.isReference = (x) => Modola.references[x];

Modola.types.isConstantType = (modifier) => {
  return modifier && typeof modifier === "string" &&
    Modola.keywords.modifiers.varAndObj.includes(modifier) &&
    modifier === "const";
}

Modola.types.isConstant = (x) => Modola.constants[x];

Modola.types.isConstReferenceType = (x) => {
  if (typeof x !== "object") return undefined;

  if (x.type && Modola.types.isReferenceType(x.type)) {
    if (x.modifiers && Modola.types.isConstantType(x.modifiers)) {
      return true;
    }
  }

  return false;
};

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

Modola.types.isAssignableType = (type) => {
  if (!type || !type.type || !Modola.typesDesctription[type.type]) {
    console.error(`[Modola Parse] type is not exist`);
    return false;
  };

  if (type.modifiers) {
    if (Modola.keywords.modifiers.varAndObj.includes(type.modifiers)) {
      if (type.modifiers === "const") {
        console.error(`[Modola Parse] const is not assignable`);
        return false;
      }
    }
  }
  if (Modola.types.isReferenceType(type.type) && type.kind && type.kind === "argument") {
    console.error(`[Modola Parse] reference type arguments is not assignable`);
    return false;
  } else {
    return true;
  }
};

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