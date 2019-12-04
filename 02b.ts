let program: string = `1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,9,19,1,10,19,23,2,9,23,27,1,6,27,31,2,31,9,35,1,5,35,39,1,10,39,43,1,10,43,47,2,13,47,51,1,10,51,55,2,55,10,59,1,9,59,63,2,6,63,67,1,5,67,71,1,71,5,75,1,5,75,79,2,79,13,83,1,83,5,87,2,6,87,91,1,5,91,95,1,95,9,99,1,99,6,103,1,103,13,107,1,107,5,111,2,111,13,115,1,115,6,119,1,6,119,123,2,123,13,127,1,10,127,131,1,131,2,135,1,135,5,0,99,2,14,0,0`;

function parseProgram(program: string): Array<number> {
	return program.split(',').map((x) => parseInt(x, 10));
}

function runComputer(memory: Array<number>, debug?: boolean): Array<number>{
	let position: number = 0;
	while(position < memory.length && memory[position] != 99) {
		let op: number = memory[position + 0];
		let in1: number = memory[position + 1];
		let in2: number = memory[position + 2];
		let out: number = memory[position + 3];
		if(debug) console.log(`pos: ${ position }, op: ${ op }, in1: ${ in1 } (${ memory[in1] }), in2: ${ in2 } (${ memory[in2] }), out: ${ out } (${ memory[out] })`);
		switch(op) {
			case 1: {
				memory[out] = memory[in1] + memory[in2];
				if(debug) console.log(`${ memory[in1] } + ${ memory[in2] } = ${ memory[out] }`);
				break;
			}
			case 2: {
				memory[out] = memory[in1] * memory[in2];
				if(debug) console.log(`${ memory[in1] } * ${ memory[in2] } = ${ memory[out] }`);
				break;
			}
			case 99: {
				return memory;
				break;
			}
		}
		position += 4;
	}
	return memory;
}

function compute(noun: number, verb: number, program: string): number {
	let memory: Array<number> = parseProgram(program);
	memory[1] = noun;
	memory[2] = verb;
	return runComputer(memory)[0];
}

function bruteForce(target: number, program: string): [number, number] {
	let result: number = -1;
	for(let noun = 0; noun < 100; noun++) {
		for(let verb = 0; verb < 100; verb++) {
			result = compute(noun, verb, program);
			if(result == target)
				return [noun, verb];
		}
	}
	return [NaN,NaN]
}

function main(): number {
	let nounVerb: [number, number] = bruteForce(19690720, program);

	console.log(`noun: ${ nounVerb[0] }, verb: ${ nounVerb[1] }`);

	return 0;
}

function assertEqual(expected: any, actual: any): boolean {
	if(expected.toString() == actual.toString()) return true;
	console.log(`Test failed. Expected ${ expected } but got ${ actual }.`);
	return false;
}

function test(): boolean {
	return assertEqual([1,2,3,4], parseProgram(`1,2,3,4`))
		&& assertEqual(parseProgram(`3500,9,10,70,2,3,11,0,99,30,40,50`), runComputer(parseProgram(`1,9,10,3,2,3,11,0,99,30,40,50`)))
		&& assertEqual(parseProgram(`2,0,0,0,99`), runComputer(parseProgram(`1,0,0,0,99`)))
		&& assertEqual(parseProgram(`2,3,0,6,99`), runComputer(parseProgram(`2,3,0,3,99`)))
		&& assertEqual(parseProgram(`2,4,4,5,99,9801`), runComputer(parseProgram(`2,4,4,5,99,0`)))
		&& assertEqual(parseProgram(`30,1,1,4,2,5,6,0,99`), runComputer(parseProgram(`1,1,1,4,99,5,6,0,99`)));
}

if(test()) console.log("exit code " + main());