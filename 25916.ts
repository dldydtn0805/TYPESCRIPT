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
    const [N, M] = inputLines[idx++].split(' ').map(Number)
    const arr = inputLines[idx++].split(' ').map(Number);
    const prefix = new Array(N).fill(null).map(()=>0)
    prefix[0] = arr[0]
    for (let i = 1; i < N ; i++) {
        prefix[i] = prefix[i-1] + arr[i]
    }
    prefix.unshift(0)
    let start = 0
    let end = 0
    let ans = 0
    while (start < N+1 && end < N+1 && start <= end) {
        if (prefix[end]-prefix[start] < M) {
            ans = Math.max(ans, prefix[end]-prefix[start])
            end ++
        }  else if (prefix[end]-prefix[start] > M) {
            start ++
        } else if (prefix[end] - prefix[start] === M) {
            ans = M
            break
        }
    }
    console.log(ans)
});


