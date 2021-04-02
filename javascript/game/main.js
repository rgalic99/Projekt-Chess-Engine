$(() => {
	Sleep(30);
	Init();
	ParseFEN(START_FEN);
	PrintBoard();
});

const Init = () => {
	console.log("Inicijalizacija...");
	InitBoard();
};

const InitBoard = () => {
	InitBoardArrays();
	PopulateBoardArrays();
};
