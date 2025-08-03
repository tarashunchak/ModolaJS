Modola.defineOperator({
  returnType: "float&",
  opName: "=",
  args: {
    "a": { type: "float&" },
    "b": { type: "int" },
  },
  body: (args) => {
    return Modola.getVariable(args["a"]).value = args["b"].value;
  }
});