const FileRankToSquare = (file, rank) => {
	return 21 + file + rank * 10; // pronalazimo indeks kocke u matrici
};

const InitBoardArrays = () => {
	Board_120_to_64.fill(-1);
	Board_64_to_120.fill(-1);
	FilesBoard.fill(SQUARES.OFFBOARD);
	RanksBoard.fill(SQUARES.OFFBOARD);
};

const PopulateBoardArrays = () => {
	let square64 = 0;
	let square = 0;
	let rank = 0;
	let file = 0;

	for (rank = RANKS.RANK_1; rank <= RANKS.RANK_8; rank++) {
		for (file = FILES.FILE_A; file <= FILES.FILE_H; file++) {
			square = FileRankToSquare(file, rank);

			FilesBoard[square] = file; // populate FilesBoard
			RanksBoard[square] = rank; // populate RanksBoard

			Board_64_to_120[square64] = square;
			Board_120_to_64[square] = square64;
			square64++;
		}
	}
};
