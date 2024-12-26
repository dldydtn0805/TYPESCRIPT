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
    console.log(Math.min(...inputLines.slice(3,5).map(Number))+Math.min(...inputLines.slice(0,3).map(Number))-50)
})

/*
1999
1999
100
189
100
* */
