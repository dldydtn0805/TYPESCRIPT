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
    const arr = inputLines[idx++].split(' ').map(Number)
    arr.sort((A,B)=>A-B)
    console.log(arr[0], arr[1], arr[2])
})
