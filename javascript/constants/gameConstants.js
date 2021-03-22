//boje
const COLORS = { WHITE: 0, BLACK: 1, BOTH: 2 };

//pravo castleanja / rokade
const CASTLEBIT = { WKCA: 1, WQCA: 2, BKCA: 4, BQCA: 8 };

const MAX_GAME_MOVES = 2048; //broj mogućih poteza u svakoj igri
const MAX_POSITION_MOVES = 256; //broj poteza u danoj poziciji
const MAX_DEPTH = 64; //maksimalna dubina do koje će ići računalo

const PieceKeys = new Array(13 * 10); //hash vrijednosti za figure
const CastleKeys = new Array(16); //hash vrijednosti za rokadu
const SideKey = RAND_32(); //hash vrijednost za stranu koja igra
