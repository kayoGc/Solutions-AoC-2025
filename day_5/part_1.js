const fs = require('fs');
const path = require('path')

// solution - advent of code - day 4 - part 1
function solution(input) {
    // input array
    const ar_input = input.split('\n');
    // gets where the separator is
    const separator_i = ar_input.findIndex((data) => data === '');

    if (separator_i === -1) {
        throw new Error("Theres no separetor in the input.");
    }

    // gets the fresh ranges and the ingredients ids
    const fresh_ranges = ar_input.slice(0, separator_i);
    const ingredients_ids = ar_input.slice(separator_i + 1);

    let fresh_count = 0;
    for (const id of ingredients_ids) {

        // skip empty line
        if (id === '') {
            continue;
        }

        for (const range of fresh_ranges) {
            // 0 - start, 1 - end
            const ar_range = range.split('-').map((num) => parseInt(num));

            // if the id is outside the range
            if (parseInt(id) < ar_range[0] || parseInt(id) > ar_range[1]) {
                continue;
            }

            fresh_count++;
            break;
        }
    }

    console.log(fresh_count);
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