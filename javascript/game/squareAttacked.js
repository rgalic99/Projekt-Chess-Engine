const SquareAttacked = (square, side) => {
	if (AttackedByPawn(square, side)) return Bool.True;
	if (AttackedByKnight(square, side)) return Bool.True;
	if (AttackedByRookOrQueen(square, side)) return Bool.True;
	if (AttackedByBishopOrQueen(square, side)) return Bool.True;
	if (AttackedByKing(square, side)) return Bool.True;
	return Bool.False;
};

const AttackedByPawn = (square) => {
	//white=0, black=1
	if (
		GameBoard.pieces[SquareOffset(square, side, 11)] ==
			(side ? PIECES.wP : PIECES.bP) || //if black is playing we check black pawns
		GameBoard.pieces[SquareOffset(square, 9)] ==
			(side ? PIECES.wP : PIECES.bP) //if white is playing we check white pawns
	)
		return Bool.True;
	return Bool.False;
};
const AttackedByKnight = (square, side) => {
	return CheckKnightAndKing(square, side, knightDirection, pieceKnight);
};
const AttackedByKing = (square, side) => {
	return CheckKnightAndKing(square, side, kingDirection, pieceKing);
};

const AttackedByBishopOrQueen = (square, side) => {
	return CheckBishopAndRook(square, side, bishopDirection, pieceBishopQueen);
};

const AttackedByRookOrQueen = (square, side) => {
	return CheckBishopAndRook(square, side, rookDirection, pieceRookQueen);
};

const CheckKnightAndKing = (square, side, directionArray, pieceArray) => {
	for (let index = 0; index < directionArray.length; index++) {
		let piece = GameBoard.pieces[square + directionArray[index]];
		if (CheckPiece(piece, side, pieceArray)) {
			return Bool.True;
		}
	}
	return Bool.False;
};

const CheckPiece = (piece, side, pieceArray) => {
	return (
		piece != SQUARES.OFFBOARD &&
		pieceArray[piece] &&
		pieceCol[piece] == side
	);
};

const CheckBishopAndRook = (square, side, directionArray, pieceArray) => {
	for (let index = 0; index < directionArray.length; index++) {
		let target_square = square + directionArray[index];
		let piece = GameBoard.pieces[target_square];

		while (piece != SQUARES.OFFBOARD) {
			if (piece != PIECES.EMPTY) {
				if (CheckPiece(piece, side, pieceArray)) return Bool.True;
				break;
			}

			target_square += directionArray[index];
			piece = GameBoard.pieces[target_square];
		}
	}
	return Bool.False;
};

const PrintAttackedSquares = () => {
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
