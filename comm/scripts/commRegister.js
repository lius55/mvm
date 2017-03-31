$(function(){
	$("#createData").on('click', function(){

		// 入力チェック
		if(validate($("[validate]"))) { return; }

		// FormData取得
		var formData = new FormData($("#requestForm").get()[0]);
		formData.append("useDateMonth", getParamValue($("#useDateMonth")));
		formData.append("billDateMonth", getParamValue($("#billDateMonth")));
		formData.append("productCode", $("#productCode").val());

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

	// アップロードボタン設定
	initFileInput($("#upload"));

	// $.each($("#upload"), function(index, element) {
		
	// 	var fileInput = $("#" + $(this).attr("for"));
	// 	var fileNameInput = $("#" + $(this).attr("display"));

	// 	$(this).on('click', function() {
	// 		$(fileInput).click();			
	// 	});

	// 	$(fileInput).change(function() {
	// 		$(fileNameInput).val($(this).val());			
	// 	});
	// });
});