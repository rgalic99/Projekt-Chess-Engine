const GetDependencies = () => {
	let links = `utilities/utils.js
	utilities/button.js
	constants/boardConstants.js
	constants/gameConstants.js
	constants/pieceConstants.js
	game/mainFunctions.js
	game/pieceFunctions.js
	game/board.js
	game/main.js
	game/FEN.js`;
	return links.split("\n");
};

const ParseDependencies = () => {
	let links = GetDependencies();
	links.forEach((link) => {
		let script = document.createElement("script");
		script.src = `../javascript/${link}`;
		document.getElementById("dependencies").appendChild(script);
		sleep(1);
	});
};

ParseDependencies();

const sleep = (ms) => {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < ms);
};
