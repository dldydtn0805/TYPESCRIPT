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
    const [T] = inputLines[idx++].split(' ').map(Number)
    let ans = ''
    const findDepth = (x : number, parents: Array<number>, depth: Array<number>) => {
        if (parents[x] === x) {
            return 0
        }
        depth[x] = findDepth(parents[x], parents, depth)+1
        return depth[x]
    }

    const LCA = (x : number, y : number, parents : Array<number>, depth : Array<number>) => {
        findDepth(x, parents, depth)
        findDepth(y, parents, depth)
        let X = depth[x]
        let Y = depth[y]
        while (X > Y) {
            if (x !== y) {
                x = parents[x]
            }
            X -= 1
        }
        while (Y > X) {
            if (x !== y) {
                y = parents[y]
            }
            Y -= 1
        }
        while (x !== y) {
            x = parents[x]
            y = parents[y]
        }
        return x
    }

    for (let tc = 0 ; tc < T ; tc++) {
        const [N] = inputLines[idx++].split(' ').map(Number)
        const parents = new Array(N+1).fill(null).map((elem, idx)=>idx)
        const depth = new Array(N+1).fill(null).map(()=>0)
        for (let i = 0 ; i < N-1; i++) {
            const [A, B] = inputLines[idx++].split(' ').map(Number)
            parents[B] = A
        }
        const [X, Y] = inputLines[idx++].split(' ').map(Number)
        const res = (LCA(X,Y,parents,depth))
        ans += `${res}\n`
    }
    console.log(ans)
})
