const fs = require('fs');
const path = require('path')

// solution - advent of code - day 4 - part 1
function solution(input) {
    // input array
    const ar_input = input.split('\n');
    // gets where the separator is
    const separator_i = ar_input.findIndex((data) => data === '');

    if (separator_i === -1) {
        throw new Error("Theres no separator in the input.");
    }

    // gets the fresh
    let fresh_ranges = ar_input.slice(0, separator_i)
        .map((range) => 
            range.split('-')
            .map((num) => parseInt(num))
        );

    fresh_ranges = fresh_ranges.sort((a, b) => a[0] - b[0]);
        
    let ids_count = 0;
    let skip = 0;
    for (let i = 0; i < fresh_ranges.length; i++) {
        const range_a = fresh_ranges[i];
        let next_i = i + 1;

        if (fresh_ranges[next_i] !== undefined) {
            
            // if the next one is exactly like the current one
            if (fresh_ranges[next_i][0] === range_a[0] && fresh_ranges[next_i][1] === range_a[1]) {
                continue;
            }

            skip = 0;
            // checks for skipable ranges
            while (fresh_ranges[next_i] && fresh_ranges[next_i][1] < range_a[1]) {
                skip++;
                next_i++;
            }

            if (fresh_ranges[next_i][0] <= range_a[1]) {
                fresh_ranges[next_i][0] = range_a[1] + 1;
            }
        }

        console.log(range_a);
        ids_count += (range_a[1] + 1) - range_a[0];

        i += skip;
    }

    console.log(ids_count);
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