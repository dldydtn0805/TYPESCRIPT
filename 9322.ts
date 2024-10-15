import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let idx = 0;
let inputLines: Array<string> = [];

rl.on('line', (line: string) => {
    inputLines.push(line);
});

rl.on('close', () => {
    const [T] = inputLines[idx++].split(' ').map(Number);

    for (let tc = 0 ; tc < T ; tc++) {
        const dict :{[key: string]: number} = {}
        const ans :{[key: number]: number} = {}
        const [n] = inputLines[idx++].split(' ').map(Number);
        const one = inputLines[idx++].split(' ').map(String);
        const two = inputLines[idx++].split(' ').map(String);
        const password = inputLines[idx++].split(' ').map(String);
        for (let i = 0; i < n ; i ++) {
            dict[one[i]] = i;
        }
        for (let i = 0; i < n; i ++) {
            ans[dict[two[i]]] = i
        }
        const res :Array<string> = new Array(n).fill('')
        for (let i = 0; i < n; i ++) {
            res[i] = password[ans[i]];
        }
        console.log(res.join(' '))
    }
});
