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
    const [N, T, G] = inputLines[idx++].split(' ').map(Number)
    const bfs = () => {
        const queue = []
        // queue = [number, pushCnt]
        queue.push([N, 0])
        const visited = new Array(100000).fill(null).map(()=>0)
        visited[N] = 1
        while (queue.length) {
            const [ci, ct] = queue.shift()
            let double = ci + 1
            if (ci !== 0 && ci*2 <= 99999) {
                const number = String(ci*2).split('').map(Number)
                number[0]--
                double  = Number(number.join(''))
            }
            for (const ni of [ci+1, double]) {
                if (visited[ni] === 0 && ct+1 <= T) {
                    if (ni === G) {
                        return ct+1
                    }
                    queue.push([ni, ct+1])
                    visited[ni] = 1
                }
            }
        }
        return 'ANG'
    }
    console.log(N===G ? 0 : bfs())
})


/*
1 7 10
* */
