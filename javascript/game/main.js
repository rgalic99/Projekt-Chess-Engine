$(() => {
	Sleep(30);
	Init();
	ParseFEN(START_FEN);
	PrintBoard();
	/* 	GenerateMoves();
	CheckBoard();
	MakeMove(GameBoard.moveList[0]);
	PrintBoard();
	CheckBoard();
	TakeMove();
	PrintBoard();
	CheckBoard(); */
	//GenerateMoves();
	//PrintMoveList();
});

const Init = () => {
	console.log("Inicijalizacija...");
	InitBoard();
};

const InitBoard = () => {
	InitBoardArrays();
	InitializeHistory();
	PopulateBoardArrays();
};
