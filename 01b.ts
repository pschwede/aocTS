let module_masses = `102111
81442
104967
146349
97956
148336
55752
110518
136080
79361
101709
71796
72543
88058
87187
67778
75471
135632
101309
67060
87048
64775
52160
119184
55284
83289
94809
78017
117854
76469
94504
92372
133595
107269
57182
85578
83777
91167
86119
114263
60369
72562
69544
92699
135045
147230
83105
143488
56494
63019
112366
128119
58293
132542
93266
76032
111651
127490
107633
61260
120876
116254
101151
128722
111623
103470
53224
93922
87624
131864
82431
90465
148373
90119
123744
118713
143700
113581
140687
119516
149497
72281
108641
111605
148274
69326
116571
56540
87595
55068
120602
56557
125534
133162
51828
117883
94637
54577
135114
83866`;


function fuelFor(mass: number, norecurse?: boolean): number {
	let result: number = Math.max(0, Math.floor(mass / 3) - 2);
	if(result > 0 && !norecurse) result += fuelFor(result);
	return result;
}

function totalFuel(lines: string): number {
	let result: number = 0;
	for (let d of lines.split("\n")) {
    		result += fuelFor(Number(d.toString().trim()));
	};
	return result;
}


// ### Unit testing ###
function assertEqual(expected: any, actual: any): boolean {
	if (expected == actual) {
		// console.log("" + expected + " equals " + actual + ".");
		return true;
	}
	console.log(`Unfulfilled assertion. Expected ${ expected } but got ${ actual }.`);
	return false;
}

function test(): boolean {
	return assertEqual(2, fuelFor(14))
		&& assertEqual(654, fuelFor(1969, true))
		&& assertEqual(216, fuelFor(654, true))
		&& assertEqual(70, fuelFor(216, true))
		&& assertEqual(21, fuelFor(70, true))
		&& assertEqual(5, fuelFor(21, true))
		&& assertEqual(0, fuelFor(5, true))
		&& assertEqual(966, totalFuel(`1969`))
		&& assertEqual(50346, totalFuel(`100756`))
}
// end unit testing

// ### entry point ###
function main(): number {
	if (!test()) return 2;

	console.log(`The sum of the fuel requirements for all of the modules on your spacecraft when also taking into account the mass of the added fuel is ${ totalFuel(module_masses) }.`);

	return 0;
}

console.log("exit code " + main());