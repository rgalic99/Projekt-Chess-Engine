$(() => {
	Sleep(30);
	Init();
	NewGame(START_FEN);
});

const Init = () => {
	console.log("Inicijalizacija...");
	InitBoard();
};

const InitBoard = () => {
	InitBoardArrays();
	InitializeHistory();
	InitHashKeys();
	PopulateBoardArrays();
	InitMvvLva();
	InitBoardSquares();
};
