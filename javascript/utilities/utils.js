const ConsoleFiles = () => {
	filesBoard.forEach((e, index) => {
		console.log(`FileSquare ${index} : ${e}`);
	});
};

const ConsoleRanks = () => {
	ranksBoard.forEach((e, index) => {
		console.log(`RankSquare ${index} : ${e}`);
	});
};

const BOOL = { FALSE: 0, TRUE: 1 };

const PieceIndex = (piece, pieceNum) => {
	return piece * 10 + pieceNum; //vraća jedinstveni indeks neke figure
};

const RAND_32 = () => {
	return (
		(Math.floor(Math.random() * 255 + 1) << 23) |
		(Math.floor(Math.random() * 255 + 1) << 16) |
		(Math.floor(Math.random() * 255 + 1) << 8) |
		Math.floor(Math.random() * 255 + 1)
	);
};
