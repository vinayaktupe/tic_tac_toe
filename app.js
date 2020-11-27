import { board, human, cpu, checkWinner, bestMove, boardReset } from "./tictactoe";

const message = document.querySelector(`#message`);

let currentPlayer = human;

document.querySelector("table").addEventListener("click", function (e) {
	let element = document.querySelector(`#${e.target.id}`);
	let move = getIndexes(element.id);
	currentPlayer = human;

	if (board[move.i][move.j] === "") {
		// 1] Human Plays
		board[move.i][move.j] = human;
		createIcon(currentPlayer, element);

		if (checkWinner() === human) {
			message.textContent = "human won!";
			return;
		} else if (checkWinner() === cpu) {
			message.textContent = "cpu won!";
			return;
		} else if (checkWinner() === "tie") {
			alert("TIE!");
			reset();
			return;
		}

		// 2] CPU Plays
		currentPlayer = cpu;
		move = bestMove();
		const id = getID(move.bestI, move.bestJ);
		element = document.querySelector(`#${id}`);
		createIcon(currentPlayer, element);

		//3] CHECK WINNER
		if (checkWinner() === human) {
			message.textContent = "human won!";
			setTimeout(reset, 3000);
		} else if (checkWinner() === cpu) {
			message.textContent = "cpu won!";
			setTimeout(reset, 3000);
		} else if (checkWinner() === "tie") {
			reset();
			alert("TIE!");
		}
	}
});

function createIcon(type, parent) {
	if (parent && parent.childNodes.length === 0) {
		const icons = {
			o: `<i class="fa fa-circle-thin icon"></i>`,
			x: `<i class="fa fa-times icon"></i>`,
		};
		parent.insertAdjacentHTML("afterbegin", icons[type]);
	}
}

document.querySelector("#reset").addEventListener("click", function () {
	reset();
});

function reset() {
	message.textContent = "";
	currentPlayer = human;
	document.querySelectorAll("td").forEach((el) => {
		if (el.childNodes.length == 1) {
			el.removeChild(el.childNodes[0]);
		}
	});
	boardReset();
}

function getIndexes(id) {
	let i = 0,
		j = 0;
	switch (id) {
		case "cell_1":
			i = 0;
			j = 0;
			break;
		case "cell_2":
			i = 1;
			j = 0;
			break;
		case "cell_3":
			i = 2;
			j = 0;
			break;
		case "cell_4":
			i = 0;
			j = 1;
			break;
		case "cell_5":
			i = 1;
			j = 1;
			break;
		case "cell_6":
			i = 2;
			j = 1;
			break;
		case "cell_7":
			i = 0;
			j = 2;
			break;
		case "cell_8":
			i = 1;
			j = 2;
			break;
		case "cell_9":
			i = 2;
			j = 2;
			break;
		default:
			break;
	}
	return { i, j };
}

function getID(i, j) {
	let id = null;
	if (i == 0 && j == 0) {
		id = "cell_1";
	} else if (i == 1 && j == 0) {
		id = "cell_2";
	} else if (i == 2 && j == 0) {
		id = "cell_3";
	} else if (i == 0 && j == 1) {
		id = "cell_4";
	} else if (i == 1 && j == 1) {
		id = "cell_5";
	} else if (i == 2 && j == 1) {
		id = "cell_6";
	} else if (i == 0 && j == 2) {
		id = "cell_7";
	} else if (i == 1 && j == 2) {
		id = "cell_8";
	} else if (i == 2 && j == 2) {
		id = "cell_9";
	}
	return id;
}
/*
if (currentPlayer === human) {
		//1]Human Plays
		let id = document.querySelector(`#${e.target.id}`);
		let { i, j } = getIndexes(id.id);
		board[i][j] = currentPlayer;
		humanMoves.push(`${i} ${j}`);
		console.log(`Human played at ${i} ${j}`);
		createIcon(currentPlayer, id);
		console.log(`Board: ${board}`);

		//2]CPU Plays
		currentPlayer = cpu;
		console.log(`Current player: ${currentPlayer}`);
		const { bestI, bestJ } = bestMove();
		console.log(`i: ${bestI} and ${bestJ}`);
		const cell = getID(bestI, bestJ);
		id = document.querySelector(`#${cell}`);
		console.log(`CPU played at ${i} ${j}`);
		createIcon(currentPlayer, id);
	}
	currentPlayer = human;

	if (checkWinner() === human) {
		message.textContent = "human won!";
	} else if (checkWinner() === cpu) {
		message.textContent = "cpu won!";
	} else if (checkWinner() === "tie") {
		alert("TIE!");
		reset();
	}
 */
