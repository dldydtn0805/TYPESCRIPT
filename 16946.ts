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
    const [N, M] = inputLines[idx++].split(' ').map(Number)
    const maps :any = []
    for (let i = 0 ; i < N ; i ++) {
        maps.push(inputLines[idx++].split('').map(Number))
    }

    const visited = new Array(N).fill(null).map(()=>
        new Array(M).fill(null).map(()=>0)
    )

    const root:any = {}
    const cnt:any = {}

    const bfs = (si:number, sj:number) => {
        const queue:any = []
        const cur = `${si},${sj}`
        queue.push([si, sj])
        visited[si][sj] = 1
        root[cur] = cur
        let maxV = 1
        while (queue.length > 0) {
            const [ci, cj] = queue.shift()
            for (const [di, dj] of [[-1,0],[0,1],[1,0],[0,-1]] ) {
                const [ni, nj] = [ci+di, cj+dj]
                if (0<=ni && ni<N && 0<=nj && nj<M && maps[ni][nj] === 0 && visited[ni][nj] === 0) {
                    maxV ++
                    const now = `${ni},${nj}`
                    root[now] = cur
                    queue.push([ni, nj])
                    visited[ni][nj] = 1
                }
            }
        }
        cnt[cur] = maxV
    }

    for (let i = 0 ; i < N; i ++) {
        for (let j = 0 ; j < M; j ++) {
            if (maps[i][j] === 0 && visited[i][j] === 0) {
                bfs(i, j)
            }
        }
    }
    const ans = new Array(N).fill(null).map(()=>
        new Array(M).fill(null).map(()=>0)
    )
    for (let i = 0; i < N; i ++) {
        for (let j = 0; j < M; j ++) {
            if (maps[i][j] === 1) {
                const check = new Set()
                let val = 1
                for (const [di, dj] of [[-1,0],[0,1],[1,0],[0,-1]] ) {
                    const [ni, nj] = [i+di, j+dj]
                    if (0<=ni && ni < N && 0<=nj && nj<M) {
                        const now = `${ni},${nj}`
                        if (maps[ni][nj] === 0 && !check.has(root[now])) {
                            val += cnt[root[now]]
                            check.add(root[now])
                        }
                    }
                }
                val %= 10
                ans[i][j] = val
            }
        }
    }
    let res = ''
    for (let i = 0 ; i < N ; i ++) {
        res += `${ans[i].join('')}`
        if (i === N-1) {
            break
        }
        res += `\n`
    }
    console.log(res)

})


/*
4 5
11001
00111
01010
10101
* */
