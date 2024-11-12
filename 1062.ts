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
    const [N, K] = inputLines[idx++].split(' ').map(Number)
    const words = new Array(N).fill(null).map(()=>0)
    const tmp = new Set([0,2,8,13,19])
    for (let i = 0 ; i < N ; i ++) {
        const word = inputLines[idx++].split('').map(String)
        words[i] = 0;
        word.forEach(elem => {
            const data = elem.charCodeAt(0)-97
            if (!tmp.has(data)) {
                words[i] |= 1 << data
            }
        })
    }

    const visited = new Array(26).fill(null).map(()=>0)
    let ans = 0
    const backtracking = (idx : number, cnt:number) => {
        if (cnt === K-5) {
            let bitmask = 0;
            for (let i = 0; i < 26; i ++) {
                if (visited[i] === 1) {
                    bitmask |= 1 << i;
                }
            }
            let cur = 0
            for (let i = 0; i < N; i ++) {
                if ((bitmask & words[i]) === words[i]) {
                    cur ++
                }
            }
            ans = Math.max(ans, cur)
            return
        }
        for (let ni = idx + 1 ; ni < 26; ni ++) {
            if (visited[ni] === 0 && !tmp.has(ni)) {
                visited[ni] = 1
                backtracking(ni, cnt+1)
                visited[ni] = 0
            }
        }
    }
    if (K-5 > 0) {
        for (let i = 0; i < 26; i ++) {
            if (!tmp.has(i)) {
                visited[i] = 1
                backtracking(i, 1)
                visited[i] = 0
            }
        }
    } else if (K === 5){
        for (let i = 0 ; i < N; i ++) {
            if (words[i] === 0) {
                ans ++
            }
        }
    }
    console.log(ans)


});
