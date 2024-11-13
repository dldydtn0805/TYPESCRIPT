import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let idx = 0;
let inputLines: Array<string> = [];
const INF = Number.MAX_SAFE_INTEGER
rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    const [V, E] = inputLines[idx++].split(' ').map(Number)

    // FIND
    const parents = new Array(V+1).fill(null).map(()=>0)
    for (let i = 1 ; i < V+1; i++) {
        parents[i] = i
    }

    // KRUSKAL
    const edges :Array<Array<number>> = []
    for (let i = 0 ; i < E ; i ++) {
        edges.push(inputLines[idx++].split(' ').map(Number))
    }


    // X : LEAF
    const findRoot = (x:number) :number => {
        if (parents[x] === x) {
            return x
        }
        return parents[x] = findRoot(parents[x])
    }

    // X : ROOT / Y : ROOT
    const unionRoot = (x:number, y:number) => {
        x = findRoot(x)
        y = findRoot(y)
        if (x !== y) {
            parents[y] = x
        }
    }

    const kruskal = (edges :Array<Array<number>>) :Array<Array<number>> => {
        const mst = []
        for (let i = 0 ; i < edges.length; i++) {
            const [A, B, C] = edges[i]
            if (findRoot(A) === findRoot(B)) {
                continue
            }
            mst.push(edges[i])
            unionRoot(A, B)
            if (mst.length === V-1) {
                return mst
            }
        }
        return [[-1,-1,-1]]
    }

    edges.sort((A,B)=>A[2]-B[2])
    const ans = kruskal(edges).reduce((acc,cur)=>acc+cur[2], 0)
    console.log(ans)

});
