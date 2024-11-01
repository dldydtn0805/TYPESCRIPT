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
    let [ N  ] = inputLines[idx++].split(' ').map(Number)
    const lectures = []
    const ans = []
    for (let i = 0; i < N ; i ++) {
        const [number, start, end] = inputLines[idx++].split(' ').map(Number)
        lectures.push([number, start, end])
        ans.push(number)
    }
    lectures.sort((A,B)=>A[1]-B[1])
    const heap = new MinHeap()
    const dict = {}
    const empty_room = new MinHeap()
    let max_room = 1
    let cnt = 0

    for (let i = 0 ; i < lectures.length; i++) {
        const [cur_number, cur_start, cur_end] = lectures[i]
        while (heap.size() > 0 && heap.peek()[0] <= cur_start) {
            let [prev_end, prev_number, prev_start, prev_room] = heap.pop()
            empty_room.push([prev_room])
        }
        if (empty_room.size() > 0) {
            let [room] =  empty_room.pop()
            dict[cur_number] = room
            heap.push([cur_end, cur_number, cur_start,room])
        } else {
            dict[cur_number] = max_room
            heap.push([cur_end, cur_number, cur_start, max_room++])
        }
        cnt = Math.max(cnt, heap.size())
    }
    let res = ''
    for (let i = 1 ; i < N+1; i++) {
        res += (`${dict[i]}\n`)
    }
    console.log(cnt)
    console.log(res)

});

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
        while (index > 0 && this.heap[this.getParentIndex(index)][0] > this.heap[index][0]) {
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

            if (leftIndex <= lastIndex && this.heap[leftIndex][0] < this.heap[smallestIndex][0]) {
                smallestIndex = leftIndex;
            }
            if (rightIndex <= lastIndex && this.heap[rightIndex][0] < this.heap[smallestIndex][0]) {
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

    public push(value: Array<number>): void {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }

    public pop(): Array<number> | undefined {
        if (this.heap.length === 0) return undefined;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.bubbleDown(0);
        return min;
    }

    public peek(): Array<number> | undefined {
        return this.heap.length > 0 ? this.heap[0] : undefined;
    }

    public size(): number {
        return this.heap.length;
    }
}
