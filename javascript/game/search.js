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

const AlpfaBeta = (alpha, beta, depth) => {
	if (depth <= 0) return; //TODO Evaluation()

	//TODO Check Time
	SearchController.nodes++;

	//TODO Check repetiton and 50 move rule

	if (GameBoard.ply > MAX_DEPTH - 1) return; //TODO Evaluation()

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
