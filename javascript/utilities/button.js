const CheckButton = () => {
	if (document.getElementById("textsend").value === "") {
		$("button").first().removeClass("setFenButton");
		$("button").first().addClass("setFenButtonDisabled");
		$("button").first().prop("disabled", true);
	} else {
		$("button").first().removeClass("setFenButtonDisabled");
		$("button").first().addClass("setFenButton");
		$("button").first().prop("disabled", false);
	}
};

$("button")
	.first()
	.click(() => {
		let string = $(".fenInput").val();
		ParseFEN(string);
		PrintBoard();
	});
