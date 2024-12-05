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
    const [N, M] = inputLines[idx++].split(' ').map(Number)
    const adjList = new Array(N+1).fill(null).map(()=>[])
    const queue = [1]
    const visited = new Array(N+1).fill(null).map(()=>0)
    visited[1] = 1
    for (let i = 0 ; i < M ; i ++) {
        const [a, b] = inputLines[idx++].split(' ').map(Number)
        adjList[a].push(b)
        adjList[b].push(a)
    }
    // console.log(adjList)

    adjList.forEach((elem)=>{
        elem.sort((A,B)=>A-B)
    })
    // console.log(adjList)

    const bfs = () => {
        while (queue.length) {
            const ci = queue.shift()
            for (let ni of adjList[ci]) {
                if (visited[ni] === 0) {
                    queue.push(ni)
                    visited[ni] = visited[ci] + 1
                }

            }
        }
    }
    bfs()
    // console.log(visited)

    const numbers = {}
    let maxNum = 0
    visited.forEach((elem)=>{
        maxNum = Math.max(maxNum, elem)
        if (numbers.hasOwnProperty(elem)) {
            numbers[elem] ++
        } else {
            numbers[elem] = 1
        }
    })

    let ans = 1
    for (let key in numbers) {
        if (key !== '0') {
            ans *= (numbers[key]+1)%MOD
            ans %= MOD
        }
    }
    console.log(ans-1)

})


/*

* */
