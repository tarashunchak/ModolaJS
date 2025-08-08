Modola.defineCore("parseOperatorDec", (tokens, i) => {
  if (tokens[i++].value !== "operator")
    throw `Expect 'operator' keyword in operator declaration`;

  const opName = tokens[i++].value;

  if (!Modola.keywords.operators[opName])
    throw `Expect opeartor symbol in operator declaration`;

  i++;
  const args = [];
  while (tokens[i].value !== ")") {
    const arg = Modola.core.parseFuncArgs(tokens, i);
    args.push(arg);
    i = arg.nextIndex;
  }

  i++;

  if (tokens[i++].value !== "->") throw "Expect '->' operator for return type defining";

  const returnType = tokens[i].value;
  if (returnType === "{") throw `Expect return type of operator${opName}`;

  const body = [];

  return {
    kind: "operatorDec",
    opName,
    args,
    body,
    returnType,
    nextIndex: i,
  };
});