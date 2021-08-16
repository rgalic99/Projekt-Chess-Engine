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
			ranksBoard[square] == 7 - Math.round($(this).position().top) / 60 &&
			filesBoard[square] == Math.round($(this).position().left / 60)
		)
			$(this).addClass("SqSelected");
	});
};
const DeSelectSquare = (square) => {
	$(".Square").each(function () {
		if (
			ranksBoard[square] == 7 - Math.round($(this).position().top) / 60 &&
			filesBoard[square] == Math.round($(this).position().left / 60)
		)
			$(this).removeClass("SqSelected");
	});
};

const MakeUserMove = () => {
	if (UserMove.from != SQUARES.NO_SQ && UserMove.to != SQUARES.NO_SQ) {
		console.log(
			`User move: ${PrintSquare(UserMove.from)}${PrintSquare(
				UserMove.to
			)}`
		);
		DeSelectSquare(UserMove.from);
		DeSelectSquare(UserMove.to);
		UserMove.from = SQUARES.NO_SQ;

		UserMove.to = SQUARES.NO_SQ;
	}
};
