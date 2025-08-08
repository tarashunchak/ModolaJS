/*--[Modola] code from ""./file1.modola"" ---*/
Modola.ui.createWidget("", null, 
    {
  text : "",
id : "loginPageWidget",
style:  {
  position : "absolute",
width : "100%",
height : "100%",
borderRadius : "0px",
backgroundColor : "rgba(225, 225, 225, 0.2)"
  }
  }
  );
Modola.ui.createWidget(undefined, null, 
    {
  id : "secondWidget",
appendTo : "#loginPageWidget",
align : "leftCenter",
position:  {
  x : 100,
y : 40
  },
maxSize:  {
  width : 1000,
height : 300
  },
minSize:  {
  width : 400,
height : 300
  },
draggable : true,
shadow:  {
  offsetX : 20,
offsetY : 20,
blur : 3,
color : "rgba(0, 0, 0, 0.2)"
  },
style:  {
  backgroundColor : "rgba(20, 180, 190, 0.4)",
borderRadius : "5px"
  }
  }
  );
Modola.ui.createDialog(undefined, null, 
    {
  id : "firstDialog",
appendTo : "#loginPageWidget",
align : "rightCenter",
position:  {
  x : 1000,
y : 0
  },
maxSize:  {
  width : 1000,
height : 300
  },
minSize:  {
  width : 400,
height : 300
  },
draggable : true,
onApply:  {
  kind : "emitDec",
value : "applyBtn",
nextIndex : 150
  },
onDeny:  {
  kind : "emitDec",
value : "denyBtn",
nextIndex : 157
  }
  }
  );
Modola.defineGlobalConstant("x", {
              scope: "global",
              type: "int",
              value: 500,
              isConst: true,
            })
console.log(Modola.globalConstants["x"].value);
    Modola.events.on("log-in-btn-clicked", ()=>{
        console.log("Log In button click handler");
    });

    Modola.events.on("toggle-btn-changed", ()=>{
        const mainWidget = document.getElementById("loginPageWidget");
        const toggleLabel = document.getElementById("toggleLabel");
        if(toggleLabel.isActive()){
            mainWidget.style.backgroundColor = "#ffddcc";
        }else{
            mainWidget.style.backgroundColor = "white";
        }
    });
Modola.ui.createInput(undefined, null, 
    {
  placeholder : "Username",
appendTo : "#loginPageWidget",
style:  {
  width : "250px"
  }
  }
  );
Modola.ui.createInput(undefined, null, 
    {
  placeholder : "Password",
id : "passInput",
draggable : true,
appendTo : "#loginPageWidget",
type : "password",
size:  {
  width : 400,
height : 40
  }
  }
  );
Modola.defineGlobalComponent("UI", "addCustBtn", Modola.ui.createButton("Log In", null, 
    {
  text : "Log In",
align : "center",
draggable : true,
onClick:  {
  kind : "emitDec",
value : "log-in-btn-clicked",
nextIndex : 111
  },
style:  {
  color : "black"
  }
  }
  ))
Modola.ui.createToggleButton("Log In", null, 
    {
  text : "Log In",
appendTo : "#secondWidget",
onChange:  {
  kind : "emitDec",
value : "toggle-btn-changed",
nextIndex : 140
  },
align : "center",
style:  {
  backgroundColor : "rgb(121, 240, 222)"
  }
  }
  );
Modola.defineClass(
        {
          className : "MyClass",
          extend : "null",
          scope: "global",
          fields : {
ccc : {
              type: "float",
              default: 40.0,
              json: null,
              access: "public",
            }},
          methods : {
myMethod : {
            returnType: "float",
            args: {"ccb" : {
              modifier: "const",
              type: "string",
              default: null,
              }},
            access: "private",
          },
getCCC : {
            returnType: "float",
            args: {},
            access: "public",
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