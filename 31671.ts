import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let idx = 0;
let inputLines = [];
const INF = Number.MAX_SAFE_INTEGER
const MOD = 10**9+7

rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    const [N, M] = inputLines[idx++].split(' ').map(Number)
    const teachers = []
    const dp = new Array(N+1).fill(null).map(()=>
        new Array(2*N+1).fill(null).map(()=>-1)
    )
    for (let i = 0 ; i < M ; i ++) {
        const [x,y] = inputLines[idx++].split(' ').map(Number)
        dp[y][x] = -2
    }
    dp[0][0] = 0
    for (let j = 0 ; j < 2*N+1; j++) {
        for (let i = 0 ; i < N+1; i++) {
            if (dp[i][j] !== -2) {
                if (i-1 >= 0 && j-1 >= 0 && dp[i-1][j-1] !== -1 &&  dp[i-1][j-1] !== -2) {
                    dp[i][j] = Math.max(dp[i-1][j-1], i)
                }
                if (i+1 < N+1 && j-1 >= 0 && dp[i+1][j-1] !== -1 && dp[i+1][j-1] !== -2) {
                    dp[i][j] = Math.max(dp[i+1][j-1], i)
                }
            }
        }
    }
    console.log(dp[0][2*N] === -2 ? -1 : dp[0][2*N])
})


/*
3 1
1 1
* */
