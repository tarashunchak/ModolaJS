Modola.defineCore("parseVariableDef", (tokens, i) => {
  console.log("parse variable");
  const scope = ["global", "local", "dev"].includes(tokens[i].value) ? tokens[i++].value : "local";
  const name = tokens[i++].value;
  if (name === "const") throw "Expected variable definition NOT constant!";

  console.log(`i before : ${i}`);
  if (tokens[i++].value !== ":") throw "Expected ':'";
  const type = tokens[i++].value;
  let value = null;
  if (tokens[i++].value === ":=") {
    value = tokens[i++].value;
  }
  console.log(`i before ; ${i}`);
  if (tokens[i++].value !== ";") throw "Expected ';'";

  return {
    kind: "variableDef",
    scope,
    name,
    type,
    value,
    nextIndex: i
  };
});

Modola.defineCore("parseConstantDef", (tokens, i) => {
  console.log("parse constant");
  const scope = tokens[i++].value;
  if (!Modola.keywords.modifiers.scopeModifiers.includes(scope)) throw "Expect scope modifier for constant definition";

  if (tokens[i++].value !== "const") throw "Expect const keyword";

  const name = tokens[i++].value;

  console.log(`i before : const  ${i - 1}`);
  if (tokens[i++].value !== ":") throw "Expected ':' in constant definition";
  const type = tokens[i++].value;
  let value = null;

  if (tokens[i++].value === ":=") {
    value = tokens[i++].value;
  } else throw "Expect default value for constant";

  console.log(`i before ; ${i}`);
  if (tokens[i++].value !== ";") throw "Expected ';'";

  return {
    kind: "constDef",
    scope,
    name,
    type,
    value,
    nextIndex: i
  };
});