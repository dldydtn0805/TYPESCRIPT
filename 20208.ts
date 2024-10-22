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
    const [N, M, H] = inputLines[idx++].split(' ').map(Number)
    let [si, sj] = [-1, -1]
    const milks = []
    for (let i = 0 ; i < N; i++) {
        const arr =  inputLines[idx++].split(' ').map(Number);
        for (let j = 0; j < N ; j++) {
            if (arr[j] === 1) {
                [si, sj] = [i, j]
            }
        }
        for (let k = 0; k < N; k++) {
            if (arr[k] === 2) {
                milks.push([i, k])
            }
        }
    }
    let ans = 0
    const visited = new Array(milks.length).fill(null).map(()=>0)
    const dfs = (ci : number, cj:number, hp: number, cnt : number) => {
        let home_hp = hp-(Math.abs(si-ci)+Math.abs(sj-cj))
        if (home_hp>=0) {
            ans = Math.max(ans, cnt)
        }
        for (let i = 0 ; i <  milks.length; i++) {
            const [ni, nj] = milks[i]
            if (!visited[i]) {
                let next_hp = hp-(Math.abs(ci-ni)+Math.abs(cj-nj))
                if (next_hp>=0) {
                    visited[i] = 1
                    dfs(ni, nj, next_hp + H, cnt+1)
                    visited[i]= 0
                }
            }
        }
    }
    dfs(si, sj, M, 0)
    console.log(ans)
});
