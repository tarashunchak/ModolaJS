Modola.defineCore("parseEnumField", (tokens, i) => {
  const name = tokens[i++].value;

  let defValue = undefined;
  if (tokens[i].value === ":=" && tokens[i + 1]) {
    defValue = tokens[i + 1]?.value;
    i += 2;
  }

  return {
    kind: "enumFieldDef",
    name,
    defValue,
    nextIndex: i
  }

});

Modola.defineCore("parseEnumBlock", (tokens, i) => {
  if (!Modola.core.isTypeDefining(tokens, i, "enum")) throw "Expect scope modifier in enum definition";

  const name = tokens[i + 2].value;

  i += 5;
  const values = [];

  while (i < tokens.length && !Modola.keywords.endOfBlock.includes(tokens[i].value)) {
    if (tokens[i].value !== ",") {
      const value = Modola.core.parseEnumField(tokens, i);
      values.push(value);
      i = value.nextIndex;
    } else {
      i++;
    }
  }

  if (!Modola.keywords.endOfBlock.includes(tokens[i]?.value)) throw "Expected '}' or '};' at the end of enum block";


  return {
    kind: "enumDef",
    name,
    values,
    nextIndex: i + 1
  }
});