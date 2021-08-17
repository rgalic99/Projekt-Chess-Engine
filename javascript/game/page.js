const ClickedSquare = (x, y) => {
	console.log(`Clicked square at ${x},${y}`);
	let position = $(".screen").position();
	let boardX = Math.floor(position.left);
	let boardY = Math.floor(position.top);
	let file = Math.floor((x - boardX - 60) / 60);
	let rank = 7 - Math.floor((y - boardY - 90) / 60);
	let square = FileRankToSquare(file, rank);
	console.log(PrintSquare(square));
	SetSelectedSquare(square);
	return square;
};

$(document).on("click", ".Square", (e) => {
	if (UserMove.from != SQUARES.NO_SQ) {
		UserMove.to = ClickedSquare(e.pageX, e.pageY);
		MakeUserMove();
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

const MakeUserMove = () => {
	let parsedMove = noMove;

	if (UserMove.from != SQUARES.NO_SQ && UserMove.to != SQUARES.NO_SQ) {
		console.log(
			`User move: ${PrintSquare(UserMove.from)}${PrintSquare(
				UserMove.to
			)}`
		);

		parsedMove = ParseMove(UserMove.from, UserMove.to);
		if (parsedMove != noMove) {
			MakeMove(parsedMove);
			PrintBoard();
		}
		DeSelectSquare(UserMove.from);
		DeSelectSquare(UserMove.to);

		UserMove.from = SQUARES.NO_SQ;
		UserMove.to = SQUARES.NO_SQ;
	}
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
		imageString = "";
	let file = filesBoard[square];
	let rank = ranksBoard[square];
	rankName = `rank${rank + 1}`;
	fileName = `file${file + 1}`;

	pieceFileName = `./resources/${sideChar[pieceCol[piece]]}${
		pieceCharacter[piece]
	}.png`;
	imageString = `<image src="${pieceFileName}" class="Piece ${rankName} ${fileName}"/>`;
	$(".board").append(imageString);
};
