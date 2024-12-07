import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let idx = 0;
let inputLines = [];
const INF = Number.MAX_SAFE_INTEGER
const MOD = 10**9+7

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
            // 기존 꼬리를 새로운 노드로 연결
            this.rear!.next = newNode
            // 새로운 노드를 꼬리로 갱신
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

rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    const [N, M] = inputLines[idx++].split(' ').map(Number)
    const [H, W] = inputLines[idx++].split(' ').map(Number)
    const crossWalks = []
    for (let i = 0 ; i < N ; i ++) {
        crossWalks.push(inputLines[idx++].split(' ').map(Number))
    }
    const [K] = inputLines[idx++].split(' ').map(Number)
    const visited = new Array(N).fill(null).map(()=>
        new Array(M).fill(null).map(()=>0)
    )
    const queue  = new Queue<number>();

    for (let i = 0 ; i < K; i++) {
        const [X, Y] = inputLines[idx++].split(' ').map(Number)
        visited[X-1][Y-1] = 1
        queue.push([X-1, Y-1])
    }

    const bfs = () => {
        while (queue.getSize()) {
            const [ci, cj] = queue.popleft()
            for (const [di, dj] of [[-1,0],[0,1],[1,0],[0,-1]]) {
                const [ni, nj] = [ci+di, cj+dj]
                if (0 <= ni && ni < N && 0 <= nj && nj < M && crossWalks[ci][cj] <= crossWalks[ni][nj] && visited[ni][nj] === 0) {
                    visited[ni][nj] = 1
                    queue.push([ni, nj])
                }
            }
        }
    }
    bfs()
    let ans = 0
    const prefix = new Array(N).fill(null).map(()=>
        new Array(M).fill(null).map(()=>0)
    )
    for (let i = 0; i < N; i ++) {
        for (let j = 0 ; j < M ; j ++) {
            if (i === 0 && j === 0) {
                prefix[i][j] = visited[i][j]
            } else if (i === 0) {
                prefix[i][j] = prefix[i][j-1] + visited[i][j]
            } else if (j === 0) {
                prefix[i][j] = prefix[i-1][j] + visited[i][j]
            } else {
                prefix[i][j] = prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1] + visited[i][j]
            }
        }
    }

    for (let i = H-1 ; i < N ; i ++) {
        for (let j = W-1 ; j < M; j ++) {
            let value
            if (i === H-1 && j === W-1) {
                value = prefix[i][j]
            } else if (i === H-1) {
                value = prefix[i][j] - prefix[i][j-W]
            } else if (j === W-1) {
                value  = prefix[i][j] - prefix[i-H][j]
            } else {
                value = prefix[i][j] - prefix[i-H][j] - prefix[i][j-W] + prefix[i-H][j-W]
            }
            if (value === H*W) {
                ans ++
            }
        }
    }
    console.log(ans)

})


/*
5 5
2 1
2 6 7 8 8
2 3 3 7 9
4 5 2 6 5
3 2 1 3 4
5 7 9 8 1
2
2 2
5 5
* */
