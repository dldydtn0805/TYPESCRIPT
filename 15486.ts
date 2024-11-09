import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let idx = 0;
let inputLines = [];
rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    const [N] = inputLines[idx++].split(' ').map(Number)
    const profit = []
    profit.push([0, 0])
    for (let i = 0 ; i < N ; i ++) {
        const [T, P] = inputLines[idx++].split(' ').map(Number)
        profit.push([T, P])
    }
    const dp = new Array(N+2).fill(null).map(()=>0)
    for (let i = 1; i < dp.length; i++) {
        dp[i] = Math.max(dp[i-1], dp[i])
        if (i < profit.length && i+profit[i][0] < dp.length) {
            dp[i+profit[i][0]] = Math.max(dp[i+profit[i][0]], dp[i] + profit[i][1])
        }
    }
    console.log(dp[N+1])
});
