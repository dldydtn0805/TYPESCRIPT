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
    let [ N, M, X  ] = inputLines[idx++].split(' ').map(Number)
    const adjSmallList = new Array(N+1).fill(null).map(()=>[])
    const adjBigList =  new Array(N+1).fill(null).map(()=>[])
    for (let i = 0 ; i < M ; i ++) {
        const [N, M] = inputLines[idx++].split(' ').map(Number)
        adjSmallList[N].push(M)
        adjBigList[M].push(N)
    }
    const smallVisited = new Array(N+1).fill(null).map(()=>0)
    const bigVisited = new Array(N+1).fill(null).map(()=>0)
    const dfs = (curIdx, adjList, visited) => {
        let res = 1
        for (let ni of adjList[curIdx]) {
            if (visited[ni] === 0) {
                visited[ni] = 1
                res += dfs(ni, adjList, visited)
            }
        }
        return res
    }
    const smalls = (dfs(X, adjSmallList, smallVisited)-1) // 무조건 더 작은 애들 탐색한 개수
    const bigs = (dfs(X, adjBigList, bigVisited)-1) // 무조건 더 큰 애들 탐색한 개수
    console.log(bigs+1, N-smalls)
});
