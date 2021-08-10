const GetPvLine = (depth) => {
	let move = ProbePvTable();
	let count = 0;
	while (move != noMove && count < depth) {
		if (MoveExists(move)) {
			MakeMove(move);
			GameBoard.PvArray[count] = move;
			count++;
		} else break;
		move = ProbePvTable();
	}

	while (GameBoard.ply > 0) TakeMove();
	return count;
};

const ProbePvTable = () => {
	let index = GameBoard.posKey % PvEntries;
	if (GameBoard.PvTable[index].posKey == GameBoard.posKey)
		return GameBoard.PvTable[index].move;
	return noMove;
};

const StorePvMove = (move) => {
	let index = GameBoard.posKey % PvEntries;
	GameBoard.PvTable[index].posKey = GameBoard.posKey;
	GameBoard.PvTable[index].move = move;
};
