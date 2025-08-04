Modola.defineCore("parseImportBlock", (tokens, i) => {
  if (tokens[i].value !== "import" || tokens[i + 1].value !== "{") throw "Expect '{' in import block";

  i += 2;

  const imports = [];

  while (i < tokens.length && !Modola.keywords.endOfBlock.includes(tokens[i].value)) {
    imports.push(tokens[i++].value);
  };

  return {
    kind: "importDef",
    imports,
    nextIndex: i + 1
  }
});

/*Modola.defineCore("importModuleAfterParse", (modulePath) => {
  console.log("basepath:", basePath);
  const module = new Url('.', modulePath);
  const response = fetch(module.href);
  const result = Modola.core.parseScript(response);

  return {
    kind: "moduleParse",
    result
  }
});*/