const SearchController = {};

SearchController.nodes;
SearchController.failHigh;
SearchController.failHighFirst;
SearchController.depth;
SearchController.time;
SearchController.start;
SearchController.stop;
SearchController.best;
SearchController.thinking;

const CheckUp = () => {
	if ($.now() - SearchController.start > SearchController.time)
		SearchController.stop = Bool.True;
};

const IsRepetiton = () => {
	let index = GameBoard.historyPly - GameBoard.fiftyMoveRule;
	for (index; index < GameBoard.historyPly - 1; index++)
		if (GameBoard.posKey == GameBoard.history[index].posKey)
			return Bool.True;

	return Bool.False;
};

const AlpfaBeta = (alpha, beta, depth) => {
	if (depth <= 0) return EvalPosition();

	if (SearchController.nodes & (2047 == 0)) CheckUp();

	SearchController.nodes++;

	if (IsRepetiton() || (GameBoard.fiftyMoveRule >= 100 && GameBoard.ply != 0))
		return 0;

	if (GameBoard.ply > MAX_DEPTH - 1) return EvalPosition();

	let score = -Infinity;
	GenerateMoves();

	let moveNum = 0;
	let legal = 0;
	let oldAlpha = alpha;
	let bestMove = noMove;
	let move = noMove;

	//TODO Get PV move
	//TODO Order PV move
	for (
		moveNum = GameBoard.moveListStart[GameBoard.ply];
		moveNum < GameBoard.moveListStart[GameBoard.ply + 1];
		moveNum++
	) {
		//TODO Pick next best move
		move = GameBoard.moveList[moveNum];
		if (!MakeMove(move)) continue;

		legal++;
		score = -AlpfaBeta(-beta, -alpha, depth - 1);
		TakeMove();

		if (SearchController.stop == Bool.True) return 0;

		if (score > alpha) {
			if (score >= beta) {
				if (legal == 1) SearchController.failHighFirst++;
				SearchController.failHigh++;
				//TODO Update killer moves
				return beta;
			}
			alpha = score;
			bestMove = move;
			//TODO Update history table
		}
	}
	//TODO MateCheck

	if (alpha != oldAlpha) return; //TODO store PV move

	return alpha;
};

const SearchPosition = () => {
	let bestMove = noMove;
	let bestScore = -Infinity;
	let currentDepth = 0;

	for (
		currentDepth = 1;
		currentDepth <= SearchController.depth;
		currentDepth++
	) {
		//TODO Alfa Beta
		if (SearchController.stop == Bool.True) break;
	}

	SearchController.best = bestMove;
	SearchController.thinking = Bool.False;
};
