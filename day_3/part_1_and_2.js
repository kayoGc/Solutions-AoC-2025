const fs = require('fs');
const path = require('path')

// solution - advent of code - day 3 - part 1 and part 2
// i lost the original part 1, but part 2 works with part 1 as well
function solution(input) {
    // part 1
    // const num_of_joltages = 2;
    // part 2
    const num_of_joltages = 12;

    let banks = input.split('\n');
    let output_joltage = 0;

    // passes in each bank
    for (const bank of banks) {
        // prevents empty lines
        if (bank.length === 0) {
            continue;
        }

        let largest_joltage = [];

        for (let j = 0; j < bank.length; j++) {

            for (let k = 0; k < num_of_joltages; k++) {

                // places the number
                if (largest_joltage.length === k) {
                    largest_joltage.push(bank[j]);
                    break;
                }

                // checks if theres a higher joltage for the k position
                if (parseInt(largest_joltage[k]) < parseInt(bank[j]) && bank.length - j >= num_of_joltages - k) {
                    largest_joltage[k] = bank[j];

                    // remove any lefting numbers
                    largest_joltage.splice(k + 1);
                    break;
                }

                if (parseInt(largest_joltage[k]) < parseInt(bank[j]) && k === num_of_joltages - 1) {
                    largest_joltage[k] = bank[j];
                }
            }

        }

        // makes a sum
        output_joltage += parseInt(largest_joltage.reduce((prevJol, currentJol) => prevJol + currentJol));
    } 

    console.log(output_joltage);
}

// reads the input
// fs.readFile(path.resolve(__dirname, 'example'), 'utf-8', (err, data) => {
fs.readFile(path.resolve(__dirname, 'input'), 'utf-8', (err, data) => {

    if (err) {
        console.error("Error reading the input:", err);
        return;
    }

    solution(data);
})