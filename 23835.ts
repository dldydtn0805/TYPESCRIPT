import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let idx = 0;
let inputLines = [];
const INF = Number.MAX_SAFE_INTEGER
const MOD = 10**9+7
rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    const [N] = inputLines[idx++].split(' ').map(Number)
    const adjList = new Array(N+1).fill(null).map(()=>[])
    for (let i = 0; i < N-1; i++) {
        const [a, b] = inputLines[idx++].split(' ').map(Number)
        adjList[a].push(b)
        adjList[b].push(a)
    }

    const dfs = (si:number, ci:number, ei:number, depth:number,visited:Array<number>, ans:Array<number>) => {
        if (ci === ei) {
            for (let i = 1 ; i < N+1; i ++) {
                if (visited[i] > 1) {
                    ans[i] += visited[i] - 1
                }
            }
            return
        }
        for (let ni of adjList[ci]) {
            if (visited[ni] === 0) {
                visited[ni] = depth
                dfs(si, ni, ei, depth+1, visited, ans)
                visited[ni] = 0
            }
        }
    }

    const ans = new Array(N+1).fill(null).map(()=>0)
    const [Q] = inputLines[idx++].split(' ').map(Number)
    for (let i = 0 ; i < Q; i++) {
        const query = inputLines[idx++].split(' ').map(Number)
        const id = query.shift()
        if (id === 1) {
            const [u, v] = query
            const visited = new Array(N+1).fill(null).map(()=>0)
            visited[u] = 1
            dfs(u, u, v, 2, visited, ans)
        } else {
            const [x] = query
            console.log(ans[x])
        }
    }


})


/*
5
1 2
2 3
3 4
2 5
5
1 3 5
1 4 5
1 1 2
2 2
2 5
// 4
// 5
* */
