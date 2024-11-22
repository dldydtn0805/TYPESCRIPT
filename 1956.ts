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
    const [V, E] = inputLines[idx++].split(' ').map(Number)
    const adjList :Array<Array<number>> = new Array(V+1).fill(null).map(()=>
        new Array(V+1).fill(null).map(()=>INF)
    )
    for (let i = 0 ; i < E; i ++) {
        const [a, b, c] = inputLines[idx++].split(' ').map(Number)
        adjList[a][b] = c
    }
    let ans = INF

    const floydWarshall = () => {
        const dp = new Array(V+1).fill(null).map(()=>
            new Array(V+1).fill(null).map(()=>INF)
        )
        for (let i = 1; i < V+1; i++) {
            for (let j = 1; j < V+1; j++) {
                dp[i][j] = Math.min(dp[i][j], adjList[i][j])
            }
        }

        for (let k = 1 ; k < V+1; k++) {
            for (let i = 1; i < V+1; i++) {
                for (let j = 1 ; j < V+1; j++) {
                    dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j])
                }
            }
        }
        return dp
    }
    const res = floydWarshall()
    for (let i =1 ; i < V+1; i++) {
        ans = Math.min(ans, res[i][i])
    }
    console.log(ans !== INF ? ans : -1)
})

