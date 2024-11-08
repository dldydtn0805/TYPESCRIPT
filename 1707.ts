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
    const [K] = inputLines[idx++].split(' ').map(Number)
    for (let tc = 0; tc < K; tc++) {
        const [V, E] = inputLines[idx++].split(' ').map(Number)
        const adjList :Array<Array<number>> = new Array(V+1).fill(null).map(()=>[])
        for (let i = 0; i < E; i++) {
            const [u, v] = inputLines[idx++].split(' ').map(Number)
            adjList[u].push(v)
            adjList[v].push(u)
        }
        const visited = new Array(V+1).fill(null).map(()=>0)
        let ans = true
        const dfs = (ci:number, check:boolean) => {
            for (let ni of adjList[ci]) {
                if (visited[ni] === 0) {
                    if (check) {
                        visited[ni] = 1
                        dfs(ni, !check)
                    } else {
                        visited[ni] = -1
                        dfs(ni, !check)
                    }
                } else {
                    if (check) {
                        if (visited[ni] === -1) {
                            ans = false
                        }
                    } else {
                        if (visited[ni] === 1) {
                            ans = false
                        }
                    }
                }
            }
        }
        for (let i = 1; i < V+1; i++) {
            if (visited[i] === 0) {
                visited[i] = 1
                dfs(i, false)
            }
        }
        console.log(ans ? 'YES' : 'NO')

    }
});

