
/*---[Modola Parser] this function recursively parse component declaration ---*/
Modola.defineCore("parseComponentDec", (tokens, i) => {
  if (!Modola.parserUtils.isComponentDef(tokens, i))
    throw "Error in component declaration syntax";

  i++;
  const name = tokens[i++].value;
  if (tokens[i++].value !== "{")
    throw "Error in component declaration syntax";

  const body = {};
  while (tokens[i].value !== "}") {
    if (tokens[i].value === "component") {
      const result = Modola.core.parseComponentDec(tokens, i);
      body[result.name] = result;
      i = result.nextIndex;
      continue;
    };

    const key = tokens[i++].value;
    if (tokens[i++].value !== ":")
      throw `Expect : after property '${key}'`;

    if (key === "style") {
      if (tokens[i++].value !== "{") throw `Expect '{' after 'style' property`;
      const styles = {};
      while (tokens[i].value !== "}") {

        const key = tokens[i++].value;
        if (tokens[i].value !== ":" || tokens[i + 2].value !== ";")
          throw `Incorrect syntac of style key = ${key}`;

        styles[key] = tokens[i + 1].value;
        i += 3;
      }
      if (tokens[i].value === ";") i++;
      body[key] = styles;
      continue;
    }

    const valueToken = tokens[i++];
    let value;

    if (valueToken.type === "string" || valueToken.type === "number" || valueToken.type === "boolean") {
      value = valueToken.value;
    } else {
      throw `Invalid value for property '${key}'`;
    }

    if (tokens[i++].value !== ";")
      throw `Expected ';' after value for property '${key}'`;

    body[key] = value;
  }

  i++;

  return {
    kind: "componentDec",
    name,
    body,
    nextIndex: i,
  }

});

/*---[Modola Parser] this function recursively parse component definition ---*/
Modola.defineCore("parseComponentDef", (tokens, i) => {

});