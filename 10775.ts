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
    const [G] = inputLines[idx++].split(' ').map(Number)
    const [P] = inputLines[idx++].split(' ').map(Number)
    const parents = new Array(G+1).fill(null).map((e, i )=> i )
    const find = (x) => {
        if (parents[x] === x) {
            return x
        }
        parents[x] = find(parents[x])
        return parents[x]
    }

    const union = (x, y) => {
        x = find(x)
        y = find(y)
        parents[y] = x
    }
    // ;

    let cnt = 0
    for (let i = 0 ; i < P; i++) {
        const [g] = inputLines[idx++].split(' ').map(Number)
        const cur = find(g)
        if (cur === 0) {
            break
        }
        cnt ++
        union(cur-1, cur)

    }
    console.log(cnt)
})


/*
4
4
4
2
2
1
* */
