let perftLeafNodes;

const Perft = (depth) => {
	if (depth === 0) {
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
		if (MakeMove(move) === Bool.False) continue;

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

	let moveNum = 0;

	for (
		let index = GameBoard.moveListStart[GameBoard.ply];
		index < GameBoard.moveListStart[GameBoard.ply + 1];
		index++
	) {
		let move = GameBoard.moveList[index];
		if (MakeMove(move) === Bool.False) continue;

		moveNum++;
		let currentNodes = perftLeafNodes;

		Perft(depth - 1);
		TakeMove();
		let oldNodes = perftLeafNodes - currentNodes;
		console.log("move:" + moveNum + " " + PrintMove(move) + " " + oldNodes);
	}

	console.log("Test Complete : " + perftLeafNodes + " leaf nodes visited");

	return;
};
