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
    const [N] = inputLines[idx++].split(' ').map(Number)
    const edges :Array<Array<number>> = []
    for (let i = 0 ; i < N ; i ++) {
        const arr = inputLines[idx++].split(' ').map(Number)
        for (let j = 0 ; j < N; j++) {
            edges.push([i, j, arr[j]])
        }
    }
    const parents = new Array(N).fill(null).map((elem, idx)=>idx)
    const union = (x:number , y:number) => {
        const X = find(x)
        const Y = find(y)
        parents[Y] = X
    }

    const find = (x:number) => {
        if (parents[x] === x) {
            return x
        }
        parents[x] = find(parents[x])
        return parents[x]
    }

    const kruskal = () => {
        const mst = []
        for (let i = 0; i < edges.length; i++) {
            const [A, B, C] = edges[i]
            if (find(A) === find(B)) {
                continue
            }
            mst.push(edges[i])
            union(A, B)
            if (mst.length === N-1) {
                return mst
            }
        }
        return [[-1, -1, -1]]
    }
    edges.sort((A,B)=>A[2]-B[2])
    const res = kruskal()
    if (N === 1) {
        console.log(0)
    } else {
        console.log(res.reduce((A,B)=>A+B[2],0))
    }
})

/*
1
0
* */
