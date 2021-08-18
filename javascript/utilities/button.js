const CheckButton = () => {
	if ($("#textsend").val() == "") {
		$("#button").removeClass("setFenButton");
		$("#button").addClass("setFenButtonDisabled");
		$("#button").prop("disabled", true);
	} else {
		$("#button").removeClass("setFenButtonDisabled");
		$("#button").addClass("setFenButton");
		$("#button").prop("disabled", false);
	}
};

$("#button").click(() => {
	let string = $(".fenInput").val();
	NewGame(string);
});
