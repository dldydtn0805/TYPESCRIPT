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
    const dp = new Array(2**15+1).fill(null).map(()=>[0, 0, 0, 0])
    for (let i = 1 ; i*i <= 2**15+1; i++) {
        dp[i*i][0] = 1
        for (let j = i*i; j < 2**15+1; j++) {
            for (let k = 1; k < 4; k ++) {
                dp[j][k] += dp[j-i*i][k-1]
            }
        }
    }
    for (let tc = 0; tc < inputLines.length-1; tc++) {
        const [N] = inputLines[idx++].split(' ').map(Number)
        console.log(dp[N].reduce((cnt, ele)=> cnt+ele, 0))
    }
});
