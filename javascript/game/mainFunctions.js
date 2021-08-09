const InitBoardArrays = () => {
	// inicijalizacija nizova
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

			filesBoard[square] = file; // popunjavamo filesBoard
			ranksBoard[square] = rank; // popunjavamo ranksBoard

			board_64_to_120[square64] = square; // popunjavamo board_64_to_120
			board_120_to_64[square] = square64; // popunjavamo board_120_to_64
			square64++;
		}
	}
};

const InitializeHistory = () => {
	// inicijalizacija povijesti
	for (let i = 0; i < MAX_GAME_MOVES; i++)
		GameBoard.history.push({
			move: noMove,
			castlePerm: 0,
			enPassant: 0,
			fiftyMoveRule: 0,
			posKey: 0,
		});

	// inicijalizacija PV tablice
	for (let i = 0; i < PvEntries; i++)
		GameBoard.PvTable.push({
			move: noMove,
			posKey: 0,
		});
};
