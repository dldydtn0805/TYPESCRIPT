import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let idx = 0;
let inputLines :Array<string> = [];
const INF = Number.MAX_SAFE_INTEGER
rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    const [A, B] = inputLines[idx++].split(' ').map(BigInt)
    const N = 60
    // 2**N-1까지 등장하는 1의 개수
    const prefixSum = new Array(N).fill(null).map(()=>0)
    for (let i = 0 ; i < N; i ++) {
        if (i === 0) {
            prefixSum[i] = 0
        } else if (i === 1) {
            prefixSum[i] = 1
        } else {
            prefixSum[i] = 2*prefixSum[i-1] + 2**(i-1)
        }
    }

    const cal = (num : bigint) => {
        let cnt = BigInt(0)
        let binNum = num.toString(2);
        for (let i = 0; i < binNum.length; i++) {
            if (binNum[i] === '1') {
                const pow = (binNum.length-i-1)
                cnt += BigInt(prefixSum[pow])
                cnt += num-BigInt(2**pow)+BigInt(1)
                num = num - BigInt(2**pow)
            }
        }
        return cnt
    }
    console.log((cal(B)-cal(A-BigInt(1))).toString())

})


/*
2 12
* */
