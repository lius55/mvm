$(function(){

	$("#createData").on('click', function(){
		// TODO 入力チェック
		createData(formatDate($("#billDateMonth").val()));
	});

	var createData = function(billDateMonth) {
		var requestParam =  {
			billDateMonth: billDateMonth
		};
		ajax({
			url: apiList.billRegister,
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