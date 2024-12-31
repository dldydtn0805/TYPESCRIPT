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
    const [N, M, K] = inputLines[idx++].split(' ').map(Number)
    const children = inputLines[idx++].split(' ').map(Number)
    children.unshift(0)
    const adjList = new Array(N+1).fill(null).map(()=>[])
    for (let i = 0 ; i < M ; i ++) {
        const [a, b] = inputLines[idx++].split(' ').map(Number)
        adjList[a].push(b)
        adjList[b].push(a)
    }
    const candy = {}
    const visited = new Array(N+1).fill(null).map(()=>0)
    const dfs = (ci:number, ri:number) => {
        for (const ni of adjList[ci]) {
            if (visited[ni] === 0) {
                visited[ni] = ri
                candy[ri][0] ++
                candy[ri][1] += children[ni]
                dfs(ni, ri)
            }
        }
    }
    for (let si = 1 ; si < N+1; si++) {
        if (visited[si] === 0) {
            visited[si] = si
            candy[si] = [1, children[si]]
            dfs(si, si)
        }
    }
    const candies = []
    for (const key in candy) {
        candies.push(candy[key])
    }
    candies.sort((A,B)=>A[0] === B[0] ? A[1]-B[1] : A[0] - B[0] )
    candies.unshift([0,0])
    const L = candies.length
    // console.log(candies)
    // dp = [분리집합][울음]
    const dp = new Array(L+1).fill(null).map(()=>
        new Array(K+1).fill(null).map(()=>0)
    )
    if (candies[1][0] < K+1) {
        dp[1][candies[1][0]] = candies[1][1]
    }
    for (let i = 1 ; i < L ; i++) {
        for (let j = 1; j < K; j++) {
            if (j-candies[i][0] >= 0) {
                dp[i][j] = Math.max(dp[i-1][j], dp[i-1][j-candies[i][0]] + candies[i][1])
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j])
            }
        }
    }
    // console.log(candies)
    // console.log(dp)
    console.log(dp[L-1][K-1])
})


/*
10 6 6
9 15 4 4 1 5 19 14 20 5
1 3
2 5
4 9
6 2
7 8
6 10
* */
