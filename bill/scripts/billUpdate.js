$(function(){
	var data = {
		cntrctID: 'Ka1234',
		registrationDate: '2016-11-02 15:00',
		billMonth: '2016/11',
		updateDate: '2016-11-02 15:00'
	}
	$.tmpl($("#billInfoTemplate"), data).appendTo("#billInfo");
	$.tmpl($("#billDataTemplate"), '').appendTo("#billData");
});