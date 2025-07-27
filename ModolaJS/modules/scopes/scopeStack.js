Modola.scopes = [];
Modola.scopes.push("global");

Modola.enterScope = (scopeName) => {
  Modola.scopes.push(scopeName);
};

Modola.exitScope = () => {
  if (Modola.scopes.length > 1)
    Modola.scopes.pop();
};

Modola.currentScope = () => {
  return Modola.scopes.map(scope => scope).join(`:`);
};
