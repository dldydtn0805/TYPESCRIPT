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
    const [H, W, L] = inputLines[idx++].split(' ').map(Number)
    const maps = []
    for (let i = 0 ; i < H; i++) {
        maps.push(inputLines[idx++].split('').map(String))
    }
    const word = inputLines[idx++].split('').map(String)
    const dp = new Array(L).fill(null).map(()=>
        new Array(H).fill(null).map(()=>
            new Array(W).fill(null).map(()=>0)
        )
    )
    const queue = []
    for (let i = 0; i < H; i++) {
        for (let j = 0; j < W; j++) {
            if (maps[i][j] === word[0]) {
                queue.push([i, j, 1])
                dp[0][i][j] = 1
            }
        }
    }
    const bfs = (ci:number, cj:number) => {
        while (queue.length) {
            const [ci, cj, depth] = queue.shift()
            for (let [di, dj] of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]) {
                let [ni, nj] = [ci+di, cj+dj]
                if (0<=ni && ni < H && 0<=nj && nj < W && 0 <= depth && depth < L) {
                    if (maps[ni][nj] === word[depth]) {
                        if (dp[depth][ni][nj] === 0) {
                            dp[depth][ni][nj] += dp[depth-1][ci][cj]
                            queue.push([ni, nj, depth+1])
                        } else {
                            dp[depth][ni][nj] += dp[depth-1][ci][cj]
                        }
                    }
                }
            }
        }
    }
    // console.log(word)
    for (let i = 0 ; i < H ; i++) {
        for (let j = 0 ; j < W; j++) {
            if (maps[i][j] === word[0]) {
                // console.log(i, j)
                // dp[i][j][0] = 1
                bfs(i, j)
            }
        }
    }
    let ans = 0
    for (let i = 0 ; i < H; i++) {
        for (let j = 0 ; j < W; j++) {
            ans += dp[L-1][i][j]
        }
    }
    console.log(ans)
})


/*
3 4 5
ERAT
ATSR
AUTU
TARTU
///7
* */
