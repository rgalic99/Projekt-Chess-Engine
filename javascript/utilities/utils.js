const ConsoleFiles = () => {
	FilesBoard.forEach((e, index) => {
		console.log(`FileSquare ${index} : ${e}`);
	});
};

const ConsoleRanks = () => {
	RanksBoard.forEach((e, index) => {
		console.log(`RankSquare ${index} : ${e}`);
	});
};

const BOOL = { FALSE: 0, TRUE: 1 };

const PieceIndex = (piece, pieceNum) => {
	return piece * 10 + pieceNum; //vraća jedinstveni indeks neke figure
};
