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

const ParseDependencies = async () => {
	let links = GetDependencies();
	links.forEach(async (link) => {
		let script = document.createElement("script");
		script.src = `../javascript/${link}`;
		await document.getElementById("dependencies").appendChild(script);
	});
};

ParseDependencies();
