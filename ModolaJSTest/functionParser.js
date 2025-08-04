

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


  console.log(`i before arrow ${i}`);
  i++;

  let returnType = null;

  if (tokens[i].value === "->" && Modola.typesDescription[tokens[i + 1].value]) {
    console.log("success return type handling ", tokens[i + 1].value);
    returnType = tokens[i + 1].value;
    i += 2;
  } else {
    returnType = "void";
  }


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

  console.log(`i before { ${i - 1}`);
  if (tokens[i++].value !== "{") throw "Expect  '{' after function header";

  const body = [];
  let returnValues = null;
  let braceCount = 1;

  let old_i = 0;
  while (i < tokens.length && braceCount > 0) {
    if (i === old_i) {
      console.log("i === old_i", i);
      break;
    }
    console.log("i in this iteration: ", i);
    let token = tokens[i].value;

    if (token === ";") {
      i++;
      continue;
    }

    if (token === "{") {
      braceCount++;
      i++;
      continue;
    }

    if (Modola.keywords.endOfBlock.includes(token)) {
      braceCount--;
      i++;
      continue;
    }

    if (Modola.parserUtils.isVariableDef(tokens, i)) {
      const variable = Modola.core.parseVariableDef(tokens, i);
      if (variable) {
        body.push(variable);
        i = variable.nextIndex;
      } else {
        i++;
      }
      continue;
    } else if (Modola.parserUtils.isConstantDef(tokens, i)) {
      const constant = Modola.core.parseConstantDef(tokens, i);
      if (constant) {
        body.push(constant);
        i = constant.nextIndex;
      } else {
        i++;
      }
      continue;
    }

    if (tokens[i].value === "return") {
      console.log("return on i ", i);
      if (tokens[i + 2].value !== ";") {
        console.log('cheking return value');
        i++;
      } else {
        returnValues = tokens[i + 1].value;
        i += 2;
      }
      continue;
    };

    i++;
  }

  return {
    kind: "funcDef",
    func: {
      header,
      body,
      returnValues
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
