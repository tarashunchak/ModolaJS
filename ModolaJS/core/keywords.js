/*---[Modola Core] creating operator properties ---*/
function createOpProps(isUnary, isBinary, isAssignable, isSymetrical = true, isOverridable = true) {
  return {
    isUnary: isUnary,
    isBinary: isBinary,
    isAssignable: isAssignable,
    isSymetrical: isSymetrical,
    isOverridable: isOverridable
  };
}

function createOpObject(op, category, precedence, props) {
  return {
    op,
    category,
    precedence,
    props
  }
};

/*---[Modola Core] operators that supports operators overloading ---*/
Modola.keywords.operators = {
  "+": createOpObject("+", ["arithmetical"], 1, createOpProps(true, true, false)),
  "-": createOpObject("-", ["arithmetical"], 1, createOpProps(true, true, false)),
  "*": createOpObject("*", ["arithmetical"], 2, createOpProps(false, true, false)),
  "/": createOpObject("/", ["arithmetical"], 2, createOpProps(false, true, false)),
  "%": createOpObject("%", ["arithmetical"], 2, createOpProps(false, true, false)),
  "=": createOpObject("=", ["assign"], 2, createOpProps(false, true, true)),
  "==": createOpObject("==", ["comparison"], 1, createOpProps(false, true, false)),
  "&": createOpObject("&", ["binary"], 1, createOpProps(false, true, false)),
  "&&": createOpObject("&&", ["comparison"], 1, createOpProps(false, true, false)),
  "|": createOpObject("|", ["binary"], 1, createOpProps(false, true, false)),
  "||": createOpObject("||", ["comparison"], 1, createOpProps(false, true, false)),
  "!": createOpObject("!", ["denial"], 1, createOpProps(true, false, false)),
  "!=": createOpObject("!=", ["comparison"], 1, createOpProps(false, true, false)),
  "<": createOpObject("<", ["comparison"], 1, createOpProps(false, true, false)),
  ">": createOpObject(">", ["comparison"], 1, createOpProps(false, true, false)),
  "<=": createOpObject("<=", ["comparison"], 1, createOpProps(false, true, false)),
  ">=": createOpObject(">=", ["comparison"], 1, createOpProps(false, true, false)),
  "-=": createOpObject("-=", ["comparison"], 1, createOpProps(true, true, true, false)),
  "+=": createOpObject("+=", ["arithmetical", "assign"], 1, createOpProps(true, true, true, false)),
  "*=": createOpObject("*=", ["arithmetical", "assign"], 1, createOpProps(true, true, true, false)),
  "/=": createOpObject("/=", ["arithmetical", "assign"], 1, createOpProps(true, true, true, false)),
  "%=": createOpObject("%=", ["arithmetical", "assign"], 1, createOpProps(true, true, true, false)),
  "++": createOpObject("++", ["arithmetical", "assign"], 1, createOpProps(true, true, true, false)),
  "--": createOpObject("--", ["arithmetical", "assign"], 1, createOpProps(true, true, true, false)),
  ":=": createOpObject(":=", ["constructable", "assign"], 1, createOpProps(false, true, true, false, false)),
  "->": createOpObject("->", ["access", "type_specifying"], 10, createOpProps(false, false, false, false, false))
};

Modola.keywords.modifiers = {
  varAndObj: ["const", "mutable", "static"],
  fieldsAndMethods: ["public", "private", "protected"],
  scopeModifiers: ["global", "local", "dev"]
};

Modola.keywords.typeDefining = [
  "type", "class", "alias", "extend"
];

Modola.keywords.references = ["&"];

/*---[Modola Core] needed for faster and better AST parsing (im not sure)---*/
Modola.keywords.separators = [
  ";", ",", "(", ")", "{", "}", "\"", "'"
];