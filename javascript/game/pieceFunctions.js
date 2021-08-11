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
	PrintPieceList();
};

const PrintPieceList = () => {
	// ispis svih figura na njihovim kockama
	for (let piece = PIECES.wP; piece <= PIECES.bK; piece++)
		for (let pieceNum; pieceNum < GameBoard.pieceNum[piece]; pieceNum++)
			console.log(
				`Piece ${pieceChar[piece]} on ${PrintSquare(
					GameBoard.pieceList[PieceIndex(piece, pieceNum)]
				)}`
			);
};
