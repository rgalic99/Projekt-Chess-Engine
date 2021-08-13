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

const PickNextMove = (moveNum) => {
	let i = 0;
	let bestScore = -1;
	let bestNum = moveNum;
	let end = GameBoard.moveListStart[GameBoard.ply + 1];

	for (i = moveNum; i < end; i++) {
		if (GameBoard.moveScores[i] > bestScore) {
			bestScore = GameBoard.moveScores[i];
			bestNum = i;
		}
	}
	if (bestNum != moveNum) {
		let temp = 0;

		temp = GameBoard.moveScores[moveNum];
		GameBoard.moveScores[moveNum] = GameBoard.moveScores[bestNum];
		GameBoard.moveScores[bestNum] = temp;

		temp = GameBoard.moveList[moveNum];
		GameBoard.moveList[moveNum] = GameBoard.moveList[bestNum];
		GameBoard.moveList[bestNum] = temp;
	}
};

const ClearPvTable = () => {
	let i = 0;
	for (i = 0; i < PvEntries; i++) {
		GameBoard.PvTable[i].move = noMove;
		GameBoard.PvTable[i].posKey = 0;
	}
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

const PositionCheck = () => {
	if (SearchController.nodes & (2047 == 0)) CheckUp();

	SearchController.nodes++;

	if (GameBoard.ply != 0 && (IsRepetiton() || GameBoard.fiftyMoveRule >= 100))
		return 0;

	if (GameBoard.ply > MAX_DEPTH - 1) return EvalPosition();
};

const Quiescence = (alpfa, beta) => {
	PositionCheck();
	let score = EvalPosition();

	if (score >= beta) return beta;

	if (score > alpfa) alpfa = score;

	GenerateCaptures();
	let moveNum = 0;
	let legal = 0;
	let oldAlpfa = alpfa;
	let bestMove = noMove;
	let move = noMove;

	//TODO Get PV move
	//TODO Order PV move

	let start = GameBoard.moveListStart[GameBoard.ply];
	let end = GameBoard.moveListStart[GameBoard.ply + 1];

	for (moveNum = start; moveNum < end; moveNum++) {
		PickNextMove();
		move = GameBoard.moveList[moveNum];
		if (MakeMove(move) == Bool.False) continue;

		legal++;
		score = -Quiescence(-beta, -alpfa);
		TakeMove();

		if (SearchController.stop == Bool.True) return 0;

		if (score > alpfa) {
			if (score >= beta) {
				if (legal == 1) SearchController.failHighFirst++;
				SearchController.failHigh++;
				return beta;
			}
			alpfa = score;
			bestMove = move;
		}
	}
	if (alpfa != oldAlpfa) StorePvMove(bestMove);

	return alpfa;
};

const AlpfaBeta = (alpfa, beta, depth) => {
	if (depth <= 0) return Quiescence(alpfa, beta);

	PositionCheck();

	let side = GameBoard.side;
	let inCheck = SquareAttacked(
		GameBoard.pieceList[PieceIndex(kings[side], 0)],
		side ^ 1
	);
	if (inCheck) depth++;

	let score = -Infinity;
	GenerateMoves();

	let moveNum = 0;
	let legal = 0;
	let oldAlpfa = alpfa;
	let bestMove = noMove;
	let move = noMove;

	//TODO Get PV move
	//TODO Order PV move

	let start = GameBoard.moveListStart[GameBoard.ply];
	let end = GameBoard.moveListStart[GameBoard.ply + 1];

	for (moveNum = start; moveNum < end; moveNum++) {
		PickNextMove();
		move = GameBoard.moveList[moveNum];
		if (MakeMove(move) == Bool.False) continue;

		legal++;
		score = -AlpfaBeta(-beta, -alpfa, depth - 1);
		TakeMove();

		if (SearchController.stop == Bool.True) return 0;

		if (score > alpfa) {
			if (score >= beta) {
				if (legal == 1) SearchController.failHighFirst++;
				SearchController.failHigh++;
				//TODO Update killer moves
				return beta;
			}
			alpfa = score;
			bestMove = move;
			//TODO Update history table
		}
	}

	if (legal == 0) {
		if (inCheck) return -Mate + GameBoard.ply;
		else return 0;
	}

	if (alpfa != oldAlpfa) StorePvMove(bestMove);

	return alpfa;
};

const ClearForSearch = () => {
	GameBoard.searchHistory.fill(0);
	GameBoard.searchKillers.fill(0);
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
	let line = "";

	ClearForSearch();

	let targetDepth = /*SearchController.depth*/ 5;

	for (currentDepth = 1; currentDepth <= targetDepth; currentDepth++) {
		bestScore = AlpfaBeta(-Infinity, Infinity, currentDepth);
		if (SearchController.stop == Bool.True) break;

		bestMove = ProbePvTable();
		line = `Depth:${currentDepth}\n
Best Move:${PrintMove(bestMove)}\n
Score:${bestScore}\n 
Nodes:${SearchController.nodes}\n`;

		pvNum = GetPvLine(currentDepth);
		line += `\nPV:`;
		for (i = 0; i < pvNum; i++)
			line += ` ${PrintMove(GameBoard.PvArray[i])}`;

		if (currentDepth != 1)
			line += `\nOrdering:${(
				(SearchController.failHighFirst / SearchController.failHigh) *
				100
			).toFixed(2)}%`;

		console.log(line);
	}

	SearchController.best = bestMove;
	SearchController.thinking = Bool.False;
};
