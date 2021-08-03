const ClearPiece = (square) => {
	const piece = GameBoard.pieces[square];
	const color = pieceCol[piece];

	HashPiece(piece, square); // figura se hashira van kocke
	GameBoard.pieces[square] = PIECES.EMPTY; // kocka se mijenja sa praznim mjestom
	GameBoard.material[color] -= pieceVal[piece]; // materijal se umanjuje za vrijednost figure

	const index = GameBoard.pieceList.indexOf(square, PieceIndex(piece, 0));
	const last = --GameBoard.pieceNum[piece];
	GameBoard.pieceList[index] = GameBoard.pieceList[PieceIndex(piece, last)]; // na indeks figure postavlja se indeks zadnje figure tog tipa
};

const AddPiece = (square, piece) => {
	HashPiece(piece, square); // figura se hashira u novu kocku

	const color = pieceCol[piece];
	GameBoard.pieces[square] = piece; // na kocku se stavlja figura
	GameBoard.material[color] += pieceVal[piece]; // materijal se uvećava za vrijednost figure

	const numOfPiece = GameBoard.pieceNum[piece]++; // broj figura se uvećava za jedan
	GameBoard.pieceList[PieceIndex(piece, numOfPiece)] = square; // pamti se kocka na kojoj se figura nalazi
};

const MovePiece = (from, to) => {
	const piece = GameBoard.pieces[from];
	HashPiece(piece, from); // figura se hashira van kocke
	GameBoard.pieces[from] = PIECES.EMPTY; // kocka se mijenja sa praznim mjestom
	HashPiece(piece, to); // figura se hashira u novu kocku
	GameBoard.pieces[to] = piece; // na kocku se stavlja figura

	const index = GameBoard.pieceList.indexOf(from, PieceIndex(piece, 0));
	GameBoard.pieceList[index] = to; // pamti se kocka na kojoj se figura nalazi
};

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

const MakeMove = (move) => {
	const from = fromSquare(move);
	const to = toSquare(move);
	const side = GameBoard.side;
	const edis = !side;

	GameBoard.history[GameBoard.historyPly].posKey = GameBoard.posKey;
	// ako je potez enPassant
	if (move & moveFlagEnPassant) ClearPiece(SquareOffset(to, 10));
	// ako je potez rokada
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

	// ako je enPassant moguć hashira se
	if (GameBoard.enPassant != SQUARES.NO_SQ) HashEnPassant();
	// hasira se pravo rokade
	HashCastle();

	// ažurira se povijest
	GameBoard.history[GameBoard.historyPly].move = move;
	GameBoard.history[GameBoard.historyPly].fiftyMoveRule =
		GameBoard.fiftyMoveRule;
	GameBoard.history[GameBoard.historyPly].enPassant = GameBoard.enPassant;
	GameBoard.history[GameBoard.historyPly].castlePerm = GameBoard.castlePerm;

	// ažurira se pravo rokade
	GameBoard.castlePerm &= castlePerm[from];
	GameBoard.castlePerm &= castlePerm[to];
	GameBoard.enPassant = SQUARES.NO_SQ;

	// hasira se pravo rokade
	HashCastle();

	const captured = capturedPiece(move);
	GameBoard.fiftyMoveRule++;

	if (captured != PIECES.EMPTY) {
		ClearPiece(to);
		GameBoard.fiftyMoveRule = 0; // resetiranje pravila 50 poteza
	}

	GameBoard.historyPly++;
	GameBoard.ply++;

	if (piecePawn[GameBoard.pieces[from]]) {
		GameBoard.fiftyMoveRule = 0; // resetiranje pravila 50 poteza
		if (move & moveFlagPawnStart) {
			GameBoard.enPassant = SquareOffset(from, -10); // postavlja se kocka za enPassant
			HashEnPassant(); // hasira se enPassant
		}
	}

	MovePiece(from, to);

	// obrada poteza u slučaju promocije
	const promoted = promotedPiece(move);
	if (promoted != PIECES.EMPTY) {
		ClearPiece(to);
		AddPiece(to, promoted);
	}

	// promjena strane
	GameBoard.side ^= 1;
	HashSide();

	// provjera je li potez moguć
	if (SquareAttacked(GameBoard.pieceList[PieceIndex(kings[side], 0)], edis)) {
		TakeMove();
		return Bool.False;
	}
	return Bool.True;
};
