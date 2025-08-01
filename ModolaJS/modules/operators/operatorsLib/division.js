Modola.defineOperator(["int", "int"], "int", "/", (a, b) => {
  return a.value / b.value;
});

Modola.defineOperator(["float", "int"], "float", "/", (a, b) => {
  return a.value / b.value;
});

Modola.defineOperator(["float", "float"], "float", "/", (a, b) => {
  return a.value / b.value;
});