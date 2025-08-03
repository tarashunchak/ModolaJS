/*Modola.defineOperator(["int", "int"], "int", "+", (a, b) => {
  return a.value + b.value;
});

Modola.defineOperator(["float", "float"], "float", "+", (a, b) => {
  return a.value + b.value;
});*/

/*global operator + (x: int, y: int) -> int {

}

global type MyClass class {
  private first_name:= int @json:"first_name";
  private last_name:= int @json:"last_name";

  public constructor(fName: string, lName: string) {
    this->first_name = fName;
    this->last_name = lName;
  }

  public printPerson()->void{
    print(`First name: ${this->first_name} 
          Last name: ${this->last_name}`);
  }
}


local type MyClassAl alias MyClass;

global type MyEnum enum {

}

dev someVar: string:= MyClass.constructor();*/



Modola.defineOperator({
  args: {
    "a": { type: "int", default: undefined },
    "b": { type: "int", default: undefined }
  },
  returnType: "int",
  opName: "+",
  body: (args) => {
    return args["a"].value + args["b"].value;
  }
});

Modola.defineOperator({
  args: {
    "a": { type: "float", default: undefined },
    "b": { type: "int", default: undefined }
  },
  returnType: "float",
  opName: "+",
  body: (args) => {
    console.log("op+ ", args["a"].value, args["b"].value);
    return {
      type: "float",
      value: args["a"].value + args["b"].value,
      name: undefined
    };
  }
});

Modola.defineOperator({
  args: {
    "a": { type: "float", default: undefined },
    "b": { type: "float", default: undefined }
  },
  returnType: "float",
  opName: "+",
  body: (args) => {
    return args["a"].value + args["b"].value;
  }
});


Modola.defineOperator({
  args: {
    "a": { type: "array", default: undefined },
    "b": { type: "array", default: undefined }
  },
  returnType: "array",
  opName: "+",
  body: (args) => {
    if (Array.isArray(args["a"].value) && Array.isArray(args["b"].value)) {
      let temp = args["a"].value;
      for (let i = 0; i < args["a"].value.length; i++) {
        temp.push(args["b"].value[i]);
      }
      return temp;
    }
  }
});

/*Modola.defineOperator(["array", "array"], "array", "+", (a, b) => {
  console.log("operator+:array");
  if (Array.isArray(a) && Array.isArray(b)) {
    let temp = a;
    for (let i = 0; i < b.length; i++) {
      temp.push(b[i]);
    }
    return temp;
  } else {
    console.log(`[Modola] operator+(${typeof a}, ${typeof b}) is not defined`);
  }
});*/