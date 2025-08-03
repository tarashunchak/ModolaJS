

/*---[Modola Core] function that parse function args (
  modifiers name : type := defValue
) ---*/
Modola.defineCore('parseFuncArgs', (tokens, i) => {
  let name = tokens[i++].value;
  if (tokens[i++].value !== ":") throw "Expected ':' after argument name";
  let type = tokens[i++].value;

  let defValue = null;
  if (tokens[i].value === ":=") {
    i++;
    defValue = tokens[i++].value;
  }

  return {
    kind: "funcArg",
    name,
    type,
    defValue,
    nextIndex: i
  };
});

/*---[Modola Core] function that parse header (
  scope funcName(args) -> returType {
) ---*/
Modola.defineCore('parseFuncHeader', (tokens, i) => {
  const scope = tokens[i++].value;
  if (!Modola.keywords.modifiers.scopeModifiers.includes(scope)) throw "Expect scope specifier for function declaration";

  const name = tokens[i++].value;
  if (tokens[i++].value !== "(") throw "Expected '(' in functinon declaration";

  const args = [];
  while (tokens[i].value !== ")") {
    const arg = Modola.core.parseFuncArgs(tokens, i);
    args.push(arg);
    i = arg.nextIndex;

    if (tokens[i].value === ",") i++;
  }

  i++;
  console.log(`i before arrow ${i}`);
  let returnType = null;
  if (tokens[i].value === "->" && Modola.typesDescription[tokens[i + 1].value]) {
    returnType = tokens[i + 1].value;
  } else throw "Expect return type of function";

  i += 2;

  return {
    kind: "funcHeader",
    scope,
    name,
    args,
    returnType,
    nextIndex: i
  }
});

Modola.defineCore('parseFuncBlock', (tokens, i) => {
  const header = Modola.core.parseFuncHeader(tokens, i);
  i = header.nextIndex;

  console.log(`i before { ${i}`);
  if (tokens[i++].value !== "{") throw "Expect  '{' after function header";

  const body = [];
  let braceCount = 1;

  let currentDoc = null;

  while (i < tokens.length && braceCount > 0) {
    let token = tokens[i].value;

    if (token === "{") braceCount++;
    if (endOfBlock.includes(token)) braceCount--;

    if (token === "@doc") {
      currentDoc = token.replace('@doc', '').trim().replace(/^"|"$/g, '');
      i++;
      continue;
    }

    if (token === "doc@") {
      currentDoc = null;
      i++;
      continue;
    }

    let variable = null;
    if (Modola.keywords.modifiers.scopeModifiers.includes(tokens[i].value) ? tokens[i++].value : ("local" && Modola.typesDescription[tokens[i].value])) {
      variable = Modola.core.parseVariableDef(tokens, i);
      if (variable) {
        if (currentDoc) {
          variable.doc = currentDoc;
          currentDoc = null
        }
        i = variable.nextIndex;
        body.push(variable);
        i++;
        continue;
      }
    }
  }

  return {
    kind: "functionDef",
    func: {
      header,
      body
    },
    nextIndex: i
  }
});

Modola.defineCore("parseFuncCall", (tokens, i) => {
  const name = tokens[i++];

  if (tokens[i++] !== "(") throw "Expected () for function call";

  const args = [];
  while (tokens[i] !== ")") {
    const arg = parseFuncParams(tokens, i);
    args.push(arg);
    i = arg.nextIndex;

    if (tokens[i] === ",") i++;
  }

  return {
    kind: "funcCall",
    name,
    args
  }
});