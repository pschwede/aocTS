let wires: string = `R1003,D138,L341,U798,L922,U153,R721,D177,L297,D559,L414,U470,L589,D179,L267,D954,R739,D414,L865,U688,R541,U242,R32,D607,L480,D401,L521,U727,L295,D154,R905,D54,L353,U840,L187,U942,R313,D143,R927,D962,R739,U152,R6,D9,L807,D67,R425,D235,L598,D107,L838,D522,L882,U780,L942,D29,R933,U129,L556,D11,L859,D455,L156,U673,L54,D141,R862,U88,R362,U742,L511,D408,R825,U622,R650,D393,L882,D969,R866,D232,L423,U371,L744,U35,L196,D189,R803,U663,R41,U741,R742,U929,L311,U30,R357,D776,L929,U85,R415,U540,R921,U599,R651,U79,R608,D620,L978,D92,L491,D310,L830,U656,R244,U72,L35,U768,R666,U356,R82,U596,L798,D455,L280,D626,R586,U668,R331,D245,L140,U3,R283,U813,R620,U975,L795,U477,L100,D94,R353,D732,R694,U702,L305,U497,R900,U810,L412,D954,R584,D444,L531,D875,R49,D328,L955,U227,L370,D548,L351,U571,R373,U743,R105,D226,L755,U325,R496,D960,L415,U262,R197,D508,R725,U930,L722,D162,L996,D610,R346,U680,L75,U211,R953,U147,R114,D48,L305,D284,L630,U575,R142,D518,R704,D820,L617,D118,R67,D674,L90,D916,L483,D598,L424,U92,R188,U413,L702,D262,R720,D995,L759,D732,L259,D814,L342,U642,L875,U726,R265,D143,R754,D235,L535,U1,R211,D720,R943,D726,L398,U636,R994,U653,L401,U877,R577,D460,L730,U889,R166,D641,L693,U490,L78,D80,R535,U551,L866,U283,L336,U586,L913,U474,R158,D220,R278,U11,R421,D661,R719,D696,R188,D735,L799,U391,R331,U581,R689,D82,R375,D125,R613,D705,L927,U18,R399,D352,L411,D777,L733,D884,R791,U973,R772,D878,R327,U215,L298,D360,R426,D872,L99,U78,L745,U59,L641,U73,L294,D247,R944,U512,L396
L1004,D252,L909,D935,R918,D981,L251,U486,R266,U613,L546,D815,L789,D692,L550,U633,R485,U955,R693,D784,R974,U529,R926,U550,L742,U88,R647,D572,R832,D345,R98,D122,R634,U943,L956,U551,R295,U122,L575,U378,R652,U97,R129,D872,R275,D492,L530,D328,R761,U738,R836,U884,R636,U776,L951,D977,R980,U526,L824,U125,R778,D818,R281,U929,R907,U234,L359,D521,R294,U137,L607,U421,L7,U582,R194,U979,L941,D999,R442,D330,L656,U410,R753,U704,R834,D61,R775,U750,R891,D989,R856,D944,R526,D44,R227,U938,R130,D280,L721,D171,R763,D677,L643,U931,L489,U250,L779,U552,R796,U220,R465,U700,L459,U766,R501,D16,R555,U257,R122,U452,L197,U905,L486,D726,L551,U487,R785,U470,L879,U149,L978,D708,R18,U211,L652,D141,L99,D190,L982,U556,R861,U745,L786,U674,R706,U986,R554,D39,R881,D626,R885,U907,R196,U532,L297,U232,L508,U283,L236,U613,L551,U647,R679,U760,L435,D475,R916,U669,R788,U922,R107,D503,R687,D282,L940,U835,L226,U421,L64,U245,R977,D958,L866,D328,R215,D532,R350,D199,R872,U373,R415,U463,L132,U225,L144,U786,R658,D535,R263,U263,R48,D420,L407,D177,L496,U521,R47,D356,L503,D557,R220,D879,L12,U853,R265,U983,L221,U235,R46,D906,L271,U448,L464,U258,R952,D976,L949,D526,L458,D753,L408,U222,R256,U885,R986,U622,R503,D5,L659,D553,R311,U783,L541,U17,R267,U767,L423,D501,R357,D160,L316,D912,R303,U648,L182,U342,L185,U743,L559,U816,R24,D203,R608,D370,R25,U883,L72,D816,L877,U990,R49,U331,L482,U37,L585,D327,R268,D106,L224,U401,L203,D734,L695,U910,L417,U105,R135,U876,L194,U723,L282,D966,R246,U447,R966,U346,L636,D9,L480,D35,R96`;

const MEANINGS: string[] = ["empty", "wire", "wires"]

type Predicate = (i: any) => boolean;
class WireMap {
    private map: Map<string, number> = new Map();
    /**
     * Note: I tried number[][], Map<number, Map<number, number>> and Map<[number, number], number> here. Each of
     * them seem to require O(n²) space. Their runs never finished.
     */

    public assign(x: number, y: number, value: number): WireMap {
        this.map.set(""+x+"x"+y, value);
        return this;
    }

    public op(x: number, y: number, value: number, fun: { id: number, op: (a: number, b?: number) => number }): WireMap {
        return this.assign(x, y, fun.op((this.map.get(""+x+"x"+y)) ?? fun.id, value));
    }

    public add(x: number, y: number, value: number): WireMap {
        return this.op(x, y, value, { id: 1, op: (a: number, b: number = 0) => (a + b) });
    }

    public filter(predicate: Predicate): WireMap {
        const result: WireMap = new WireMap();
        this.forEach((x, y, value) => {
            if (predicate(value)) {
                result.assign(x, y, value);
            }
        })
        return result;
    }

    public forEach(fun: (x: number, y: number, value: number) => any): WireMap {
        this.map.forEach((value, str) => {
            const xy = str.split("x").map((a) => parseInt(a));
            fun.call(this, xy[0], xy[1], value);
        });
        return this;
    }

    public clone(): any {
        const result: WireMap = new WireMap();
        result.map = new Map(this.map);
        return result;
    }

    public intersect(maps: WireMap[]): WireMap {
        const result: WireMap = this.clone();
        for (const map of maps)
            map.map.forEach((val, str) => {
                if (result.map.has(str)) {
                    const xy = str.split("x").map((a) => parseInt(a));
                    result.add(xy[0], xy[1], 1);
                }
            })
        return result.filter((a) => a > 1);
    }

    public static fromString(wire: string, pos?: string): { map: WireMap, steps: number } {
        let x: number = 0;
        let y: number = 0;
        let steps: number = 0;
        let result: WireMap = new WireMap(); // origin
        result.assign(0,0,1)
        for(const token of wire.split(",")) {
            for (let i: number = 0; i < parseInt(token.substring(1)); i++) {
                switch(token[0]){
                    case 'R': {x++; break;}
                    case 'L': {x--; break;}
                    case 'U': {y++; break;}
                    case 'D': {y--; break;}
                }
                result.assign(x, y, 1);
                steps++;
                if (pos == "" + x + "x" + y)
                    return { map: result, steps: steps };
            }
        }
        return { map: result, steps: Infinity };
    }
}

function overlayMaps(maps: WireMap[]): WireMap {
    let [head, ...tail] = maps;
    let result: WireMap = head.intersect(tail);
    return result;
}

function positionsOfOverlays(map: WireMap, threshold: number = 1): [number, number][] {
    const result: [number, number][] = [];
    map.forEach((x, y, value) => {
        if(value > 1)
            result.push([x, y])
    });
    return result;
}

function manhattanDistance(pos: [number, number]): number {
    return Math.abs(pos[0]) + Math.abs(pos[1]);
}

function shortestDistanceFromOriginOfOverlay(wires: string, distanceFun=manhattanDistance): number {
    let candidates: [number, number][] = positionsOfOverlays(overlayMaps(wires.split("\n").map((a)=>WireMap.fromString(a).map)));
    let distances: number[] = candidates.map(distanceFun).filter((x) => x > 0 && x < Infinity);
    return Math.min(...distances);
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
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`))
        && ((x) => assertEquals(610, shortestDistanceFromOriginOfOverlay(x,
            (a: [number, number]) => x.split("\n").map(
                (b) => WireMap.fromString(b, "" + a[0] + "x" + a[1]).steps).reduce(
                    (c, d) => c + d, 0))))(`R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`)
        && ((x) => assertEquals(410, shortestDistanceFromOriginOfOverlay(x,
            (a: [number, number]) => x.split("\n").map(
                (b) => WireMap.fromString(b, "" + a[0] + "x" + a[1]).steps).reduce(
                    (c, d) => c + d, 0))))(`R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`);
}

function main(): number {
    console.log(shortestDistanceFromOriginOfOverlay(wires, (a: [number, number]) => wires.split("\n").map(
    (b) => WireMap.fromString(b, "" + a[0] + "x" + a[1]).steps).reduce((c, d) => c + d, 0)));

    return 0;
}

if (test()) console.log("exit code " + main());
