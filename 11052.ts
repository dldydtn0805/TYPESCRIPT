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
    const P = inputLines[idx++].split(' ').map(Number);
    const dp :Array<number> = new Array(N).fill(0);
    dp[0] = P[0]
    for (let i = 1; i < N; i ++) {
        dp[i] = P[i]
        for (let j = 0; j < i ; j ++) {
            dp[i] = Math.max(dp[i-j-1] + P[j], dp[i])
        }
    }
    console.log(dp[N-1])
});

/*
12
1 1 6 8 11 1 1 1 1 1 1 1
25
* */
