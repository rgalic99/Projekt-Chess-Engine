const ConsoleFiles = () => {
	// ispis FileSquare
	filesBoard.forEach((e, index) => {
		console.log(`FileSquare ${index} : ${e}`);
	});
};

const ConsoleRanks = () => {
	// ispis RankSquare
	ranksBoard.forEach((e, index) => {
		console.log(`RankSquare ${index} : ${e}`);
	});
};

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
		? "No"
		: `${fileChar[filesBoard[square]]}${rankChar[ranksBoard[square]]}`;
};

const PrintSquare64 = (number64) => {
	// ispis kocke u algebarskom formatu
	const squareStringNum = Math.ceil(number64 / 8);
	const squareStringLetter = number64 - 8 * Math.floor(number64 / 8);

	const squareString = `${MakeCharFromNum(
		squareStringLetter
	)}${squareStringNum}`;

	return squareString;
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

const PrintMoveList = () => {
	// ispis liste poteza
	console.log("Move List:");
	let num = 0;
	for (
		let index = GameBoard.moveListStart[GameBoard.ply];
		index < GameBoard.moveListStart[GameBoard.ply + 1];
		index++
	) {
		let move = GameBoard.moveList[index];
		console.log("Move:" + ++num + ":" + PrintMove(move));
	}
};

const MakeCharFromNum = (number) => {
	return String.fromCharCode(number + "a".charCodeAt());
};

const GetSquare120FromString = (string) => {
	if (string != "No" || string != "") {
		let file = string[0].charCodeAt() - "a".charCodeAt();
		let rank = string[1].charCodeAt() - "1".charCodeAt();
		return FileRankToSquare(file, rank);
	}
	return 0;
};

const PrintBoard = () => {
	// ispis ploče
	let line = "";
	console.log("\nPloča:\n");

	for (let rank = RANKS.RANK_8; rank >= RANKS.RANK_1; rank--) {
		line = `${rankChar[rank]} `;
		for (let file = FILES.FILE_A; file <= FILES.FILE_H; file++) {
			let piece = GameBoard.pieces[FileRankToSquare(file, rank)];
			line += ` ${pieceChar[piece]} `;
		}
		console.log(line);
	}

	line = "  ";
	for (let file = FILES.FILE_A; file <= FILES.FILE_H; file++) {
		line += ` ${fileChar[file]}  `;
	}

	console.log(line);
	console.log(`side: ${sideChar[GameBoard.side]}`);
	line = "";

	if (GameBoard.castlePerm & CASTLEBIT.WKCA) line += "K";
	if (GameBoard.castlePerm & CASTLEBIT.WQCA) line += "Q";
	if (GameBoard.castlePerm & CASTLEBIT.BKCA) line += "k";
	if (GameBoard.castlePerm & CASTLEBIT.BQCA) line += "q";
	console.log(`castle: ${line}`);
	console.log(`en passant: ${PrintSquare(GameBoard.enPassant)}`);
	console.log(`key: ${GameBoard.posKey.toString(16)}`);
};

const CheckBoard = () => {
	const pieceNum = new Array(13).fill(0);
	const material = new Array(2).fill(0);

	for (let piece = PIECES.wP; piece <= PIECES.bk; piece++)
		if (!CheckPieceNumArray(piece)) return Bool.False;

	for (let square64 = 0; square64 < 64; square64++) {
		let square120 = GetSquare120(square64);
		let piece = GameBoard.pieces[square120];
		pieceNum[piece]++;
		material[pieceCol[piece]] += pieceVal[piece];
	}

	// provjera jesu li sve figure na broju
	if (ArrayEquals(pieceNum, GameBoard.pieceNum)) {
		console.log("Piece number error");
		return Bool.False;
	}

	// provjera je li materijal isti
	if (ArrayEquals(material, GameBoard.material)) {
		console.log("Material error");
		return Bool.False;
	}

	// provjera je li strana valjana
	const color = GameBoard.side;
	if (color != COLORS.WHITE && color != COLORS.BLACK) {
		console.log("GameBoard.side error");
		return Bool.False;
	}

	// provjera je li hash kluč ispravan
	if (TestPositionKey() != GameBoard.posKey) {
		console.log("Error GameBoard.posKey");
		return Bool.False;
	}
	return Bool.True;
};

const ArrayEquals = (a, b) => {
	// jesu li dva niza jednaka
	if (a == b) return Bool.True;
	if (a == null || b == null) return Bool.False;
	if (a.length !== b.length) return Bool.False;
};

const CheckPieceNumArray = (piece) => {
	// je li lista figura ispravna
	for (let pieceNum = 0; pieceNum < GameBoard.pieceNum[piece]; pieceNum++) {
		let square120 = GameBoard.pieceList[PieceIndex(piece, pieceNum)];
		if (GameBoard.pieces[square120] != piece) {
			console.log("Piece list error");
			return Bool.False;
		}
	}
	return Bool.True;
};
