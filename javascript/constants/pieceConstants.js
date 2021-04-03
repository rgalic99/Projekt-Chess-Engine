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

//vrijedonsti figure (pijun je 100)
const pieceVal = [
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
//je li figura velika (ne pijun) ili ne
const pieceBig = [
	Bool.False,
	Bool.False,
	Bool.True,
	Bool.True,
	Bool.True,
	Bool.True,
	Bool.True,
	Bool.False,
	Bool.True,
	Bool.True,
	Bool.True,
	Bool.True,
	Bool.True,
];

//je li figura major / velika (kraljica ili top)
const pieceMaj = [
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.True,
	Bool.True,
	Bool.True,
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.True,
	Bool.True,
	Bool.True,
];

//je li figura minor / mala (konj ili lovac)
const pieceMin = [
	Bool.False,
	Bool.False,
	Bool.True,
	Bool.True,
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.True,
	Bool.True,
	Bool.False,
	Bool.False,
	Bool.False,
];

//boje za sve figure
const pieceCol = [
	COLORS.BOTH,
	COLORS.WHITE,
	COLORS.WHITE,
	COLORS.WHITE,
	COLORS.WHITE,
	COLORS.WHITE,
	COLORS.WHITE,
	COLORS.BLACK,
	COLORS.BLACK,
	COLORS.BLACK,
	COLORS.BLACK,
	COLORS.BLACK,
	COLORS.BLACK,
];

//koje su figure pijuni
const piecePawn = [
	Bool.False,
	Bool.True,
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.True,
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.False,
];

//koje su figure konji
const pieceKnight = [
	Bool.False,
	Bool.False,
	Bool.True,
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.True,
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.False,
];

//koje su figure kraljevi
const pieceKing = [
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.True,
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.True,
];

//koje su figure kraljica ili top
const pieceRookQueen = [
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.True,
	Bool.True,
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.True,
	Bool.True,
	Bool.False,
];

//koje su figure kraljica ili lovac
const pieceBishopQueen = [
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.True,
	Bool.False,
	Bool.True,
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.True,
	Bool.False,
	Bool.True,
	Bool.False,
];

//da li se figura "kliže" (može se micati neograničeno u nekom smjeru)
const pieceSlides = [
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.True,
	Bool.True,
	Bool.True,
	Bool.False,
	Bool.False,
	Bool.False,
	Bool.True,
	Bool.True,
	Bool.True,
	Bool.False,
];

const knightDirection = [-21, -19, -12, -8, 8, 12, 19, 21];
const rookDirection = [-10, -1, 1, 10];
const bishopDirection = [-11, -9, 9, 11];
const kingDirection = [-11, -10, -9, -1, 1, 9, 10, 11];

const dirNum = [0, 0, 8, 4, 4, 8, 8, 0, 8, 4, 4, 8, 8];
const pieceDir = [
	0,
	0,
	knightDirection,
	bishopDirection,
	rookDirection,
	kingDirection,
	kingDirection,
	0,
	knightDirection,
	bishopDirection,
	rookDirection,
	kingDirection,
	kingDirection,
];

const loopNonSlidePiece = [PIECES.wN, PIECES.wK, 0, PIECES.bN, PIECES.bK, 0];
const loopNonSlideIndex = [0, 3];
