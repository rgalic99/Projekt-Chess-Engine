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

const Move = (from, to, captured, promoted, flag) => {
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
	for (pieceNum = 0; pieceNum < GameBoard.pieceNum[pieceType]; pieceNum++) {
		square = GameBoard.pieceList[PieceIndex(pieceType, pieceNum)];

		/* Pawn move */
		GeneratePawnMove(square);
		/* Pawn capture */
		GeneratePawnCapture(square, 9);
		GeneratePawnCapture(square, 11);

		/* Pawn capture en passant*/
		if (GameBoard.enPassant != SQUARES.NO_SQ) {
			GeneratePawnCaptureEnPassant(square, 9);
			GeneratePawnCaptureEnPassant(square, 11);
		}
	}

	/* Castling */
	GenerateCastleKingside();
	GenerateCastleQueenside();

	/* Non slide piece (knight and king) */
	pieceIndex = loopNonSlideIndex[color];
	piece = loopNonSlidePiece[pieceIndex++];
	GenerateBig(pieceIndex, piece, GenerateNonSlideMove, loopNonSlidePiece);

	/* Slide piece (rook, bishop and queen) */
	pieceIndex = loopSlideIndex[color];
	piece = loopSlidePiece[pieceIndex++];
	GenerateBig(pieceIndex, piece, GenerateSlideMove, loopSlidePiece);
};

const GeneratePawnMove = (square) => {
	const color = GameBoard.side;
	/* Pawn moves up 1 square */
	if (GameBoard.pieces[SquareOffset(square, 10)] == PIECES.EMPTY) {
		const targetSquare = SquareOffset(square, 10);

		AddPawnCaptureOrQuietMove(square, targetSquare, PIECES.EMPTY);
		/* Pawn moves up 2 squares */
		if (
			ranksBoard[square] == (color ? RANKS.RANK_7 : RANKS.RANK_2) &&
			GameBoard.pieces[SquareOffset(square, 20)] == PIECES.EMPTY
		)
			AddQuietMove(
				Move(
					square,
					SquareOffset(square, 20),
					PIECES.EMPTY,
					PIECES.EMPTY,
					moveFlagPawnStart
				)
			);
	}
};

const GeneratePawnCapture = (square, offset) => {
	const color = GameBoard.side;
	const targetSquare = SquareOffset(square, offset);
	const targetPiece = GameBoard.pieces[targetSquare];

	if (!SquareOffboard(targetSquare) && pieceCol[targetPiece] != color)
		AddPawnCaptureOrQuietMove(square, targetSquare, targetPiece);
};

const GeneratePawnCaptureEnPassant = (square, offset) => {
	const enPassantSquare = SquareOffset(square, offset);

	if (enPassantSquare == GameBoard.enPassant)
		AddEnPassantMove(
			square,
			enPassantSquare,
			PIECES.EMPTY,
			PIECES.EMPTY,
			moveFlagEnPassant
		);
};

const GenerateCastleKingside = () => {
	const color = GameBoard.side;
	const targetEsquare = color ? SQUARES.E8 : SQUARES.E1;
	const targetFsquare = color ? SQUARES.F8 : SQUARES.F1;
	const targetGsquare = color ? SQUARES.G8 : SQUARES.G1;

	if (GameBoard.castlePerm & (CASTLEBIT.BKCA | CASTLEBIT.WKCA))
		if (
			GameBoard.pieces[targetFsquare] == PIECES.EMPTY &&
			GameBoard.pieces[targetGsquare] == PIECES.EMPTY
		)
			if (
				SquareAttacked(targetFsquare, !color) == Bool.False &&
				SquareAttacked(targetEsquare, !color) == Bool.False
			)
				AddQuietMove(
					Move(
						targetEsquare,
						targetGsquare,
						PIECES.EMPTY,
						PIECES.EMPTY,
						moveFlagCastle
					)
				);
};

const GenerateCastleQueenside = () => {
	const color = GameBoard.side;
	const targetBsquare = color ? SQUARES.B8 : SQUARES.B1;
	const targetCsquare = color ? SQUARES.C8 : SQUARES.C1;
	const targetDsquare = color ? SQUARES.D8 : SQUARES.D1;
	const targetEsquare = color ? SQUARES.E8 : SQUARES.E1;

	if (GameBoard.castlePerm & (CASTLEBIT.BQCA | CASTLEBIT.WQCA))
		if (
			GameBoard.pieces[targetBsquare] == PIECES.EMPTY &&
			GameBoard.pieces[targetCsquare] == PIECES.EMPTY &&
			GameBoard.pieces[targetDsquare] == PIECES.EMPTY
		)
			if (
				SquareAttacked(targetDsquare, !color) == Bool.False &&
				SquareAttacked(targetEsquare, !color) == Bool.False
			)
				AddQuietMove(
					Move(
						targetEsquare,
						targetCsquare,
						PIECES.EMPTY,
						PIECES.EMPTY,
						moveFlagCastle
					)
				);
};

const GenerateNonSlideMove = (square, direction) => {
	const color = GameBoard.side;
	let target_square = square + direction;
	if (SquareOffboard(target_square)) return;

	let target_piece = GameBoard.pieces[target_square];
	if (target_piece != PIECES.EMPTY) {
		if (pieceCol[target_piece] != color)
			AddCaptureMove(
				Move(square, target_square, target_piece, PIECES.EMPTY, 0)
			);
	} else {
		AddQuietMove(
			Move(square, target_square, PIECES.EMPTY, PIECES.EMPTY, 0)
		);
	}
};

const GenerateSlideMove = (square, direction) => {
	const color = GameBoard.side;
	let target_square = square + direction;

	while (!SquareOffboard(target_square)) {
		let target_piece = GameBoard.pieces[target_square];

		if (target_piece != PIECES.EMPTY) {
			if (pieceCol[target_piece] != color) {
				AddCaptureMove(
					Move(square, target_square, target_piece, PIECES.EMPTY, 0)
				);
			}
			return;
		}
		AddQuietMove(
			Move(square, target_square, PIECES.EMPTY, PIECES.EMPTY, 0)
		);
		target_square += direction;
	}
};
const GenerateBig = (pieceIndex, piece, GenerateFunction, loopArray) => {
	let pieceNum = 0;
	while (piece) {
		for (pieceNum = 0; pieceNum < GameBoard.pieceNum[piece]; pieceNum++) {
			let square = GameBoard.pieceList[PieceIndex(piece, pieceNum)];

			for (let i = 0; i < dirNum[piece]; i++) {
				let direction = pieceDir[piece][i];
				GenerateFunction(square, direction);
			}
		}
		piece = loopArray[pieceIndex++];
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

const AddPawnCaptureOrQuietMove = (from, to, captured) => {
	const color = GameBoard.side;
	const targetRank = color ? RANKS.RANK_2 : RANKS.RANK_7;

	if (ranksBoard[from] == targetRank)
		captured
			? AddPawnPromotionMoves(from, to, captured, AddCaptureMove)
			: AddPawnPromotionMoves(from, to, captured, AddQuietMove);
	else
		captured
			? AddCaptureMove(Move(from, to, captured, PIECES.EMPTY, 0))
			: AddQuietMove(Move(from, to, captured, PIECES.EMPTY, 0));
};

const AddPawnPromotionMoves = (from, to, captured, PromotionMove) => {
	const color = GameBoard.side;
	PromotionMove(Move(from, to, captured, color ? PIECES.bQ : PIECES.wQ, 0));
	PromotionMove(Move(from, to, captured, color ? PIECES.bR : PIECES.wR, 0));
	PromotionMove(Move(from, to, captured, color ? PIECES.bB : PIECES.wB, 0));
	PromotionMove(Move(from, to, captured, color ? PIECES.bN : PIECES.wN, 0));
};
