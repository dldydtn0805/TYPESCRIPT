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
    for (let i = 0; i < inputLines.length-1; i++) {
        const [name, age, weight] = inputLines[idx++].split(' ').map(String)
        if (Number(age) > 17 || Number(weight) >= 80) {console.log(name, 'Senior')}
        else {console.log(name, 'Junior')}
    }
});
