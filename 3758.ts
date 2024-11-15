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
    const [T] = inputLines[idx++].split(' ').map(Number)
    for (let tc = 0 ; tc < T ; tc++) {
        const [n, k, t, m] = inputLines[idx++].split(' ').map(Number)
        const teams = {}
        for (let c = 0 ; c < m ; c ++) {
            const [i, j, s] = inputLines[idx++].split(' ').map(Number)
            if (!teams.hasOwnProperty(i)) {
                teams[i] = {}
                teams[i][j] = s
                teams[i]['submit'] = c
                teams[i]['cnt'] = 1
            } else {
                teams[i]['cnt'] ++
                if (!teams[i].hasOwnProperty(j)) {
                    teams[i][j] = s
                    teams[i]['submit'] = c
                } else {
                    teams[i][j] = Math.max(teams[i][j], s)
                    teams[i]['submit'] = c
                }
            }
        }
        const summary = new Array(n).fill(null).map(()=>[0, 0, 0])
        for (let i = 1; i <= n; i ++) {
            let value = 0
            for (let j = 1; j <= k; j++) {
                if (teams[i].hasOwnProperty(j)) {
                    value += teams[i][j]
                }
            }
            summary[i] = [value, teams[i]['cnt'], teams[i]['submit'], i]
        }
        summary.shift()
        summary.sort((A,B) => {
            if (A[0] === B[0] && A[1] === B[1] ) {
                return A[2]-B[2]
            } else if (A[0] === B[0]) {
                return A[1]-B[1]
            } else  {
                return B[0]-A[0]
            }
        })
        console.log(summary.findIndex((elem)=>elem[3]===t)+1)

    }

});

