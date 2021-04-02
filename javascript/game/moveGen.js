/*
fromSquare = prvih 7 bitova 0x7F
toSquare = pomaknut za 7 << 0x7F
capturedPiece = stane u 4 bita a pomak je 14 << 0xF
enPassant = 1 bit 0x40000
pawnStart = 1 bit 0x80000
promotion = stane u 4 bita a pomak je 20 << 0xF
castling = 1 bit 0x1000000
*/

const fromSquare = (move) => {
	return move & 0x7f;
};

const toSquare = (move) => {
	return (move >> 7) & 0x7f;
};

const capturedPiece = (move) => {
	return (move >> 14) & 0xf;
};

const promotedPiece = (move) => {
	return (move >> 20) & 0xf;
};

const moveFlagEnPassant = 0x40000;
const moveFlagPawnStart = 0x80000;
const moveFlagCastle = 0x1000000;

const moveFlagCapture = 0x7c000;
const moveFlagPromotion = 0xf00000;

const noMove = 0;

const Move = (from, to, captured, flag) => {
	return from | (to << 7) | (captured << 14) | (promoted << 20) | flag;
};

const GenerateMoves = () => {
	//	GameBoard.moveListStart -> indeks prvog poteza u nekom ply-u
	//	GameBoard.moveList -> lista svih poteza

	GameBoard.moveListStart[GameBoard.ply + 1] =
		GameBoard.moveListStart[GameBoard.ply];

	let square = null;
	let pieceNum = null;
	let color = GameBoard.side;

	/* Pawn move */

	let pieceType = color ? PIECES.bP : PIECES.wP; //white = 0 black = 1

	for (pieceNum = 0; pieceNum < GameBoard.pieceNum[pieceType]; pieceType++) {
		square = GameBoard.pieceList[PieceIndex(pieceType, pieceNum)];

		/* Pawn moves up 1 square */
		if (GameBoard.pieces[SquareOffset(square, color, 10)] == PIECES.EMPTY) {
			//Add pawn move

			/* Pawn moves up 2 squares */
			if (
				RanksBoard[square] == (color ? RANKS.RANK_7 : RANKS.RANK_2) &&
				GameBoard.pieces[SquareOffset(square, color, 20)] ==
					PIECES.EMPTY
			) {
				//Add pawn start move (quiet move)
			}
		}

		/* Pawn capture */
		if (
			SquareOffboard(SquareOffset(square, color, 9)) == Bool.False &&
			pieceCol[GameBoard.pieces[SquareOffset(square, color, 9)]] ==
				(color ? COLORS.WHITE : COLORS.BLACK)
		) {
			//Add pawn capture move
		}
		if (
			SquareOffboard(SquareOffset(square, color, 11)) == Bool.False &&
			pieceCol[GameBoard.pieces[SquareOffset(square, color, 11)]] ==
				(color ? COLORS.WHITE : COLORS.BLACK)
		) {
			//Add pawn capture move
		}

		/* Pawn capture en passant*/
		if (GameBoard.enPassant != SQUARES.NO_SQ) {
			if (SquareOffset(square, color, 9) == GameBoard.enPassant) {
				//add en Passant move
			}
			if (SquareOffset(square, color, 11) == GameBoard.enPassant) {
				//add en Passant move
			}
		}
	}

	/* Castling */

	if (GameBoard.castlePerm & (CASTLEBIT.BKCA | CASTLEBIT.WKCA))
		if (
			GameBoard.pieces[color ? SQUARES.F8 : SQUARES.F1] == PIECES.EMPTY &&
			GameBoard.pieces[color ? SQUARES.G8 : SQUARES.F1] == PIECES.EMPTY
		)
			if (
				SquareAttacked(color ? SQUARES.F8 : SQUARES.F1, !color) ==
					Bool.False &&
				SquareAttacked(color ? SQUARES.E8 : SQUARES.E1, !color) ==
					Bool.False
			) {
				//Add quiet move (castle) kingside
			}
	if (GameBoard.castlePerm & (CASTLEBIT.BQCA | CASTLEBIT.WQCA))
		if (
			GameBoard.pieces[color ? SQUARES.B8 : SQUARES.B1] == PIECES.EMPTY &&
			GameBoard.pieces[color ? SQUARES.C8 : SQUARES.C1] == PIECES.EMPTY &&
			GameBoard.pieces[color ? SQUARES.D8 : SQUARES.D1] == PIECES.EMPTY
		)
			if (
				SquareAttacked(color ? SQUARES.D8 : SQUARES.D1, !color) ==
					Bool.False &&
				SquareAttacked(color ? SQUARES.E8 : SQUARES.E1, !color) ==
					Bool.False
			) {
				//Add quiet move (castle) queenside
			}

	pieceType = color ? PIECES.bN : PIECES.wN;
};
