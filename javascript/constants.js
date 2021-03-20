/*
w => white / bijeli
b => black / crni
P => pawn / pijun / pješak
N => knight / konj / skakač
B => bishop / lovac / laufer
R => rook / top / kula
Q => queen / kraljica / dama
K => king / kralj / gospodin
*/
const PIECES = {
	EMPTY: 0,
	wP: 1,
	wN: 2,
	wB: 3,
	wR: 4,
	wQ: 5,
	wK: 6,
	bP: 7,
	bN: 8,
	bB: 9,
	bR: 10,
	bQ: 11,
	bK: 12,
};

const NUM_OF_SQ = 120;

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

//boje
const COLOURS = { WHITE: 0, BLACK: 1, BOTH: 2 };

//pravo castleanja / rokade
const CASTLEBIT = { WKCA: 1, WQCA: 2, BKCA: 4, BQCA: 8 };

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

const BOOL = { FALSE: 0, TRUE: 1 };

const FilesBoard = new Array(NUM_OF_SQ);
const RanksBoard = new Array(NUM_OF_SQ);

const FileRankToSquare = (f, r) => {
	return 21 + f + r * 10; // pronalazimo indeks kocke u matrici
};

const PieceKeys = new Array(13 * 10);
let SideKey;
const CastleKeys = new Array(16);

const Board_64_to_120 = new Array(64);
const Board_120_to_64 = new Array(NUM_OF_SQ);

const GetSquare64 = (square120) => {
	return Board_120_to_64[square120];
};

const GetSquare120 = (square64) => {
	return Board_64_to_120[square64];
};

//je li figura velika (ne pijun) ili ne
const PieceBig = [
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.TRUE,
	BOOL.TRUE,
	BOOL.TRUE,
	BOOL.TRUE,
	BOOL.TRUE,
	BOOL.FALSE,
	BOOL.TRUE,
	BOOL.TRUE,
	BOOL.TRUE,
	BOOL.TRUE,
	BOOL.TRUE,
];

//je li figura major / velika (kraljica ili top)
const PieceMaj = [
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.TRUE,
	BOOL.TRUE,
	BOOL.TRUE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.TRUE,
	BOOL.TRUE,
	BOOL.TRUE,
];

//je li figura minor / mala (konj ili lovac)
const PieceMin = [
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.TRUE,
	BOOL.TRUE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.TRUE,
	BOOL.TRUE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
];

//vrijedonsti figure (pijun je 100)
const PieceVal = [
	0,
	100,
	325,
	325,
	550,
	1000,
	50000,
	100,
	325,
	325,
	550,
	1000,
	50000,
];

//boje za sve figure
const PieceCol = [
	COLOURS.BOTH,
	COLOURS.WHITE,
	COLOURS.WHITE,
	COLOURS.WHITE,
	COLOURS.WHITE,
	COLOURS.WHITE,
	COLOURS.WHITE,
	COLOURS.BLACK,
	COLOURS.BLACK,
	COLOURS.BLACK,
	COLOURS.BLACK,
	COLOURS.BLACK,
	COLOURS.BLACK,
];

//koje su figure pijuni
const PiecePawn = [
	BOOL.FALSE,
	BOOL.TRUE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.TRUE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
];

//koje su figure konji
const PieceKnight = [
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.TRUE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.TRUE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
];

//koje su figure kraljevi
const PieceKing = [
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.TRUE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.TRUE,
];

//koje su figure kraljica ili top
const PieceRookQueen = [
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.TRUE,
	BOOL.TRUE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.TRUE,
	BOOL.TRUE,
	BOOL.FALSE,
];

//koje su figure kraljica ili lovac
const PieceBishopQueen = [
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.TRUE,
	BOOL.FALSE,
	BOOL.TRUE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.TRUE,
	BOOL.FALSE,
	BOOL.TRUE,
	BOOL.FALSE,
];

//da li se figura "kliže" (može neograničeno u neko smjeru)
const PieceSlides = [
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.TRUE,
	BOOL.TRUE,
	BOOL.TRUE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.FALSE,
	BOOL.TRUE,
	BOOL.TRUE,
	BOOL.TRUE,
	BOOL.FALSE,
];
