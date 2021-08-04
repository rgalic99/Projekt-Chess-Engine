// boje
const COLORS = { WHITE: 0, BLACK: 1, BOTH: 2 };

// pravo castleanja / rokade
const CASTLEBIT = { WKCA: 1, WQCA: 2, BKCA: 4, BQCA: 8 };

const MAX_GAME_MOVES = 2048; // broj mogućih poteza u svakoj igri
const MAX_POSITION_MOVES = 256; // broj poteza u danoj poziciji
const MAX_DEPTH = 64; // maksimalna dubina do koje će ići računalo
const Mate = 29000;

const RAND_32 = () => {
	return (
		(Math.floor(Math.random() * 255 + 1) << 23) |
		(Math.floor(Math.random() * 255 + 1) << 16) |
		(Math.floor(Math.random() * 255 + 1) << 8) |
		Math.floor(Math.random() * 255 + 1)
	);
};

const pieceKeys = new Array(13 * 10); // hash vrijednosti za figure
const castleKeys = new Array(16); // hash vrijednosti za rokadu
const sideKey = new Array(1); // hash vrijednost za stranu koja igra

const InitHashKeys = () => {
	// inicijalizacija svih ključeva koji će se koristiti za hashiranje
	let i = 0;
	sideKey.fill(RAND_32());
	for (i = 0; i < pieceKeys.length; i++) pieceKeys[i] = RAND_32();
	for (i = 0; i < castleKeys.length; i++) castleKeys[i] = RAND_32();
};

const HashPiece = (piece, square) => {
	GameBoard.posKey ^= pieceKeys[piece * 120 + square];
};

const HashEnPassant = () => {
	GameBoard.posKey ^= pieceKeys[GameBoard.enPassant];
};

const HashCastle = () => {
	GameBoard.posKey ^= castleKeys[GameBoard.castlePerm];
};

const HashSide = () => {
	GameBoard.posKey ^= sideKey[0];
};
