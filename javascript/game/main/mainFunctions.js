const FileRankToSquare = (file, rank) => {
	return 21 + file + rank * 10; // pronalazimo indeks kocke u matrici
};

const InitBoardArrays = () => {
	board_120_to_64.fill(-1);
	board_64_to_120.fill(-1);
	filesBoard.fill(SQUARES.OFFBOARD);
	ranksBoard.fill(SQUARES.OFFBOARD);
};

const PopulateBoardArrays = () => {
	let square64 = 0;
	let square = 0;
	let rank = 0;
	let file = 0;

	for (rank = RANKS.RANK_1; rank <= RANKS.RANK_8; rank++) {
		for (file = FILES.FILE_A; file <= FILES.FILE_H; file++) {
			square = FileRankToSquare(file, rank);

			filesBoard[square] = file; // popunjavamo FilesBoard
			ranksBoard[square] = rank; // popunjavamo RanksBoard

			board_64_to_120[square64] = square;
			board_120_to_64[square] = square64;
			square64++;
		}
	}
};
