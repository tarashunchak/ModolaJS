Modola.variables = {};

Modola.defineVariable = (type, name, value = undefined) => {
  if (typeof name === "string") {
    let fullName = Modola.makeScopeName(name);
    if (!Modola.getVariableValue(fullName)) {
      Modola.variables[fullName] = {
        varName: name,
        name: fullName,
        type: type,
        value: value,
        isLvalue: true
      };

      //Modola.pushToCurrScope(Modola.variables[fullName]);
      console.log(`Variable placed in scope ${fullName}`);
    } else {
      Modola.killProgram();
    }
  }
};

Modola.defineTemporaryVariable = (value) => {
  let type = Modola.typeOf(value);
  if (type) {
    temp = {
      type: type,
      value: value,
      isLvalue: false
    }
    //Modola.pushToCurrScope(temp);
    return temp;
  } else {
    Modola.killProgram();
  }
};

Modola.getVariable = (name) => {
  if (name && typeof name === "string")
    return Modola.variables[Modola.makeScopeName(name)] || undefined;
  else if (name && typeof name === "object") {
    if (name.type) {
      if (name.value)
        return name;
      else
        return undefined;
    }
  }
  else {
    return undefined;
  }
};

Modola.getVariableValue = (name) => {
  if (typeof name === "string") {
    let fullName = Modola.makeScopeName(name);
    if (Modola.variables[fullName]) {
      return Modola.variables[fullName].value;
    } else {
      Modola.killProgram();
      return undefined;
    }
  }
}

Modola.assignToVariable = (varTo, value) => {
  console.log("varTo: ", varTo.name);
  Modola.variables[varTo.name].value = value;
  return Modola.variables[varTo.name];
}