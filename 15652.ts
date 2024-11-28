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
    const [N, M] = inputLines[idx++].split(' ').map(Number)
    const visited = new Array(M).fill(null).map(()=>0)
    const backtracking = (pi:number, idx:number) => {
        if (idx === M) {
            console.log(visited.join(' '))
            return
        }
        for (let i = pi ; i < N+1; i++) {
            visited[idx] = i
            backtracking(i, idx+1)
            visited[idx] = 0
        }
    }
    backtracking(1, 0)
})

