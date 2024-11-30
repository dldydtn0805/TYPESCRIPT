import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let idx = 0;
let inputLines :Array<string> = [];
const INF = Number.MAX_SAFE_INTEGER
rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    // S : 지지대 얼음들 [1 ~ S] / P : 펭귄 얼음
    const [N, S, P] = inputLines[idx++].split(' ').map(Number)
    const adjList :Array<Array<number>> = new Array(N+1).fill(null).map(()=>[])
    for (let i = 0; i < N-1; i++) {
        const [A, B] = inputLines[idx++].split(' ').map(Number)
        adjList[A].push(B)
        adjList[B].push(A)
    }
    const queue :Array<number> = []
    for (let i = 1 ; i < S+1; i++) {
        queue.push(i)
    }
    const visited = new Array(N+1).fill(null).map(()=>0)
    let cnt = 0
    const bfs = () => {
        let beam = 0
        while (queue.length > 0) {
            const ci   = queue.shift()
            if (ci === undefined) {continue}
            for (let ni of adjList[ci]) {
                if (visited[ni] === 0) {
                    if (ni === P) {
                        beam ++
                        cnt += visited[ci] + 1
                        if (beam === 2) {
                            return
                        }
                    } else {
                        visited[ni] = visited[ci] + 1
                        queue.push(ni)
                    }
                }
            }
        }
    }
    bfs()
    // 총 얼음 - 최소 유지 얼음
    console.log(N-(cnt+1))
})
