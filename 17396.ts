import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let idx = 0;
let inputLines = [];
const INF = Number.MAX_SAFE_INTEGER

class MinHeap {
    private heap: Array<Array<number>>;

    constructor() {
        this.heap = [];
    }

    private getParentIndex(index: number): number {
        return Math.floor((index - 1) / 2);
    }

    private getLeftChildIndex(index: number): number {
        return 2 * index + 1;
    }

    private getRightChildIndex(index: number): number {
        return 2 * index + 2;
    }

    private swap(index1: number, index2: number): void {
        const temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;
    }

    private bubbleUp(index: number): void {
        while (
            index > 0 &&
            this.heap[this.getParentIndex(index)][0] > this.heap[index][0]
            ) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }

    private bubbleDown(index: number): void {
        const lastIndex = this.heap.length - 1;
        while (true) {
            let smallestIndex = index;
            const leftIndex = this.getLeftChildIndex(index);
            const rightIndex = this.getRightChildIndex(index);

            if (
                leftIndex <= lastIndex &&
                this.heap[leftIndex][0] < this.heap[smallestIndex][0]
            ) {
                smallestIndex = leftIndex;
            }
            if (
                rightIndex <= lastIndex &&
                this.heap[rightIndex][0] < this.heap[smallestIndex][0]
            ) {
                smallestIndex = rightIndex;
            }

            if (smallestIndex !== index) {
                this.swap(index, smallestIndex);
                index = smallestIndex;
            } else {
                break;
            }
        }
    }

    push(value: Array<number>): void {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }

    pop(): Array<number> | null {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop()!;

        const min = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.bubbleDown(0);
        return min;
    }

    peek(): Array<number> | null {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    size(): number {
        return this.heap.length;
    }
}

rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    const [N, M] = inputLines[idx++].split(' ').map(Number)
    const eyes = inputLines[idx++].split(' ').map(Number)

    /*
    1. 0이 유섭이의 위치이고, N-1이 넥서스의 위치이므로 이 둘의 최단거리를 구하는 것은 다익스트라 [E*logV] 혹은 플로이드워셜 [V^3] 알고리즘으로 할 수 있다. 출발 지점이 한개이므로 다익스트라 알고리즘이 적합하다.
    2. 다익스트라 거리 비교를 할 때 적 시야에 없는 위치인지 같이 확인해주는 것으로 해결 가능하다.
    */
    const check = new Set()
    eyes.forEach((elem, index)=> {
        if (elem === 0) {
            check.add(index)
        }
    })
    check.add(N-1)
    const adjList = new Array(N).fill(null).map(()=>[])
    for (let i = 0 ; i < M ; i ++) {
        const [a, b, t] = inputLines[idx++].split(' ').map(Number)
        adjList[a].push([t, b])
        adjList[b].push([t, a])
    }

    const dijkstra = (si:number) => {
        // heapElem : [sumValue, curIndex]
        const heap = new MinHeap()
        const distance = new Array(N).fill(null).map(()=>INF)
        heap.push([0, si])
        distance[si] = 0
        while (heap.size() > 0) {
            const [cw, ci] = heap.pop()
            if (cw > distance[ci]) {
                continue
            }
            for (let [nw, ni] of adjList[ci]) {
                const nextDistance = nw + distance[ci]
                if (check.has(ni) && nextDistance < distance[ni]) {
                    heap.push([nextDistance, ni])
                    distance[ni] = nextDistance
                }
            }
        }
        return distance[N-1]
    }
    const ans = dijkstra(0)
    console.log(ans === INF ? -1 : ans)
})


/*
5 7
0 0 0 1 1
0 1 7
0 2 2
1 2 4
1 3 3
1 4 6
2 3 2
3 4 1
* */
