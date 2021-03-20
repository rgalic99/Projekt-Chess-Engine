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
