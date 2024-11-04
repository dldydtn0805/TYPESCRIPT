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
    const poles = []
    const rank = {}
    for (let i = 0 ; i < N ; i++) {
        const [A, B] =inputLines[idx++].split(' ').map(Number)
        poles.push([A,B])
    }
    poles.sort((A,B)=> A[0]-B[0])
    const dp = new Array(N).fill(null).map(()=>1)

    for (let i = 0; i < N ; i ++) {
        for (let j = 0 ; j < i ; j++) {
            if (poles[i][1] > poles[j][1]) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
    }
    console.log(N-Math.max(...dp))

});
