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
    const adjList :Array<Array<number>> = new Array(N+1).fill(null).map(()=>
        new Array(N+1).fill(null).map(()=>INF)
    )
    for (let i = 0 ; i < M ; i ++) {
        const [A, B, C] = inputLines[idx++].split(' ').map(Number)
        adjList[A][B] = Math.min(adjList[A][B], C)
    }

    const floydWarshall = () => {
        const dp = new Array(N+1).fill(null).map(()=>
            new Array(N+1).fill(null).map(()=>INF)
        )

        for (let i = 1; i < N+1; i++) {
            for (let j = 1; j < N+1; j++) {
                if (i === j) {
                    dp[i][j] = Math.min(0, adjList[i][j], dp[i][j])
                } else {
                    dp[i][j] = Math.min(adjList[i][j], dp[i][j])
                }
            }
        }

        for (let k = 1; k < N+1; k++) {
            for (let i = 1; i < N+1; i++) {
                for (let j = 1; j < N+1; j++) {
                    if (dp[i][k] !== INF && dp[k][j]!== INF) {
                        dp[i][j] = Math.min(dp[i][j],  dp[i][k] + dp[k][j])
                    }
                }
            }
        }
        return dp
    }
    const res = floydWarshall()
    let ans = ''
    let flag = false
    for (let i = 2; i < N+1; i++) {
        if (res[1][i] !== INF &&  res[i][i] < 0) {
            flag = true
        }
    }
    if (res[1][1] < 0) {
        flag = true
    }

    if (flag) {
        ans = `-1`
    } else {
        for (let i = 2; i < N+1; i++) {
            if (res[1][i] === INF) {
                ans += `-1\n`
            } else {
                ans += `${res[1][i]}\n`
            }
        }
    }
    console.log(ans)
})


/*
4 5
1 4 3
4 2 4
2 3 -4
3 4 -2
4 3 3

-1
* */
