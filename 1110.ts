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

    const dfs = (ci: number, ri:number, cnt:number) => {
        const str = String(ci).split('')
        if (str.length === 1) {
            str.unshift('0')
        }
        const curStr = String(Number(str[0])+Number(str[1])).split('')

        const nextStr = str[str.length-1]+curStr[curStr.length-1]
        const ni = Number(nextStr)
        if (ri === ni) {
            return cnt
        }
        return dfs(ni, ri, cnt+1)
    }

    console.log(dfs(N, N, 1))

})


/*
26
* */
