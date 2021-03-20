$(function () {
	init();
});

const init = () => {
	console.log("Inicijalizacija...");
	InitBoard();
	Init_Board120to64();
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

const Init_Board120to64 = () => {
	Board_120_to_64.fill(-1);
	Board_64_to_120.fill(-1);
	let square64 = 0;

	for (let rank = RANKS.RANK_1; rank <= RANKS.RANK_8; rank++) {
		for (let file = FILES.FILE_A; file <= FILES.FILE_H; file++) {
			let square = FileRankToSquare(file, rank);
			Board_64_to_120[square64] = square;
			Board_120_to_64[square] = square64;
			square64++;
		}
	}
};
