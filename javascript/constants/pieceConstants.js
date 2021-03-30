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
	Boolean.False,
	Boolean.False,
	Boolean.True,
	Boolean.True,
	Boolean.True,
	Boolean.True,
	Boolean.True,
	Boolean.False,
	Boolean.True,
	Boolean.True,
	Boolean.True,
	Boolean.True,
	Boolean.True,
];

//je li figura major / velika (kraljica ili top)
const pieceMaj = [
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.True,
	Boolean.True,
	Boolean.True,
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.True,
	Boolean.True,
	Boolean.True,
];

//je li figura minor / mala (konj ili lovac)
const pieceMin = [
	Boolean.False,
	Boolean.False,
	Boolean.True,
	Boolean.True,
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.True,
	Boolean.True,
	Boolean.False,
	Boolean.False,
	Boolean.False,
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
	Boolean.False,
	Boolean.True,
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.True,
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.False,
];

//koje su figure konji
const pieceKnight = [
	Boolean.False,
	Boolean.False,
	Boolean.True,
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.True,
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.False,
];

//koje su figure kraljevi
const pieceKing = [
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.True,
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.True,
];

//koje su figure kraljica ili top
const pieceRookQueen = [
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.True,
	Boolean.True,
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.True,
	Boolean.True,
	Boolean.False,
];

//koje su figure kraljica ili lovac
const pieceBishopQueen = [
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.True,
	Boolean.False,
	Boolean.True,
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.True,
	Boolean.False,
	Boolean.True,
	Boolean.False,
];

//da li se figura "kliže" (može se micati neograničeno u nekom smjeru)
const pieceSlides = [
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.True,
	Boolean.True,
	Boolean.True,
	Boolean.False,
	Boolean.False,
	Boolean.False,
	Boolean.True,
	Boolean.True,
	Boolean.True,
	Boolean.False,
];

const knightDirection = [-21, -19, -12, -8, 8, 12, 19, 21];
const rookDirection = [-10, -1, 1, 10];
const bishopDirection = [-11, -9, 9, 11];
const kingDirection = [-11, -10, -9, -1, 1, 9, 10, 11];
