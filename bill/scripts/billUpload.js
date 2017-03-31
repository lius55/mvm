$(function(){

	// --------------
	//    初期処理
	// --------------
	// アップロードボタン設定
	initFileInput($("#select"));

	$("#upload").on('click', function() {

		// 入力チェック
		if(validate($("[validate]"))) { return; }

		// FormData取得
		var formData = new FormData($("#requestForm").get()[0]);
		formData.append("billDateMonth", getParamValue($("#billDateMonth")));

		// 結果ハンドリング
		var responseHandler = function(response){
			if(validateResponse(response)) { return; }
			alert("データ作成しました。");
		}

		// アップロード処理
		ajaxUpload({
			url: apiList.commRegistInput,
			data: formData,
			success: responseHandler
		});
	});
});