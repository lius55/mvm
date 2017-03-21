
function initialize() {
}

$(document).ready(function(){
	$(document).find("#btnLogin").on('click', function() {
		checkLogin();
	});
});

function checkLogin() {
	window.top.location.href = "main.html";
}

