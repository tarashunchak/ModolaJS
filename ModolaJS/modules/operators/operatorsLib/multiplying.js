Modola.defineOperator(["int", "int"], "int", "*", (a, b) => {
  console.log("operator*:(\int\int)");
  return a.value * b.value;
});