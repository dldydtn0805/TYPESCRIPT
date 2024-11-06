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
    const squares = []
    for (let i = 0 ; i < N ; i++) {
        const input = inputLines[idx++].split(' ').map(Number)
        squares.push(input)
    }
    if (N === 0) {console.log(0)}
    else {
        const dp = new Array(N).fill(null).map(()=>[0, 0])
        // dp = [가로로 두었을때 최고 길이, 세로로 두었을때 최고 길이]
        dp[0] = [squares[0][0], squares[0][1]]
        for (let i = 1; i < N ; i++) {
            dp[i][0] = squares[i][0] + Math.max(Math.abs(squares[i][1]-squares[i-1][0]) + dp[i-1][1], Math.abs(squares[i][1]-squares[i-1][1]) + dp[i-1][0])
            dp[i][1] = squares[i][1] + Math.max(Math.abs(squares[i][0]-squares[i-1][1]) + dp[i-1][0], Math.abs(squares[i][0]-squares[i-1][0]) + dp[i-1][1])
        }
        console.log(Math.max(...dp[N-1]))
    }
});
