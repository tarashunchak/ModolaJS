



/*--[Modola] code from "./file1.modola" ---*/


Modola.defineVariable("string", "file1Var", hello world);


Modola.defineVariable("int", "x", 500);




Modola.defineClass(
        {
          className : "MyClass",
          extend : "Parent",
          scope: "global",
          fields : {
ccc : {
              type: "float",
              default: 40.0,
              json: "first_name",
              access: "public",
            }},
          methods : {
myMethod : {
            returnType: "float",
            args: {"ccb" : {
              modifier: undefined
              type: "string",
              default: null
              }},
            access: "private",
          }},
          constructors: [
],
          destructor: null,
        }
        );