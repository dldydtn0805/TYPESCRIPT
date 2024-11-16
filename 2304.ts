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
    const products = []
    let maxHeight = 0
    for (let i = 0 ; i < N ; i++) {
        const [L, H] = inputLines[idx++].split(' ').map(Number)
        products.push([L, H])
        maxHeight = Math.max(maxHeight, H)
    }
    products.sort((A,B)=>A[0]-B[0])
    const maxIndex = products.findIndex((elem)=>elem[1]===maxHeight)
    let ans = 0
    let head = products[0][1]
    let headWidth = 0
    for (let i = 1 ; i < maxIndex; i++) {
        headWidth += products[i][0] - products[i-1][0]
        if (products[i][1] > products[i-1][1]) {
            ans += (head)*(headWidth)
            headWidth = 0
        }
        head = Math.max(head, products[i][1])
    }
    if (maxIndex > 0) {
        headWidth += products[maxIndex][0] - products[maxIndex-1][0]
    }

    ans += head*headWidth
    let tail = products[N-1][1]
    let tailWidth = 0
    for (let j = N-2; j > maxIndex; j--) {
        tailWidth += products[j+1][0] - products[j][0]
        if (products[j][1] > products[j+1][1]) {
            ans += (tail)*(tailWidth)
            tailWidth = 0
        }
        tail = Math.max(tail, products[j][1])
    }

    if (maxIndex < N-1) {
        tailWidth += products[maxIndex+1][0] - products[maxIndex][0]
    }

    ans += tail*tailWidth
    ans += maxHeight
    console.log(ans)
})
