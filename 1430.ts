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
    // R : 사정 거리 / D : 초기 에너지 / X Y : 적의 위치
    const [N, R, D, X , Y] = inputLines[idx++].split(' ').map(Number)
    const towers = []
    for (let i = 0 ; i < N ; i++) {
        const [A, B] = inputLines[idx++].split(' ').map(Number)
        towers.push([A, B])
    }

    // 적의 위치에 닿는 타워 탐색
    const queue = []
    const visited = new Array(N+1).fill(null).map(()=>-1)
    towers.forEach(([i, j], index)=> {
        if (Math.sqrt((X-i)**2+(Y-j)**2) <= R) {
            queue.push(index)
            visited[index] = 0
        }
    })


    const bfs = () => {
        while (queue.length) {
            const cur = queue.shift()
            const [ci, cj] = towers[cur]
            for (let i = 0; i < N ; i ++) {
                if (visited[i] === -1) {
                    const [ni, nj] = towers[i]
                    if (Math.sqrt((ci-ni)**2+(cj-nj)**2) <= R) {
                        queue.push(i)
                        visited[i] = visited[cur] + 1
                    }
                }
            }
        }
    }
    bfs()
    // console.log(visited)
    let ans = 0
    visited.forEach((elem)=>{
        if (elem !== -1) {
            ans += D/2**(elem)
        }
    })
    console.log(ans)
})


/*
4 2 10 0 0
2 0
4 0
6 0
8 0
* */
