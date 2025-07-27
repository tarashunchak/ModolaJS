Modola.defineOperator("int", "+=", (a, b) => {
  console.log("operator+:int");
  if (typeof a === "string") {
    if (Modola.variables[a])
      a = Modola.variables[a];
    else if (Modola.constants[a])
      Modola.killProgram();
  }
  if (typeof b === "string") {
    if (Modola.variables[b])
      b = Modola.variables[b];
    else if (Modola.constants[b])
      Modola.killProgram();
  }

  if (Modola.isInt(a) || Modola.isInt(b)) {
    return a + b;
  } else {
    console.log(`[Modola] operator+(${typeof a}, ${typeof b}) is not defined`);
  }
});