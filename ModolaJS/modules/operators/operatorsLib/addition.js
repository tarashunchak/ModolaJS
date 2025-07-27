Modola.defineOperator("int", "+", (a, b) => {
  console.log("operator+:int");

  if (typeof a === "string" && Modola.variables[a])
    a = Modola.variables[a];
  if (typeof b === "string" && Modola.variables[b])
    b = Modola.variables[b];

  if (Modola.isInt(a) || Modola.isInt(b)) {
    return a + b;
  } else {
    console.log(`[Modola] operator+(${typeof a}, ${typeof b}) is not defined`);
  }
});

Modola.defineOperator("float", "+", (a, b) => {
  console.log("operator+:float");
  if (Modola.isFloat(a) && Modola.isFloat(b)) {
    return a + b;
  } else {
    console.log(`[Modola] operator+(${typeof a}, ${typeof b}) is not defined`);
  }
});

Modola.defineOperator("array", "+", (a, b) => {
  console.log("operator+:array");
  if (Array.isArray(a) && Array.isArray(b)) {
    let temp = a;
    for (let i = 0; i < b.length; i++) {
      temp.push(b[i]);
    }
    return temp;
  } else {
    console.log(`[Modola] operator+(${typeof a}, ${typeof b}) is not defined`);
  }
});