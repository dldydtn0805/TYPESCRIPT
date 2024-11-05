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
    const [T] = (inputLines[idx++].split(' ').map(Number))
    for (let i = 0; i < T; i ++) {
        const [x1, y1, x2, y2] = inputLines[idx++].split(' ').map(Number)
        const [N] = (inputLines[idx++].split(' ').map(Number))

        const planets = []
        for (let i = 0; i < N; i ++) {
            const [cx, cy, r] = (inputLines[idx++].split(' ').map(Number))
            planets.push([cx, cy, r])
        }

        const [si, sj] = [x1, y1]
        const [ei, ej] = [x2, y2]

        const start :any = []
        for (let i = 0 ; i < N ; i ++) {
            const [ni, nj, nr] = planets[i]
            if ( Math.sqrt((si-ni)**2+(sj-nj)**2) < nr ) {
                start.push(i)
            }
        }
        const end :any = []
        for (let i = 0 ; i < N ; i ++) {
            const [ni, nj, nr] = planets[i]
            if ( Math.sqrt((ei-ni)**2+(ej-nj)**2) < nr ) {
                end.push(i)
            }
        }
        const filteredStartCnt = start.filter((elem :any)=> !end.includes(elem)).length
        const filteredEndCnt = end.filter((elem :any)=> !start.includes(elem)).length

        console.log(filteredStartCnt+filteredEndCnt)
    }
});
