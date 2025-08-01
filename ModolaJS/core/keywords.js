/*---[Modola] creating operator properties ---*/
function createOpProps(isUnary, isBinary, isAssignable, isSymetrical = true) {
  return {
    isUnary: isUnary,
    isBinary: isBinary,
    isAssignable: isAssignable,
    isSymetrical: isSymetrical
  };
}

/*---[Modola] operators that supports operators overloading ---*/
Modola.keywords.operators = {
  "+": { op: "+", props: createOpProps(true, true, false) },
  "-": { op: "-", props: createOpProps(true, true, false) },
  "*": { op: "*", props: createOpProps(false, true, false) },
  "/": { op: "/", props: createOpProps(false, true, false) },
  "%": { op: "%", props: createOpProps(false, true, false) },
  "=": { op: "=", props: createOpProps(false, true, true) },
  "==": { op: "==", props: createOpProps(false, true, false) },
  "&": { op: "&", props: createOpProps(false, true, false) },
  "&&": { op: "&&", props: createOpProps(false, true, false) },
  "|": { op: "|", props: createOpProps(false, true, false) },
  "||": { op: "||", props: createOpProps(false, true, false) },
  "!": { op: "!", props: createOpProps(true, false, false) },
  "!=": { op: "!=", props: createOpProps(false, true, false) },
  "<": { op: "<", props: createOpProps(false, true, false) },
  ">": { op: ">", props: createOpProps(false, true, false) },
  "<=": { op: "<=", props: createOpProps(false, true, false) },
  ">=": { op: ">=", props: createOpProps(false, true, false) },
  "-=": { op: "-=", props: createOpProps(true, true, true, false) },
  "+=": { op: "+=", props: createOpProps(true, true, true, false) },
  "*=": { op: "*=", props: createOpProps(true, true, true, false) },
  "/=": { op: "/=", props: createOpProps(true, true, true, false) },
  "%=": { op: "%=", props: createOpProps(true, true, true, false) },
  "++": { op: "++", props: createOpProps(true, true, true, false) },
  "--": { op: "--", props: createOpProps(true, true, true, false) }
};

Modola.keywords.modifiers = [
  `const`, `mutable`, `static`,
  `public`, `private`, `protected`,
  `global`, `local`, `dev`
];

Modola.keywords.references = "&";

/*---[Modola] needed for faster and better AST parsing (im not sure)---*/
Modola.keywords.separators = [
  `;`, `,`, `(`, `)`, `{`, `}`, `"`, `'`
];