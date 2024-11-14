import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let idx = 0;
let inputLines = [];
const MOD = 10**9+7
rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    let P = inputLines[idx++].split(' ').map(Number)
    let Q = inputLines[idx++].split(' ').map(Number)

    for (let i = 0 ; i < 4; i ++) {
        P[i] += 1000000000
        Q[i] += 1000000000
    }

    const point = (X : Array<number>, Y : Array<number>) => {
        const topLeft = (X) => {
            const [q, w, e, r] = X
            return [e, w]
        }

        const topRight = (X) => {
            const [q, w, e, r] = X
            return [e, r]
        }

        const bottomLeft = (X) => {
            const [q, w, e, r] = X
            return [q, w]
        }

        const bottomRight = (X) => {
            const [q, w, e, r] = X
            return [q, r]
        }
        const isSame = (X, Y) => {
            return X[0] === Y[0] && X[1] === Y[1]
        }
        return (isSame(topLeft(X), bottomRight(Y)) || isSame(topRight(X),bottomLeft(Y)) || isSame(bottomLeft(X),topRight(Y)) || isSame(bottomRight(X),(topLeft(Y))))
    }

    const line = (X : Array<number>, Y : Array<number>) => {
        const [x1, y1, x2, y2] = X
        const [x3, y3, x4, y4] = Y
        return ((y2 === y3) || (y1 === y4)  || (x1 === x4) || (x2 === x3))
    }
    const nonOverlap = (X : Array<number>, Y : Array<number>) => {
        const [x1, y1, x2, y2] = X
        const [x3, y3, x4, y4] = Y
        return ((y1 > y4) || (x1 > x4) || (y2 < y3) || (x2 < x3) )
    }

    if (point(P,Q) || point(Q,P)) {
        console.log('POINT')
    } else if (nonOverlap(P, Q) || nonOverlap(Q,P)) {
        console.log('NULL')
    } else if (line(P, Q) || line(Q, P)) {
        console.log('LINE')
    } else {
        console.log('FACE')
    }

});
