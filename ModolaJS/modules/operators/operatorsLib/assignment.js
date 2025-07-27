Modola.defineOperator("int", "=", (a, b) => {
  if (Modola.isInt(a) && Modola.isInt(b)) {
    if (a !== undefined) {
      a = b;
    }
  } else {
    console.log(`[Modola] operator=(${typeof a}, ${typeof b}) is not defined`);
  }
});