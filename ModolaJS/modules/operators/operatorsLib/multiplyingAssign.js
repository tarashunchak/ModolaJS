Modola.defineOperator(["int&", "int"], "int", "*=", (a, b) => {
  return Modola.variables[a.name].value *= b.value;
});

Modola.defineOperator({
  returnType: "float&",
  opName: "*=",
  args: {
    "a": { type: "float&" },
    "b": { type: "int" }
  },
  body: (args) => {
    return Modola.callOperator("=", [args["a"], Modola.callOperator("*", [args["a"].varName, args["b"].varName])]);
  }
});