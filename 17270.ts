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
    const [V , M] = inputLines[idx++].split(' ').map(Number)
    const adjList = new Array(V+1).fill(null).map(()=>
        new Array(V+1).fill(null).map(()=>INF)
    )
    for (let i = 0 ; i <  M ; i ++) {
        const [a, b, c] = inputLines[idx++].split(' ').map(Number)
        adjList[a][b] = Math.min(adjList[a][b], c)
        adjList[b][a] = Math.min(adjList[b][a], c)
    }
    const [J, S] = inputLines[idx++].split(' ').map(Number)

    const floydWarshall = () => {
        const dp = new Array(V+1).fill(null).map(()=>
            new Array(V+1).fill(null).map(()=>INF)
        )

        for (let i = 1 ; i < V+1; i ++) {
            for (let j = 1 ; j < V+1; j++) {
                if (i === j) {
                    dp[i][j] = 0
                    dp[j][i] = 0
                }
            }
        }

        for (let i = 1 ; i < V+1; i++) {
            for (let j = 1 ; j <V+1; j++) {
                dp[i][j] = Math.min(dp[i][j], adjList[i][j])
            }
        }

        for (let k = 1 ; k < V+1; k ++) {
            for (let i = 1; i < V+1; i++) {
                for (let j = 1; j < V+1; j++) {
                    dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j])
                }
            }
        }
        return dp
    }
    const res = floydWarshall()
    let checkOne= []
    let value = 1e9
    for (let i = 1 ; i < V+1; i++) {
        const cur = res[i][J] + res[i][S]
        if (i !== J && i !== S) {
            if (cur < value) {
                value = cur
                checkOne = []
                checkOne.push(i)
            } else if (cur === value) {
                checkOne.push(i)
            }
        }
    }

    let checkTwo = []
    for (let ni of checkOne) {
        if (res[ni][J] <= res[ni][S]) {
            checkTwo.push(ni)
        }
    }

    let checkThree = []
    let cnt = INF
    for (let ni of checkTwo) {
        if (res[ni][J] < cnt ) {
            cnt = res[ni][J]
            checkThree = []
            checkThree.push(ni)
        } else if (cnt === res[ni][J]) {
            checkThree.push(ni)
        }
    }

    console.log(checkThree.length > 0 ? Math.min(...checkThree) : -1)

})
