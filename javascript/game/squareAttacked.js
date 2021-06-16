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
		GameBoard.pieces[SquareOffset(square, 11)] ==
			(color ? PIECES.bP : PIECES.wP) || // if black is playing we check black pawns
		GameBoard.pieces[SquareOffset(square, 9)] ==
			(color ? PIECES.bP : PIECES.wP) // if white is playing we check white pawns
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
	for (let index = 0; index < directionArray.length; index++) {
		let piece = GameBoard.pieces[square + directionArray[index]];
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
	for (let index = 0; index < directionArray.length; index++) {
		let target_square = square + directionArray[index];
		let piece = GameBoard.pieces[target_square];

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

const PrintAttackedSquares = () => {
	// ispis napadnutih kocki
	console.log("\nAttacked:\n");
	for (let rank = RANKS.RANK_8; rank >= RANKS.RANK_1; rank--) {
		let line = `${rank + 1}  `;
		for (let file = FILES.FILE_A; file <= FILES.FILE_H; file++) {
			let square = FileRankToSquare(file, rank);
			let piece = SquareAttacked(square, GameBoard.side) ? "X" : "-";
			line += ` ${piece} `;
		}
		console.log(line);
	}
};
