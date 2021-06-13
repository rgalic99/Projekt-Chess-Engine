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

const MovePiece = (from, to) => {
	const piece = GameBoard.pieces[from];
	HashPiece(piece, from);
	GameBoard.pieces[from] = PIECES.EMPTY;
	HashPiece(piece, to);
	GameBoard.pieces[to] = piece;

	const index = GameBoard.pieceList.indexOf(from, PieceIndex(piece, 0));
	GameBoard.pieceList[index] = to;
};

const MakeMove = (move) => {
	const from = fromSquare(move);
	const to = toSquare(move);

	if (move & moveFlagEnPassant) ClearPiece(SquareOffset(to, 10));
	else if (move & moveFlagCastle)
		switch (to) {
			case SQUARES.C1:
				MovePiece(SQUARES.A1, SQUARES.D1);
				break;
			case SQUARES.C8:
				MovePiece(SQUARES.A8, SQUARES.D8);
				break;
			case SQUARES.G1:
				MovePiece(SQUARES.H1, SQUARES.F1);
				break;
			case SQUARES.G8:
				MovePiece(SQUARES.H8, SQUARES.F8);
				break;
			default:
				break;
		}

	if (GameBoard.enPassant != SQUARES.NO_SQ) HashEnPassant();

	GameBoard.history[GameBoard.historyPly].move = move;
	GameBoard.history[GameBoard.historyPly].fiftyMoveRule =
		GameBoard.fiftyMoveRule;
	GameBoard.history[GameBoard.historyPly].enPassant = GameBoard.enPassant;
	GameBoard.history[GameBoard.historyPly].castlePerm = GameBoard.castlePerm;

	GameBoard.castlePerm &= castlePerm[from];
	GameBoard.castlePerm &= castlePerm[to];
	GameBoard.enPassant = SQUARES.NO_SQ;

	HashCastle();

	const captured = capturedPiece(move);
	GameBoard.fiftyMoveRule++;

	if (captured != PIECES.EMPTY) {
		ClearPiece(to);
		GameBoard.fiftyMoveRule = 0;
	}

	GameBoard.historyPly++;
	GameBoard.ply++;

	if (piecePawn[GameBoard.pieces[from]]) {
		GameBoard.fiftyMoveRule = 0;
		if (move & moveFlagPawnStart) {
			GameBoard.enPassant = SquareOffset(from, 10);
			HashEnPassant();
		}
	}

	MovePiece(from, to);

	const promoted = promotedPiece(move);
	if (promoted != PIECES.EMPTY) {
		ClearPiece(to);
		AddPiece(to, promoted);
	}
	GameBoard.side ^= 1;
	HashSide();

	if (
		SquareAttacked(
			GameBoard.pieceList[PieceIndex(kings[GameBoard.side], 0)]
		)
	) {
		//TODO TakeMove()
		return Bool.False;
	}
	return Bool.True;
};
