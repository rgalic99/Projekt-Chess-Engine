// boje
const COLORS = { WHITE: 0, BLACK: 1, BOTH: 2 };

// pravo castleanja / rokade
const CASTLEBIT = { WKCA: 1, WQCA: 2, BKCA: 4, BQCA: 8 };

const MAX_GAME_MOVES = 2048; // broj mogućih poteza u svakoj igri
const MAX_POSITION_MOVES = 256; // broj poteza u danoj poziciji
const MAX_DEPTH = 64; // maksimalna dubina do koje će ići računalo
const Mate = 29000;
const PvEntries = 10000;

const RAND_32 = () => {
	return (
		(Math.floor(Math.random() * 255 + 1) << 23) |
		(Math.floor(Math.random() * 255 + 1) << 16) |
		(Math.floor(Math.random() * 255 + 1) << 8) |
		Math.floor(Math.random() * 255 + 1)
	);
};

const Mirror64Array = [
	56, 57, 58, 59, 60, 61, 62, 63, 48, 49, 50, 51, 52, 53, 54, 55, 40, 41, 42,
	43, 44, 45, 46, 47, 32, 33, 34, 35, 36, 37, 38, 39, 24, 25, 26, 27, 28, 29,
	30, 31, 16, 17, 18, 19, 20, 21, 22, 23, 8, 9, 10, 11, 12, 13, 14, 15, 0, 1,
	2, 3, 4, 5, 6, 7,
];
const Mirror64 = (i) => {
	//return 64 + (i % 8) - 8 * (Math.floor(i / 8) + 1);
	return Mirror64Array[i];
};

const pieceKeys = new Array(14 * 10); // hash vrijednosti za figure
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

const GameController = {};

GameController.engineSide = COLORS.BOTH;
GameController.playerSide = COLORS.BOTH;
GameController.gameOver = Bool.False;

const UserMove = {};
UserMove.from = SQUARES.NO_SQ;
UserMove.to = SQUARES.NO_SQ;
