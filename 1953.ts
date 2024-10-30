import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let idx = 0;
let inputLines = [];
rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    let [ N  ] = inputLines[idx++].split(' ').map(Number)
    const adjList :Array<Array<number>> = new Array(N).fill(null).map(()=>[])
    for (let i = 0; i < N; i ++) {
        const arr :Array<number> = inputLines[idx++].split(' ').map(Number)
        for (let j = 1 ; j < arr.length; j++) {
            if (!adjList[i].includes(arr[j]-1)) {
                adjList[i].push(arr[j]-1)
            }
        }
    }
    const visited :Array<number> = new Array(N).fill(null).map(()=>0)
    const dfs = (ci : number, cur : number) => {
        for (let i = 0; i < adjList[ci].length; i++) {
            let ni = adjList[ci][i]
            if (visited[ni] === 0) {
                visited[ni] = cur
                dfs(ni, -1*cur)
            }
        }
    }
    let value :number = 1
    for (let i = 0 ; i < N ; i++) {
        if (visited[i] === 0) {
            dfs(i, value)
            value *= -1
        }
    }
    const A :Array<number> = []
    const B :Array<number> = []
    for (let i = 0; i < N; i ++) {
        if (visited[i] === 1) {
            A.push(i+1)
        } else {
            B.push(i+1)
        }
    }
    console.log(A.length)
    console.log(A.join(' '))
    console.log(B.length)
    console.log(B.join(' '))
});
