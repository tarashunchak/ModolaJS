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