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
    const parents = new Array(N).fill(null).map((elem, idx )=>idx)

    const find = (x : number) => {
        if (parents[x] === x) {
            return x
        }
        parents[x] = find(parents[x])
        return parents[x]
    }
    
    const union = (x:number, y:number) => {
        const X = find(x)
        const Y = find(y)
        if (X > Y) {
            parents[Y] = X
        } else {
            parents[X] = Y
        }
    }
    
    let ans = 0
    
    for (let i = 1 ; i < M+1 ; i ++) {
        const [A, B] = inputLines[idx++].split(' ').map(Number)
        if (find(A) !== find(B)) {
            union(A, B)
        } else {
            ans = i
            break
        }
    }
    
    console.log(ans)
})

/*
3 4
0 1
1 2
2 0
3 2
*/
