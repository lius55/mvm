$(function(){

	$("#createData").on('click', function(){
		// TODO 入力チェック
		createData(formatDate($("#useDateMonth").val()), formatDate($("#billDateMonth").val()));
	});

	var createData = function(useDateMonth, billDateMonth) {
		var requestParam =  {
			useDateMonth: useDateMonth,
			billDateMonth: billDateMonth
		};
		ajax({
			url: apiList.commMonthly,
			data: requestParam,
			success: responseHandler
		});
	}

	var responseHandler = function(response) {
		response = $.parseJSON(response);
		if (response.response == 'OK') {
			alert("データ作成しました。");
		} else {
			alert("エラーが発生しました。");
		}
	}
});