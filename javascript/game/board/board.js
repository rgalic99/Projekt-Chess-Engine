let GameBoard = {};

GameBoard.pieces = new Array(NUM_OF_SQ);
GameBoard.side = COLORS.WHITE;
GameBoard.fiftyMoveRule = 0; //prati poteze po pravilu 50 poteza
GameBoard.historyPly = 0;
GameBoard.ply = 0;
GameBoard.material = new Array(2); //materijalna vrijednost figura ta bijelog/crnog
GameBoard.castlePerm = 0; //prati pravo rokade
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
GameBoard.enPassant = 0; //prati en passant pravilo
GameBoard.posKey = 0; //pozicija na ploči (hash)

GameBoard.moveList = new Array(MAX_POSITION_MOVES * MAX_DEPTH); //lista svih poteza
GameBoard.moveScores = new Array(MAX_POSITION_MOVES * MAX_DEPTH); //lista rezultata poteza
GameBoard.moveListStart = new Array(MAX_DEPTH);
