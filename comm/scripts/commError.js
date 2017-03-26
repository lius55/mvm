$(function(){

	// 現在閲覧ページ
	var currentIndex = 1;
	// 現在選択した利用年月
	var currentUseDateMonth = getMonth($("#useDateMonth").val());

	var getErrorList = function(useDateMonth, index, success){
		var requestParam = {
			useDateMonth: useDateMonth,
			limit: eachPageNum,
			index: index
		};

		ajax({
			url: apiList.commError,
			data: requestParam,
			success: success
		});
	};

	var showErrorList = function(response) {
		var response = $.parseJSON(response);
		response.index = parseInt(currentIndex);
		response.pagenum = Math.ceil(parseInt(response.recordCount)/eachPageNum);
		$("#errorList").empty();
		$.tmpl($("#errorListTemplate"), response).appendTo("#errorList");
	};

	// 検索ボタンイベント
	$("#search").on('click', function(){
		if($("#useDateMonth").val().length < 1) {
			alert("利用年月入力してください。");
		}
		currentUseDateMonth = getMonth($("#useDateMonth").val());
		getErrorList(currentUseDateMonth, currentIndex, showErrorList);
	});

	// クリアボタンイベント
	$("#clear").on('click', function(){
		$("#useDateMonth").val("");;
	});

	// ページ変更イベント
	$("#errorList").on('click', '.page-change', function(){
		pageNum = $(this).val();
		console.log("pageNum=" + pageNum);
		if (pageNum != undefined) {
			currentIndex = pageNum;
			getErrorList(currentUseDateMonth, currentIndex, showErrorList);
		}
	});

	// 初期表示
	getErrorList(currentUseDateMonth, currentIndex, showErrorList);
});