$(function () {
	init();
	console.log("Lol");
});

const init = () => {
	console.log("Inicijalizacija...");
	InitBoard();
};

const InitBoard = () => {
	for (let index = 0; index < NUM_OF_SQ; index++) {
		FilesBoard[index] = SQUARES.OFFBOARD;
		RanksBoard[index] = SQUARES.OFFBOARD;
	}
	for (let rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank) {
		for (let file = FILES.FILE_A; file <= FILES.FILE_H; ++file) {
			let square = FileRankToSquare(file, rank);
			FilesBoard[square] = file;
			RanksBoard[square] = rank;
		}
	}

	/* 	for (i = 0; i < NUM_OF_SQ; i++) console.log("FileSquare"+i + ": " + FilesBoard[i]);
	for (i = 0; i < NUM_OF_SQ; i++) console.log("RankSquare"+ i + ": " + RanksBoard[i]); */
};
