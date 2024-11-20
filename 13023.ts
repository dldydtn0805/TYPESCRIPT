import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let idx = 0;
const inputLines :Array<string> = [];
const INF = Number.MAX_SAFE_INTEGER
rl.on('line', (line: string) => {
    inputLines.push(line);
})
rl.on('close', ()=> {
    const [N, M] = inputLines[idx++].split(' ').map(Number)
    const adjList :Array<Array<number>> = new Array(N).fill(null).map(()=>[])
    for (let i = 0 ; i < M; i ++) {
        const [a, b] = inputLines[idx++].split(' ').map(Number)
        adjList[a].push(b)
        adjList[b].push(a)
    }

    const visited = new Array(N).fill(null).map(()=>0)

    let ans = 0

    const dfs = (ci : number, depth : number) => {
        if (depth === 5) {
            ans = 1
            return
        }
        for (let ni of adjList[ci]) {
            if (visited[ni] === 0) {
                visited[ni] = 1
                dfs(ni, depth+1)
                visited[ni] = 0
            }
        }
    }

    for (let i = 0 ; i < N; i ++) {
        if (ans === 0 && visited[i] === 0) {
            visited[i] = 1
            dfs(i, 1)
            visited[i] = 0
        }
    }
    console.log(ans)

})
