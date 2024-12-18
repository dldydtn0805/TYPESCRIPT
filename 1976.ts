import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let idx = 0;
let inputLines = [];
const INF = Number.MAX_SAFE_INTEGER
const MOD = 10**9+7


rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    const [N] = inputLines[idx++].split(' ').map(Number)
    const [M] = inputLines[idx++].split(' ').map(Number)
    const adjList = []
    for (let i = 0 ; i < N ; i++) {
        const city = inputLines[idx++].split(' ').map(Number)
        adjList.push(city)
    }
    let trip = inputLines[idx++].split(' ').map(Number)
    trip = trip.map((elem)=>elem-1)
    const visited = new Array(N).fill(null).map(()=>-1)
    const dfs = (ci:number, ri:number) =>  {
        for (let ni = 0 ; ni < N; ni++) {
            if (adjList[ci][ni] === 1 && visited[ni] === -1) {
                visited[ni] = ri
                dfs(ni, ri)
            }
        }
    }
    const solve = () => {
        for (let i = 0 ; i < N; i++) {
            if (visited[i] === -1) {
                visited[i] = i
                dfs(i, i)
            }
        }

        for (let i = 1 ; i < trip.length; i ++) {
            if (visited[trip[i]] !== visited[trip[i-1]]) {
                return false
            }
        }
        return true
    }
    console.log(solve() ? 'YES' : 'NO')
})


/*
4
2
0 1 0 1
1 0 1 0
0 1 0 0
1 0 0 0
1 2
* */
