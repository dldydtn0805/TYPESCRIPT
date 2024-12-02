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
    // X : 시작 공 위치 / Y : 공이 움직인 횟수
    const [N, M, X, Y] = inputLines[idx++].split(' ').map(Number)
    const adjList :any = new Array(N+1).fill(null).map(()=>new Set())

    for (let i = 0 ; i < M ; i ++) {
        const [A, B] = inputLines[idx++].split(' ').map(Number)
        adjList[A].add(B)
        adjList[B].add(A)
    }
    const res = new Set()
    const bfs = () => {
        const queue = []
        const visited = new Array(N+1).fill(null).map(()=>
            new Array(Y+1).fill(null).map(()=>0)
        )
        queue.push([X, 0])
        visited[X][0] = 1
        while (queue.length) {
            const [ci, cnt] = queue.shift()
            adjList[ci].forEach((ni)=> {
                if (visited[ni][cnt+1] === 0) {
                    if (cnt+1 === Y) {
                        res.add(ni)
                    }
                    queue.push([ni, cnt+1])
                    visited[ni][cnt+1] = 1
                }
            })
        }
    }
    bfs()
    const ans = []
    res.forEach((elem)=>ans.push(elem))
    ans.sort((A,B)=>A-B)
    console.log(ans.length > 0 ? ans.join(' ') : -1)
})
