import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let idx = 0;
let inputLines: Array<string> = [];

rl.on('line', (line: string) => {
    inputLines.push(line);
});

rl.on('close', () => {
    const N = BigInt(inputLines[idx++]);

    function getLastRoom(X: bigint): bigint {
        return BigInt(3) * X * (X - BigInt(1)) + BigInt(1);
    }

    function binarySearch(s: bigint, e: bigint): bigint {
        let ans = BigInt(0);
        while (s <= e) {
            const mid = (s + e) / BigInt(2);
            const lastRoom = getLastRoom(mid);
            if (lastRoom >= N) {
                e = mid - BigInt(1);
                ans = mid;
            } else {
                s = mid + BigInt(1);
            }
        }
        return ans;
    }

    console.log(Number(binarySearch(BigInt(1), BigInt(100000000000001))));
});
