Modola.defineCore("parseJsonAn", (tokens, i) => {
  let jsonAn = null;
  if (tokens[i].value === "json" && tokens[i + 1].value === ":" && tokens[i + 3].value === ";") {
    jsonAn = tokens[i + 2].value;
    i += 4;
  }
  return {
    jsonAn,
    nextIndex: i
  };
});

Modola.defineCore("parseClassBlock", (tokens, i) => {
  const header = Modola.core.parseClassHeader(tokens, i);
  i = header.nextIndex;
  const body = [];
  let braceCount = 1;

  while (i < tokens.length && braceCount > 0) {
    if (tokens[i].value === "{") braceCount++;
    if (endOfBlock.includes(tokens[i].value)) braceCount--;

    if (Modola.keywords.modifiers.fieldsAndMethods.includes(tokens[i].value) && tokens[i + 2].value === ":") {
      const field = Modola.core.parseClassField(tokens, i);
      body.push(field);
      i = field.nextIndex;
      continue;
    }
    /*---[Modola] methods parsing ---*/
    if (Modola.keywords.modifiers.fieldsAndMethods.includes(tokens[i].value) && tokens[i + 2].value === "(") {
      const method = Modola.core.parseClassMethod(tokens, i);
      body.push(method);
      i = method.nextIndex;
      continue;
    }

    i++;
  }

  return {
    kind: "classDef",
    class: {
      header,
      body
    },
    nextIndex: i
  };
});

Modola.defineCore("parseClassHeader", (tokens, i) => {
  const scope = tokens[i++].value;
  if (!Modola.keywords.modifiers.scopeModifiers.includes(scope)) throw "Expect scope specifier in class header definition";

  const _tmp = tokens[i++].value;
  if (_tmp !== "type") throw "Expect 'type' keyword in class header definition";

  const name = tokens[i++].value;
  if (!name || name === "class") throw "Expect class name in class header definition";

  const type = tokens[i++].value;
  if (type !== "class") throw "Expect 'class' keyword in class header parsing";

  const endOfDef = tokens[i++].value;
  let extend = null;
  if (endOfDef === "(") {
    extend = tokens[i++].value;
    if (!extend || tokens[i++].value === ")") throw "Incorrect inheritance syntax";
  }

  return {
    kind: "classHeader",
    scope,
    name,
    type,
    extend,
    nextIndex: i
  }
});

Modola.defineCore("parseClassField", (tokens, i) => {
  console.log("field parsing");
  const access = tokens[i++].value;
  if (!Modola.keywords.modifiers.fieldsAndMethods.includes(access)) throw "Expect access specifier in class field definition";

  const name = tokens[i++].value;
  if (!name || tokens[i++].value !== ':') throw "Expect type name for class field";

  const type = tokens[i++].value;
  if (!type) throw "Expect type name for class field";

  let defValue = null;
  if (tokens[i].value === ":=") {
    defValue = tokens[i + 1].value;
    i += 2;
  }

  const clearType = type.trim();

  const parsedJsonAn = Modola.core.parseJsonAn(tokens, i);
  const jsonAn = parsedJsonAn.jsonAn;
  i = parsedJsonAn.nextIndex;

  return {
    kind: "classField",
    access,
    name,
    type: clearType,
    defValue,
    jsonAn,
    nextIndex: i
  }
});

Modola.defineCore("parseClassMethod", (tokens, i) => {
  const access = tokens[i++].value;
  if (!Modola.keywords.modifiers.fieldsAndMethods.includes(access)) throw "Expected access specifier for method";

  const name = tokens[i++].value;
  if (!name || tokens[i++].value !== "(") throw "Expected method name";

  const args = [];
  while (tokens[i].value !== ")") {
    let arg = Modola.core.parseFuncArgs(tokens, i);
    args.push(arg);
    i = arg.nextIndex;
  }

  let returnType = null;
  if (tokens[i].value === "->" && Modola.typesDescription[tokens[i + 1].value]) {
    returnType = tokens[i + 1].value;
  } else if (name === "constructor") {
    returnType = "void";
  } else {
    throw "Expect return type of function";
  }

  const body = [];

  console.log("parseClassContents");

  return {
    kind: "classMethodDef",
    access,
    returnType,
    name,
    args,
    body,
    nextIndex: i
  }
});