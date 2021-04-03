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
	let pieceIndex = null;
	let piece = null;
	let color = GameBoard.side;

	/* Pawn */

	let pieceType = color ? PIECES.bP : PIECES.wP; //white = 0 black = 1

	for (pieceNum = 0; pieceNum < GameBoard.pieceNum[pieceType]; pieceType++) {
		square = GameBoard.pieceList[PieceIndex(pieceType, pieceNum)];

		/* Pawn move */
		GeneratePawnMove(square, color);
		/* Pawn capture */
		GeneratePawnCapture(square, color, 9);
		GeneratePawnCapture(square, color, 11);

		/* Pawn capture en passant*/
		if (GameBoard.enPassant != SQUARES.NO_SQ) {
			GeneratePawnCaptureEnPassant(square, color, 9);
			GeneratePawnCaptureEnPassant(square, color, 11);
		}
	}

	/* Castling */
	GenerateCastleKingside(color);
	GenerateCastleQueenside(color);

	/* Non slide piece (knight and king) */
	pieceIndex = loopNonSlideIndex[color];
	piece = loopNonSlidePiece[pieceIndex++];
	GenerateBig(pieceIndex, piece, GenerateNonSlideMove);

	/* Slide piece (rook, bishop and queen) */
	pieceIndex = loopSlideIndex[color];
	piece = loopSlidePiece[pieceIndex++];
	GenerateBig(pieceIndex, piece, GenerateSlideMove);
};

const GeneratePawnMove = (square, color) => {
	/* Pawn moves up 1 square */
	if (GameBoard.pieces[SquareOffset(square, color, 10)] == PIECES.EMPTY) {
		//Add pawn move

		/* Pawn moves up 2 squares */
		if (
			RanksBoard[square] == (color ? RANKS.RANK_7 : RANKS.RANK_2) &&
			GameBoard.pieces[SquareOffset(square, color, 20)] == PIECES.EMPTY
		)
			AddQuietMove(
				Move(
					square,
					SquareOffset(square, color, 20),
					PIECES.EMPTY,
					PIECES.EMPTY,
					moveFlagPawnStart
				)
			);
	}
};

const GeneratePawnCapture = (square, color, offset) => {
	if (
		SquareOffboard(SquareOffset(square, color, offset)) == Bool.False &&
		pieceCol[GameBoard.pieces[SquareOffset(square, color, offset)]] ==
			(color ? COLORS.WHITE : COLORS.BLACK)
	) {
		//Add pawn capture move
	}
};

const GeneratePawnCaptureEnPassant = (square, color, offset) => {
	const enPassantSquare = SquareOffset(square, color, offset);
	if (enPassantSquare == GameBoard.enPassant)
		AddEnPassantMove(
			square,
			enPassantSquare,
			PIECES.EMPTY,
			PIECES.EMPTY,
			moveFlagEnPassant
		);
};

const GenerateCastleKingside = (color) => {
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
			)
				AddQuietMove(
					Move(
						color ? SQUARES.E8 : SQUARES.E1,
						color ? SQUARES.G8 : SQUARES.G1,
						PIECES.EMPTY,
						PIECES.EMPTY,
						moveFlagCastle
					)
				);
};

const GenerateCastleQueenside = (color) => {
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
			)
				AddQuietMove(
					Move(
						color ? SQUARES.E8 : SQUARES.E1,
						color ? SQUARES.C8 : SQUARES.C1,
						PIECES.EMPTY,
						PIECES.EMPTY,
						moveFlagCastle
					)
				);
};

const GenerateNonSlideMove = (square, color, direction) => {
	let current_square = square + direction;
	if (SquareOffboard(current_square)) return;

	let current_piece = GameBoard.pieces[current_square];

	if (current_piece != PIECES.EMPTY) {
		if (pieceCol[current_piece] != color)
			AddCaptureMove(
				Move(
					square,
					current_square,
					GameBoard.pieces[current_square],
					PIECES.EMPTY,
					0
				)
			);
	} else {
		AddQuietMove(
			Move(square, current_square, PIECES.EMPTY, PIECES.EMPTY, 0)
		);
	}
};

const GenerateSlideMove = (square, color, direction) => {
	let current_square = square + direction;
	let current_piece = GameBoard.pieces[current_square];

	while (!SquareOffboard(current_square)) {
		if (current_piece != PIECES.EMPTY) {
			if (pieceCol[current_piece] != color) {
				AddCaptureMove(
					Move(
						square,
						current_square,
						GameBoard.pieces[current_square],
						PIECES.EMPTY,
						0
					)
				);
			}
			return;
		}
		AddQuietMove(
			Move(square, current_square, PIECES.EMPTY, PIECES.EMPTY, 0)
		);
		current_square += direction;
	}
};

const GenerateBig = (pieceIndex, piece, GenerateFunction) => {
	while (piece) {
		for (
			let pieceNum = 0;
			pieceNum < GameBoard.pieceNum[piece];
			pieceNum++
		) {
			let square = GameBoard.pieceList[PieceIndex(piece, pieceNum)];

			for (let i = 0; i < dirNum[piece]; i++) {
				let direction = pieceDir[piece][i];
				GenerateFunction(square, color, direction);
			}
		}
		piece = loopNonSlidePiece[pieceIndex++];
	}
};

const AddCaptureMove = (move) => {
	GameBoard.moveList[GameBoard.moveListStart[GameBoard.ply + 1]] = move;
	GameBoard.moveScores[GameBoard.moveListStart[GameBoard.ply + 1]++] = 0;
};

const AddQuietMove = (move) => {
	GameBoard.moveList[GameBoard.moveListStart[GameBoard.ply + 1]] = move;
	GameBoard.moveScores[GameBoard.moveListStart[GameBoard.ply + 1]++] = 0;
};

const AddEnPassantMove = (move) => {
	GameBoard.moveList[GameBoard.moveListStart[GameBoard.ply + 1]] = move;
	GameBoard.moveScores[GameBoard.moveListStart[GameBoard.ply + 1]++] = 0;
};
