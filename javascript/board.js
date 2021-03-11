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
