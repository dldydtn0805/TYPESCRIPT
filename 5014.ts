import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let idx = 0;
let inputLines: Array<string> = [];

rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    const [F,S,G,U,D] = inputLines[idx++].split(' ').map(Number);
    // F : 전체 층
    // S : 현재 층
    // G : 스타트링크 층
    // U : 위로 가는 버튼을 누르면 이동하는 층
    // D : 아래로 가는 버튼을 누르면 이동하는 층
    const bfs = (si : number) :Array<number> => {
        const visited :Array<number> = new Array(F+1).fill(0);
        const queue :Array<number> = []
        visited[si] = 1
        queue.push(si)
        while (queue.length) {
            const ci = queue.shift()
            for (let ni of [ci+U, ci-D]) {
                if (!visited[ni]) {
                    if (1 <= ni && ni < F+1) {
                    queue.push(ni)
                    visited[ni] = visited[ci] + 1
                    }
                }
            }
        }
        return visited
    }
    const ans = bfs(S)[G] - 1
    console.log(ans === -1 ? 'use the stairs' : ans)
});
