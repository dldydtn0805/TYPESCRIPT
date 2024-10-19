import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let idx = 0;
let inputLines: Array<string> = [];
const INF = Number.MIN_SAFE_INTEGER
rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    const [N, M] = inputLines[idx++].split(' ').map(Number)
    const arr :Array<Array<number>> = [new Array(M+1).fill(null).map(()=>0)]

    for (let i = 0 ; i < N ; i++) {
        arr.push(([0, ...inputLines[idx++].split(' ').map(Number)]))
    }
    for (let i = 1 ; i < N+1; i ++) {
        arr[i][0] = arr[i-1][0] + arr[i][0]
    }
    for (let j = 1; j < M+1; j++) {
        arr[0][j] = arr[0][j-1] + arr[0][j]
    }
    for (let i = 1; i < N+1; i ++) {
        for (let j = 1; j < M+1; j++) {
            arr[i][j] = arr[i-1][j] + arr[i][j-1] - arr[i-1][j-1] + arr[i][j]
        }
    }

    const dp :Array<Array<number>> = new Array(N+1).fill(null).map(()=>
        new Array(M+1).fill(null).map(()=>INF)
    )
    dp[1][1] = arr[1][1]
    for (let  i = 0 ; i < N+1 ; i ++) {
        for (let j = 0; j < M+1 ; j ++) {
            for (let q = 0; q < i; q++) {
                for (let w = 0; w < j; w++) {
                    dp[i][j] = Math.max(dp[i][j], arr[i][j] - arr[q][j] - arr[i][w] + arr[q][w])
                }
            }
        }
    }
    const ans = dp.reduce((cnt, elem)=> cnt = Math.max(cnt, Math.max(...elem)), INF)
    console.log(ans)
});
