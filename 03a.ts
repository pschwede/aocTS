let wires: string = `R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`;

const MEANINGS: string[] = ["empty", "wire", "wires"]

class Position {
	x: number = 0;
	y: number = 0;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	toString(): string {
		return `${ this.x }x${ this.y }`;
	}

	toTuple(): [number, number] {
		return [this.x, this.y];
	}

	fromTuple(tuple: [number, number]): Position {
		return new Position(tuple[0], tuple[1]);
	}

	fromString(coordinates: string): Position {
		return this.fromArray(coordinates.split("x").map(parseInt));
	}

	fromArray(array: number[]): Position {
		return new Position(array[0], array[1]);
    }

    clone(): Position {
        return new Position(this.x, this.y);
    }
}

function parseWire(wire: string): Map<Position, number> {
	let position: Position = new Position(0, 0);
	let result: Map<Position, number> = new Map();
	result.set(position.clone(), 1); // origin
	for(const token of wire.split(",")) {
        for (let i: number = 0; i < parseInt(token.substring(1)); i++) {
			switch(token[0]){
				case 'R': {position.x++; break;}
				case 'L': {position.x--; break;}
				case 'U': {position.y++; break;}
				case 'D': {position.y--; break;}
            }
            const oldval: number | undefined = result.get(position.clone());
            result.set(position.clone(), typeof oldval !== "undefined" ? oldval + 1 : 1);
		}
    }
    console.log(result);
	return result;
}

function overlayMaps(maps: Map<Position, number>[]): Map<Position, number> {
    let result: Map<Position, number> = new Map();
    for (const map of maps) { 
        for (const pos of map.keys()) {
            const mapval: number = map.get(pos)!;
            const oldval: number | undefined = result.get(pos);
            result.set(pos, typeof oldval !== "undefined" ? oldval + mapval : mapval);
        }
    }
    console.log(result);
    return result;
}

function positionsOfOverlays(map: Map<Position, number>): Position[] {
    const result: Position[] = [];
    for (const pos of map.keys()) {
        if (map.get(pos)! > 1) {
            result.push(pos);
        }
    }
    return result;
}

function distanceFromOrigin(pos: Position): number {
    return Math.abs(pos.x) + Math.abs(pos.y);
}

function shortestDistanceFromOriginOfOverlay(wires: string): number {
    let candidates: Position[] = positionsOfOverlays(overlayMaps(wires.split("\n").map(parseWire)));
    let distances: number[] = candidates.map(distanceFromOrigin)
    const result = Math.min(...distances);
    console.log("Winner: " + candidates[distances.indexOf(Math.min(...distances))]);
    return result;
}

function assertEquals(expected: any, actual: any): boolean {
    if (expected === actual)
        return true;
    console.log(`Expected ${expected} but got ${actual}.`);
    return false;
}

function test(): boolean {
    return assertEquals(6, shortestDistanceFromOriginOfOverlay(`R8,U5,L5,D3
U7,R6,D4,L4`))
        && assertEquals(159, shortestDistanceFromOriginOfOverlay(`R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`))
        && assertEquals(135, shortestDistanceFromOriginOfOverlay(`R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`));
}

function main(): number {

    return 0;
}

if (test()) console.log("exit code " + main());