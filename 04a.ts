const range = `234208-765869`

function meetsSixDigits(n: number): boolean {
    return ("" + n).length == 6;
}

function meetsSameAdjacent(n: number, max: number=Infinity): boolean {
    const str = "" + n;
    let pairs = 0;
    for (let i = 0; i < str.length-1; i++)
        if (str[i] == str[i + 1])
            pairs++;
    return 0 < pairs && pairs < max;
}

function meetsLeftToRightIncrease(n: number): boolean {
    const str = "" + n;
    for (let i = 0; i < str.length-1; i++)
        if (str[i] > str[i + 1])
            return false;
    return true;
}

function meetsRules(n: number): boolean {
    return meetsSixDigits(n) && meetsSameAdjacent(n, 2) && meetsLeftToRightIncrease(n);
}

function assertEqual(expected: any, actual: any): boolean {
    if (expected == actual) return true;
    console.log(`Expected ${expected} but got ${actual}.`);
    return false;
}

function test(): boolean {
    return assertEqual(true, meetsRules(111111))
        && assertEqual(true, meetsRules(122345))
        && assertEqual(true, meetsRules(111123))
        && assertEqual(false, meetsRules(135679))
        && assertEqual(false, meetsRules(223450))
        && assertEqual(false, meetsRules(123789))
}

function main(): number {
    let limits = range.split("-").map((a) => parseInt(a));
    const fullRange = Array.from({ length: limits[1] - limits[0] }, (value, key) => key + limits[0]);
    console.log(fullRange.filter(meetsRules).length)

    return 0;
}

if (test()) console.log("exit code " + main());