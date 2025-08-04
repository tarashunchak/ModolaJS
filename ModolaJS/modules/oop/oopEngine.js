Modola.classes = {};

function isCorrectExtend(extend) {
    if (extend) {
        let classNames = Object.keys(extend);
        for (let className of classNames) {
            console.log(className);
            if (!Modola.classes[className] ||
                !Modola.classes[className].meta.isExtendible)
                return false;
        }
        return true;
    }
    return true;
};

/*---[Modola] `meta` arg - is meta info about class, like inherit off classes, is template
 , or cannot be parent of another classes ---*/

Modola.defineClass = (args /* object*/) => {

    if (!args || !args.className) {
        console.error(`[Modola] cannot define class without class name.`);
        Modola.killProgram();
        return;
    }

    let className = args.className;
    let fields = args.fields || {};
    let extend = args.extend || {};
    let methods = args.methods || {};
    let constructors = args.constructors || [];
    let destructor = args.destructor || {};
    let meta = args.meta || Modola.defaultValues.classMetaValues;

    if (className.trim() && typeof className === "string") {
        if (Modola.classes[className]) return;
        else {

            /*---[Modola] `fields` arg should be a "object" type 
            and contain at least "name" and "value" properties ---*/
            if (typeof fields !== "object" && typeof methods !== "object") {
                console.log(`[Modola] unknown format for class definition`);
                Modola.killProgram();
                return;
            }

            if (!isCorrectExtend(extend)) {
                console.error(`[Modola] parent class for ${className} is not defined`);
                Modola.killProgram();
                return;
            }

            Modola.classes[className] = {
                /*---[Modola] `type` - is unique typename for this class ---*/
                isClass: true,
                scope: args.scope,
                extends: extend,
                type: className,
                meta: meta,
                getName: args.getName,
                fields: {},
                methods: {},
                constructors: [],
                destructor: destructor || {}//only one dtor is allowed
            };

            for (const [field, value] of Object.entries(fields)) {
                Modola.classes[className].fields[field] = value;
            };

            for (const [method, body] of Object.entries(methods)) {
                Modola.classes[className][method] = body;
            };

            for (const ctor of constructors) {
                Modola.classes[className].constructors.push(ctor);
            }

            if (!constructors.length) {
                //creating ctor by default

            };

            if (!destructor) {
                //creating dtor by default
            };

            // function that choose suitable version of constructor
            Modola.classes[className].constructor = (args = []) => {
                if (!args.length) {
                    if (extend) {
                        for (const [parentClass, defualt] of Object.entries(extend)) {
                            Modola.classes[parentClass].constructor();
                        }
                    }
                }

                const ctors = Modola.classes[className].constructors;
                for (let i = 0; i < ctors.length; i++) {
                    console.log("constructor cheked");
                    if (Modola.isSameArgsType(ctors[i].args, args)) {
                        console.log(`constructor for class ${className} called`);
                        return ctors[i].constructor.body(...args);
                    }
                }


                return;
            };

            console.log("class ", className, " defined");
        }
    }
};