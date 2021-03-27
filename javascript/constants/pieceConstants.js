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
const pieceMaj = [
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
const pieceMin = [
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
const pieceKnight = [
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
const pieceKing = [
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
const pieceRookQueen = [
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
const pieceBishopQueen = [
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

//da li se figura "kliže" (može se micati neograničeno u nekom smjeru)
const pieceSlides = [
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
