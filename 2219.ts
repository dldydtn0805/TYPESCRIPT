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
    const adjList = new Array(N+1).fill(null).map(()=>
        new Array(N+1).fill(null).map(()=>INF)
    )
    for (let i = 0 ; i < M; i ++) {
        const [A, B, C] = inputLines[idx++].split(' ').map(Number)
        adjList[A][B] = Math.min(adjList[A][B], C)
        adjList[B][A] = Math.min(adjList[B][A], C)
    }
    const floydWarshall = (adjList :Array<Array<number>>, N:number) => {
        const distance = new Array(N+1).fill(null).map(()=>
            new Array(N+1).fill(null).map(()=>INF)
        )
        for (let i = 1; i < N+1; i++) {
            for (let j = 1; j < N+1; j++) {
                if (i === j) {
                    distance[i][j] = 0
                } else {
                    distance[i][j] = adjList[i][j]
                }
            }
        }

        for (let k = 1; k < N+1; k++) {
            for (let i = 1; i < N+1; i++ ) {
                for (let j = 1; j < N+1; j++) {
                    distance[i][j] = Math.min(distance[i][k]+distance[k][j], distance[i][j])
                }
            }
        }
        return distance

    }
    const res = (floydWarshall(adjList, N))
    let ans = INF
    let ansI = 0
    for (let i = 1; i < N+1; i++) {
        const cur = (res[i].slice(1, N+1))
        const val = cur.reduce((A,B)=>A+B,0)
        if (ans > val) {
            ans = val
            ansI = i
        }
    }
    console.log(ansI)
})


/*
3 3
1 2 1
1 3 3
2 3 2
* */
