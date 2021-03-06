const GameBoard = {};

GameBoard.pieces = new Array(NUM_OF_SQ);
GameBoard.pieceList = new Array(14 * 10); // lista svih figura
GameBoard.material = new Array(2); // materijalna vrijednost figura ta bijelog/crnog
GameBoard.pieceNum = new Array(14); // lista koja pamti količinu svake figure
/*
max 10 od iste figure

wP*10 + wPNum -> index figure

ako imamo 6 bijelih pijuna Gameboard.pieceNum[PIECES.wP]=6
*/

GameBoard.side = COLORS.WHITE; // prati koja strana trenutno igra
GameBoard.enPassant = 0; // prati en passant pravilo
GameBoard.fiftyMoveRule = 0; // prati poteze po pravilu 50 poteza
GameBoard.ply = 0; // prati polupotez
GameBoard.historyPly = 0; // pamti prethodne polupoteze
GameBoard.history = []; // pamti prethodne poteze
GameBoard.castlePerm = 0; // prati pravo rokade
/*
0001 => bijeli ima pravo rokade na strani kralja
0010 => bijeli ima pravo rokade na strani kraljice
0100 => crni ima pravo rokade kingside
1000 => crni ima pravo rokade na strani kraljice

1010 => crni i bijeli imaju pravo rokade na strani kraljice
*/
GameBoard.posKey = 0; // pozicija na ploči (hash)

GameBoard.moveListStart = new Array(MAX_DEPTH); // lista svih poteza u početnoj poziciji
GameBoard.moveList = new Array(MAX_POSITION_MOVES * MAX_DEPTH); // lista svih poteza
GameBoard.moveScores = new Array(MAX_POSITION_MOVES * MAX_DEPTH); // lista rezultata poteza

// PV tablica
GameBoard.PvTable = [];
GameBoard.PvArray = new Array(MAX_DEPTH);

// Pretraga
GameBoard.searchHistory = new Array(14 * NUM_OF_SQ);
GameBoard.searchKillers = new Array(3 * MAX_DEPTH);

const ResetBoard = () => {
	GameBoard.pieces.fill(SQUARES.OFFBOARD);
	let index = 0;
	for (index = 0; index < 64; index++)
		GameBoard.pieces[GetSquare120(index)] = PIECES.EMPTY;

	GameBoard.side = COLORS.BOTH;
	GameBoard.enPassant = SQUARES.NO_SQ;
	GameBoard.fiftyMoveRule = 0;
	GameBoard.ply = 0;
	GameBoard.historyPly = 0;
	GameBoard.castlePerm = 0;
	GameBoard.posKey = 0;
	GameBoard.moveListStart[GameBoard.ply] = 0;
};
