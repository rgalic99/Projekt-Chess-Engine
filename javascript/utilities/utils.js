const ConsoleFiles = () => {
	filesBoard.forEach((e, index) => {
		console.log(`FileSquare ${index} : ${e}`);
	});
};

const ConsoleRanks = () => {
	ranksBoard.forEach((e, index) => {
		console.log(`RankSquare ${index} : ${e}`);
	});
};

const BOOL = { FALSE: 0, TRUE: 1 };

const PieceIndex = (piece, pieceNum) => {
	return piece * 10 + pieceNum; //vraća jedinstveni indeks neke figure
};

const RAND_32 = () => {
	return (
		(Math.floor(Math.random() * 255 + 1) << 23) |
		(Math.floor(Math.random() * 255 + 1) << 16) |
		(Math.floor(Math.random() * 255 + 1) << 8) |
		Math.floor(Math.random() * 255 + 1)
	);
};

const GetStringFromSquare120 = (number) => {
	let number64 = GetSquare64(number); //daje indeks od 0-63
	return GetStringFromSquare64(number64);
};

const GetStringFromSquare64 = (number64) => {
	let squareString = "";

	let squareStringNum = Math.ceil(number64 / 8);
	let squareStringLetter = number64 - 8 * Math.floor(number64 / 8);

	squareString = `${MakeCharFromNum(squareStringLetter)}${squareStringNum}`;

	return squareString;
};

const MakeCharFromNum = (number) => {
	return String.fromCharCode(number + "a".charCodeAt());
};

const GetSquare120FromSting = (string) => {
	if (string != "No") {
		let file = string[0].charCodeAt() - "a".charCodeAt();
		let rank = string[1].charCodeAt() - "1".charCodeAt();
		return FileRankToSquare(file, rank);
	}
	return 0;
};
