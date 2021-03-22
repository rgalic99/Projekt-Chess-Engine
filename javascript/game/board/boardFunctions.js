const GetSquare64 = (square120) => {
	return Board_120_to_64[square120]; //vraća indeks kocke od 0-63
};

const GetSquare120 = (square64) => {
	return Board_64_to_120[square64]; //vraća indeks kocke zadan preko formule 21 + file + rank * 10
};

// Primjer FEN-a:	rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
const parseFEN = (FENstring) => {
	ResetBoard();
	let fenCount = 0; //indeks znaka u FENstring-u

	fenCount = parsePieces(FENstring, fenCount);
	if (fenCount == -1) throw new Error("FEN is invalid"); //ako FEN nije valjan

	fenCount = parseSide(FENstring, fenCount);
	fenCount = parseCastle(FENstring, fenCount);
	fenCount = parseEnPassant(FENstring, fenCount);

	GameBoard.posKey = GeneratePositionKey(); // generira hash poticije
};

const parsePieces = (FENstring, fenCount) => {
	let rank = RANKS.RANK_8;
	let file = FILES.FILE_A;

	while (rank >= RANKS.RANK_1 && fenCount < FENstring.length) {
		let count = 1;
		//čita se svaki znak i stavlja na tu kocku tu figuru
		switch (FENstring[fenCount]) {
			case "p":
				piece = PIECES.bP;
				break;
			case "r":
				piece = PIECES.bR;
				break;
			case "n":
				piece = PIECES.bN;
				break;
			case "b":
				piece = PIECES.bB;
				break;
			case "k":
				piece = PIECES.bK;
				break;
			case "q":
				piece = PIECES.bQ;
				break;
			case "P":
				piece = PIECES.wP;
				break;
			case "R":
				piece = PIECES.wR;
				break;
			case "N":
				piece = PIECES.wN;
				break;
			case "B":
				piece = PIECES.wB;
				break;
			case "K":
				piece = PIECES.wK;
				break;
			case "Q":
				piece = PIECES.wQ;
				break;

			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
				piece = PIECES.EMPTY;
				count = Number(FENstring[fenCount]); //ako nije figura dodjeli se broj praznih kocki
				break;

			case "/":
			case " ":
				rank--; //prelazak u idući red
				file = FILES.FILE_A; //vraća na prvu kocku
				fenCount++; //pomak za 1 karakter
				continue;
			default:
				console.log("FEN error");
				return -1;
		}
		addPiece(count, FileRankToSquare(file, rank), piece); //dodavanje figure na kocku ili dodavanje count praznih kocki
		file += count; //pomak za 1 ili broj praznih polja
		fenCount++; //pomak za 1 karakter
	}

	return fenCount;
};

const addPiece = (count, square, piece) => {
	for (let i = 0; i < count; i++) {
		GameBoard.pieces[square] = piece; //dodavanje figure ili više praznih kocaka
		square++;
	}
};

const parseSide = (FENstring, fenCount) => {
	GameBoard.side(FENstring[fenCount] == "w") ? COLORS.WHITE : COLORS.BLACK; //parsiraj čiji je red
	fenCount += 2; //pomak za 2 karaktera
	return fenCount;
};

const parseCastle = (FENstring, fenCount) => {
	while (FENstring[fenCount] != " ") {
		switch (FENstring[fenCount]) {
			case "K":
				GameBoard.castlePerm |= CASTLEBIT.WKCA; //operacija ILI nad castlePerm vrijednosti
				break;
			case "Q":
				GameBoard.castlePerm |= CASTLEBIT.WQCA;
				break;
			case "k":
				GameBoard.castlePerm |= CASTLEBIT.BKCA;
				break;
			case "q":
				GameBoard.castlePerm |= CASTLEBIT.BQCA;
				break;
			default:
				break;
		}
		fenCount++; //pomak za 1 karakter
	}
	fenCount++; //pomak za 1 karakter

	return fenCount;
};

const parseEnPassant = (FENstring, fenCount) => {
	if (FENstring[fenCount] != "-") {
		file = FENstring[fenCount].charCodeAt() - "a".charCodeAt();
		rank = FENstring[fenCount + 1].charCodeAt() - "1".charCodeAt();
		GameBoard.enPassant = FileRankToSquare(file, rank); //postavljanje indeksa en passant kocke
	}
	fenCount++; //pomak za 1 karakter

	return fenCount;
};

const GeneratePositionKey = () => {
	let PositionKey = 0;

	for (let square = 0; square < 64; square++) {
		let piece = GameBoard.pieces[GetSquare120(square)];
		if (piece != PIECES.EMPTY)
			PositionKey ^= PieceKeys[piece * 120 + square]; //operacija XOR nad PositionKey vrijednosti za svaku figuru
	}

	if (GameBoard.side == COLORS.WHITE) PositionKey ^= SideKey; //XOR sa stranom koja igra

	if (GameBoard.enPassant != SQUARES.NO_SQ)
		PositionKey ^= PieceKeys[GameBoard.enPassant]; //XOR sa en passant kockom

	PositionKey ^= CastleKeys[GameBoard.castlePerm]; //XOR sa pravima rokade

	return PositionKey;
};

const ResetBoard = () => {
	GameBoard.pieces.fill(SQUARES.OFFBOARD);
	GameBoard.pieceList.fill(PIECES.EMPTY);
	GameBoard.material.fill(0);
	GameBoard.pieceNum.fill(0);
	for (let index = 0; index < 64; index++)
		GameBoard.pieces[GetSquare120(index)] = PIECES.EMPTY;

	GameBoard.side = COLORS.BOTH;
	GameBoard.enPassant = SQUARES.NO_SQ;
	GameBoard.fiftyMoveRule = 0;
	GameBoard.ply = 0;
	GameBoard.historyPly = 0;
	GameBoard.castlePerm = 0;
	GameBoard.posKey = 0;
	GameBoard.moveListStart[GameBoard.ply] = 0;
};
