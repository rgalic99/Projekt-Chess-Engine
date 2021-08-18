const GetDependencies = () => {
	const links = `utilities/utils.js
	utilities/button.js
	constants/boardConstants.js
	constants/gameConstants.js
	constants/pieceConstants.js
	game/mainFunctions.js
	game/pieceFunctions.js
	game/board.js
	game/FEN.js
	game/squareAttacked.js
	game/moveGen.js
	game/makeMove.js
	game/evaluate.js
	game/pvtable.js
	game/search.js
	game/page.js
	game/main.js`;
	return links.split("\n");
};

const Sleep = (ms) => {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < ms);
};

const ParseDependencies = () => {
	const links = GetDependencies();
	links.forEach((link) => {
		let script = document.createElement("script");
		script.src = `../javascript/${link}`;
		document.getElementById("dependencies").appendChild(script);
		Sleep(10);
	});
};

ParseDependencies();

let link = document.querySelector("link[rel~='icon']");
if (!link) {
	link = document.createElement("link");
	link.rel = "icon";
	document.getElementsByTagName("head")[0].appendChild(link);
}
link.href = "../frontend/resources/Chess-icon.png";
