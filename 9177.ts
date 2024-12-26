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
    const [TC] = inputLines[idx++].split(' ').map(Number)
    let ans = ''
    for (let t = 1; t < TC+1  ;t++) {
        let [A, B, C] = inputLines[idx++].split(' ').map(String)
        const N = A.length
        const M = B.length
        const dp = new Array(N+1).fill(null).map(()=>
            new Array(M+1).fill(null).map(()=>0)
        )
        if (A[0] === C[0]) {
            dp[1][0] = 1
        }
        if (B[0] === C[0]) {
            dp[0][1] = 1
        }
        for (let i = 1; i < N ; i++) {
            if (A[i] === C[i] && dp[i][0]) {
                dp[i+1][0] = 1
            }
        }
        for (let i = 1; i < M ; i++) {
            if (B[i] === C[i] && dp[0][i]) {
                dp[0][i+1] = 1
            }
        }
        for (let i = 1; i < N+1; i++) {
            for (let j = 1 ; j < M+1; j++) {
                if (A[i] === C[i+j]) {
                    dp[i][j] = Math.max(dp[i-1][j] , dp[i][j-1])
                }
                if (B[j] === C[i+j]) {
                    dp[i][j] = Math.max(dp[i-1][j] , dp[i][j-1])

                }
            }
        }

        if (dp[N][M]) {
            ans += `Data set ${t}: yes\n`
        } else {
            ans += `Data set ${t}: no\n`
        }
    }

    console.log(ans)
})


/*
3
cat tree tcraete
cat tree catrtee
cat tree cttaree
* */
