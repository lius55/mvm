$(function(){

	$("#scrub").on('click', function(){

		// 入力チェック
		if(validate($("[validate]"))) { return; }

		var success = function(response) {
			if (validateResponse(response)) { return; }
			alert("処理完了しました。");
		}

		ajax({
			url: apiList.billPayment,
			data: {
				billDateMonth: getParamValue($("#billDateMonth"))
			},
			success: success
		});
	});
});