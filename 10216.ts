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
    const [T] = inputLines[idx++].split(' ').map(Number)
    for (let tc = 0 ; tc < T; tc++ ) {
        const [N] = inputLines[idx++].split(' ').map(Number)
        const adjList = new Array(N).fill(null).map(()=>[])
        const turrets = []
        for (let i = 0 ; i < N; i++) {
            turrets.push(inputLines[idx++].split(' ').map(Number))
        }
        for (let i = 0 ; i < N; i ++) {
            for (let j = 0 ; j < i ; j ++) {
                const [ni, nj, nr] = turrets[i]
                const [ci, cj, cr] = turrets[j]
                if (Math.sqrt((ni-ci)**2+(nj-cj)**2) <= nr+cr) {
                    adjList[i].push(j)
                    adjList[j].push(i)
                }
            }
        }
        const visited = new Array(N).fill(null).map(()=>0)
        const dfs = (ci) => {
            for (let ni of adjList[ci]) {
                if (visited[ni] === 0) {
                    visited[ni] = 1
                    dfs(ni)
                }
            }
        }
        let cnt = 0
        for (let i = 0 ; i < N ; i ++) {
            if (visited[i] === 0) {
                cnt ++
                dfs(i)
            }
        }
        console.log(cnt)
    }
})

/*
1
2
0 0 0
1 1 1
* */
