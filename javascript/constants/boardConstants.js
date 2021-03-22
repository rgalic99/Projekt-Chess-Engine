const NUM_OF_SQ = 120;

const START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const pieceChar = [
	"- ",
	"♟",
	"♞",
	"♝",
	"♜",
	"♛",
	"♚",
	"♙",
	"♘",
	"♗",
	"♖",
	"♕",
	"♔",
];
//"-♙♘♗♖♕♔♟︎♞♝♜♛♚";
const sideChar = "wb-";
const rankChar = "12345678";
const fileChar = "abcdefgh";

const FilesBoard = new Array(NUM_OF_SQ);
const RanksBoard = new Array(NUM_OF_SQ);

const Board_64_to_120 = new Array(64); //niz koji sadrži korespodantni indeks kocke sa ploče koja ima 120 kocaka
const Board_120_to_64 = new Array(NUM_OF_SQ); //niz koji sadrži korespodantni indeks kocke sa ploče koja ima 64 kocke

//stupci
const FILES = {
	FILE_A: 0,
	FILE_B: 1,
	FILE_C: 2,
	FILE_D: 3,
	FILE_E: 4,
	FILE_F: 5,
	FILE_G: 6,
	FILE_H: 7,
	FILE_NONE: 8,
};

//redci
const RANKS = {
	RANK_1: 0,
	RANK_2: 1,
	RANK_3: 2,
	RANK_4: 3,
	RANK_5: 4,
	RANK_6: 5,
	RANK_7: 6,
	RANK_8: 7,
	RANK_NONE: 8,
};

//vrijednosti ključnih kocki u matrici
const SQUARES = {
	A1: 21,
	B1: 22,
	C1: 23,
	D1: 24,
	E1: 25,
	F1: 26,
	G1: 27,
	H1: 28,
	A8: 91,
	B8: 92,
	C8: 93,
	D8: 94,
	E8: 95,
	F8: 96,
	G8: 97,
	H8: 98,
	NO_SQ: 99,
	OFFBOARD: 100,
};
