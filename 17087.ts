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
    const [N, S] = inputLines[idx++].split(' ').map(Number)
    const A = inputLines[idx++].split(' ').map(Number)
    const numbers = A.map((elem)=>Math.abs(S-elem))
    numbers.sort((a, b) => a - b)

    // 유클리드 호제법
    const gcd = (A : number, B : number) => {
        while (B !== 0) {
            let next = B
            B = A % B
            A = next
        }
        return A
    }

    let ans
    if (N > 1) {
        let cur = gcd(numbers[0], numbers[1])
        for (let i = 2; i < N; i ++) {
            cur = gcd(cur, numbers[i])
        }
        ans = cur
    } else {
        ans = numbers[0]
    }
    console.log(ans)


});
