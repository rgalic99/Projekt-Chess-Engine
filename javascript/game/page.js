const ClickedSquare = (x, y) => {
	let position = $(".screen").position();
	let boardX = Math.floor(position.left);
	let boardY = Math.floor(position.top);
	let file = Math.floor((x - boardX - 60) / 60);
	let rank = 7 - Math.floor((y - boardY - 90) / 60);
	let square = FileRankToSquare(file, rank);
	SetSelectedSquare(square);
	SetAttackedSquares(square);
	AddCheck();
	return square;
};

$(document).on("click", ".Square", (e) => {
	if (UserMove.from != SQUARES.NO_SQ) {
		UserMove.to = ClickedSquare(e.pageX, e.pageY);
		MakeUserMove();
		AddCheck();
	}
});

$(document).on("click", ".Piece", (e) => {
	if (UserMove.from == SQUARES.NO_SQ)
		UserMove.from = ClickedSquare(e.pageX, e.pageY);
	else UserMove.to = ClickedSquare(e.pageX, e.pageY);

	MakeUserMove();
});

const SetSelectedSquare = (square) => {
	$(".Square").each(function () {
		if (
			PieceIsOnSquare(
				square,
				$(this).position().top,
				$(this).position().left
			)
		)
			$(this).addClass("SqSelected");
	});
};

const SetAttackedSquares = (square) => {
	GenerateMoves();
	let start = GameBoard.moveListStart[GameBoard.ply];
	let end = GameBoard.moveListStart[GameBoard.ply + 1];
	let from = SQUARES.NO_SQ;
	let move = noMove;

	for (i = start; i < end; i++) {
		move = GameBoard.moveList[i];
		from = fromSquare(move);
		if (from == square) {
			if (!MakeMove(move)) continue;
			TakeMove();
			let to = toSquare(move);
			if (GameBoard.pieces[to] == PIECES.EMPTY) SetAttackedSquare(to);
			else SetCaptureSquare(to);
		}
	}
};

const SetAttackedSquare = (square) => {
	$(".Square").each(function () {
		if (
			PieceIsOnSquare(
				square,
				$(this).position().top,
				$(this).position().left
			)
		)
			$(this).append("<div class='Move'/>");
	});
};

const SetCaptureSquare = (square) => {
	$(".Square").each(function () {
		if (
			PieceIsOnSquare(
				square,
				$(this).position().top,
				$(this).position().left
			)
		) {
			if ($(this).hasClass("Light"))
				$(this).append(
					"<div class='Capture'><div class='InCapture Light'></div></div>"
				);
			else
				$(this).append(
					"<div class='Capture'><div class='InCapture Dark'></div></div>"
				);
		}
	});
};

const DeSelectSquare = (square) => {
	$(".Square").each(function () {
		if (
			PieceIsOnSquare(
				square,
				$(this).position().top,
				$(this).position().left
			)
		)
			$(this).removeClass("SqSelected");
	});
};

const DeSelectAttacks = () => {
	$(".Move").remove();
	$(".Capture").remove();
};

const MakeUserMove = () => {
	let parsedMove = noMove;

	if (UserMove.from != SQUARES.NO_SQ && UserMove.to != SQUARES.NO_SQ) {
		parsedMove = ParseMove(UserMove.from, UserMove.to);
		if (parsedMove != noMove) {
			MakeMove(parsedMove);
			MovePieceGUI(parsedMove);
			RemoveCheck();
			CheckAndSet();
			PreSearch();
		}
		DeSelectAttacks();
		DeSelectSquare(UserMove.from);
		DeSelectSquare(UserMove.to);

		UserMove.from = SQUARES.NO_SQ;
		UserMove.to = SQUARES.NO_SQ;
	}
};

const RemoveCheck = () => {
	$(".InCheck").remove();
};

const ParseMove = (from, to) => {
	GenerateMoves();

	let i = 0;
	let move = noMove;
	let found = Bool.False;
	let start = GameBoard.moveListStart[GameBoard.ply];
	let end = GameBoard.moveListStart[GameBoard.ply + 1];

	for (i = start; i < end; i++) {
		move = GameBoard.moveList[i];
		if (fromSquare(move) == from && toSquare(move) == to) {
			found = Bool.True;
			break;
		}
	}
	if (found) {
		if (!MakeMove(move)) {
			return noMove;
		}
		TakeMove();
		return move;
	}
	return noMove;
};

const PieceIsOnSquare = (square, top, left) => {
	if (
		ranksBoard[square] == 7 - Math.round(top) / 60 &&
		filesBoard[square] == Math.round(left / 60)
	)
		return Bool.True;
	return Bool.False;
};

const RemovePieceGUI = (square) => {
	$(".Piece").each(function () {
		if (
			PieceIsOnSquare(
				square,
				$(this).position().top,
				$(this).position().left
			)
		)
			$(this).remove();
	});
};

const AddPieceGUI = (square, piece) => {
	let pieceFileName,
		imageString,
		rankName,
		fileName = "";
	let file = filesBoard[square];
	let rank = ranksBoard[square];
	rankName = `rank${rank + 1}`;
	fileName = `file${file + 1}`;

	pieceFileName = `./resources/${sideChar[pieceCol[piece]]}${
		pieceChar[piece]
	}.png`;
	imageString = `<image src="${pieceFileName}" class="Piece ${rankName} ${fileName}"/>`;
	$(".board").append(imageString);
};

const MovePieceGUI = (move) => {
	const from = fromSquare(move);
	const to = toSquare(move);

	if (move & moveFlagEnPassant) RemovePieceGUI(SquareOffset(to, -10));
	else if (capturedPiece(move)) RemovePieceGUI(to);

	let rankName,
		fileName = "";
	let file = filesBoard[to];
	let rank = ranksBoard[to];
	rankName = `rank${rank + 1}`;
	fileName = `file${file + 1}`;

	$(".Piece").each(function () {
		if (
			PieceIsOnSquare(
				from,
				$(this).position().top,
				$(this).position().left
			)
		) {
			$(this).removeClass();
			$(this).addClass(`Piece ${rankName} ${fileName}`);
		}
	});

	if (move & moveFlagCastle)
		switch (to) {
			case SQUARES.C1:
				RemovePieceGUI(SQUARES.A1);
				AddPieceGUI(SQUARES.D1, PIECES.wR);
				break;
			case SQUARES.C8:
				RemovePieceGUI(SQUARES.A8);
				AddPieceGUI(SQUARES.D8, PIECES.bR);
				break;
			case SQUARES.G1:
				RemovePieceGUI(SQUARES.H1);
				AddPieceGUI(SQUARES.F1, PIECES.wR);
				break;
			case SQUARES.G8:
				RemovePieceGUI(SQUARES.H8);
				AddPieceGUI(SQUARES.F8, PIECES.bR);
				break;
			default:
				break;
		}
	else if (promotedPiece(move)) {
		RemovePieceGUI(to);
		AddPieceGUI(to, promotedPiece(move));
	}
};

const DrawMaterial = () => {
	if (
		GameBoard.pieceNum[PIECES.wP] != 0 ||
		GameBoard.pieceNum[PIECES.bP] != 0
	)
		Bool.False;
	if (
		GameBoard.pieceNum[PIECES.wQ] != 0 ||
		GameBoard.pieceNum[PIECES.bQ] != 0
	)
		Bool.False;
	if (
		GameBoard.pieceNum[PIECES.wR] != 0 ||
		GameBoard.pieceNum[PIECES.bR] != 0
	)
		Bool.False;

	if (GameBoard.pieceNum[PIECES.wN] > 1 || GameBoard.pieceNum[PIECES.bN] > 1)
		Bool.False;
	if (GameBoard.pieceNum[PIECES.wB] > 1 || GameBoard.pieceNum[PIECES.bB] > 1)
		Bool.False;

	if (
		GameBoard.pieceNum[PIECES.wN] != 0 ||
		GameBoard.pieceNum[PIECES.wB] != 0
	)
		Bool.False;

	if (
		GameBoard.pieceNum[PIECES.bN] != 0 ||
		GameBoard.pieceNum[PIECES.bB] != 0
	)
		Bool.False;

	return Bool.True;
};

const ThreeFoldRepetition = () => {
	let i = 0;
	let repetition = 0;
	let start = GameBoard.historyPly - GameBoard.fiftyMoveRule;
	let end = GameBoard.historyPly - 1;
	for (i = start; i < end; i++)
		if (GameBoard.history[i].posKey == GameBoard.posKey) repetition++;
	return repetition;
};

const CheckResult = () => {
	if (GameBoard.fiftyMoveRule >= 100) {
		$("#GameStatus").text("Igra je nerije??ena! (pravilo 50 poteza)");
		return Bool.True;
	}
	if (ThreeFoldRepetition() >= 16) {
		$("#GameStatus").text(
			"Igra je nerije??ena! (pravilo ponavljanja poteza)"
		);
		return Bool.True;
	}
	if (GameBoard.fiftyMoveRule >= 100) {
		$("#GameStatus").text("Igra je nerije??ena! (Nedovoljno materijala)");
		return Bool.True;
	}

	GenerateMoves();
	let moveNum = 0;
	let found = 0;
	let start = GameBoard.moveListStart[GameBoard.ply];
	let end = GameBoard.moveListStart[GameBoard.ply + 1];

	for (moveNum = start; moveNum < end; moveNum++) {
		if (!MakeMove(GameBoard.moveList[moveNum])) continue;
		found++;
		TakeMove();
		break;
	}
	if (found) return Bool.False;

	let side = GameBoard.side;
	let inCheck = SquareAttacked(
		GameBoard.pieceList[PieceIndex(kings[side], 0)],
		side ^ 1
	);

	if (inCheck) {
		$("#GameStatus").text(
			side
				? "Igra gotova! Bijeli je pobjedio!"
				: "Igra gotova! Crni je pobjedio!"
		);
	} else $("#GameStatus").text("Igra je nerije??ena! (pat)");

	return Bool.True;
};

const CheckAndSet = () => {
	GameController.gameOver = CheckResult();
	!GameController.gameOver && $("#GameStatus").text(`${MakeFEN()}`);
};

const PreSearch = () => {
	AddCheck();
	if (GameController.gameOver == Bool.False) {
		SearchController.thinking = Bool.True;
		setTimeout(() => {
			StartSearch();
		}, 200);
	}
};

$(".MoveNow").click(() => {
	GameController.playerSide = GameBoard.side ^ 1;
	PreSearch();
});
$(".NewGame").click(() => {
	NewGame(START_FEN);
});

$(".TakeBack").click(() => {
	if (GameBoard.historyPly > 0) {
		TakeMove();
		GameBoard.ply = 0;
		SetInitalBoardPieces();
		DeSelectAttacks();
		RemoveCheck();
		AddCheck();
	}
});

const StartSearch = () => {
	SearchController.depth = MAX_DEPTH;
	let thinkingTime = $("#ThinkingTime").val();
	SearchController.time = parseInt(thinkingTime) * 1000;
	SearchPosition();
	MakeMove(SearchController.best);
	MovePieceGUI(SearchController.best);
	DeSelectAttacks();
	RemoveCheck();
	AddCheck();
	CheckAndSet();
};

const AddCheck = () => {
	let side = GameBoard.side;
	let piece = PieceIndex(kings[side], 0);
	let square = GameBoard.pieceList[piece];
	let inCheck = SquareAttacked(square, side ^ 1);
	let rankName,
		fileName = "";
	let file = filesBoard[square];
	let rank = ranksBoard[square];
	rankName = `rank${rank + 1}`;
	fileName = `file${file + 1}`;

	if (inCheck) {
		$(".Square").each(function () {
			if ($(this).hasClass(rankName) && $(this).hasClass(fileName))
				$(this).append("<div class='InCheck'/>");
		});
	}
};
