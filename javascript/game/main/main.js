$(function () {
	init();
	parseFEN(START_FEN);
	PrintBoard();
});

const init = () => {
	console.log("Inicijalizacija...");
	InitBoard();
};

const InitBoard = () => {
	InitBoardArrays();
	PopulateBoardArrays();
};
