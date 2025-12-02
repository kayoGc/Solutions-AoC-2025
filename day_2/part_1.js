const fs = require('fs');
const path = require('path')

// solution - advent of code - day 2 - part 1
function solution(input) {
    let input_interable = input.split(',');
    let sum = 0;

    for (const range of input_interable) {
        let separator = range.split('-');
        
        for (let i = parseInt(separator[0]); i <= parseInt(separator[1]); i++) {

            let pattern = '';
            let string = i.toString();

            for (const char of string) {
                pattern += char;

                if (pattern === string.slice(pattern.length)) {
                    sum += parseInt(string);
                }
            }
            
        }
    }

    console.log(`The sum is: ${sum}`);
}

// reads the input
fs.readFile(path.resolve(__dirname, 'input'), 'utf-8', (err, data) => {

    if (err) {
        console.error("Error reading the input:", err);
        return;
    }

    solution(data);
})