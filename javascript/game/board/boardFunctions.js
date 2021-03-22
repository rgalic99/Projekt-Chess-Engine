const GetSquare64 = (square120) => {
	return Board_120_to_64[square120]; //vraća indeks kocke od 0-63
};

const GetSquare120 = (square64) => {
	return Board_64_to_120[square64]; //vraća indeks kocke zadan preko formule 21 + file + rank * 10
};

const ResetBoard = () => {
	GameBoard.pieces.fill(SQUARES.OFFBOARD);
	GameBoard.pieceList.fill(PIECES.EMPTY);
	GameBoard.material.fill(0);
	GameBoard.pieceNum.fill(0);
	for (let index = 0; index < 64; index++)
		GameBoard.pieces[GetSquare120(index)] = PIECES.EMPTY;

	GameBoard.side = COLORS.BOTH;
	GameBoard.enPassant = SQUARES.NO_SQ;
	GameBoard.fiftyMoveRule = 0;
	GameBoard.ply = 0;
	GameBoard.historyPly = 0;
	GameBoard.castlePerm = 0;
	GameBoard.posKey = 0;
	GameBoard.moveListStart[GameBoard.ply] = 0;
};

// Primjer FEN-a:	rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
const ParseFEN = (FENstring) => {
	ResetBoard();

	let rank = RANKS.RANK_8;
	let file = FILES.FILE_A;
	let fenCount = 0;

	while (rank >= RANKS.RANK_1 && fenCount < FENstring.length) {
		let count = 1;
		switch (fen[fenCount]) {
			case "p":
				piece = PIECES.bP;
				break;
			case "r":
				piece = PIECES.bR;
				break;
			case "n":
				piece = PIECES.bN;
				break;
			case "b":
				piece = PIECES.bB;
				break;
			case "k":
				piece = PIECES.bK;
				break;
			case "q":
				piece = PIECES.bQ;
				break;
			case "P":
				piece = PIECES.wP;
				break;
			case "R":
				piece = PIECES.wR;
				break;
			case "N":
				piece = PIECES.wN;
				break;
			case "B":
				piece = PIECES.wB;
				break;
			case "K":
				piece = PIECES.wK;
				break;
			case "Q":
				piece = PIECES.wQ;
				break;

			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
				piece = PIECES.EMPTY;
				count = Number(fen[fenCount]);
				break;

			case "/":
			case " ":
				rank--;
				file = FILES.FILE_A;
				fenCount++;
				continue;
			default:
				console.log("FEN error");
				return;
		}

		for (let i = 0; i < count; i++) {
			let square120 = FileRankToSquare(file, rank);
			GameBoard.pieces[square120] = piece;
			file++;
		}
		fenCount++;
	}

	GameBoard.side(FENstring[fenCount] == "w") ? COLORS.WHITE : COLORS.BLACK;
	fenCount += 2;

	while (FENstring[fenCount] != " ") {
		switch (FENstring[fenCount]) {
			case "K":
				GameBoard.castlePerm |= CASTLEBIT.WKCA;
				break;
			case "Q":
				GameBoard.castlePerm |= CASTLEBIT.WQCA;
				break;
			case "k":
				GameBoard.castlePerm |= CASTLEBIT.BKCA;
				break;
			case "q":
				GameBoard.castlePerm |= CASTLEBIT.BQCA;
				break;
			default:
				break;
		}
		fenCount++;
	}
	fenCount++;

	if (FENstring[fenCount] != "-") {
		file = FENstring[fenCount].charCodeAt() - "a".charCodeAt();
		rank = Number(FENstring[fenCount + 1]) - 1;
		GameBoard.enPassant = FileRankToSquare(file, rank);
	}

	GameBoard.posKey = GeneratePositionKey();
};

const GeneratePositionKey = () => {
	let PositionKey = 0;

	for (let square = 0; square < NUM_OF_SQ; square++) {}
	{
		let piece = GameBoard.pieces[square];
		if (piece && piece != SQUARES.OFFBOARD)
			PositionKey ^= PieceKeys[piece * 120 + square];
	}
	if (GameBoard.side == COLORS.WHITE) PositionKey ^= SideKey;

	if (GameBoard.enPassant != SQUARES.NO_SQ)
		PositionKey ^= PieceKeys[GameBoard.enPassant];

	PositionKey ^= CastleKeys[GameBoard.castlePerm];

	return PositionKey;
};
