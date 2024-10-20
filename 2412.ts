import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let idx = 0;
let inputLines: Array<string> = [];
const INF = Number.MIN_SAFE_INTEGER
rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    const [N, T] = inputLines[idx++].split(' ').map(Number)
    let [ci, cj] = [0, 0];
    const edges :Set<String> = new Set()
    for (let i = 0 ; i < N ; i++) {
        const [X, Y] = inputLines[idx++].split(' ').map(Number);
        edges.add(JSON.stringify([Y,X]))
    }
    const visited :Set<String> = new Set()
    const queue = []
    const bfs = () :number => {
        // queue = [I, J, CNT];
        queue.push([0, 0, 0])
        while (queue.length) {
            const [ci, cj, cnt] = queue.shift()
            for (let i = ci-2 ; i <= ci+2; i++ ) {
                for (let j = cj-2 ; j <= cj+2; j++) {
                    if (edges.has(JSON.stringify([i,j])) && !visited.has(JSON.stringify([i,j]))) {
                        if (i === T) {return cnt+1}
                        queue.push([i, j, cnt+1]);
                        visited.add(JSON.stringify([i,j]))
                    }
                }
            }
        }
        return -1
    }
    console.log(bfs())
});
