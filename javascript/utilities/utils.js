const ConsoleFiles = () => {
	FilesBoard.forEach((e, index) => {
		console.log(`FileSquare ${index} : ${e}`);
	});
};

const ConsoleRanks = () => {
	RanksBoard.forEach((e, index) => {
		console.log(`RankSquare ${index} : ${e}`);
	});
};

const BOOL = { FALSE: 0, TRUE: 1 };

const FileRankToSquare = (f, r) => {
	return 21 + f + r * 10; // pronalazimo indeks kocke u matrici
};

const GetSquare64 = (square120) => {
	return Board_120_to_64[square120]; //vraća indeks kocke od 0-63
};

const GetSquare120 = (square64) => {
	return Board_64_to_120[square64]; //vraća indeks kocke zadan preko formule 21 + file + rank * 10
};
