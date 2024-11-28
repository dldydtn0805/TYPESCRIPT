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
    const A = inputLines[idx++].split(' ').map(Number)
    A.sort((A,B)=>A-B)
    const visited = new Array(M).fill(null).map(()=>0)
    const ans = new Set()
    const backtracking = (pi:number, idx:number) => {
        if (idx === M) {
            const res = (visited.join(' '))
            if (!ans.has(res)) {
                console.log(res)
            }
            ans.add(res)
            return
        }
        for (let i = pi ; i < N; i++) {
            visited[idx] = A[i]
            backtracking(i, idx+1)
            visited[idx] = 0
        }
    }
    backtracking(0, 0)
})

