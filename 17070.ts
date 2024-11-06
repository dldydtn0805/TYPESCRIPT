

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
    const house = new Array(1).fill(null).map(()=>
        new Array(N+1).fill(null).map(()=>0)
    )
    for (let i = 0 ; i < N ; i++) {
        const input = inputLines[idx++].split(' ').map(Number)
        input.unshift(0)
        house.push(input)
    }
    // 머리가 i, j일때 가로인 개수, 세로인 개수, 대각선인 개수
    const dp = new Array(N+1).fill(null).map(()=>
        new Array(N+1).fill(null).map(()=>[0, 0, 0])
    )
    dp[1][2][0] = 1
    for (let i = 1 ;i < N+1 ; i ++) {
        for (let j = 1;  j < N+1 ; j ++) {
            if (house[i][j] !== 1) {
                if (house[i-1][j] !== 1 && house[i][j-1] !== 1) {
                    dp[i][j][0] = Math.max(dp[i][j-1][0] + dp[i][j-1][2], dp[i][j][0])
                    dp[i][j][1] = Math.max(dp[i-1][j][1] + dp[i-1][j][2], dp[i][j][1])
                    dp[i][j][2] = Math.max(dp[i-1][j-1][0] + dp[i-1][j-1][1] + dp[i-1][j-1][2], dp[i][j][2])
                } else {
                    dp[i][j][0] = Math.max(dp[i][j-1][0] + dp[i][j-1][2], dp[i][j][0])
                    dp[i][j][1] = Math.max(dp[i-1][j][1] + dp[i-1][j][2], dp[i][j][1])
                }
            }
        }
    }
    console.log(dp[N][N].reduce((cnt, elem)=> cnt+elem,0))
});
