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
