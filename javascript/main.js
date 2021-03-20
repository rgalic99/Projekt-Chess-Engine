$(function () {
	init();
});

const init = () => {
	console.log("Inicijalizacija...");
	InitBoard();
};

const InitBoard = () => {
	FilesBoard.fill(SQUARES.OFFBOARD);
	RanksBoard.fill(SQUARES.OFFBOARD);

	for (let rank = RANKS.RANK_1; rank <= RANKS.RANK_8; rank++) {
		for (let file = FILES.FILE_A; file <= FILES.FILE_H; file++) {
			let square = FileRankToSquare(file, rank);
			FilesBoard[square] = file;
			RanksBoard[square] = rank;
		}
	}
};

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
