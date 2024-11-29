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
    const [N, K] = inputLines[idx++].split(' ').map(Number)
    const springs = inputLines[idx++].split(' ').map(Number)
    const queue = []
    const visited = new Set()

    for (let spring of springs) {
        queue.push([spring, spring])
        visited.add(spring)
    }

    const bfs = () => {
        let ans = 0
        let cnt = 0
        while (queue.length) {
            const [ci, root] = queue.shift()
            for (let ni of [ci+1, ci-1]) {
                if (!visited.has(ni)) {
                    queue.push([ni, root])
                    ans += Math.abs(root-ni)
                    visited.add(ni)
                    cnt ++
                    if (cnt === K) {
                        return ans
                    }
                }
            }
        }
    }
    console.log(bfs())
})

