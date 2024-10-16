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
    const [R, C] = inputLines[idx++].split(' ').map(Number)
    const total = []
    for (let i = 0 ; i < R; i++) {
        const alphabets = inputLines[idx++].split('').map(String);
        total.push(alphabets)
    }
    let prev_list = []
    for (let i = 0; i < C; i++) {
        let str = ''
        for (let j = 0; j < R; j++) {
            str += total[j][i]
        }
        prev_list.push(str)
    }
    let prev = new Set(prev_list)
    let next_list = prev_list.map((item)=>item.slice(1, item.length))
    let next = new Set(next_list)
    let cnt = 0
    while (prev.size === next.size) {
        cnt ++
        prev_list = next_list
        prev = next
        next_list = prev_list.map((item)=>item.slice(1, item.length))
        next = new Set(next_list)
    }
    console.log(cnt)
});
