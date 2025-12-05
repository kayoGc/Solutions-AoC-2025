const fs = require('fs');
const path = require('path')

// solution - advent of code - day 4 - part 1
function solution(input) {
    const ar_diagram = input.split('\n');
    let accessible_papers_count = 0;
    let were_any_paper_removed = false;

    // the solution searchs once more for accessible papers if there was any removed
    do {
        were_any_paper_removed = false;

        // i = line
        for (let i = 0; i < ar_diagram.length; i++) {
    
            // skip empty lines (there's always one in the end of the inputs for some reason)
            if (ar_diagram[i].length === 0) {
                continue;
            }

            // skip empty lines
            if (!ar_diagram[i].includes('@')) {
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
                    
                    remove_paper(ar_diagram, i, j);

                    were_any_paper_removed = true;
                }
            }
        }    
    } while (were_any_paper_removed)

    console.log(accessible_papers_count);
}

// returns a boolean indicating if the paper is accessible or not
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

// removes the paper
function remove_paper(ar_diagram, line, position) {
    let str = ar_diagram[line].substring(0, position);
    str += '.';
    str += ar_diagram[line].substring(position + 1);
    
    ar_diagram[line] = str;
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