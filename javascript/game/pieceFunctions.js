const UpdateMaterialLists = () => {
	GameBoard.pieceList.fill(PIECES.EMPTY);
	GameBoard.material.fill(0);
	GameBoard.pieceNum.fill(0);

	for (let i = 0; i < 64; i++) {
		let square = GetSquare120(i);
		let piece = GameBoard.pieces[square];
		if (piece != PIECES.EMPTY) {
			color = pieceCol[piece];
			GameBoard.material[color] += pieceVal[piece];
			GameBoard.pieceList[
				PieceIndex(piece, GameBoard.pieceNum[piece])
			] = square;
			GameBoard.pieceNum[piece]++;
		}
	}
	PrintPieceList();
};

const PrintPieceList = () => {
	for (let piece = PIECES.wP; piece <= PIECES.bK; piece++)
		for (let pieceNum; pieceNum < GameBoard.pieceNum[piece]; pieceNum++)
			console.log(
				`Piece ${pieceChar[piece]} on ${PrintSquare(
					GameBoard.pieceList[PieceIndex(piece, pieceNum)]
				)}`
			);
};
