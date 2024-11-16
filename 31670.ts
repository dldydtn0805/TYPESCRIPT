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
    const students = inputLines[idx++].split(' ').map(Number)
    // [사망 / 생존]
    const dp = new Array(N).fill(null).map(() => [0, 0])
    for (let i = 0; i < N; i++) {
        if (i === 0) {
            dp[0][0] = students[0]
        } else if (i === 1) {
            dp[1][0] = students[1]
            dp[1][1] = dp[0][0]
        } else {
            dp[i][0] = Math.min(dp[i - 1][1] + students[i], dp[i-2][1] + students[i-1] + students[i])
            dp[i][1] = dp[i-1][0]
        }
    }
    console.log(Math.min(...dp[N-1]))

})


