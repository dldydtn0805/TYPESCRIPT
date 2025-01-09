import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let idx = 0;
let inputLines :Array<string> = [];
const INF = Number.MAX_SAFE_INTEGER
rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    const [T] = inputLines[idx++].split(' ').map(Number)
    for (let i = 0 ; i < T; i++) {

        const [X, Y] = inputLines[idx++].split(' ').map(Number)
        console.log(X+Y)
    }

})


/*
4
-100 100
2 3
0 110101
-1000000000 1
* */
