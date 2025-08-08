Modola.parserUtils = {};

Modola.parserUtils.isVariableDef = (tokens, i) => {
  return Modola.keywords.modifiers.scopeModifiers.includes(tokens[i].value) &&
    tokens[i + 1].value !== 'const'
    && tokens[i + 2].value === ":";
};

Modola.parserUtils.isConstantDef = (tokens, i) => {
  return Modola.keywords.modifiers.scopeModifiers.includes(tokens[i].value) &&
    tokens[i + 1].value === 'const'
    && tokens[i + 3].value === ":";
};

Modola.parserUtils.isUnsafeBlock = (tokens, i) => {
  return tokens[i].value === "unsafe" && tokens[i + 1].value === "{";
};

Modola.parserUtils.isComponentDef = (tokens, i) => {
  return tokens[i].value === "component" && tokens[i + 2].value === "{";
};

Modola.parserUtils.isOperatorDec = (tokens, i) => {
  return tokens[i].value === "operator" && Modola.keywords.operators[tokens[i + 1].value];
};

Modola.parserUtils.isEmit = (tokens, i) => {
  return (tokens[i].value === "emit" && tokens[i + 1].value === "("
    && tokens[i + 2].type === "string" && tokens[i + 3].value === ")"
    && tokens[i + 4].value === ";");
};

Modola.parserUtils.isExpressionStart = (token) => {
  if (!token) return false;

  return (
    ["number", "string", "identifier"].includes(token.type) ||
    token.value === "(" ||
    (Modola.keywords.operators[token.value]?.props?.isUnary)
  );
};