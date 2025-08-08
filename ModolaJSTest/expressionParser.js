const literals = ["number", "string"];

Modola.defineCore("parseExpression", (tokens, i, minPrec = 0) => {
  let left;
  const token = tokens[i];

  if (literals.includes(token.type)) {
    left = { type: "literal", value: token.value };
    i++;
  } else if (token.type === "identifier") {
    left = { type: "identifier", value: token.value };
    i++;
  } else if (token.value === "(") {
    i++;
    left = Modola.core.parseExpression(tokens, i);
    i = left.nextIndex;
    if (tokens[i]?.value !== ")") throw "Expected ')' token";
    i++;
  } else if (Modola.keywords.operators[token.value]?.props?.isUnary) {
    const op = token.value;
    i++;
    const right = Modola.core.parseExpression(tokens, i);
    i = right.nextIndex;
    left = {
      type: "unary",
      operator: op,
      argument: right
    };
  } else {
    throw `Unexpected token '${token?.value}'`;
  }

  while (true) {
    const opToken = tokens[i];
    const opInfo = Modola.keywords.operators[opToken?.value];

    if (!opInfo || !opInfo.props.isBinary) break;

    const precedence = opInfo.precedence;
    if (precedence < minPrec) break;

    const op = opToken.value;
    i++; // пропускаємо оператор

    const right = Modola.core.parseExpression(tokens, i, precedence + 1);
    i = right.nextIndex;

    left = {
      type: "binary",
      operator: op,
      left: left,
      right: right
    };
  }

  left.nextIndex = i;
  return left;
});