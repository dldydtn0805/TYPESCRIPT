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
    const [N, Q] = inputLines[idx++].split(' ').map(Number)
    const adjLists = []

    for (let i = 0 ; i < Q; i++) {
        adjLists.push(inputLines[idx++].split(' ').map(Number))
    }
    adjLists.sort((A,B)=> {
        if (A[2]===B[2]) {
            return A[3] - B[3]
        } else {
            return A[2] - B[2]
        }
    })
    const parents = new Array(N+1).fill(null).map((e,i)=>i)
    const find = (x:number) => {
        if (parents[x] === x) {
            return parents[x]
        }
        parents[x] = find(parents[x])
        return parents[x]
    }

    const union = (X, Y) => {
        X = find(X)
        Y = find(Y)
        if (X !== Y) {
            parents[X] = Y
        }
    }

    const kruscal = () => {
        const mst = []
        for (let i = 0 ; i < Q; i ++) {
            let [from, to, cost, time] = adjLists[i]
            if (find(from) === find(to)) {
                continue
            }
            mst.push(adjLists[i])
            union(from, to)
            if (mst.length === N-1) {
                let totalCost = 0, totalTime = 0
                for (let j = 0 ; j < N-1; j++) {
                    const [from, to, cost, time] = mst[j]
                    totalCost += cost
                    totalTime = Math.max(time, totalTime)
                }
                return [totalTime, totalCost]
            }
        }

        return [-1]
    }
    console.log(...kruscal())
})


/*
3 3
1 2 3 10
1 2 1 15
2 3 4 12
* */
