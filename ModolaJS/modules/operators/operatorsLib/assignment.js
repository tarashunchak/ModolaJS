Modola.defineOperator({
  returnType: "float&",
  opName: "=",
  args: {
    "a": { type: "float&" },
    "b": { type: "int" },
  },
  body: (args) => {
    return Modola.variables[args["a"].name].value = args["b"].value;
  }
});