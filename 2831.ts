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
    const [N] = inputLines[idx++].split(' ').map(Number)
    const men = inputLines[idx++].split(' ').map(Number);
    const women = inputLines[idx++].split(' ').map(Number);

    const plusMen = men.filter((man)=> man > 0)
    const minusMen = men.filter((man)=> man < 0)
    const plusWomen =  women.filter((woman)=> woman > 0)
    const minusWomen = women.filter((woman)=> woman < 0)

    const manBig = [...minusMen,  ...plusWomen]
    const womanBig = [...plusMen,  ...minusWomen]
    manBig.sort((A,B)=>Math.abs(A)-Math.abs(B))
    womanBig.sort((A,B)=>Math.abs(A)-Math.abs(B))

    let l = 0
    let r = 0
    let ans = 0
    while (l < manBig.length && r < manBig.length) {
        while (manBig[r] > 0) { // 여성은 + 여야함
            r ++
        }
        while (manBig[l] < 0) { // 남성은 - 여야함
            l ++
        }
        if (Math.abs(manBig[l]) < Math.abs(manBig[r])) { // 남자가 여자보다 커야함
            ans ++
            l ++
            r ++
        } else if (Math.abs(manBig[l]) >= Math.abs(manBig[r])) {
            r ++
        }
    }

    l = 0
    r = 0
    while (l < womanBig.length && r < womanBig.length) {
        while (womanBig[r] > 0) {
            r ++
        }
        while (womanBig[l] < 0) {
            l ++
        }
        if (Math.abs(womanBig[l]) < Math.abs(womanBig[r])) {
            ans ++
            l ++
            r ++
        } else if (Math.abs(womanBig[l]) >= Math.abs(womanBig[r])) {
            r ++
        }
    }
    console.log(ans)

});
