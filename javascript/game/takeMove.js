const TakeMove = () => {
	// vraćanje unazad
	GameBoard.historyPly--;
	GameBoard.ply--;

	const move = GameBoard.history[GameBoard.historyPly].move;
	const from = fromSquare(move);
	const to = toSquare(move);

	// ako je potez bio enPassant
	if (GameBoard.enPassant != SQUARES.NO_SQ) HashEnPassant();

	// hashiranje prava rokade
	HashCastle();

	// ažuriranje vrijednosti
	GameBoard.castlePerm = GameBoard.history[GameBoard.historyPly].castlePerm;
	GameBoard.fiftyMoveRule =
		GameBoard.history[GameBoard.historyPly].fiftyMoveRule;
	GameBoard.enPassant = GameBoard.history[GameBoard.historyPly].enPassant;

	// ako je potez bio enPassant
	if (GameBoard.enPassant != SQUARES.NO_SQ) HashEnPassant();

	// hashiranje prava rokade
	HashCastle();

	// promjena strane
	GameBoard.side ^= 1;
	HashSide();

	const color = GameBoard.side;
	// ako je potez enPassant
	if (move & moveFlagEnPassant)
		AddPiece(SquareOffset(to, 10), color ? PIECES.wP : PIECES.bP);
	// ako je potez rokada
	else if (move & moveFlagCastle)
		switch (to) {
			case SQUARES.C1:
				MovePiece(SQUARES.D1, SQUARES.A1);
				break;
			case SQUARES.C8:
				MovePiece(SQUARES.D8, SQUARES.A8);
				break;
			case SQUARES.G1:
				MovePiece(SQUARES.F1, SQUARES.H1);
				break;
			case SQUARES.G8:
				MovePiece(SQUARES.F8, SQUARES.H8);
				break;
			default:
				break;
		}

	MovePiece(to, from);

	// vraćanje oduzete figure ako postoji
	const captured = capturedPiece(move);
	if (captured != PIECES.EMPTY) AddPiece(to, captured);

	// vraćanje poteza u slučaju promocije ako se dogodi
	const promoted = promotedPiece(move);

	if (promoted != PIECES.EMPTY) {
		ClearPiece(from);
		AddPiece(from, pieceCol[promoted] ? PIECES.bP : PIECES.wP);
	}
};
