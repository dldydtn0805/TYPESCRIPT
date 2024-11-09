import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let idx = 0;
let inputLines = [];
rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    const [N, B] = inputLines[idx++].split(' ').map(Number)
    const A = []
    for (let i = 0 ; i < N ; i ++) {
        A.push(inputLines[idx++].split(' ').map(Number))
    }
    const multiply = (left, right) => {
        const matrix = new Array(N).fill(null).map(()=>
            new Array(N).fill(null).map(()=>0)
        )

        for (let i = 0; i < N ; i ++) {
            for (let j = 0 ; j < N; j ++) {
                for (let k = 0; k < N; k++) {
                    matrix[i][j] += (left[i][k]*right[k][j])
                }
            }
        }
        return matrix.map((row)=>row.map((col)=>col%1000))

    }
    const divide = (e) => {
        if (e === 2) {
            return multiply(A, A)
        } else {
            if (e % 2 === 0) {
                const next = divide(Math.floor(e/2))
                return multiply(next, next)
            } else {
                return multiply(divide(e-1), A)
            }
        }
    }
    const res = B === 1 ? A : divide(B)
    const ans = res.map((row)=>row.map((col)=>col%1000))
    for (let i = 0 ; i < N ; i++) {
        console.log(ans[i].join(' '))
    }
});
