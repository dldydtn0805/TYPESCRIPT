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
    const [N] = inputLines[idx++].split(' ').map(Number)
    let ans = 1
    const colors = new Array(N+1).fill(null).map(()=>0)
    colors[1] = 1
    let cur = 2
    for (let i = 2 ; i < N+1; i++) {
        let flag = true
        if (colors[i] === 0) {
            for (let j = 2; j < i**(0.5)-1; j++) {
                if (i % j === 0) {
                    flag = false
                }
            }
            if (flag) {
                colors[i] = cur
                for (let j = i; j < N+1; j+=i) {
                    colors[j] = cur
                }
                cur ++
                ans ++
            }
        }

    }
    console.log(ans)
    console.log(colors.splice(1, N+1).join(' '))
})
