Modola.scopes = [];
Modola.scopes.push("global");
Modola.currentScopeBuff = "global:";

Modola.makeScopeName = (name) => {
  if (typeof name === "string") {
    return `${Modola.currentScope()}:${name}`;
  } else {
    Modola.killProgram();
  }
};

Modola.enterScope = (scopeName) => {
  Modola.scopes.push(scopeName);
  Modola.currentScopeBuff += `${scopeName}:`;
};

Modola.pushToCurrScope = (arg) => {
  const arrLength = Modola.scopes.length;
  if (!Modola.scopes[arrLength - 1])
    Modola.scopes[arrLength - 1] = [];

  Modola.scopes[arrLength - 1].push(arg);
}

Modola.exitScope = () => {
  const arrLength = Modola.scopes.length;
  if (arrLength > 1) {
    Modola.scopes[arrLength - 1].forEach(el => {
      if (!el.isClass && el.onDestroy) {
        Modola.events.emit(el.onDestroy);
      } else if (el.isClass && el.destructor) {
        el.destructor();
      }
    });
    Modola.scopes.pop();
    Modola.currentScopeBuff = Modola.scopes.map(name => name).join(":");
  }
};

Modola.currentScope = () => {
  return Modola.currentScopeBuff;
};
