// Primjer FEN-a:	rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
const ParseFEN = (fenString) => {
	ResetBoard();
	let fenCount = 0; //indeks znaka u fenString-u
	if (fenString == "") throw new Error("FEN is empty");
	fenCount = ParsePieces(fenString, fenCount);
	if (fenCount == -1) throw new Error("FEN is invalid"); //ako FEN nije valjan

	fenCount = ParseSide(fenString, fenCount);
	fenCount = ParseCastle(fenString, fenCount);
	fenCount = ParseEnPassant(fenString, fenCount);

	GameBoard.posKey = GeneratePositionKey(); // generira hash poticije
	UpdateMaterialLists();
};

const ParsePieces = (fenString, fenCount) => {
	let rank = RANKS.RANK_8;
	let file = FILES.FILE_A;

	while (rank >= RANKS.RANK_1 && fenCount < fenString.length) {
		let count = 1;
		//čita se svaki znak i stavlja na tu kocku tu figuru
		switch (fenString[fenCount]) {
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
				count = Number(fenString[fenCount]); //ako nije figura dodjeli se broj praznih kocki
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
		AddPiece(count, FileRankToSquare(file, rank), piece); //dodavanje figure na kocku ili dodavanje count praznih kocki
		file += count; //pomak za 1 ili broj praznih polja
		fenCount++; //pomak za 1 karakter
	}

	return fenCount;
};

const AddPiece = (count, square, piece) => {
	for (let i = 0; i < count; i++) {
		GameBoard.pieces[square] = piece; //dodavanje figure ili više praznih kocaka
		square++;
	}
};

const ParseSide = (fenString, fenCount) => {
	GameBoard.side = fenString[fenCount] == "w" ? COLORS.WHITE : COLORS.BLACK; //parsiraj čiji je red
	fenCount += 2; //pomak za 2 karaktera
	return fenCount;
};

const ParseCastle = (fenString, fenCount) => {
	while (fenString[fenCount] != " ") {
		switch (fenString[fenCount]) {
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

const ParseEnPassant = (fenString, fenCount) => {
	if (fenString[fenCount] != "-") {
		let file = fenString[fenCount].charCodeAt() - "a".charCodeAt();
		let rank = fenString[fenCount + 1].charCodeAt() - "1".charCodeAt();
		GameBoard.enPassant = GetStringFromSquare120(
			FileRankToSquare(file, rank)
		); //postavljanje en passant kocke
	} else {
		GameBoard.enPassant = "No";
	}
	fenCount++; //pomak za 1 karakter

	return fenCount;
};

const GeneratePositionKey = () => {
	let positionKey = 0;

	for (let square = 0; square < 64; square++) {
		let piece = GameBoard.pieces[GetSquare120(square)];
		if (piece != PIECES.EMPTY)
			positionKey ^= pieceKeys[piece * 120 + square]; //operacija XOR nad PositionKey vrijednosti za svaku figuru
	}

	if (GameBoard.side == COLORS.WHITE) positionKey ^= sideKey;
	//XOR sa stranom koja igra
	if (GetSquare120FromString(GameBoard.enPassant) != SQUARES.NO_SQ)
		positionKey ^= pieceKeys[GetSquare120FromString(GameBoard.enPassant)]; //XOR sa en passant kockom

	positionKey ^= castleKeys[GameBoard.castlePerm]; //XOR sa pravima rokade

	return positionKey;
};