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
    // N : 총 개수 / M : 한 상자 / K : 한 상자 포장 비용
    // 포장 비용 + 개수 ( 최대 오렌지 - 최소 오렌지 )
    const [N, M, K] = inputLines[idx++].split(' ').map(Number)
    const oranges = []
    for (let i = 0 ; i < N ; i ++) {
        const [A] = inputLines[idx++].split(' ').map(Number)
        oranges.push(A)
    }
    oranges.unshift(0)
    const dp = new Array(N+1).fill(null).map(()=> INF)
    dp[0] = 0
    dp[1] = K

    for (let i = 1 ; i < N+1; i++) {
        let maxV = oranges[i]
        let minV = oranges[i]
        for (let j = i; j < i+M; j++) {
            if (j < N+1) {
                maxV = Math.max(maxV, oranges[j])
                minV = Math.min(minV, oranges[j])
                dp[j] = Math.min(dp[j], K + (j-i+1) *  (maxV-minV) + dp[i-1])
            }
        }
    }
    console.log(dp[N])

})
