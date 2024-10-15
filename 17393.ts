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
    const [N] = inputLines[idx++].split(' ').map(Number);
    const A = inputLines[idx++].split(' ').map(Number);
    const B = inputLines[idx++].split(' ').map(Number);
    const sortedA = A.map((elem, key)=> [elem, key])
    sortedA.sort((a:Array<number>, b:Array<number>) => b[0]-a[0])
    const ans :Array<Number> = new Array(N).fill(0)
    let cur = N-1;
    for (let i = 0; i < N; i ++) {
        while (cur > 0 && B[cur] > sortedA[i][0]) {
            cur --
        }
        ans[sortedA[i][1]] = cur - sortedA[i][1];
    }
    console.log(ans.join(' '))
});
