import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let idx = 0;
let inputLines: Array<string> = [];

rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    const [N] = inputLines[idx++].split(' ').map(Number);
    let cnt :number = 0;
    for (let i = N-1; i >= 1; i --) {
        cnt += 1;
        if (N % i === 0) {break}
    }
    console.log(cnt)
});
