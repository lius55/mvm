$(function(){
	$("#createData").on('click', function(){

		var formData = new FormData($("#requestForm").get()[0]);
		formData.append("useDateMonth", getMonth($("#useDateMonth").val()));
		formData.append("billDateMonth", getMonth($("#billDateMonth").val()));
		formData.append("productCode", $("#productCode").val());

		// // TODO 固定長ファイル？
		// var requestParam =  {
		// 	useDateMonth: getMonth($("#useDateMonth").val()),
		// 	billDateMonth: getMonth($("#billDateMonth").val()),
		// 	productCode: $("#productCode").val(),
		// 	file: $("#file").val()
		// };

		var requestHandler = function(response){
			if (response.response == 'OK') {
				alert("データ作成しました。")
			} else {
				alert("エラーが発生しました。");
			}
		}

		ajax({
			url: apiList.commRegistInput,
			data: formData,
			success: requestHandler
		});

	});;
});