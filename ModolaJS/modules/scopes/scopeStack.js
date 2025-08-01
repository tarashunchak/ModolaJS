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
  if (!Modola.scopes[Modola.currentScopeBuff])
    Modola.scopes[Modola.currentScopeBuff] = [];

  Modola.scopes[Modola.currentScopeBuff].push(arg);
}

Modola.exitScope = () => {
  if (Modola.scopes.length > 1) {
    Modola.scopes.pop();
    Modola.currentScopeBuff = Modola.scopes.map(name => name).join(":");
  }
};

Modola.currentScope = () => {
  return Modola.currentScopeBuff;
};
