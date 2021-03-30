const SquareAttacked = (square, side) => {
	if (AttackedByPawn(square, side)) return Boolean.True;
};

const AttackedByPawn = (square, side) => {
	//white=0, black=1
	if (
		GameBoard.pieces[square + 22 * side - 11] == side //if side is white then -11 otherwise +11
			? PIECES.bP //if black is playing side will be 1 and therefore true so we check black pawns
			: PIECES.wP || GameBoard.pieces[square + 18 * side - 9] == side //if side is white then -9 otherwise +9
			? PIECES.bP
			: PIECES.wP //if white is playing side will be 0 and therefore false so we check white pawns
	)
		return Boolean.True;
	return Boolean.False;
};
