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
    const [N, M] = inputLines[idx++].split(' ').map(Number)
    const games :Array<Array<string>> = []
    for (let i = 0 ; i < N ; i ++) {
        games.push(inputLines[idx++].split('').map(String))
    }
    const coins = [-1, -1, -1, -1]
    for (let i = 0 ; i < N ; i ++) {
        for (let j = 0 ; j < M ; j ++) {
            if (games[i][j] === 'o') {
                if (coins[0] === -1 && coins[1] === -1) {
                    coins[0] = i
                    coins[1] = j
                } else {
                    coins[2] = i
                    coins[3] = j
                }
            }
        }
    }
    const visited = new Array(N).fill(null).map(()=>
        new Array(M).fill(null).map(()=>
            new Array(N).fill(null).map(()=>
                new Array(M).fill(null).map(()=>-1)
            )
        )
    )
    const bfs = (coins : Array<number>) => {
        const queue: any = []
        queue.push(coins)
        visited[coins[0]][coins[1]][coins[2]][coins[3]] = 0
        while (queue.length > 0) {
            const [A, B, C, D] = queue.shift()
            for (let [di, dj] of [[-1,0], [0,1], [1,0], [0,-1]]) {
                let [nA, nB, nC, nD] = [A + di, B+dj, C+ di, D + dj]
                if (0 <= nA && nA < N && 0 <= nC && nC < N && 0 <= nB && nB < M && 0 <= nD && nD < M) {
                    if (games[nA][nB] === '#') {
                        nA = A
                        nB = B
                    }
                    if (games[nC][nD] === '#') {
                        nC = C
                        nD = D
                    }
                    if (nA === nC && nB === nD) {
                        continue
                    }
                    if (visited[nA][nB][nC][nD] === -1) {
                        queue.push([nA,nB,nC,nD])
                        visited[nA][nB][nC][nD] = visited[A][B][C][D] + 1
                    }
                } else if (0 <= nA && nA < N && 0 <= nB && nB < M) {
                    return visited[A][B][C][D] + 1
                } else if (0 <= nC && nC < N && 0 <= nD && nD < M) {
                    return visited[A][B][C][D] + 1
                }
            }
        }
        return -1
    }
    if (N ===1 && M === 1) {
        console.log(-1)
    } else {
        const ans : any = bfs(coins)
        console.log(ans > 10 ? -1 : ans)
    }
});
