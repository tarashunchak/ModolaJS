
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
    if (tokens[i].value !== ":" && tokens[i].value !== "=")
      throw `Expect : or = after property '${key}' ${i}`;

    i++;

    if (key === "size" || key === "minSize" || key === "maxSize") {
      if (tokens[i].value !== "(" || tokens[i + 4].value !== ")")
        throw `Incorrect syntax for ${key} property`;
      const width = tokens[i + 1].value;
      const height = tokens[i + 3].value;
      body[key] = { width, height };
      i += 6;
      continue;
    }

    if (key === "shadow") {
      if (tokens[i].value === 'true') {
        body[key] = {
          offsetX: 20,
          offsetY: 20,
          blur: 3,
          color: `"rgba(0, 0, 0, 0.2)"`
        };
        i += 2;
        continue;
      }
      if (tokens[i].value !== "(" || tokens[i + 8].value !== ")")
        throw `Incorrect syntax for shadow property`;
      const offsetX = tokens[i + 1].value;
      const offsetY = tokens[i + 3].value;
      const blur = tokens[i + 5].value;
      const color = tokens[i + 7].value;
      body[key] = { offsetX, offsetY, blur, color };
      i += 10;
      continue;
    }

    if (key === "position") {
      if (tokens[i].value !== "(" || tokens[i + 4].value !== ")")
        throw `Incorrect syntax for position property`;
      const x = tokens[i + 1].value;
      const y = tokens[i + 3].value;
      body[key] = { x, y };
      i += 6;
      continue;
    }

    if (Modola.parserUtils.isEmit(tokens, i)) {
      console.log("Start parse emit ");
      const res = Modola.core.parseEmit(tokens, i);
      console.log("Parsed emit ", res);
      body[key] = res;
      i = res.nextIndex;
      continue;
    }

    if (key === "style") {
      if (tokens[i++].value !== "{") throw `Expect '{' after 'style' property`;
      const styles = {};
      while (tokens[i].value !== "}") {

        const key = tokens[i++].value;
        if (tokens[i].value !== ":" && tokens[i].value !== "=" || tokens[i + 2].value !== ";")
          throw `Incorrect syntac of style key = ${key}`;

        styles[key] = tokens[i + 1].value;
        i += 3;
      }
      if (tokens[i].value === ";") i++;
      body["style"] = styles;
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
    type: "UI",
    name,
    body,
    nextIndex: i,
  }

});

/*---[Modola Parser] this function recursively parse component definition ---*/
Modola.defineCore("parseComponentDef", (tokens, i) => {

});