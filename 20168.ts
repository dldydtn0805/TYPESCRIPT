import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let idx = 0;
let inputLines: Array<string> = [];

rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    const [N, M, A, B, C] = inputLines[idx++].split(' ').map(Number)
    const adj_list :Array<Array<Array<number>>> = new Array(N+1).fill(null).map(()=>[])
    for (let i = 0 ; i < M ; i ++) {
        const [X, Y, Z] = inputLines[idx++].split(' ').map(Number);
        adj_list[X].push([Y, Z])
        adj_list[Y].push([X, Z])
    }
    const ans = new Array(N+1).fill(1e9)
    const bfs = (si : number) => {
        const queue :Array<Array<number>> = []
        const distance :Array<number> = new Array(N+1).fill(null).map(()=>1e9)
        queue.push([si,0])
        distance[si] = 0
        while (queue.length) {
            queue.sort((A,B)=>A[1]-B[1])
            const [ci, cw] = queue.shift()
            for (let [ni, nw] of adj_list[ci]) {
                const next = nw + distance[ci]
                const next_shame = Math.max(cw, nw)
                if (next <= C && next_shame < ans[ni]) {
                    queue.push([ni, next_shame])
                    distance[ni] = next
                    ans[ni] = Math.min(ans[ni], next_shame)
                }
            }
        }
        return distance
    }
    bfs(A)
    console.log(ans[B] !== 1e9 ? ans[B] : -1)
});

/*
2 1 1 2 10
1 2 11
* */
