//Possible positions of each value of the key in the Polybius square
console.log("The console must support the following Unicode box-drawing characters: U+2500, U+2502, U+250C, U+2510, U+2514, U+2518, U+251C, U+2524, U+252C, U+2534, U+253C, U+2588");
let possibleKeyValues = [
	[11, 12, 13],
	[11, 12, 18, 19, 21, 22, 28, 29, 31, 32, 38, 39, 41, 42],
	[11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44],
	[11, 12, 13, 14, 15, 21, 22, 23, 24, 25, 31, 32, 33, 34, 35],
	[11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44],
	[11, 12, 13, 14, 21, 22, 23, 24],
	[11, 12, 13, 14, 21, 22, 23, 24]
];
for (let i = 0; i < possibleKeyValues.length; i++) {
	console.log("Key[" + i + "]");
	console.log("\u250c\u2500\u252c\u2500\u252c\u2500\u252c\u2500\u252c\u2500\u252c\u2500\u252c\u2500\u252c\u2500\u252c\u2500\u2510");
	for (let j = 0; j < possibleKeyValues[i].length; j++) {
		possibleKeyValues[i][j] = [Math.floor(possibleKeyValues[i][j] / 10), possibleKeyValues[i][j] - 10 * Math.floor(possibleKeyValues[i][j] / 10)];
	};
	for (let j = 0; j < 9; j++) {
		let columnString = "";
		for (let k = 0; k < 9; k++) {
			let found = false;
			for (let l = 0; l < possibleKeyValues[i].length; l++) {
				if (possibleKeyValues[i][l][0] === j + 1 && possibleKeyValues[i][l][1] === k + 1) {
					found = true;
					break;
				};
			};
			columnString += "\u2502";
			if (found) {
				columnString += "\u2588";
			} else {
				columnString += " ";
			};
		};
		columnString += "\u2502";
		console.log(columnString);
		if (j < 8) {
			console.log("\u251c\u2500\u253c\u2500\u253c\u2500\u253c\u2500\u253c\u2500\u253c\u2500\u253c\u2500\u253c\u2500\u253c\u2500\u2524");
		};
	};
	console.log("\u2514\u2500\u2534\u2500\u2534\u2500\u2534\u2500\u2534\u2500\u2534\u2500\u2534\u2500\u2534\u2500\u2534\u2500\u2518");
};