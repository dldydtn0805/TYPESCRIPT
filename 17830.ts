import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let idx = 0;
let inputLines = [];
let T = 0
const INF = Number.MAX_SAFE_INTEGER
rl.on('line', (line: string) => {
    inputLines.push(line);
    if (idx === 0) {
        [T] = inputLines[idx++].split(' ').map(Number)
        idx++
    } else {
        let [N, B] = line.split(' ').map(String)

        let start = Number(N)+1
        let cnt = 0
        const maxNumbers = [0, 0, 0]
        const minNumbers = [0, 0, 0]

        for (let i = Number(N)-1; i >= 0 ; i--) {
            if (B[i] === '?' || B[i] === '1') {
                maxNumbers[2]++
                if (maxNumbers[0] === 0) {
                    maxNumbers[0] = start+cnt
                } else {
                    maxNumbers[1] = maxNumbers[0]
                    maxNumbers[0] = start+cnt
                }
            }
            if (B[i] === '1') {
                minNumbers[2]++
                if (minNumbers[0] === 0) {
                    minNumbers[0] = start+cnt
                } else {
                    minNumbers[1] = minNumbers[0]
                    minNumbers[0] = start + cnt
                }
            }
            cnt ++
        }

        let maxAns = maxNumbers[2] === 1 ? maxNumbers[0] - 1 : maxNumbers[0]
        let minAns = minNumbers[2] === 1 ? minNumbers[0] - 1 : minNumbers[0]
        if (maxNumbers[2] === 0) {
            maxAns = 1
        }
        if (minNumbers[2] === 0) {
            minAns = 1
        }
        idx++
        console.log(maxAns, minAns)
        if (idx === T+2) {
            rl.close()
        }
    }
})
