$(function () {
	init();
});

const init = () => {
	console.log("Inicijalizacija...");
	InitBoard();
};

const InitBoard = () => {
	InitBoardArrays();
	PopulateBoardArrays();
};
