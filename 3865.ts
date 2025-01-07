import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let idx = 0;
let inputLines :Array<string> = [];
const INF = Number.MAX_SAFE_INTEGER
rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    let res = ''
    while (true) {
        const [N] = inputLines[idx++].split(' ').map(Number)
        if (N === 0) {
            break
        }
        const adjList:any = {}
        let root = ''
        for (let i = 0; i < N; i ++) {
            const academy = inputLines[idx++].split(':').map(String)
            const group = academy[0]
            if (i === 0) {root = group}
            const men = academy[1].split(',').map(String)
            adjList[group] = []
            men[men.length-1] = men[men.length-1].split('.')[0]
            for (let j = 0; j < men.length; j ++ ) {
                adjList[group].push(men[j])
            }
        }
        const visited = new Set()
        const ans = new Set()
        const dfs = (ci:string) => {
            for (const ni of adjList[ci]) {
                if (adjList.hasOwnProperty(ni)) {
                    if (!visited.has(`${ni}`)) {
                        visited.add(`${ni}`)
                        dfs(ni)
                    }
                } else {
                    ans.add(`${ni}`)
                }
            }
        }
        dfs(root)
        res += (`${ans.size}\n`)
    }
    console.log(res)

})


/*
2
development:alice,bob,design,eve.
design:carol,alice.
3
one:another.
another:yetanother.
yetanother:dave.
3
friends:alice,bob,bestfriends,carol,fran,badcompany.
bestfriends:eve,alice.
badcompany:dave,carol.
5
a:b,c,d,e.
b:c,d,e,f.
c:d,e,f,g.
d:e,f,g,h.
e:f,g,h,i.
4
aa:bb.
cc:dd,ee.
ff:gg.
bb:cc.
0
* */
