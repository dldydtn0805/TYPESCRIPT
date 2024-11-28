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
    const maps = []
    for (let i = 0 ; i < N ; i ++) {
        maps.push(inputLines[idx++].split(' ').map(Number))
    }
    const homes = []
    const chickens = []
    for (let i = 0 ; i < N ; i ++) {
        for (let j = 0 ; j < N ; j ++) {
            if (maps[i][j] === 1) {
                homes.push([i, j])
            } else if (maps[i][j] === 2) {
                chickens.push([i, j])
            }
        }
    }
    const visited = new Array(chickens.length).fill(null).map(()=>0)
    let ans = INF
    const backtracking = (idx:number, depth: number) => {
        if (depth === M) {
            const distance = {}
            for (let i = 0 ; i < chickens.length; i++) {
                if (visited[i] === 1) {
                    const [ci, cj] = chickens[i]
                    for (let j = 0 ; j < homes.length; j ++) {
                        const [hi, hj] = homes[j]
                        if (!distance.hasOwnProperty(`${hi},${hj}`)) {
                            distance[`${hi},${hj}`] = Math.abs(ci-hi)+Math.abs(cj-hj)
                        } else {
                            distance[`${hi},${hj}`] = Math.min(distance[`${hi},${hj}`], Math.abs(ci-hi)+Math.abs(cj-hj))
                        }
                    }
                }
            }
            let value = 0
            for (let key in distance) {
                value += distance[key]
            }
            ans = Math.min(ans, value)
            return
        }
        for (let i = idx ; i < chickens.length; i ++) {
            if (visited[i] === 0) {
                visited[i] = 1
                backtracking(i+1, depth+1)
                visited[i] = 0
            }
        }
    }
    backtracking(0, 0)
    console.log(ans)
})

