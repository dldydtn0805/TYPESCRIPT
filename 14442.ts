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
    let [ N, M, K  ] = inputLines[idx++].split(' ').map(Number)
    const adjList = []
    for (let i = 0 ; i < N ; i ++) {
        adjList.push(inputLines[idx++].split('').map(Number))
    }

    const bfs = () => {
        const queue = new Deque<number>()
        queue.push([0, 0, K])
        const visited = new Array(N+1).fill(null).map(()=>
                    new Array(M+1).fill(null).map(()=>
                new Array(K+1).fill(null).map(()=>0)
            )
        )
        visited[0][0][K] = 1
        while (queue.getSize()) {
            const [ci, cj, life] = queue.popleft()
            for (let [di, dj] of [[-1,0],[0,1],[1,0],[0,-1]]) {
                let [ni, nj] = [ci+di, cj+dj]
                if (0<=ni && ni < N && 0<=nj && nj<M) {
                    let nextLife = adjList[ni][nj] === 1 ? life - 1 : life
                    let nextCnt = visited[ci][cj][life] + 1
                    if (nextLife < 0) {continue}
                    if (visited[ni][nj][nextLife] === 0) {
                        if (ni === N-1 && nj === M-1) {return nextCnt}
                        visited[ni][nj][nextLife] = nextCnt
                        queue.push([ni, nj, nextLife])
                    }
                }
            }
        }
        return -1
    }
    if (N == 1 && M == 1) {
        console.log(1)
    } else {
        console.log(bfs())
    }
});

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

    // 큐 내용 문자열로 출력
    print(): string {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        let current = this.front;
        let result = "";
        while (current) {
            result += JSON.stringify(current.value) + " ";
            current = current.next;
        }
        return result.trim();
    }

    // 큐 초기화
    clear(): void {
        this.front = null;
        this.rear = null;
        this.size = 0;
    }
}
