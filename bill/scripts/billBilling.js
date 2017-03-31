$(function(){

	$("#download").on('click', function() {

		// 入力チェック
		if (validate($("[validate]"))) { return; }

		var billDateMonth = getParamValue($("#billDateMonth"));

		var getDownloadFile = function(response) {
			// TODO エラー判定
			if (validateResponse(response)) { return; }
			var fileName = billDateMonth + ".csv";
			downloadCsvFile(response.csvData, fileName);
		};

		ajax({
			url: apiList.billBilling,
			data: {
				billDateMonth: billDateMonth
			},
			success: getDownloadFile
		});
	});
});