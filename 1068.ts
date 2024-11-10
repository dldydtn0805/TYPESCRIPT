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
    const [N] = inputLines[idx++].split(' ').map(Number)
    const parents = inputLines[idx++].split(' ').map(Number)
    const [toDeleteNode] = inputLines[idx++].split(' ').map(Number)
    const children :Array<Array<number>> = new Array(N).fill(null).map(()=>[])
    let root = -1
    for (let i = 0; i < N; i++) {
        if (parents[i] !== -1) {
            children[parents[i]].push(i)
        } else {
            root = i
        }
    }
    const dfs = (ci : number) => {
        if (children[ci].length === 0) {
            return 1
        }
        let leaf = 0
        for (let ni of children[ci]) {
            if (ni !== toDeleteNode) {
                leaf += dfs(ni)
            }
        }
        return Math.max(leaf, 1)
    }
    const ans = dfs(root)
    if (root !== toDeleteNode) {
        console.log(ans)
    } else {
        console.log(0)
    }
});

