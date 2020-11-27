export let board = [
	["", "", ""],
	["", "", ""],
	["", "", ""],
];
export const human = "x";
export const cpu = "o";

const scores = {
	o: 1,
	x: -1,
	tie: 0,
};
export let humanMoves = [];
let cpuMoves = [];

export function boardReset() {
	board = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];
	humanMoves = [];
	cpuMoves = [];
}

export function checkWinner() {
	let openSpots = 0;
	let winner = null;

	// HORIZONTAL
	for (let i = 0; i < 3; i++) {
		if (board[i][0] == cpu && board[i][1] == cpu && board[i][2] == cpu) {
			winner = cpu;
		} else if (
			board[i][0] == human &&
			board[i][1] == human &&
			board[i][2] == human
		) {
			winner = human;
		}
	}
	// VERTICAL
	for (let i = 0; i < 3; i++) {
		if (board[0][i] == cpu && board[1][i] == cpu && board[2][i] == cpu) {
			winner = cpu;
		} else if (
			board[0][i] == human &&
			board[1][i] == human &&
			board[2][i] == human
		) {
			winner = human;
		}
	}
	// DIAGONALS
	// FIRST DIAGONAL
	if (board[0][0] == cpu && board[1][1] == cpu && board[2][2] == cpu) {
		winner = cpu;
	} else if (
		board[0][0] == human &&
		board[1][1] == human &&
		board[2][2] == human
	) {
		winner = human;
	}

	// SECOND DIAGONAL
	if (board[0][2] == cpu && board[1][1] == cpu && board[2][0] == cpu) {
		winner = cpu;
	} else if (
		board[0][2] == human &&
		board[1][1] == human &&
		board[2][0] == human
	) {
		winner = human;
	}
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[i][j] === "") {
				openSpots++;
			}
		}
	}
	if (winner == null && openSpots == 0) {
		return "tie";
	} else {
		return winner;
	}
}

function minmax(board, isMaximazing) {
	let result = checkWinner();
	let i, j;
	if (result != null) {
		return scores[result];
	}
	if (isMaximazing) {
		let bestScore = -Infinity;
		for (i = 0; i < 3; i++) {
			for (j = 0; j < 3; j++) {
				if (board[i][j] === "") {
					board[i][j] = cpu;
					let score = minmax(board, false);
					board[i][j] = "";
					bestScore = Math.max(score, bestScore);
				}
			}
		}
		return bestScore;
	} else {
		let bestScore = Infinity;
		for (i = 0; i < 3; i++) {
			for (j = 0; j < 3; j++) {
				if (board[i][j] === "") {
					board[i][j] = human;
					let score = minmax(board, true);
					board[i][j] = "";
					bestScore = Math.min(score, bestScore);
				}
			}
		}
		return bestScore;
	}
}

export function bestMove() {
	let score, bestScore, bestI, bestJ;
	score = bestScore = -Infinity;

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			// CHECK FOR AVAILABLE SPOT
			if (board[i][j] === "") {
				board[i][j] = cpu;
				score = minmax(board, false);
				board[i][j] = "";
				if (score > bestScore) {
					bestScore = score;
					bestI = i;
					bestJ = j;
				}
			}
		}
	}
	board[bestI][bestJ] = cpu;
	cpuMoves.push(`${bestI} ${bestJ}`);
	console.log("CPU played at " + bestI + " and " + bestJ + " position.");
	return { bestI, bestJ };
}

function availableSpots() {
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[i][j] === "") {
				console.log(i + " " + j);
			}
		}
	}
}

function humanMove() {
	humanMoves.forEach((el) => console.log(el));
}
function cpuMove() {
	cpuMoves.forEach((el) => console.log(el));
}
