const SquareAttacked = (square, color) => {
	if (AttackedByPawn(square, color)) return Bool.True;
	if (AttackedByKnight(square, color)) return Bool.True;
	if (AttackedByRookOrQueen(square, color)) return Bool.True;
	if (AttackedByBishopOrQueen(square, color)) return Bool.True;
	if (AttackedByKing(square, color)) return Bool.True;
	return Bool.False;
};

const AttackedByPawn = (square, color) => {
	// white=0, black=1
	if (
		GameBoard.pieces[SquareOffset1(square, 11, color)] ==
			(color ? PIECES.bP : PIECES.wP) ||
		GameBoard.pieces[SquareOffset1(square, 9, color)] ==
			(color ? PIECES.bP : PIECES.wP)
	)
		return Bool.True;
	return Bool.False;
};

const AttackedByKnight = (square, color) => {
	return CheckKnightAndKing(square, knightDirection, pieceKnight, color);
};

const AttackedByKing = (square, color) => {
	return CheckKnightAndKing(square, kingDirection, pieceKing, color);
};

const AttackedByBishopOrQueen = (square, color) => {
	return CheckBishopAndRook(square, bishopDirection, pieceBishopQueen, color);
};

const AttackedByRookOrQueen = (square, color) => {
	return CheckBishopAndRook(square, rookDirection, pieceRookQueen, color);
};

const CheckKnightAndKing = (square, directionArray, pieceArray, color) => {
	let index = 0;
	let length = directionArray.length;
	let piece = PIECES.EMPTY;

	for (index = 0; index < length; index++) {
		piece = GameBoard.pieces[square + directionArray[index]];
		if (CheckPiece(piece, pieceArray, color)) {
			return Bool.True;
		}
	}
	return Bool.False;
};

const CheckPiece = (piece, pieceArray, color) => {
	return (
		piece != SQUARES.OFFBOARD &&
		pieceArray[piece] &&
		pieceCol[piece] == color
	);
};

const CheckBishopAndRook = (square, directionArray, pieceArray, color) => {
	let index = 0;
	let target_square = 0;
	let piece = 0;
	let length = directionArray.length;

	for (index = 0; index < length; index++) {
		target_square = square + directionArray[index];
		piece = GameBoard.pieces[target_square];

		while (piece != SQUARES.OFFBOARD) {
			if (piece != PIECES.EMPTY) {
				if (CheckPiece(piece, pieceArray, color)) return Bool.True;
				break;
			}
			target_square += directionArray[index];
			piece = GameBoard.pieces[target_square];
		}
	}
	return Bool.False;
};
