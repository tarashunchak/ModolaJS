/*---[Modola] `Modola.defineObject` is function that find and call constructor func ---*/
Modola.defineObject = (type, args) => {
  return Modola.classes[type].constructor(args);
};



