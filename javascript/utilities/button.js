$(".setFenButton").click(() => {
	let string = $(".fenInput").val();
	ParseFEN(string);
	PrintBoard();
});

const CheckButton = () => {
	if (document.getElementById("textsend").value === "") {
		$("button").first().removeClass("setFenButton");
		$("button").first().addClass("setFenButtonDisabled");
		document.getElementById("button").disabled = true;
	} else {
		$("button").first().removeClass("setFenButtonDisabled");
		$("button").first().addClass("setFenButton");
		document.getElementById("button").disabled = false;
	}
};
