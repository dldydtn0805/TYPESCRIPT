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
    const [ROW, COL] = inputLines[idx++].split(' ').map(Number)
    const [N] = inputLines[idx++].split(' ').map(Number);
    const [M] = inputLines[idx++].split(' ').map(Number);
    const papers = new Array(1000000+1).fill(null).map(()=>0)
    let minHeight = 1000000
    let maxHeight = 1000000
    for (let i = 0; i < M ; i++) {
        const [x, y] = inputLines[idx++].split(' ').map(Number);
        papers[y] = x
        minHeight = Math.min(minHeight, x)
    }
    const binary_search = (start:number, end:number) :number => {
        let ans = INF
        while (start <= end) {
            let mid = Math.floor((start + end)/2)
            if (check(mid)) { // mid 길이의 정사각형으로 N개의 개수를 만족
                end = mid - 1
                ans = Math.min(mid, ans)
            } else {
                start = mid + 1
            }
        }
        return ans
    }
    const check = (mid:number):boolean => { // mid : 정사각형 한변의 길이
        const visited :Array<number> = papers.map((paper)=> {if (paper !== 0) {return 0} else {return -1}})
        let cnt = 0
        for (let i = 0; i < 1000001; i++) {
            if (!visited[i]) {
                if (papers[i]) {
                    cnt ++
                    if (papers[i] > mid || cnt > N) {return false}
                    for (let j = i; j < i+mid ; j++) {
                        if (j < 1000001) {
                            if (papers[j] <= mid) {
                                visited[j] = 1
                            }
                        }
                    }
                }
            }

        }
        return true
    }
    console.log(binary_search(minHeight, maxHeight))
});
