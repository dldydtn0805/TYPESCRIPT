import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let idx = 0;
let inputLines = [];
const INF = Number.MAX_SAFE_INTEGER
rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {

    const sudoku = []
    for (let i = 0 ; i < 9 ; i ++) {
        sudoku.push(inputLines[idx++].split(' ').map(Number))
    }

    const getRepetition = (x, y) => {
        const repetition = new Set
        for (let i = 3*Math.floor(x/3); i < 3*(Math.floor(x/3)+1); i++) {
            for (let j = 3*Math.floor(y/3); j < 3*(Math.floor(y/3)+1); j++) {
                repetition.add(sudoku[i][j])
            }
        }
        for (let i = 0; i < 9; i ++) {
            repetition.add(sudoku[x][i])
            repetition.add(sudoku[i][y])
        }
        return [1,2,3,4,5,6,7,8,9].filter((elem)=>!repetition.has(elem))
    }

    const backtracking = (ci, cj) => {
        if (ci === 9) {
            for (let i = 0 ; i < 9 ; i ++) {
                console.log(sudoku[i].join(' '))
            }
            process.exit()
        }
        if (sudoku[ci][cj] !== 0) {
            if (cj+1 < 9) {
                backtracking(ci, cj+1)
            } else {
                backtracking(ci+1, 0)
            }
        } else {
            const res = getRepetition(ci, cj)
            for (let number of res) {
                sudoku[ci][cj] = number
                if (cj+1 < 9) {
                    backtracking(ci, cj+1)
                } else {
                    backtracking(ci+1, 0)
                }
                sudoku[ci][cj] = 0
            }
        }
    }

    backtracking(0, 0)
});
