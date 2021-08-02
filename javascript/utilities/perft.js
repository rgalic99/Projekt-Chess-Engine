let perftLeafNodes;

const Perft = (depth) => {
	if (depth == 0) {
		perftLeafNodes++;
		return;
	}
	GenerateMoves();

	for (
		let index = GameBoard.moveListStart[GameBoard.ply];
		index < GameBoard.moveListStart[GameBoard.ply + 1];
		index++
	) {
		let move = GameBoard.moveList[index];
		if (MakeMove(move) == Bool.False) continue;

		Perft(depth - 1);
		TakeMove();
	}

	return;
};

const PerftTest = (depth) => {
	PrintBoard();
	console.log("Starting Test To Depth:" + depth);
	perftLeafNodes = 0;

	GenerateMoves();
	PrintMoveList();
	let moveNum = 0;
	let currentNodes = 0;
	let oldNodes = 0;
	for (
		let index = GameBoard.moveListStart[GameBoard.ply];
		index < GameBoard.moveListStart[GameBoard.ply + 1];
		index++
	) {
		let move = GameBoard.moveList[index];
		if (MakeMove(move) == Bool.False) continue;

		moveNum++;
		currentNodes = perftLeafNodes;

		Perft(depth - 1);
		TakeMove();
		oldNodes = perftLeafNodes - currentNodes;
		console.log("move:" + moveNum + " " + PrintMove(move) + " " + oldNodes);
	}

	console.log("Test Complete : " + perftLeafNodes + " leaf nodes visited");

	return;
};
