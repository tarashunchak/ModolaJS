Modola.defineCore('parseVariableDef', (tokens, i) => {
  const scope = ["global", "local", "dev"].includes(tokens[i].value) ? tokens[i++].value : "local";
  const name = tokens[i++].value;

  if (tokens[i++].value !== ":") throw "Expected ':'";
  const type = tokens[i++].value;
  let value = null;
  if (tokens[i].value === ":=") {
    value = tokens[++i].value;
    i++;
  }
  console.log(`i before ; ${i}`);
  if (tokens[i].value !== ";") throw "Expected ';'";

  return {
    kind: "variableDef",
    scope,
    name,
    type,
    value,
    nextIndex: i
  };
});