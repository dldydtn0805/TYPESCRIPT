import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let idx = 0;
let inputLines = [];
const INF = Number.MAX_SAFE_INTEGER

rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    const [N, M, R, C] = inputLines[idx++].split(' ').map(Number)
    const homes = []
    const marts = new Deque<number>()
    const getDistance = (a, b, c, d) => {
        return Math.abs(a-c)+Math.abs(b-d)
    }
    const maps = new Array(N).fill(null).map(()=>
        new Array(M).fill(null).map(()=>0)
    )
    const visited = new Array(N).fill(null).map(()=>
        new Array(M).fill(null).map(()=>0)
    )
    for (let i = 0 ; i < R; i++) {
        let [a, b, p] = inputLines[idx++].split(' ').map(Number)
        a --
        b --
        homes.push([p, a, b])
        maps[a][b] = p
    }
    for (let i = 0; i < C; i++) {
        let [c, d] = inputLines[idx++].split(' ').map(Number)
        c --
        d --
        marts.push([c,d, c, d])
        visited[c][d] = 1
    }
    const score = []
    const bfs = () => {
        while (marts.getSize() > 0) {
            const [ci, cj, ri, rj] = marts.popleft()
            for (const [di, dj] of [[-1,0],[0,1],[1,0],[0,-1]]) {
                const [ni, nj] = [ci+di, cj+dj]
                if (0<=ni && ni<N && 0<=nj && nj<M && visited[ni][nj] === 0) {
                    if (maps[ni][nj] !== 0) {
                        score.push(getDistance(ni, nj, ri, rj) * maps[ni][nj])
                    }
                    marts.push([ni,nj, ri, rj])
                    visited[ni][nj] = 1
                }
            }
        }
    }
    bfs()
    score.sort((A,B)=>A-B)
    console.log(score[0])
})


/*
5 5 2 1
1 1 2
4 5 3
4 3
* */

class Node<T> {
    value: T[];
    next: Node<T> | null;

    constructor(value: T[]) {
        this.value = value;
        this.next = null;
    }
}


class Deque<T> {
    private front: Node<T> | null;
    private rear: Node<T> | null;
    private size: number;

    constructor() {
        this.front = null;
        this.rear = null;
        this.size = 0;
    }

    // 큐에 배열 추가 (맨 뒤에)
    push(value: T[]): void {
        const newNode = new Node(value);
        if (this.isEmpty()) {
            this.front = newNode;
            this.rear = newNode;
        } else {
            this.rear!.next = newNode;
            this.rear = newNode;
        }
        this.size++;
    }

    // 큐에서 배열 제거 (맨 앞에서)
    popleft(): T[]  {

        const value = this.front!.value;
        this.front = this.front!.next;
        this.size--;
        if (this.isEmpty()) {
            this.rear = null;
        }
        return value;
    }

    // 큐의 맨 앞 배열 확인
    peek(): T[] | string {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        return this.front!.value;
    }

    // 큐가 비어있는지 확인
    isEmpty(): boolean {
        return this.size === 0;
    }

    // 큐의 크기 반환
    getSize(): number {
        return this.size;
    }

}
