function initialize() {
	var obj = document.getElementById("logout");
	obj.onclick = fncLogout;
}
function fncLogout()
{
	window.top.location.href = "index.html";
}

