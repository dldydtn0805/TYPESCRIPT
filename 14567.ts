import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let idx = 0;
let inputLines: Array<string> = [];

rl.on('line', (line: string) => {
    inputLines.push(line);
});

rl.on('close', () => {
    const [N, M] = inputLines[idx++].split(' ').map(Number);
    const adjList:Array<Array<number>> = new Array(N+1).fill(null).map(()=>[])
    for (let i = 0 ; i < M ; i++) {
        const [A, B] = inputLines[idx++].split(' ').map(Number);
        adjList[B].push(A)
    }
    const visited :Array<number> = new Array(N+1).fill(0)
    const dfs = (si:number, depth:number):number => {
        let cnt = depth
        for (let ni of adjList[si]) {
            if (!visited[ni]) {
                cnt = Math.max(dfs(ni, depth+1), cnt)
            } else {
                cnt = Math.max(visited[ni]+1, cnt)
            }
        }
        return cnt
    }
    for (let i = 1 ; i < N+1; i++) {
        visited[i] = dfs(i, 1)
    }
    console.log(visited.slice(1, visited.length).join(' '))
});
