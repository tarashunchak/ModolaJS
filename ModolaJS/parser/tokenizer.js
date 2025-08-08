Modola.tokenizeScript = (script) => {
    const tokens = [];
    let current = 0;
    let line = 1;
    let column = 0;

    const KEYWORDS = ['global', 'local', 'dev', 'const', 'type', 'class', 'enum', 'alias'
        , 'public', 'private', 'return', 'import', 'operator', '=>'];

    const MULTICHAR_OPERATORS = Object.keys(Modola.keywords.operators);
    const SINGLECHAR_OPERATORS = "=+-*/:;{}()[],.";

    const isAlpha = (char) => /[a-zA-Z_]/.test(char);
    const isAlphaNumeric = (char) => /[a-zA-Z0-9_]/.test(char);
    const isDigit = (char) => /[0-9]/.test(char);
    const isWhitespace = (char) => /\s/.test(char);

    while (current < script.length) {
        /*--- [Modola Tokenizer] unsafe block handling ---*/
        if (script.slice(current, current + 6) === 'unsafe' && script[current + 6] && /\s|\{/.test(script[current + 6])) {
            let startLine = line;
            let startColumn = column;

            current += 6;
            column += 6;

            while (isWhitespace(script[current])) {
                if (script[current] === '\n') {
                    line++;
                    column = 0;
                } else {
                    column++;
                }
                current++;
            }

            if (script[current] !== '{') {
                throw new Error(`Expected '{' after 'unsafe' at line ${line}`);
            }

            current++; // skip '{'
            column++;

            let rawCode = '';
            let braceCount = 1;

            while (current < script.length && braceCount > 0) {
                let ch = script[current];

                if (ch === '{') {
                    braceCount++;
                } else if (ch === '}') {
                    braceCount--;
                    if (braceCount === 0) {
                        current++; // skip final '}'
                        column++;
                        break;
                    }
                }

                if (ch === '\n') {
                    line++;
                    column = 0;
                } else {
                    column++;
                }

                if (braceCount > 0) {
                    rawCode += ch;
                    current++;
                }
            }

            tokens.push({
                type: 'unsafeBlock',
                value: rawCode.trim(),
                position: { line: startLine, column: startColumn }
            });

            continue;
        }

        let char = script[current];
        column++;

        /*---[Modola Tokenizer] whitespaces ---*/
        if (isWhitespace(char)) {
            if (char === '\n') {
                line++;
                column = 0;
            }
            current++;
            continue;
        }

        /*---[Modola Tokenizer] multichar ops ---*/
        let twoChar = script.slice(current, current + 2);
        if (MULTICHAR_OPERATORS.includes(twoChar)) {
            tokens.push({ type: 'operator', value: twoChar, position: { line, column } });
            current += 2;
            column++;
            continue;
        }

        /*---[Modola Tokenizer] single char tokens ---*/
        if (SINGLECHAR_OPERATORS.includes(char)) {
            const typeMap = {
                '(': 'lparen',
                ')': 'rparen',
                '{': 'lbrace',
                '}': 'rbrace',
                '[': 'lsquare',
                ']': 'rsquare',
                ';': 'semicolon',
                ',': 'comma',
                '.': 'dot',
                '+': 'plus',
                '-': 'minus',
                '*': 'asterisk',
                '/': 'slash',
                '=': 'assign',
                ':': 'colon',
                '&': 'ampersand',
                '>': 'bigger',
                '<': 'less',
            };
            tokens.push({ type: typeMap[char] || 'symbol', value: char, position: { line, column } });
            current++;
            continue;
        }

        /*---[Modola Tokenizer] string tokens ---*/
        if (char === '"' || char === "'") {
            let value = '"';
            current++;
            char = script[current];
            column++;
            while (char !== '"' || char === "'" && current < script.length) {
                if (char === '\n') {
                    throw new Error(`Unterminated string on line ${line}`);
                }
                value += char;
                current++;
                column++;
                char = script[current];
            }
            if (char !== '"') throw new Error(`Unterminated string on line ${line}`);
            current++;
            column++;
            value += '"';
            tokens.push({ type: 'string', value, position: { line, column } });
            continue;
        }

        /*---[Modola Tokenizer] numbers ---*/
        if (isDigit(char)) {
            let value = '';
            while (isDigit(char)) {
                value += char;
                char = script[++current];
                column++;
            }

            if (char === '.') {
                value += char;
                char = script[++current];
                column++;
                while (isDigit(char)) {
                    value += char;
                    char = script[++current];
                    column++;
                }
            }

            tokens.push({ type: 'number', value, position: { line, column } });
            continue;
        }

        /*---[Modola Tokenizer] identifiers and keywords ---*/
        if (isAlpha(char)) {
            let value = '';

            while (isAlphaNumeric(char)) {
                value += char;
                char = script[++current];
                column++;
            }

            let type = null;
            if (KEYWORDS.includes(value))
                type = 'keyword';
            else if (value === "true" || value === "false")
                type = 'boolean';
            else
                type = 'identifier';

            tokens.push({ type, value, position: { line, column } });
            continue;
        }

        /*---[Modola Tokenizer] unknown values handling ---*/
        throw new Error(`Unknown character '${char}' at line ${line}, column ${column}`);
    }

    Modola.tokens = tokens;
    console.log(tokens);
    return tokens;
};
