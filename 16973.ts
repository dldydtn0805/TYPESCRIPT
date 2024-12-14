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
    const [N, M] = inputLines[idx++].split(' ').map(Number)
    const templates = []
    for (let i = 0 ; i < N ; i ++) {
        templates.push(inputLines[idx++].split(' ').map(Number))

    }
    let [H, W, SR ,SC, FR, FC] = inputLines[idx++].split(' ').map(Number)
    SR -= 1
    SC -= 1
    FR -= 1
    FC -= 1

    const checkWall = (ci, cj) => {
        for (let i = ci; i < ci+H; i++) {
            for (let j = cj; j < cj+W; j++) {
                if (templates[i][j] === 1) {
                    return false
                }
            }
        }
        return true
    }

    const bfs = (si, sj) => {
        const queue = []
        const visited = new Array(N).fill(null).map(()=>
            new Array(M).fill(null).map(()=>0)
        )
        queue.push([si, sj])
        visited[si][sj] = 1
        while (queue.length) {
            const [ci, cj] = queue.shift()
            for (let [di, dj] of [[-1,0],[0,1],[1,0],[0,-1]]) {
                const [ni, nj] = [ci+di, cj+dj]
                if (0<=ni && ni+H-1 < N && 0 <= nj && nj+W-1 < M && visited[ni][nj] === 0 && checkWall(ni, nj)) {
                    queue.push([ni, nj])
                    visited[ni][nj] = visited[ci][cj] + 1
                }
            }
        }
        return visited
    }

    const res = bfs(SR, SC)
    // console.log(res)
    console.log(res[FR][FC] === 0 ? -1 : res[FR][FC]-1)



})


/*
4 5
0 0 0 0 0
0 0 1 0 0
0 0 0 0 0
0 0 0 0 0
2 2 1 1 1 4
* */
