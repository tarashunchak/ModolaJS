Modola.defineLocal("tokenize", (input) => {
    const tokens = [];
    let current = 0;

    while (current < input.lenght) {
        let char = input[current];

        // Skipping "space"-s
        if (/\s/.test(char)) {
            current++;
            continue;
        }

        //Braces
        if (char === '(' || char === ')') {
            tokens.push(char);
            current++;
            continue;
        }

        //Comma
        if (char === ',') {
            tokens.push(',');
            current++;
            continue;
        }

        //stringrows
        if (char === '"') {
            let value = '';
            char = input[++current];
            while (char !== '"' && current < input.length) {
                value += char;
                char = input[++current];
            }
            tokens.push(`"${value}"`)
            current++;
            continue;
        }

        //decimals
        if (/[a-zA-Z_]/.test(char)) {
            let value = '';
            while (/[a-zA-Z0-9_]/.test(char)) {
                value += char;
                char = input[++current];
            }
            tokens.push(value);
            continue;
        }

        throw new Error("Unknown symbol: " + char);

    }

    return tokens;
});