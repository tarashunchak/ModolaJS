/*--[Modola] code from ""./file1.modola"" ---*/
Modola.ui.createButton("Button2", null, {
    style : {

    color : "green"
  
},
  });
Modola.defineGlobalConstant("x", {
              scope: "global",
              type: "int",
              value: 500,
            })
;console.log(Modola.globalConstants["x"].value);
Modola.ui.createButton("Add Customer", null, {
    style : {

    color : "white",
backgroundColor : "red"
  
},
  });
Modola.defineClass(
        {
          className : "MyClass",
          extend : "null",
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
              modifier: undefined,
              type: "string",
              default: null,
              }},
            access: "private",
          }},
          constructors: [
],
          destructor: null,
        }
        );
Modola.defineFunction({
          name: "funcSome",
          scope: "global",
          returnType: "void",
          args: {},
          body: {
},
        });