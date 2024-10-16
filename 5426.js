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
    const [T] = inputLines[idx++].split(' ').map(Number);
    for (let tc = 0 ; tc < T ; tc++) {
        const [mails] = inputLines[idx++].split(' ').map(String);
        let mails_idx = 0
        const response :Array<Array<string>> = new Array(Math.sqrt(mails.length)).fill(null).map(()=>
            new Array(Math.sqrt(mails.length)).fill(null).map(()=>mails[mails_idx++])
        )
        const answer :Array<Array<string>> = new Array(Math.sqrt(mails.length)).fill(null).map(()=>
            new Array(Math.sqrt(mails.length)).fill(null).map(()=>'')
        )
        const N = Math.sqrt(mails.length)
        for (let i = 0; i < N ; i ++ ) {
            for (let j = 0; j < N; j ++) {
                answer[N-j-1][i] = response[i][j]
            }
        }
        let ans = ''
        answer.forEach((elem1)=>elem1.forEach((elem2)=>ans+=elem2))
        console.log(ans)
        // (0,0) => (4,0)
        // (1,2) => (2,1)
        // (3,3) => (1,3)
        // (2,3) => (1,2)
        // (x,y) => (N%y-1, x)
    }
});
