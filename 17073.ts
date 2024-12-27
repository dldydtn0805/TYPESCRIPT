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
    const [N, W] = inputLines[idx++].split(' ').map(Number)
    const adjList = new Array(N+1).fill(null).map(()=>[])
    for (let i = 0 ; i < N-1; i++) {
        const [U, V] = inputLines[idx++].split(' ').map(Number)
        adjList[U].push(V)
        adjList[V].push(U)
    }
    const visited = new Array(N+1).fill(null).map(()=>0)
    const dfs = (ci : number) => {
        let res = 0
        let leaf = true
        for (const ni of adjList[ci]) {
            if (visited[ni] === 0) {
                leaf = false
                visited[ni] = 1
                res += dfs(ni)
            }
        }
        if (leaf) {
            return 1
        } else {
            return res
        }
    }
    visited[1] = 1
    console.log(W/dfs(1))

})


/*
5 20
5 3
3 4
2 1
1 3
* */
