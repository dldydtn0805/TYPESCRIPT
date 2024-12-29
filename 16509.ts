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
    const [R1, C1] = inputLines[idx++].split(' ').map(Number)
    const [R2, C2] = inputLines[idx++].split(' ').map(Number)
    const [N, M] = [10, 9]
    const directions = [
        {'route' : [[-1,0],[-2,-1]], 'target' : [-3,-2]},
        {'route' : [[-1,0],[-2,1]], 'target' : [-3,2]},
        {'route' : [[0,1],[-1,2]], 'target' : [-2,3]},
        {'route' : [[0,1],[1,2]], 'target' : [2,3]},
        {'route' : [[1,0],[2,1]], 'target' : [3,2]},
        {'route' : [[1,0],[2,-1]], 'target' : [3,-2]},
        {'route' : [[0,-1],[1,-2]], 'target' : [2,-3]},
        {'route' : [[0,-1],[-1,-2]], 'target' : [-2,-3]},
    ]

    const check = (route:Array<Array<number>>, target:Array<number> ,ci, cj) => {
        for (const [di, dj] of route) {
            const [ni, nj] = [ci+di, cj+dj]
            if (0<=ni && ni<N && 0<=nj && nj<M) {
                if (ni === R2 && nj === C2) {
                    return false
                }
            }
        }
        const [ti, tj] = [ci+target[0], cj+target[1]]
        return (0<=ti && ti<N && 0<=tj && tj<M)
    }
    const bfs = (si, sj) => {
        const queue = []
        const visited = new Array(N).fill(null).map(()=>
            new Array(M).fill(null).map(()=>0)
        )
        queue.push([si, sj, 0])
        visited[si][sj] = 1
        while (queue.length > 0) {
            const [ci, cj, cnt] = queue.shift()
            for (const {route, target} of directions) {
                const [ni, nj] = [ci+target[0], cj+target[1]]
                if (check(route, target, ci, cj) && visited[ni][nj] === 0) {
                    if (ni === R2 &&  nj === C2) {
                        return cnt+1
                    }
                    visited[ni][nj] = 1
                    queue.push([ni, nj, cnt+1])
                }
            }
        }
        return -1
    }
    console.log(bfs(R1, C1))

})


/*
4 2
2 5
* */
