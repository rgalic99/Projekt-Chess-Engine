const PawnTable = [
	0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, -10, -10, 0, 10, 10, 5, 0, 0, 5, 5, 0, 0,
	5, 0, 0, 10, 20, 20, 10, 0, 0, 5, 5, 5, 10, 10, 5, 5, 5, 10, 10, 10, 20, 20,
	10, 10, 10, 20, 20, 20, 30, 30, 20, 20, 20, 0, 0, 0, 0, 0, 0, 0, 0,
];

const KnightTable = [
	0, -10, 0, 0, 0, 0, -10, 0, 0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 10, 10, 10, 10, 0,
	0, 0, 0, 10, 20, 20, 10, 5, 0, 5, 10, 15, 20, 20, 15, 10, 5, 5, 10, 10, 20,
	20, 10, 10, 5, 0, 0, 5, 10, 10, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

const BishopTable = [
	0, 0, -10, 0, 0, -10, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 10, 15, 15, 10,
	0, 0, 0, 10, 15, 20, 20, 15, 10, 0, 0, 10, 15, 20, 20, 15, 10, 0, 0, 0, 10,
	15, 15, 10, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

const RookTable = [
	0, 0, 5, 10, 10, 5, 0, 0, 0, 0, 5, 10, 10, 5, 0, 0, 0, 0, 5, 10, 10, 5, 0,
	0, 0, 0, 5, 10, 10, 5, 0, 0, 0, 0, 5, 10, 10, 5, 0, 0, 0, 0, 5, 10, 10, 5,
	0, 0, 25, 25, 25, 25, 25, 25, 25, 25, 0, 0, 5, 10, 10, 5, 0, 0,
];

const BishopPair = 40;

const EvalPosition = () => {
	let score =
		GameBoard.material[COLORS.WHITE] - GameBoard.material[COLORS.BLACK];
	let square = SQUARES.NO_SQ;
	let pieceNum = 0;
	let piece = PIECES.EMPTY;
	let limit = 0;

	piece = PIECES.wP;
	limit = GameBoard.pieceNum[piece];

	for (pieceNum = 0; pieceNum < limit; pieceNum++) {
		square = GameBoard.pieceList[PieceIndex(piece, pieceNum)];
		score += PawnTable[GetSquare64(square)];
	}

	piece = PIECES.bP;
	limit = GameBoard.pieceNum[piece];

	for (pieceNum = 0; pieceNum < limit; pieceNum++) {
		square = GameBoard.pieceList[PieceIndex(piece, pieceNum)];
		score -= PawnTable[Mirror64(GetSquare64(square))];
	}

	piece = PIECES.wN;
	limit = GameBoard.pieceNum[piece];

	for (pieceNum = 0; pieceNum < limit; pieceNum++) {
		square = GameBoard.pieceList[PieceIndex(piece, pieceNum)];
		score += KnightTable[GetSquare64(square)];
	}

	piece = PIECES.bN;
	limit = GameBoard.pieceNum[piece];

	for (pieceNum = 0; pieceNum < limit; pieceNum++) {
		square = GameBoard.pieceList[PieceIndex(piece, pieceNum)];
		score -= KnightTable[Mirror64(GetSquare64(square))];
	}

	piece = PIECES.wR;
	limit = GameBoard.pieceNum[piece];

	for (pieceNum = 0; pieceNum < limit; pieceNum++) {
		square = GameBoard.pieceList[PieceIndex(piece, pieceNum)];
		score += RookTable[GetSquare64(square)];
	}

	piece = PIECES.bR;
	limit = GameBoard.pieceNum[piece];

	for (pieceNum = 0; pieceNum < limit; pieceNum++) {
		square = GameBoard.pieceList[PieceIndex(piece, pieceNum)];
		score -= RookTable[Mirror64(GetSquare64(square))];
	}

	piece = PIECES.wB;
	limit = GameBoard.pieceNum[piece];

	for (pieceNum = 0; pieceNum < limit; pieceNum++) {
		square = GameBoard.pieceList[PieceIndex(piece, pieceNum)];
		score += BishopTable[GetSquare64(square)];
	}

	piece = PIECES.bB;
	limit = GameBoard.pieceNum[piece];

	for (pieceNum = 0; pieceNum < limit; pieceNum++) {
		square = GameBoard.pieceList[PieceIndex(piece, pieceNum)];
		score -= BishopTable[Mirror64(GetSquare64(square))];
	}

	piece = PIECES.wQ;
	limit = GameBoard.pieceNum[piece];

	for (pieceNum = 0; pieceNum < limit; pieceNum++) {
		square = GameBoard.pieceList[PieceIndex(piece, pieceNum)];
		score += RookTable[GetSquare64(square)];
	}

	piece = PIECES.bQ;
	limit = GameBoard.pieceNum[piece];

	for (pieceNum = 0; pieceNum < limit; pieceNum++) {
		square = GameBoard.pieceList[PieceIndex(piece, pieceNum)];
		score -= RookTable[Mirror64(GetSquare64(square))];
	}

	if (GameBoard.pieceNum[PIECES.wB] >= 2) score += BishopPair;
	if (GameBoard.pieceNum[PIECES.bB] >= 2) score -= BishopPair;

	return GameBoard.side ? -score : score;
};
