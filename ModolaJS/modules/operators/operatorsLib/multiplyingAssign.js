Modola.defineOperator(["int&", "int"], "int", "*=", (a, b) => {
  return Modola.variables[a.name].value *= b.value;
});

Modola.defineOperator(["float&", "int"], "int", "*=", (a, b) => {
  return Modola.variables[a.name].value *= b.value;
});