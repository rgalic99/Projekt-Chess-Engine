const SquareAttacked = (square, side) => {
	if (AttackedByPawn(square, side)) return Bool.True;
	if (AttackedByKnight(square, side)) return Bool.True;
	if (AttackedByRookOrQueen(square, side)) return Bool.True;
	if (AttackedByBishopOrQueen(square, side)) return Bool.True;
	if (AttackedByKing(square, side)) return Bool.True;
	return Bool.False;
};

const AttackedByPawn = (square, side) => {
	//white=0, black=1
	if (
		GameBoard.pieces[square + 22 * side - 11] == //if side is white then square-11 otherwise square+11
			(side ? PIECES.bP : PIECES.wP) || //if black is playing side will be 1 and therefore true so we check black pawns
		GameBoard.pieces[square + 18 * side - 9] == //if side is white then -9 otherwise +9
			(side ? PIECES.bP : PIECES.wP) //if white is playing side will be 0 and therefore false so we check white pawns
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

const CheckKnightAndKing = (square, side, directionArray, pieceArray) => {
	for (let index = 0; index < directionArray.length; index++) {
		let piece = GameBoard.pieces[square + directionArray[index]];
		if (CheckPiece(piece, side, pieceArray)) {
			return Bool.True;
		}
	}
	return Bool.False;
};

const AttackedByBishopOrQueen = (square, side) => {
	return CheckBishopAndRookAndQueen(
		square,
		side,
		bishopDirection,
		pieceBishopQueen
	);
};

const AttackedByRookOrQueen = (square, side) => {
	return CheckBishopAndRookAndQueen(
		square,
		side,
		rookDirection,
		pieceRookQueen
	);
};

const CheckBishopAndRookAndQueen = (
	square,
	side,
	directionArray,
	pieceArray
) => {
	for (let index = 0; index < directionArray.length; index++) {
		let current_square = square + directionArray[index];
		let piece = GameBoard.pieces[current_square];

		while (piece != SQUARES.OFFBOARD) {
			if (CheckPiece(piece, side, pieceArray)) return Bool.True;

			current_square += directionArray[index];
			piece = GameBoard.pieces[current_square];
		}
	}
	return Bool.False;
};

const CheckPiece = (piece, side, pieceArray) => {
	return (
		piece != PIECES.EMPTY && pieceArray[piece] && pieceCol[piece] == side
	);
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
