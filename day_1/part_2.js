const fs = require('fs');
const path = require('path')

// solution - advent of code - day 1 - part 2
function solution(input, current_number = 50) {
    const input_arr = input.split('\n');

    let password = 0;

    for (const input of input_arr) {
        const char = input[0];
        let number = parseInt(input.substring(1));

        for (let i = 0; i < number; i++) {

            if (char === 'L') {
                current_number--;
                
                if (current_number < 0) {
                    current_number = 99;
                } 
            }

            if (char === 'R') {
                current_number++;

                if (current_number > 99) {
                    current_number = 0;
                }
            }

            if (current_number === 0) {
                password++;
            }
        }
        
    }

    console.log(`The password is: ${password}`);
}

// reads the input
fs.readFile(path.resolve(__dirname, 'input'), 'utf-8', (err, data) => {

    if (err) {
        console.error("Error reading the input:", err);
        return;
    }

    solution(data);
})