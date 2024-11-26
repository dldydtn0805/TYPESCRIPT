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
    const [N] = inputLines[idx++].split(' ').map(Number)
    const A = inputLines[idx++].split(' ').map(Number)
    const dp = new Array(N).fill(null).map(()=>[1, 1])
    for (let i = 0; i < N; i ++) {
        for (let j = 0 ; j < i; j++) {
            if (A[i] > A[j])  {
                dp[i][0] = Math.max(dp[i][0], dp[j][0]+1)
            }
        }
    }
    for (let i = N-1; i >= 0; i--) {
        for (let j = N-1; j > i; j--) {
            if (A[i] > A[j]) {
                dp[i][1] = Math.max(dp[i][1], dp[j][1]+1)
            }
        }
    }
    let ans = 0
    for (let i = 0 ; i < N; i++) {
        ans = Math.max(ans, dp[i][0]+dp[i][1]-1)
    }
    console.log(ans)
})
