/*
fromSquare = prvih 7 bitova 0x7F
toSquare = pomaknut za 7 << 0x7F
capturedPiece = stane u 4 bita a pomak je 14 << 0xF
enPassant = 1 bit 0x40000
pawnStart = 1 bit 0x80000
promotion = stane u 4 bita a pomak je 20 << 0xF
castling = 1 bit 0x1000000
*/

const fromSquare = (move) => {
	return move & 0x7f;
};

const toSquare = (move) => {
	return (move >> 7) & 0x7f;
};

const capturedPiece = (move) => {
	return (move >> 14) & 0xf;
};

const promotedPiece = (move) => {
	return (move >> 20) & 0xf;
};

const moveFlagEnPassant = 0x40000;
const moveFlagPawnStart = 0x80000;
const moveFlagCastle = 0x1000000;

const moveFlagCapture = 0x7c000;
const moveFlagPromotion = 0xf00000;

const noMove = 0;

const Move = (from, to, captured, flag) => {
	return from | (to << 7) | (captured << 14) | (promoted << 20) | flag;
};
