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
    const [N, K] = (inputLines[idx++].split(' ').map(Number))
    const track = []
    track.push(inputLines[idx++].split('').map(String))
    track.push(inputLines[idx++].split('').map(String))

    const bfs = (si) => {
        const queue = []
        const visited = new Array(2).fill(null).map(()=>
            new Array(N).fill(null).map(()=>INF)
        )
        if (track[si][0] !== '#') {
            queue.push([si, 0])
            visited[si][0] = 0
        }
        while (queue.length) {
            const [ci, cj] = queue.shift()
            for (let [ni, nj] of [[(ci+1)%2, cj], [ci, cj+1]]) {
                if (track[ni][nj] !== '#' && nj < N) {
                    if (visited[ni][nj] === INF) {
                        queue.push([ni, nj])
                        visited[ni][nj] = visited[ci][cj] + 1
                    }
                }
            }
        }
        return visited
    }
    const responseUp = bfs(0)
    const responseDown = bfs(1)
    let loopUp = INF
    let loopDown = INF
    if (responseUp[0][0] === 0) {
        loopUp = Math.min(loopUp, responseUp[0][N-1] + 1)
    }
    if (responseDown[1][0] === 0) {
        loopDown = Math.min(loopDown, responseDown[1][N-1] + 1)
    }
    let ans
    if (K > 2) {
        const Up = loopUp*(K-2)+Math.min(responseUp[0][N-1], responseDown[0][N-1])+Math.min(responseUp[0][N-1],responseUp[1][N-1])
        const Down = (loopDown*(K-2))+Math.min(responseUp[1][N-1], responseDown[1][N-1])+Math.min(responseDown[0][N-1],responseDown[1][N-1])
        ans = Math.min(Up, Down) + 1
    } else if (K === 2) {
        ans = Math.min(loopUp*(K-1)+ Math.min(responseUp[0][N-1], responseUp[1][N-1], responseDown[0][N-1], responseDown[1][N-1]),
            loopDown*(K-1)+ Math.min(responseUp[0][N-1], responseUp[1][N-1], responseDown[0][N-1], responseDown[1][N-1]))
    } else {
        ans = Math.min(responseUp[0][N-1], responseUp[1][N-1], responseDown[0][N-1], responseDown[1][N-1])
    }
    console.log(ans >= INF ? -1 : ans)
});

