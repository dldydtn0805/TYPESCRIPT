import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let idx = 0;
let inputLines = [];
const MOD = 10**9+7
rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    const [N] = inputLines[idx++].split(' ').map(Number)
    const pepper = inputLines[idx++].split(' ').map(Number)
    pepper.sort((A,B)=>A-B)
    let ans = BigInt(0);
    const pow = (X : number) :bigint => {
        if (X === 0) {
            return BigInt(1)
        }
        const half = pow(Math.floor(X/2))
        if (X % 2 === 0) {
            return half*half%BigInt(MOD)
        } else {
            return half*half*BigInt(2)%BigInt(MOD)
        }
    }


    for (let i = 0 ; i < N ; i ++) {
        ans += BigInt(pepper[i]) * pow(i)
        ans -= BigInt(pepper[i]) * pow(N - i - 1)
        ans %= BigInt(MOD)
    }
    console.log(ans.toString())

});
