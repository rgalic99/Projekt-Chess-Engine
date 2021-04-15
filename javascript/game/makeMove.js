const ClearPiece = (square) => {
	const piece = GameBoard.pieces[square];
	const color = pieceCol[piece];

	HashPiece(piece, square);
	GameBoard.pieces[square] = PIECES.EMPTY;
	GameBoard.material[color] -= pieceVal[piece];

	const index = GameBoard.pieceList.indexOf(square, PieceIndex(piece, 0));
	const last = --GameBoard.pieceNum[piece];
	GameBoard.pieceList[PieceIndex(piece, index)] =
		GameBoard.pieceList[PieceIndex(piece, last)];
};

const AddPieceToSquare = (piece, square) => {
	HashPiece(piece, square);

	const color = pieceCol[piece];
	GameBoard.pieces[square] = piece;
	GameBoard.material[color] += pieceVal[piece];

	const numOfPiece = GameBoard.pieceNum[piece]++;
	GameBoard.pieceList[pieceIndex(piece, numOfPiece)] = square;
};
