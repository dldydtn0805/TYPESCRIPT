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
    const [N, M] = (inputLines[idx++].split(' ').map(Number))
    const fields :Array<Array<string>> =[]
    for (let i = 0 ; i < N ; i ++) {
        fields.push(inputLines[idx++].split('').map(String))
    }
    const wolves = []
    const weed = []
    const directions = [
        [-1,0],[0,1],[1,0],[0,-1]
    ]
    for (let i = 0; i < N ; i ++) {
        for (let j = 0; j < M ; j++) {
            if (fields[i][j] === 'W') {
                wolves.push([i, j]);
            } else if (fields[i][j] === '.') {
                weed.push([i, j])
            }
        }
    }

    const visited = new Set();

    const dfs = (ci:number, cj:number) => {
        for (let i = 0; i < 4; i ++) {
            const [di, dj] = directions[i]
            let [ni, nj] = [ci+di, cj+dj]
            if (0 <= ni && ni < N && 0<= nj && nj < M) {
                if (fields[ni][nj] === '.' || fields[ni][nj] === 'W') {
                    if (!visited.has(`${ni},${nj}`)) {
                        visited.add(`${ni},${nj}`)
                        dfs(ni, nj)
                    }
                } else if (fields[ni][nj] === '+') {
                    if (!visited.has(`${ni},${nj},${i}`)) {
                        while (0<= ni && ni < N && 0 <= nj && nj < M && fields[ni][nj] === '+' && !visited.has(`${ni},${nj},${i}`)) {
                            visited.add(`${ni},${nj},${i}`)
                            ni += di
                            nj += dj
                        }
                        if (0<= ni && ni < N && 0 <= nj && nj < M)  {
                            if (fields[ni][nj] === '.' || fields[ni][nj] === 'W') {
                                if (!visited.has(`${ni},${nj}`)) {
                                    visited.add(`${ni},${nj}`)
                                    dfs(ni, nj)
                                }
                            } else {
                                if (!visited.has(`${ni-di},${nj-dj}`)) {
                                    visited.add(`${ni-di},${nj-dj}`)
                                    dfs(ni-di, nj-dj)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    for (let [si, sj] of wolves) {
        if (!visited.has(`${si},${sj}`)) {
            visited.add(`${si},${sj}`)
            dfs(si, sj)
        }
    }
    const ans = weed.filter(([i, j])=>!visited.has(`${i},${j}`))
    for (let [row, col] of ans) {
        fields[row][col] = 'P'
    }

    for (let i = 0; i < N ; i ++) {
        console.log(fields[i].join(''))
    }

});
