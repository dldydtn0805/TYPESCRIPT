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
    let tc = 1;
    while (true) {
        const [N] = inputLines[idx++].split(' ').map(Number);
        if (N === 0) {break}
        const name_to_num :{[key:string]: number} = {}
        const adj_list = new Array(N).fill(null).map(()=>[])
        let num_cnt = 0
        for (let i = 0 ; i < N ; i ++) {
            const [A, B] = inputLines[idx++].split(' ').map(String);
            if (!name_to_num.hasOwnProperty(A)) {name_to_num[A] = num_cnt++}
            if (!name_to_num.hasOwnProperty(B)) {name_to_num[B] = num_cnt++}
            adj_list[name_to_num[A]].push(name_to_num[B])
        }
        const visited:Array<number> = new Array(N).fill(0)
        const dfs = (si : number) => {
            visited[si] = 1
            for (let ni of adj_list[si]) {
                if (!visited[ni]) {
                    dfs(ni)
                }
            }
        }
        let ans = 0
        for (let i = 0 ; i < N ; i ++) {
            if (!visited[i]) {dfs(i); ans++ }
        }
        console.log(tc, ans)
        tc++
    }
});
