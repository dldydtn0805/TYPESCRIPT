import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Node<T> {
    value: T[];
    next: Node<T> | null;

    constructor(value: T[]) {
        this.value = value;
        this.next = null
    }
}

class Queue<T> {
    private front:Node<T> | null;
    private rear: Node<T> | null;
    private size: number;

    constructor() {
        this.front = null
        this.rear = null
        this.size = 0;
    }

    isEmpty(): boolean {
        return this.size === 0;
    }

    push(value: T[]): void {
        const newNode = new Node(value);
        if (this.isEmpty()) {
            this.front = newNode;
            this.rear = newNode;
        } else {
            this.rear!.next = newNode
            this.rear = newNode
        }
        this.size++
    }

    popleft(): T[] {
        const value = this.front!.value
        this.front = this.front!.next
        this.size--;
        if (this.isEmpty()) {
            this.rear = null
        }
        return value
    }

    getSize():number {
        return this.size;
    }
}

let idx = 0;
let inputLines = [];
const INF = Number.MAX_SAFE_INTEGER
rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    const [N, M] = inputLines[idx++].split(' ').map(Number)
    const maps = []
    let cnt = 0
    let ans = 0
    for (let i = 0 ;  i < N ; i ++) {
        const rows = (inputLines[idx++].split(' ').map(Number))
        maps.push(rows)
    }

    const bfs = (si:number, sj: number) => {
        const queue = new Queue<number>()
        const visited = new Array(N).fill(null).map(()=>
            new Array(M).fill(null).map(()=>0)
        )

        queue.push([si, sj])
        visited[si][sj] = 1
        if (cnt < 1) {
            cnt = 1
            ans = maps[si][sj] + maps[si][sj]
        } else if (cnt === 1) {
            ans = Math.max(ans, maps[si][sj] + maps[si][sj])
        }

        while (queue.getSize()) {
            const [ci, cj] = queue.popleft()
            for (let [di, dj] of [[-1,0],[0,1],[1,0],[0,-1]]) {
                const [ni , nj] = [ci + di, cj+dj]
                if (0<=ni && ni < N && 0 <= nj && nj < M) {
                    if (maps[ni][nj] !== 0 && visited[ni][nj] === 0) {
                        queue.push([ni, nj])
                        visited[ni][nj] = visited[ci][cj] + 1
                        if (cnt < visited[ni][nj]) {
                            cnt = visited[ni][nj]
                            ans = maps[si][sj] + maps[ni][nj]
                        } else if (cnt === visited[ni][nj]){
                            ans = Math.max(ans, maps[si][sj] + maps[ni][nj])
                        }
                    }
                }
            }
        }


    }
    for (let i = 0; i < N ; i ++) {
        for (let j = 0; j < M ; j++) {
            if (maps[i][j] !== 0) {
                bfs(i, j)
            }
        }
    }
    console.log(ans)
})

/*
1 1
1

*/
