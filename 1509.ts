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
    const something = inputLines[idx++].split('').map(String)
    const N = something.length
    const dp = new Array(N+1).fill(null).map(()=>2500)
    dp[N] = 0
    const isPalindrome = new Array(N).fill(null).map(()=>
        new Array(N).fill(null).map(()=>0)
    )
    for (let i = 0; i < N ; i++) {
        isPalindrome[i][i] = 1
    }

    for (let i = 1; i < N; i ++) {
        if (something[i-1] === something[i]) {
            isPalindrome[i-1][i] = 1
        }
    }

    for (let l = 3; l < N+1; l++) {
        for (let s = 0; s < N - l + 1; s++) {
            const e = s + l - 1
            if (something[s] === something[e] && isPalindrome[s+1][e-1]) {
                isPalindrome[s][e] = 1
            }
        }
    }
    for (let e = 0 ; e < N; e++) {
        for (let s = 0; s < e+1; s++) {
            let ns = s-1, ne = e-1
            if (ns === -1) {ns = N}
            if (ne === -1) {ne = N}
            if (isPalindrome[s][e]) {
                dp[e] = Math.min(dp[e], dp[ns]+1)
            } else {
                dp[e] = Math.min(dp[e], dp[ne]+1)
            }
        }
    }
    console.log(dp[N-1])
})


/*
BBCDDECAECBDABADDCEBACCCBDCAABDBADD
* */
