Modola.defineOperator({
  returnType: "float&",
  opName: "+=",
  args: {
    "a": { type: "float&" },
    "b": { type: "int" }
  },
  body: (args) => {
    return Modola.callOperator("=", [args["a"], Modola.callOperator("+", [args["a"].varName, args["b"].varName])]);
  }
});