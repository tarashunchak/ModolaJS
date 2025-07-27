Modola.typeModifiers = {
  "unique": {},
  "static": {},
  "mutable": {}
};

Modola.makeUnique = (objName) => {
  Modola.typeModifiers.unique[`${Modola.currentScope()}:${objName}`] = true;
};

Modola.makeStatic = (objName) => {
  Modola.typeModifiers.static[`${Modola.currentScope()}:${objName}`] = true;
}

Modola.makeMutable = (objName) => {
  Modola.typeModifiers.mutable[`${Modola.currentScope()}:${objName}`] = true;
}