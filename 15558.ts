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
    const [N, K] = inputLines[idx++].split(' ').map(Number)
    const L = inputLines[idx++].split('').map(Number)
    const R = inputLines[idx++].split('').map(Number)
    const danger = []
    danger.push(L)
    danger.push(R)
    const bfs = () => {
        const queue = []
        // queue = [ROW, COL, TIME]
        queue.push([0, 0, 0])
        const visited = new Array(2).fill(null).map(()=>
            new Array(N+K+1).fill(null).map(()=>0)
        )
        visited[0][0] = 1
        while (queue.length) {
            const [ci, cj, ct] = queue.shift()
            for (let [di, dj] of [[0,1],[0,-1],[1,K]]) {
                const [ni, nj] = [(ci+di)%2, cj+dj]
                if (0<=nj && nj<N+K+1 && visited[ni][nj] === 0 && danger[ni][nj] !== 0 && ct < nj) {
                    if (nj >= N) {
                        return 1
                    }
                    queue.push([ni, nj, ct+1])
                    visited[ni][nj] = 1
                }
            }
        }
        return 0
    }
    console.log(bfs())
})


/*
7 3
1110110
1011001
* */
