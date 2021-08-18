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
	let i = 0;
	// inicijalizacija povijesti
	for (i = 0; i < MAX_GAME_MOVES; i++)
		GameBoard.history.push({
			move: noMove,
			castlePerm: 0,
			enPassant: 0,
			fiftyMoveRule: 0,
			posKey: 0,
		});

	// inicijalizacija PV tablice
	for (i = 0; i < PvEntries; i++)
		GameBoard.PvTable.push({
			move: noMove,
			posKey: 0,
		});
};

const InitBoardSquares = () => {
	let light = 1;
	let rank = 0;
	let file = 0;
	let rankName = "";
	let fileName = "";
	let lightString = "";
	let divString = "";

	for (rank = RANKS.RANK_8; rank >= RANKS.RANK_1; rank--) {
		light ^= 1;
		rankName = `rank${rank + 1}`;
		for (file = FILES.FILE_A; file <= FILES.FILE_H; file++) {
			fileName = `file${file + 1}`;
			lightString = light ? "Dark" : "Light";
			light ^= 1;
			divString = `<div class="Square ${rankName} ${fileName} ${lightString}"/>`;
			$(".board").append(divString);
		}
	}
};

const NewGame = (fenString) => {
	ClearAllPieces();
	ParseFEN(fenString);
	SetInitalBoardPieces();
	CheckAndSet();
};

const ClearAllPieces = () => {
	$(".Piece").remove();
};

const SetInitalBoardPieces = () => {
	let square = 0;
	let square120 = 0;
	let piece = 0;
	ClearAllPieces();
	for (square = 0; square < 64; square++) {
		square120 = GetSquare120(square);
		piece = GameBoard.pieces[square120];

		if (piece >= PIECES.wP && piece <= PIECES.bK)
			AddPieceGUI(square120, piece);
	}
};
