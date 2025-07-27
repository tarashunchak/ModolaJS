Modola.defineOperator("int", "/", (a, b) => {
  if (Modola.isInt(a) && Modola.isInt(b)) {
    return a / b;
  } else {
    console.log(`[Modola] operator/(${typeof a}, ${typeof b}) is not defined`);
  }
});

Modola.defineOperator("float", "/", (a, b) => {
  if (Modola.isFloat(a) && Modola.isFloat(b)) {
    return a / b;
  } else {
    console.log(`[Modola] operator/(${typeof a}, ${typeof b}) is not defined`);
  }
});