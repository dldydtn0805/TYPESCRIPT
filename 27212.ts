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
    const [N, M, C] = (inputLines[idx++].split(' ').map(Number))
    const profit = []
    profit.push(new Array(C+1).fill(null).map(()=>0))
    for (let i = 0; i < C ; i++) {
        const W = inputLines[idx++].split(' ').map(Number)
        W.unshift(0)
        profit.push(W)
    }
    const A = inputLines[idx++].split(' ').map(Number)
    const B = inputLines[idx++].split(' ').map(Number)
    A.unshift(0)
    B.unshift(0)
    const dp = new Array(N+1).fill(null).map(()=>
        new Array(M+1).fill(null).map(()=>0)
    )

    for (let i = 1; i < N+1; i++) {
        for (let j = 1 ; j < M+1; j++) {
                dp[i][j] = Math.max(dp[i][j], dp[i-1][j], dp[i][j-1], dp[i-1][j-1] + profit[A[i]][B[j]])
        }
    }
    console.log(Math.max(...dp.map((elem) => Math.max(...elem))))
});

