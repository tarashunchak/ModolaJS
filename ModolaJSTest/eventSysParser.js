Modola.defineCore("parseEmit", (tokens, i) => {
  if (!Modola.parserUtils.isEmit(tokens, i))
    throw "Incorrect syntax of emit call";

  const emitName = tokens[i + 2].value;

  i += 5;

  return {
    kind: `"emitDec"`,
    value: emitName,
    nextIndex: i,
  };
});

Modola.defineCore("parseOn", (tokens, i) => {

});

Modola.defineCore("parseOff", (tokens, i) => {

});