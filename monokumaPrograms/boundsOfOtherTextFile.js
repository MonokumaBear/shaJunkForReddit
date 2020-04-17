//Program for the upper bounds of the other text file ("Nihilist.txt" as opposed to the usual "46ty.txt"); copy and pasted from other program but just switched out the value of "ciphertext"
//Both encrypted messages seem to use the same key, as Nihilist.txt also follows the 0070000 pattern
//Eventually implement this as a feature into the other program, and probably turn the program into a command-line program or something for ease of use

const ciphertext = "46 64 89 70 69 45 35 66 77 108 76 88 65 68 45 77 69 67 87 67 49 46 74 107 88 59 77 65 34 96 95 56 85 77 77 38 53 76 89 69 57 56 66 95 69 57 59 65 59 34 53 69 67 87 45 68 54 97 99 78 55 45 56 55 64 88 87 89 79 67 27 87 66 67 99 59 65 36 83 68 50 89 79 58 54 87 77 76 77 65 65 68 63 99 78 88 45 66 35 76 106 80 99 57 56 66 95 75 46 77 35 59 38 96 79 90 66 45 39 45 56 95 79 66 67 67 58 97 97 89 69 66 46 47 94 99 90 56 65 77 36 87 69 50 55 45 69 56 86 75 56 88 65 49 47 53 76 88 79 57 46 27 57 75 88 89 76 65 56 56 86 47 85 39 69 68 63 98 76 86 38 65 54 73 95 49 98 49 39 45 76 106 50 89 55 65 57 74 69 49 85 59 46 47 83 89 56 85 79 66 24 95 89 67 99 59 45 57 83 89 46 78 45 35 27 63 65 88 79 78 65 58 76 65 57 97 59 79 54 65 95 49 88 56 47 54 94 99 70 59 56 67 45 87 109 67 99 59 45 24 63 65 47 89 45 56 66 95 65 77 86 78 49 37 87 96 76 79 69 47 24 56 88 76 79 78 65 67 67 106 80 79 39 59 58 57 65 59 99 65 59 67 83 86 90 79 78 49 48 74 89 68 85 56 45 67 83 78 80 65 68 56 25 74 99 49 55 66 66 35 76 106 80 99 75 46 67 54 95 49 78 56 57 66 83 69";
const splitCiphertext = ciphertext.split(" ");

console.log("Minimum/maximum bounds of digits in key:");
console.log("Format for each 2-digit value: [min, max] - {invalid values}");
console.log("Polybius Square with 1-based index:");
let extremaSet = [];
for (let i = 0; i < splitCiphertext.length; i++) {
	const n = splitCiphertext[i];
	let extrema = [];
	extrema[0] = n - 99;
	if (extrema[0] < 0) {
		extrema[0] = 0;
	};
	extrema[1] = n - 11;
	for (let i = 2; i < Math.ceil(n / 10); i++) {
		extrema[i] = n - 10 * i;
	};
	extremaSet[i] = extrema;
	let setNotationStatement = "\t[" + extrema[0] + ", " + extrema[1] + "] - {";
	for (let i = 2; i < extrema.length - 1; i++) {
		setNotationStatement += extrema[i] + ", ";
	};
	if (extrema.length > 2) {
		setNotationStatement += extrema[extrema.length - 1];
	};
	setNotationStatement += "}";
	console.log(setNotationStatement);
};
console.log("Polybius Square with 0-based index:");
for (let i = 0; i < splitCiphertext.length; i++) {
	const n = splitCiphertext[i];
	let extrema = [];
	extrema[0] = n - 99;
	if (extrema[0] < 0) {
		extrema[0] = 0;
	};
	extrema[1] = n;
	let setNotationStatement = "\t[" + extrema[0] + ", " + extrema[1] + "] - {}";
	console.log(setNotationStatement);
};

const keyLength = 7;
let keyBounds = [];
for (let i = 0; i < keyLength; i++) {
	keyBounds[i] = [-1, 9999];
};
console.log("\n");
console.log("Set of possible key values:");
console.log("Key length: 7");
for (let i = 0; i < extremaSet.length; i++) {
	if (extremaSet[i][0] > keyBounds[i % keyLength][0]) {
		keyBounds[i % keyLength][0] = extremaSet[i][0];
	};
	if (extremaSet[i][1] < keyBounds[i % keyLength][1]) {
		keyBounds[i % keyLength][1] = extremaSet[i][1];
	};
	for (let j = 2; j < extremaSet[i].length; j++) {
		let found = false;
		for (let k = 2; k < keyBounds[i % keyLength].length; k++) {
			if (extremaSet[i][j] === keyBounds[i % keyLength][k]) {
				found = true;
				break;
			};
		};
		if (!found) {
			keyBounds[i % keyLength][keyBounds[i % keyLength].length] = extremaSet[i][j];
		};
	};
};
for (let i = 0; i < keyBounds.length; i++) {
	for (let j = 2; j < keyBounds[i].length; j++) {
		if (keyBounds[i][j] < keyBounds[i][0] || keyBounds[i][j] > keyBounds[i][1]) {
			keyBounds[i].splice(j, 1);
			j--;
		};
	};
	let setNotationStatement = "\t[" + keyBounds[i][0] + ", " + keyBounds[i][1] + "] - {";
	for (let j = 2; j < keyBounds[i].length - 1; j++) {
		setNotationStatement += keyBounds[i][j] + ", ";
	};
	if (keyBounds[i].length > 2) {
		setNotationStatement += keyBounds[i][keyBounds[i].length - 1];
	};
	setNotationStatement += "}";
	console.log(setNotationStatement);
};

let permutations = 1;
for (let i = 0; i < keyBounds.length; i++) {
	let characterPermutations = keyBounds[i][1] - keyBounds[i][0] + 1;
	let subtractedCharacters = keyBounds[i].length - 2;
	if (subtractedCharacters > 0) {
		characterPermutations -= subtractedCharacters;
	};
	permutations *= characterPermutations;
};
console.log("\n");
console.log("Permutations: " + permutations);