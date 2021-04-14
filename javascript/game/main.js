$(() => {
	Sleep(30);
	Init();
	ParseFEN(START_FEN);
	PrintBoard();
	//GenerateMoves();
	//PrintMoveList();
});

const Init = () => {
	console.log("Inicijalizacija...");
	InitBoard();
};

const InitBoard = () => {
	InitBoardArrays();
	PopulateBoardArrays();
};
