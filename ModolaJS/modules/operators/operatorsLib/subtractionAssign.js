Modola.defineOperator(["int", "int"], "int", "-=", (a, b) => {
  return Modola.assignToVariable(a, a.value - b.value);
});

Modola.defineOperator(["float", "int"], "int", "-=", (a, b) => {
  return Modola.assignToVariable(a, a.value - b.value);
});