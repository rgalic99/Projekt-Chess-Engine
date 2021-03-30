const SquareAttacked = (square, side) => {
	if (AttackedByPawn(square, side)) return Boolean.True;
	if (AttackedByKnight(square, side)) return Boolean.True;
	if (AttackedByBishopOrQueen(square, side)) return Boolean.True;
	if (AttackedByRookOrQueen(square, side)) return Boolean.True;
	if (AttackedByKing(square, side)) return Boolean.True;
	return Boolean.False;
};

const AttackedByPawn = (square, side) => {
	//white=0, black=1
	if (
		GameBoard.pieces[square + 22 * side - 11] == side //if side is white then -11 otherwise +11
			? PIECES.bP //if black is playing side will be 1 and therefore true so we check black pawns
			: PIECES.wP || GameBoard.pieces[square + 18 * side - 9] == side //if side is white then -9 otherwise +9
			? PIECES.bP
			: PIECES.wP //if white is playing side will be 0 and therefore false so we check white pawns
	)
		return Boolean.True;
	return Boolean.False;
};

const AttackedByKnight = (square, side) => {
	knightDirection.forEach((knightSquare) => {
		let piece = GameBoard.pieces[square + knightSquare];
		if (
			piece != SQUARES.OFFBOARD &&
			pieceCol[piece] == side &&
			pieceKnight[piece]
		) {
			return Boolean.True;
		}
	});
	return Boolean.False;
};

const AttackedByKing = (square, side) => {
	kingDirection.forEach((kingSquare) => {
		let piece = GameBoard.pieces[square + kingSquare];
		if (
			piece != SQUARES.OFFBOARD &&
			pieceCol[piece] == side &&
			pieceKing[piece]
		) {
			return Boolean.True;
		}
	});
	return Boolean.False;
};

const AttackedByBishopOrQueen = (square, side) => {
	bishopDirection.forEach((direction) => {
		do {
			let current_square = square + direction;
			let piece = GameBoard.pieces[current_square];
			if (
				piece != PIECES.EMPTY &&
				pieceBishopQueen[piece] &&
				pieceCol[piece] == side
			)
				return Boolean.True;
		} while (piece != SQUARES.OFFBOARD);
	});
	return Boolean.False;
};

const AttackedByRookOrQueen = (square, side) => {
	rookDirection.forEach((direction) => {
		do {
			let current_square = square + direction;
			let piece = GameBoard.pieces[current_square];
			if (
				piece != PIECES.EMPTY &&
				pieceRookQueen[piece] &&
				pieceCol[piece] == side
			)
				return Boolean.True;
		} while (piece != SQUARES.OFFBOARD);
	});
	return Boolean.False;
};
