const fs = require('fs');
const path = require('path')

// solution - advent of code - day 4 - part 1
function solution(input) {
    const ar_diagram = input.split('\n');
    let accessible_papers_count = 0;

    // i = line
    for (let i = 0; i < ar_diagram.length; i++) {

        // skip empty lines (there's always one in the end of the inputs for some reason)
        if (ar_diagram[i].length === 0) {
            continue;
        }

        // j = position
        for (let j = 0; j < ar_diagram[i].length; j++) {

            // ignore empty spaces
            if (ar_diagram[i][j] === '.') {
                continue;
            }

            if (is_paper_accessible(4, ar_diagram, i, j)) {
                accessible_papers_count++;
            }
        }
    }

    console.log(accessible_papers_count);
}

function is_paper_accessible(qt_paper, ar_diagram, line, position) {
    let counter = 0;

    // analize the space above and below
    let start_index = position === 0 ? 0 : position - 1;

    for (let k = start_index; k <= position + 1; k++) {
        // above
        if (line > 0 && ar_diagram[line - 1][k] === "@") {
            counter++;
        }
        // below
        if (line < ar_diagram.length - 1 && ar_diagram[line + 1][k] === "@") {
            counter++;
        }
    }

    // analize sides
    // left
    if (position > 0 && ar_diagram[line][position - 1] === '@') {
        counter++;
    }
    // right
    if (position < ar_diagram[line].length && ar_diagram[line][position + 1] === '@') {
        counter++;
    }

    return counter < qt_paper;
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