const Bool = { False: 0, True: 1 }; // Boolean

const FileRankToSquare = (file, rank) => {
	return 21 + file + rank * 10; // pronalazimo indeks kocke u matrici
};

const PieceIndex = (piece, pieceNum) => {
	return piece * 10 + pieceNum; // vraća jedinstveni indeks neke figure
};

const SquareOffset = (square, offset) => {
	const color = GameBoard.side;
	return square + offset * (2 * color - 1); // white=0 / black=1
};

const SquareOffset1 = (square, offset, color) => {
	return square + offset * (2 * color - 1); // white=0 / black=1
};

const SquareOffboard = (square) => {
	return filesBoard[square] == SQUARES.OFFBOARD;
};

const PrintSquare = (square) => {
	// ispis kocke u algebarskom formatu
	return square == SQUARES.NO_SQ
		? "-"
		: `${fileChar[filesBoard[square]]}${rankChar[ranksBoard[square]]}`;
};

const PrintMove = (move) => {
	// e2e4 (za promociju dodati slovo figure u koju se promovira)
	const from = PrintSquare(fromSquare(move));
	const to = PrintSquare(toSquare(move));
	const promotionChar = PromotionChar(promotedPiece(move));

	return `${from}${to}${promotionChar}`;
};

const PromotionChar = (promoted) => {
	if (promoted) {
		if (pieceKnight[promoted]) return "k";
		if (pieceBishopQueen[promoted] && !pieceRookQueen[promoted]) return "b";
		if (!pieceBishopQueen[promoted] && pieceRookQueen[promoted]) return "r";
		return "q";
	}
	return "";
};
