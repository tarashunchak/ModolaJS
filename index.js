Modola.registerCommand("HelloWorld", () => { console.log("HelloWorld") });

Modola.commands.HelloWorld();

Modola.events.on("SayHi", Modula.commands.HelloWorld);
Modola.events.emit("SayHi");
Modola.events.off("SayHi", Modula.commands.HelloWorld);
Modola.events.emit("SayHi");

