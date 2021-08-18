const UpdateMaterialLists = () => {
	// broji se materijal za obje strane
	GameBoard.pieceList.fill(PIECES.EMPTY);
	GameBoard.material.fill(0);
	GameBoard.pieceNum.fill(0);
	let i = 0;
	let square = 0;
	let piece = 0;

	for (i = 0; i < 64; i++) {
		square = GetSquare120(i);
		piece = GameBoard.pieces[square];
		if (piece != PIECES.EMPTY) {
			color = pieceCol[piece];
			GameBoard.material[color] += pieceVal[piece];
			GameBoard.pieceList[PieceIndex(piece, GameBoard.pieceNum[piece])] =
				square;
			GameBoard.pieceNum[piece]++;
		}
	}
};
