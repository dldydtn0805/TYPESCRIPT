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
    const [N, M] = inputLines[idx++].split(' ').map(Number)
    const maps = []
    for (let i = 0 ; i < N; i++) {
        maps.push(inputLines[idx++].split('').map(String))
    }
    const queue = []
    const visited = new Array(N).fill(null).map(()=>
        new Array(M).fill(null).map(()=>0)
    )
    let ans = 0
    let total = 0
    for (let i = 0; i < N ; i++) {
        for (let j = 0 ; j < M; j++) {
            if (maps[i][j] === '*' || maps[i][j] === '#') {
                total ++
            }
        }
    }
    for (let i = 0 ; i < N ; i ++) {
        for (let j = 0 ; j < M ; j ++) {
            if (maps[i][j] === '@') {
                for (let [di, dj] of [[-1,0],[0,1],[1,0],[0,-1]]) {
                    let flag = true
                    for (let k = 1 ; k <= 2; k++) {
                        if (flag) {
                            const [si, sj] = [i+di*k, j+dj*k]
                            if (0 <= si && si < N && 0 <= sj && sj < M) {
                                if (maps[si][sj] === '|') {
                                    flag = false
                                } else {
                                    if (maps[si][sj] === '*') {
                                        ans ++
                                        queue.push([si, sj])
                                        visited[si][sj] = 1
                                    } else if (maps[si][sj] === '#') {
                                        visited[si][sj] = 1
                                    }
                                }
                            }
                        }
                    }
                }

            }
        }
    }

    const bfs = () => {
        while (queue.length) {
            const [ci, cj] = queue.shift()
            for (let [di, dj] of [[-1,0],[0,1],[1,0],[0,-1]]) {
                const [ni, nj] = [ci+di, cj+dj]
                if (0 <= ni && ni < N && 0 <= nj && nj < M) {
                    if (maps[ni][nj] === '*' && visited[ni][nj] === 0) {
                        ans ++
                        queue.push([ni, nj])
                        visited[ni][nj] = 1
                    } else if (maps[ni][nj] === '#') {
                        if (visited[ni][nj] === 0) {
                            visited[ni][nj] = 1
                        } else if (visited[ni][nj] === 1) {
                            ans ++
                            queue.push([ni, nj])
                            visited[ni][nj] = 2
                        }
                    }
                }
            }

        }

    }
    bfs()
    console.log(ans, total-ans)
})


/*
5 6
*.*...
..||..
..@*|*
.*.*..
..*##.
//4 5
* */
