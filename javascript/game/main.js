$(() => {
	Sleep(30);
	Init();
	ParseFEN(START_FEN);
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
};
