Modola.variables = {};

Modola.defineVariable = (name, value) => {
  if (typeof name === "string" && value !== undefined) {
    Modola.variables[name] = value;
  }
};

Modola.getVariableValue = (name) => {
  if (typeof name === "string") {
    if (Modola.variables[name]) {
      return Modola.variables[name];
    } else {
      Modola.killProgram();
    }
  }
}