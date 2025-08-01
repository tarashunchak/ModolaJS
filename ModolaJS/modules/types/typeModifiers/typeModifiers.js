Modola.typeModifiers = {
  "unique": {},
  "static": {},
  "mutable": {}
};

Modola.makeUnique = (objName) => {
  Modola.typeModifiers.unique[Modola.makeScopeName(objName)] = true;
};

Modola.makeStatic = (objName) => {
  Modola.typeModifiers.static[Modola.makeScopeName(objName)] = true;
};

Modola.makeMutable = (objName) => {
  Modola.typeModifiers.mutable[Modola.makeScopeName(objName)] = true;
};