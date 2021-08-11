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

const ClearPvTable = () => {
	GameBoard.PvTable.fill({ move: noMove, posKey: 0 }, 0, PvEntries);
};

const CheckUp = () => {
	if ($.now() - SearchController.start > SearchController.time)
		SearchController.stop = Bool.True;
};

const IsRepetiton = () => {
	let index = 0;
	let start = GameBoard.historyPly - GameBoard.fiftyMoveRule;
	let end = GameBoard.historyPly - 1;

	for (index = start; index < end; index++)
		if (GameBoard.posKey == GameBoard.history[index].posKey)
			return Bool.True;

	return Bool.False;
};

const AlpfaBeta = (alpha, beta, depth) => {
	SearchController.nodes++;

	if (depth <= 0) return EvalPosition();

	if (SearchController.nodes & (2047 == 0)) CheckUp();

	if (IsRepetiton() || (GameBoard.fiftyMoveRule >= 100 && GameBoard.ply != 0))
		return 0;

	if (GameBoard.ply > MAX_DEPTH - 1) return EvalPosition();

	let side = GameBoard.side;
	let inCheck = SquareAttacked(
		GameBoard.pieceList[PieceIndex(kings[side], 0)],
		!side
	);
	if (inCheck) depth++;

	let score = -Infinity;
	GenerateMoves();

	let moveNum = 0;
	let legal = 0;
	let oldAlpha = alpha;
	let bestMove = noMove;
	let move = noMove;

	//TODO Get PV move
	//TODO Order PV move

	let start = GameBoard.moveListStart[GameBoard.ply];
	let end = GameBoard.moveListStart[GameBoard.ply + 1];

	for (moveNum = start; moveNum < end; moveNum++) {
		//TODO Pick next best move
		move = GameBoard.moveList[moveNum];
		if (MakeMove(move) == Bool.False) continue;

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

	if (!legal) {
		if (inCheck) return -Mate + GameBoard.ply;
		else return 0;
	}

	if (alpha != oldAlpha) StorePvMove(bestMove);

	return alpha;
};

const ClearForSearch = () => {
	GameBoard.searchHistory.fill(0, 0, 13 * NUM_OF_SQ);
	GameBoard.searchKillers.fill(0, 0, 3 * MAX_DEPTH);
	ClearPvTable();
	GameBoard.ply = 0;
	SearchController.nodes = 0;
	SearchController.failHigh = 0;
	SearchController.failHighFirst = 0;
	SearchController.start = $.now();
	SearchController.stop = 0;
};

const SearchPosition = () => {
	let bestMove = noMove;
	let bestScore = -Infinity;
	let currentDepth = 0;
	let pvNum = 0;
	let i = 0;

	ClearForSearch();

	let targetDepth = /*SearchController.depth*/ 5;

	for (currentDepth = 1; currentDepth <= targetDepth; currentDepth++) {
		bestScore = AlpfaBeta(-Infinity, Infinity, currentDepth);
		if (SearchController.stop == Bool.True) break;

		bestMove = ProbePvTable();
		let line =
			"Depth: " +
			currentDepth +
			" Best Move: " +
			PrintMove(bestMove) +
			" Score: " +
			bestScore +
			" Nodes: " +
			SearchController.nodes;

		pvNum = GetPvLine(currentDepth);
		for (i = 0; i < pvNum; i++)
			line += " " + PrintMove(GameBoard.PvArray[i]);

		console.log(line);
	}

	SearchController.best = bestMove;
	SearchController.thinking = Bool.False;
};
