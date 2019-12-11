const range = `234208-765869`

function meetsSixDigits(n: number): boolean {
    return ("" + n).length == 6;
}

function meetsSameAdjacent(n: number): boolean {
    let str: string = "" + n;
    for (let x of "0123456789") {
        let count = 0;
        for (let i = 0; i < str.length; i++) {
            if (x == str[i])
                count++;
        }
        if (count == 2) return true;
    }
    return false;
}

function meetsLeftToRightIncrease(n: number): boolean {
    const str = "" + n;
    for (let i = 0; i < str.length-1; i++)
        if (str[i] > str[i + 1])
            return false;
    return true;
}

function meetsRules(n: number): boolean {
    return meetsSixDigits(n) && meetsSameAdjacent(n) && meetsLeftToRightIncrease(n);
}

function assertEqual(expected: any, actual: any, line: string = ""): boolean {
    if (expected == actual) return true;
    console.log(`${line} Expected ${expected} but got ${actual}.`);
    return false;
}

function test(): boolean {
    return assertEqual(false, meetsRules(111111), "1)")
        && assertEqual(true, meetsRules(122345), "2)")
        && assertEqual(false, meetsRules(111123), "3)")
        && assertEqual(true, meetsRules(112345), "3a)")
        && assertEqual(true, meetsRules(123455), "3b)")
        && assertEqual(true, meetsRules(112233), "3c)")
        && assertEqual(false, meetsRules(135679), "4)")
        && assertEqual(false, meetsRules(223450), "5)")
        && assertEqual(false, meetsRules(123789), "6)")
        && assertEqual(false, meetsRules(123444), "7)")
        && assertEqual(true, meetsRules(111122), "8)")
}

function main(): number {
    let limits = range.split("-").map((a) => parseInt(a));
    const fullRange = Array.from({ length: limits[1] - limits[0] }, (_, key) => key + limits[0]);
    console.log(fullRange.filter((a) => meetsRules(a)).length)

    return 0;
}

if (test()) console.log("exit code " + main());