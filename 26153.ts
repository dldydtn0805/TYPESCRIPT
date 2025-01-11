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
    const lands = []
    for (let i = 0 ; i < N; i++) {
        lands.push(inputLines[idx++].split(' ').map(Number))
    }

    const directions = [
        [-1,0],[0,1],[1,0],[0,-1]
    ]

    const [x, y, p] = inputLines[idx++].split(' ').map(Number)

    const visited = new Array(N).fill(null).map(()=>
        new Array(M).fill(null).map(()=>0)
    )

    const getNext = (dir, ci, cj) => {
        const [di, dj] = directions[dir]
        const [ni, nj] = [ci+di, cj+dj]
        return [ni, nj]
    }

    const check = (ni, nj) => {
        if (0<= ni && ni<N && 0<=nj && nj<M) {
            if (visited[ni][nj] === 0) {
                return true
            }
        }
        return false
    }
    const dfs = (ci, cj, dir, stuff) => {
        let res = lands[ci][cj]
        for (let nextDir of [dir+1, dir-1]) {
            if (nextDir === -1) {
                nextDir = 3
            } else if (nextDir === 4) {
                nextDir = 0
            }
            const [ni, nj] = getNext(nextDir, ci, cj)
            if (check(ni, nj) && stuff-2 >= 0) {
                visited[ni][nj] = 1
                res = Math.max(res, lands[ci][cj] + dfs(ni, nj,nextDir, stuff-2))
                visited[ni][nj] = 0
            }
        }
        const [ni, nj] = getNext(dir, ci, cj)
        if (check(ni, nj) && stuff-1 >= 0) {
            visited[ni][nj] = 1
            res = Math.max(res, lands[ci][cj] + dfs(ni, nj, dir, stuff-1))
            visited[ni][nj] = 0
        }
        return res
    }
    visited[x][y] = 1
    const solve = () => {
        let ans = lands[x][y]
        for (let k = 0 ; k < 4; k++) {
            for (let nextDir of [k+1, k-1]) {
                if (nextDir === -1) {
                    nextDir = 3
                } else if (nextDir === 4) {
                    nextDir = 0
                }
                const [ni, nj] = getNext(k, x, y)
                if (check(ni, nj) && p-2 >= 0) {
                    visited[ni][nj] = 1
                    ans = Math.max(ans, lands[x][y] + dfs(ni, nj, nextDir, p-2))
                    visited[ni][nj] = 0
                }
            }
            const [ni, nj] = getNext(k, x, y)
            if (check(ni, nj) && p-1 >= 0) {
                visited[ni][nj] = 1
                ans = Math.max(ans, lands[x][y] + dfs(ni, nj, k, p-1))
                visited[ni][nj] = 0
            }

        }
        return ans
    }

    console.log(solve())
})


/*
3 3
13 52 7
33 20 35
48 18 26
1 1 5
* */
