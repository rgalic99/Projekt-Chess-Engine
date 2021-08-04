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
