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
    const [N, M] = (inputLines[idx++].split(' ').map(Number))
    // i번째 수열이 j 숫자로 끝났을때 증가했던 경우의 수 / 같은 경우의 수 / 줄어든 경우의 수
    const dp = new Array(N+1).fill(null).map(()=>
        new Array(M+1).fill(null).map(()=> [0, 0, 0])
    )

    for (let i = 1; i <= M; i++) {
        for (let j = 1; j <= M; j++) {
            if (i > j) {
                dp[1][i][0] += 1
            } else if ( i === j) {
                dp[1][i][1] += 1
            } else if (i < j) {
                dp[1][i][2] += 1
            }
        }
    }

    for (let i = 2; i < N+1 ; i++) {
        for (let j = 1; j <= M; j++) {
            for (let k = 1; k <= M; k++) {
                if (j > k) {
                    dp[i][j][0] += (dp[i-1][k][0]+dp[i-1][k][1]+dp[i-1][k][2])%998244353;
                } else if ( j === k) {
                    dp[i][j][1] += (dp[i-1][k][0]+dp[i-1][k][1]+dp[i-1][k][2])%998244353;
                } else if ( j < k) {
                    dp[i][j][2] += (dp[i-1][k][1]+dp[i-1][k][2])%998244353;
                }
            }
        }
    }
    console.log((dp[N][M][0]+dp[N][M][1]+dp[N][M][2])%998244353);
});

