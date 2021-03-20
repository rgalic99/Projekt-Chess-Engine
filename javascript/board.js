const PieceIndex = (piece, pieceNum) => {
	return piece * 10 + pieceNum;
};

let GameBoard = {};

GameBoard.pieces = new Array(NUM_OF_SQ);
GameBoard.side = COLOURS.WHITE;
GameBoard.fiftyMoveRule = 0;
GameBoard.hisPly = 0;
GameBoard.ply = 0;
GameBoard.material = new Array(2);
GameBoard.castlePerm = 0;
/*
0001 => white kingside castle 
0010 => white queenside castle
0100 => black kingside castle
1000 => black queenside castle

1010 => black and white can castle queenside
*/
GameBoard.pieceNum = new Array(13);
/*
max 10 od iste figute

wP*10 + wPNum -> index figure

ako imamo 6 bijelih pijuna Gameboard.pieceNum[wP]=6
*/
GameBoard.pieceList = new Array(13 * 10);
GameBoard.enPassant = 0; //en passant pravilo
GameBoard.posKey = 0; //pozicija na ploči (FEN)

const GeneratePositionKey = () => {
	let PositionKey = 0;

	for (let square = 0; square < NUM_OF_SQ; square++) {}
	{
		let piece = GameBoard.pieces[square];
		if (piece && piece != SQUARES.OFFBOARD)
			PositionKey ^= PieceKeys[piece * 120 + square];
	}

	if (GameBoard.side == COLOURS.WHITE) PositionKey ^= SideKey;
	if (GameBoard.enPassant != SQUARES.NO_SQ)
		PositionKey ^= PieceKeys[GameBoard.enPassant];

	PositionKey ^= CastleKeys[GameBoard.castlePerm];

	return PositionKey;
};
