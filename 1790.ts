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
    let [ N , K ] = inputLines[idx++].split(' ').map(Number)
    const total = []
    for (let i = 1; 9*(10**(i-1)) <= 1000000000; i++) {
        total.push((i)*9*(10**(i-1)))
    }
    for (let i = 1 ; i < total.length; i++) {
        total[i] = total[i-1] + total[i]
    }
    let num
    for (let i = 0; i < total.length; i ++) {
        if (total[i] >= K) {
            num = i
            break
        }
    }
    const minus = num > 0 ? total[num-1] : 0
    K-=minus
    let numbers = 0
    let start = 10**num
    let cnt = 0
    for (let i = 10**(num); i < 10**(num+1); i++) {
        cnt += num+1
        start += 1
        if (cnt >= K) {
            numbers = i
            break
        }

    }
    if (start-1 <= N)  {
        console.log(String(numbers)[K+num-cnt])
    }
    else {
        console.log(-1)
    }
});
