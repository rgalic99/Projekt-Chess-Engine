const SquareAttacked = (square) => {
	if (AttackedByPawn(square)) return Bool.True;
	if (AttackedByKnight(square)) return Bool.True;
	if (AttackedByRookOrQueen(square)) return Bool.True;
	if (AttackedByBishopOrQueen(square)) return Bool.True;
	if (AttackedByKing(square)) return Bool.True;
	return Bool.False;
};

const AttackedByPawn = (square) => {
	// white=0, black=1
	const color = GameBoard.side;
	if (
		GameBoard.pieces[SquareOffset(square, 11)] ==
			(color ? PIECES.wP : PIECES.bP) || // if black is playing we check black pawns
		GameBoard.pieces[SquareOffset(square, 9)] ==
			(color ? PIECES.wP : PIECES.bP) // if white is playing we check white pawns
	)
		return Bool.True;
	return Bool.False;
};

const AttackedByKnight = (square) => {
	return CheckKnightAndKing(square, knightDirection, pieceKnight);
};

const AttackedByKing = (square) => {
	return CheckKnightAndKing(square, kingDirection, pieceKing);
};

const AttackedByBishopOrQueen = (square) => {
	return CheckBishopAndRook(square, bishopDirection, pieceBishopQueen);
};

const AttackedByRookOrQueen = (square) => {
	return CheckBishopAndRook(square, rookDirection, pieceRookQueen);
};

const CheckKnightAndKing = (square, directionArray, pieceArray) => {
	for (let index = 0; index < directionArray.length; index++) {
		let piece = GameBoard.pieces[square + directionArray[index]];
		if (CheckPiece(piece, pieceArray)) {
			return Bool.True;
		}
	}
	return Bool.False;
};

const CheckPiece = (piece, pieceArray) => {
	return (
		piece != SQUARES.OFFBOARD &&
		pieceArray[piece] &&
		pieceCol[piece] === GameBoard.side
	);
};

const CheckBishopAndRook = (square, directionArray, pieceArray) => {
	for (let index = 0; index < directionArray.length; index++) {
		let target_square = square + directionArray[index];
		let piece = GameBoard.pieces[target_square];

		while (piece != SQUARES.OFFBOARD) {
			if (piece != PIECES.EMPTY) {
				if (CheckPiece(piece, pieceArray)) return Bool.True;
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
			let piece = SquareAttacked(square) ? "X" : "-";
			line += ` ${piece} `;
		}
		console.log(line);
	}
};
