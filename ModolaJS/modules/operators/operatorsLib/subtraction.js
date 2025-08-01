
Modola.defineOperator({
  args: {
    "a": { type: "float", default: undefined }
  },
  returnType: "int",
  opName: "-",
  body: (args) => {
    return args["a"].value * -1;
  }
});

Modola.defineOperator({
  args: {
    "a": { type: "float", default: undefined },
    "b": { type: "int", default: undefined }
  },
  returnType: "int",
  opName: "-",
  body: (args) => {
    return args["a"].value - args["b"].value;
  }
});

/*Modola.defineOperator(["float", "int"], "float", "-", (a, b) => {
  return a.value - b.value;
});*/
