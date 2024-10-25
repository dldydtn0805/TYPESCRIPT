import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let idx = 0;
let inputLines: Array<string> = [];
const INF = Number.MAX_SAFE_INTEGER
rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    const [N] = inputLines[idx].split(' ').map(Number)
    for (let i = N; i > 0; i--){
        let string = ''
        for (let j = 0; j < i; j++) {
            string += '*'
        }
        console.log(string)
    }
});
