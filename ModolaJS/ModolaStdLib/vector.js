/*---[Modola] future part of Modola standart lib ---*/
Modola.defineClass({
  className: "Vector",
  extend: {},
  fields: {
    "buff": Modola.defineVariable("array", []),
    "size": Modola.defineVariable("int", 0),
    "cap": Modola.defineVariable("int", 0),
  },
  methods: {
    "push_back": (val) => {
      Modola.enterScope("vector:push_back");

      Modola.exitScope();
    },
    "pop_back": () => {
      Modola.enterScope("vector:pop_back");

      Modola.exitScope();
    },
    "reserve": () => {
      Modola.enterScope("vector:reserve");
      Modola.exitScope();
    }
  },
  constructors: [],
  destructor: {}
});